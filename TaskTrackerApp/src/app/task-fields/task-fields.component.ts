import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../interfaces/user';
import { Task } from '../interfaces/task';
import { ApiService } from '../api.service';
import { Activity } from '../interfaces/activity';
import { HeaderComponent } from "../header/header.component";
import {MatTabsModule} from '@angular/material/tabs';

@Component({
    selector: 'app-task-fields',
    standalone: true,
    imports: [
    FormsModule,
    HeaderComponent,
    MatTabsModule
    ],
    templateUrl: './task-fields.component.html',
    styleUrl: './task-fields.component.css',
})
export class TaskFieldsComponent {
    loggedUser?: User;
    toDate: string;
    enableNextTask: boolean = false;
    latestTaskId: number | null = null;
    editModeFieldsData?: any;
    editMode!: boolean;

    apiCalls = inject(ApiService);

    constructor() {
        this.loggedUser = this.getLoggedUserId();
        const todayDate = new Date();
        this.toDate = todayDate.toISOString().split('T')[0];
        this.editMode = this.apiCalls.editMode;
        this.onEditMode(this.editMode);
    }

    getLoggedUserId(): User {
        const loggedUser = sessionStorage.getItem("LoggedUser");
        return JSON.parse(loggedUser!);
    }

    onSaveTask(taskForm: NgForm) {
        const postData: Task = {
            id: 0,
            userId: this.loggedUser?.id!,
            clientName: taskForm.controls["select1"].value,
            projectName: taskForm.controls["select2"].value,
            taskTitle: taskForm.controls["textInput1"].value,
            hours: taskForm.controls["textInput2"].value,
            dateTime: taskForm.controls["dateInput"].value,
            assignedTo: taskForm.controls["textInput3"].value,
            assignedBy: taskForm.controls["textInput4"].value,
            supportType: taskForm.controls["select3"].value,
            priority: taskForm.controls["select4"].value,
            description: taskForm.controls["description"].value
        }
        this.apiCalls.addNewTask(postData).subscribe({
            next: (response: any) => {
                this.latestTaskId = response;
                this.enableNextTask = !this.enableNextTask;
                console.log("Task added!")
            },
            error: error => {
                if (error.status === 400) {
                    console.error('Error: ', error);
                } else {
                    console.error('POST request failed', error);
                }
            }
        });
    }

    onEditMode(editMode: boolean) {
        if (editMode) {
            this.editModeFieldsData = this.apiCalls.dataToEdit;
        }
    }

    onUpdateTask(taskForm: NgForm) {
        const postData: Task = {
            id: this.editModeFieldsData.matchedTask.id,
            userId: this.loggedUser?.id!,
            clientName: taskForm.controls["select1"].value,
            projectName: taskForm.controls["select2"].value,
            taskTitle: taskForm.controls["textInput1"].value,
            hours: taskForm.controls["textInput2"].value,
            dateTime: taskForm.controls["dateInput"].value,
            assignedTo: taskForm.controls["textInput3"].value,
            assignedBy: taskForm.controls["textInput4"].value,
            supportType: taskForm.controls["select3"].value,
            priority: taskForm.controls["select4"].value,
            description: taskForm.controls["description"].value
        }
        console.log(postData);
        this.apiCalls.updateTask(postData).subscribe({
            next: response => {
                console.log("Task updated", response);
            }, error: error => {
                if (error.status === 400) {
                    console.error("PUT failed", error);
                } else {
                    console.error("Error: ", error);
                }
            }
        })
    }

    onNextTask(taskForm: NgForm) {
        this.enableNextTask = !this.enableNextTask;
        this.latestTaskId = null;
        taskForm.reset();
    }

    onSaveActivity(activityForm: NgForm) {
        if (!this.latestTaskId) {
            alert("No task to link activity with!");
            return;
        }
        const postData: Activity = {
            id: 0,
            taskId: this.latestTaskId!,
            activityTitle: activityForm.controls['actInput1'].value,
            description: activityForm.controls['activityDesc'].value,
            hours: activityForm.controls['actInput2'].value
        }
        this.apiCalls.addNewActivity(postData).subscribe({
            next: response => {
                console.log("Activity added!", response)
            },
            error: error => {
                if (error.status === 400) {
                    console.error("Error: ", error)
                } else {
                    console.error("POST request failed", error)
                }
            }
        });
        this.onReset(activityForm);
    }

    onReset(ngForm: NgForm) { ngForm.reset(); }
}
