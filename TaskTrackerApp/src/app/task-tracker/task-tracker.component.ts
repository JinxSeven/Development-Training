import { Component, inject, SimpleChanges } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Task } from '../interfaces/task';
import { User } from '../interfaces/user';
import { Activity } from '../interfaces/activity';

@Component({
    selector: 'app-task-tracker',
    imports: [
        HeaderComponent,
        FormsModule
    ],
    templateUrl: './task-tracker.component.html',
    styleUrl: './task-tracker.component.css'
})
export class TaskTrackerComponent {
    apiCalls = inject(ApiService)
    selectedDate: string;
    userTasks:Task[] = [];
    loggerUser: User;
    totalTaskHours: number = 0;
    totalTaskCount: number = 0;
    taskIds: string[] = [];
    selectedDateData: any = [];

    constructor(private router: Router) {
        const todayDate = new Date();
        this.selectedDate = todayDate.toISOString().split('T')[0];
        this.loggerUser = this.getLoggedUserId()
        this.apiCalls.getUserTasks(this.loggerUser.id).subscribe({
            next: response => {
                this.userTasks = response;
                console.log("Response: 200");
                this.totalTaskHours = this.calculateTotalHours();
            },
            error: error => {
                if (error.status === 400) {
                    console.error("Error: ", error);
                } else {
                    console.error("Something went wrong! ", error);
                }
            }
        });
    }

    onChange(event: any) {
        this.totalTaskHours = this.calculateTotalHours();
    }

    onTaskEdit(task_id: string) {
        this.apiCalls.dataToEdit = null;

        const taskData = this.userTasks
        .find((data: any) => data.id === task_id);
        const combinedData = this.selectedDateData
        .find((data: any) => data.matchedTask.id === task_id);

        if (combinedData) {
            this.apiCalls.dataToEdit = combinedData;
        } else {
            const matchedTask = taskData
            const act: any = {};
            const Data = {
                act,
                matchedTask
            }
            this.apiCalls.dataToEdit = Data;
        }
        this.apiCalls.editMode = true;
        this.router.navigate(["/taskfields"]);
    }

    onTaskDelete(taskId: string) {
        console.log(taskId);
        this.apiCalls.deleteTask(taskId).subscribe({
            next: (response: any) => {
                console.log("DELETE done");
                this.apiCalls.getUserTasks(this.loggerUser.id).subscribe({
                    next: response => {
                        this.userTasks = response;
                        console.log("Response: 200");
                        this.totalTaskHours = this.calculateTotalHours();
                    },
                    error: error => {
                        if (error.status === 400) {
                            console.error("Error: ", error);
                        } else {
                            console.error("Something went wrong! ", error);
                        }
                    }
                });
            },
            error: (error: any) => {
                if (error.status === 400) {
                    console.error("API response: ", error);
                } else {
                    console.error("Error: ", error);
                }
            }
        });
    }

    calculateTotalHours(): number {
        this.totalTaskHours = 0;
        this.totalTaskCount = 0;
        this.selectedDateData = [];
        this.userTasks.forEach(task => {
            if
            (
                task.dateTime.toString().split('T')[0] ==
                this.selectedDate
            ) {
                this.totalTaskHours += task.hours;
                this.totalTaskCount++;
                this.apiCalls.getTaskActivities(task.id).subscribe({
                    next: response => {
                        response.forEach((act: Activity) => {
                            const matchedTask = this.userTasks.find(task => task.id === act.taskId);
                            if (matchedTask) {
                                const combinedObject = {
                                    act,
                                    matchedTask
                                };
                            this.selectedDateData.push(combinedObject);
                            }
                        });
                    }
                })
            }
        });
        return this.totalTaskHours;
    }

    getLoggedUserId(): User {
        const loggedUser = sessionStorage.getItem("LoggedUser");
        return JSON.parse(loggedUser!);
    }

    onPlusTask() {
        this.router.navigate(["/taskfields"]);
        this.apiCalls.dataToEdit = null;
        this.apiCalls.editMode = false;
    }
}
