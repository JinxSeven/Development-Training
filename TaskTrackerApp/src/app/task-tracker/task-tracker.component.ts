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
import { TaskData } from '../interfaces/taskData';
import { lastValueFrom } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-task-tracker',
    imports: [
        HeaderComponent,
        ToastModule,
        Toast,
        FormsModule,
        Tag,
        DropdownModule,
        ButtonModule,
    ],
    templateUrl: './task-tracker.component.html',
    styleUrl: './task-tracker.component.css',
    providers: [MessageService],
})
export class TaskTrackerComponent {
    apiCalls = inject(ApiService);
    selectedDate: string;
    userTasks: Task[] = [];
    loggerUser: User;
    totalTaskHours: number = 0;
    totalTaskCount: number = 0;
    taskIds: string[] = [];
    dataByDate: any = [];

    selectedTaskState = '';

    constructor(
        private router: Router,
        private messageService: MessageService
    ) {
        this.apiCalls.setEditMode(false);

        const todayDate = new Date();
        this.selectedDate = todayDate.toISOString().split('T')[0];
        this.loggerUser = this.getLoggedUser();
        this.apiCalls.getUserTasks(this.loggerUser.id).subscribe({
            next: (response) => {
                this.userTasks = response;
                console.log('getUserTasks Response: 200');
                this.totalTaskHours = this.getRelevantData();
            },
            error: (error) => {
                if (error.status === 400) {
                    console.error('Error: ', error);
                } else {
                    console.error('Something went wrong! ', error);
                }
                this.showToast(
                    'error',
                    'Oops!',
                    'The server is taking a coffee break. Try again in a bit!'
                );
            },
        });
    }

    onTaskStateChange(taskId: string, event: Event) {
        const newTaskState = (event.target as HTMLSelectElement).value;
        this.apiCalls
            .updateTaskState(taskId, newTaskState)
            .then((response) => {
                if (response.ok) {
                    this.userTasks.forEach((task) => {
                        if (task.id === taskId) {
                            task.taskState = newTaskState;
                        }
                    });
                    
                    if (newTaskState === `complete`) {
                        this.showToast(
                            `success`,
                            `Task Conquered!`,
                            `Here's to learning, growing, and conquering it!`
                        );
                        return;
                    }
                    this.showToast(
                        `info`,
                        `Voilà!`,
                        `Your task state just got updated!`
                    );
                }
            })
            .catch((error) => {
                this.showToast(
                    'error',
                    'Oops!',
                    'The server is taking a coffee break. Try again in a bit!'
                );
            });
    }

    onDateChange(event: any) {
        this.totalTaskHours = this.getRelevantData();
    }

    async onTaskEdit(task_id: string) {
        this.apiCalls.dataToEdit = null;

        const task = this.userTasks.find((data: any) => data.id === task_id);

        if (!task) return;

        try {
            const response = await lastValueFrom(
                this.apiCalls.getTaskActivities(task.id)
            );

            const taskData: TaskData = {
                task: task,
                activities: response,
            };

            this.apiCalls.dataToEdit = taskData;
            this.apiCalls.setEditMode(true);
        } catch (error) {
            this.showToast(
                'error',
                'Oops!',
                'The server is taking a coffee break. Try again in a bit!'
            );
            console.error(error);
            return;
        }

        this.router.navigate(['/taskfields']);
    }

    onTaskDelete(taskId: string) {
        console.log(taskId);
        this.apiCalls.deleteTask(taskId).subscribe({
            next: (response: any) => {
                this.apiCalls.getUserTasks(this.loggerUser.id).subscribe({
                    next: (response) => {
                        this.userTasks = response;
                        console.log('deleteTask Response: 200');
                        this.totalTaskHours = this.getRelevantData();
                    },
                    error: (error) => {
                        if (error.status === 400) {
                            console.error('Error: ', error);
                        } else {
                            console.error('Something went wrong! ', error);
                        }
                    },
                });
            },
            error: (error: any) => {
                if (error.status === 400) {
                    console.error('API response: ', error);
                } else {
                    console.error('Error: ', error);
                }
            },
        });
    }

    getRelevantData(): number {
        this.totalTaskHours = 0;
        this.totalTaskCount = 0;
        this.dataByDate = [];
        this.userTasks.forEach((task) => {
            if (task.dateTime.toString().split('T')[0] == this.selectedDate) {
                this.totalTaskHours += task.hours;
                this.totalTaskCount++;
                this.apiCalls.getTaskActivities(task.id).subscribe({
                    next: (response) => {
                        response.forEach((activity: Activity) => {
                            const matchingTasks = this.userTasks.find(
                                (task) => task.id === activity.taskId
                            );
                            if (matchingTasks) {
                                const data = {
                                    activity,
                                    matchingTasks,
                                };
                                this.dataByDate.push(data);
                            }
                        });
                    },
                });
            }
        });
        return this.totalTaskHours;
    }

    getLoggedUser(): User {
        const loggedUser = sessionStorage.getItem('LoggedUser');
        return JSON.parse(loggedUser!);
    }

    onPlusTask() {
        this.router.navigate(['/taskfields']);
        this.apiCalls.dataToEdit = null;
        this.apiCalls.setEditMode(false);
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
