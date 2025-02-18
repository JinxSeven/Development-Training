import { Component, inject, SimpleChanges } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Task } from '../interfaces/task';
import { User } from '../interfaces/user';
import { Activity } from '../interfaces/activity';
import { Tag } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';


@Component({
    standalone: true,
    selector: 'app-task-tracker',
    imports: [
        HeaderComponent, ToastModule, Toast,
        FormsModule, Tag, DropdownModule, ButtonModule
    ],
    templateUrl: './task-tracker.component.html',
    styleUrl: './task-tracker.component.css',
    providers: [ MessageService ]
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

    selectedTaskState = '';

    constructor(private router: Router, private messageService: MessageService) {
        const todayDate = new Date();
        this.selectedDate = todayDate.toISOString().split('T')[0];
        this.loggerUser = this.getLoggedUser()
        this.apiCalls.getUserTasks(this.loggerUser.id).subscribe({
            next: response => {
                this.userTasks = response;
                console.log("Response: 200");
                this.totalTaskHours = this.getRelevantData();
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

    onTaskStateChange(taskId: string, event: Event) {
        const newTaskState = (event.target as HTMLSelectElement).value;
        this.apiCalls.updateTaskState(taskId, newTaskState).then((response) => {
            if (response.ok) {
                if (newTaskState === `complete`) {
                    this.showToast(`success`, `Awesome!`, `Here's to learning, growing, and crushing it!`)
                    return;
                }
                this.showToast(`info`, `Voilà!`, `Your task state just got updated!`)
            }
        }).catch((error) => {
            this.showToast('error', 'Oops!', 'Houston, we have a problem!');
        });


    }

    onDateChange(event: any) {
        this.totalTaskHours = this.getRelevantData();
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
                this.apiCalls.getUserTasks(this.loggerUser.id).subscribe({
                    next: response => {
                        this.userTasks = response;
                        console.log("Response: 200");
                        this.totalTaskHours = this.getRelevantData();
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

    getRelevantData(): number {
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
                            const matchingTasks = this.userTasks.find(task => task.id === act.taskId);
                            if (matchingTasks) {
                                const combinedObject = {
                                    act,
                                    matchingTasks
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

    getLoggedUser(): User {
        const loggedUser = sessionStorage.getItem("LoggedUser");
        return JSON.parse(loggedUser!);
    }

    onPlusTask() {
        this.router.navigate(["/taskfields"]);
        this.apiCalls.dataToEdit = null;
        this.apiCalls.editMode = false;
    }

    showToast(severity: string, summary: string, detail: string) {
        this.messageService.add({
            severity: `${severity}`,
            summary: `${summary}`,
            detail: `${detail}`,
            life: 3000,
        });
    }
}
