import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
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
        MatTabsModule,
        ReactiveFormsModule
    ],
    templateUrl: './task-fields.component.html',
    styleUrl: './task-fields.component.css',
})
export class TaskFieldsComponent implements OnInit {
    loggedUser?: User;
    toDate: string;
    enableNextTask: boolean = false;
    latestTaskId: string | null = null;
    editModeFieldsData?: any;
    editMode: boolean = false;

    apiCalls = inject(ApiService);

    taskForm!: FormGroup;

    constructor(private fb: FormBuilder) {
        this.loggedUser = this.getLoggedUserId();
        this.toDate = new Date().toISOString().split('T')[0];
        this.editMode = this.apiCalls.editMode;
        this.onEditMode(this.editMode);
    }

    ngOnInit(): void {
        this.taskForm = this.fb.group({
            clientName: ['', Validators.required],
            projectName: ['', Validators.required],
            taskTitle: ['', Validators.required],
            taskETA: [null, [Validators.required, Validators.min(0.1), Validators.max(24)]],
            taskDate: [this.toDate.substring(0, 10), Validators.required],
            assignedTo: [this.loggedUser!.username, Validators.required],
            assignedBy: ['', Validators.required],
            taskState: ['', Validators.required],
            taskPriority: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    getLoggedUserId(): User {
        const loggedUser = sessionStorage.getItem("LoggedUser");
        return JSON.parse(loggedUser!);
    }

    onSaveTask() {
        if (this.taskForm.valid) return;
        const postData: Task = {
            id: '',
            userId: this.loggedUser!.id!,
            clientName: this.taskForm.controls["clientName"].value,
            projectName: this.taskForm.controls["projectName"].value,
            taskTitle: this.taskForm.controls["taskTitle"].value,
            hours: this.taskForm.controls["taskETA"].value,
            dateTime: this.taskForm.controls["taskDate"].value,
            assignedTo: this.taskForm.controls["assignedTo"].value,
            assignedBy: this.taskForm.controls["assignedBy"].value,
            taskState: this.taskForm.controls["taskState"].value,
            priority: this.taskForm.controls["taskPriority"].value,
            description: this.taskForm.controls["description"].value
        }
        console.log(postData);
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
            taskState: taskForm.controls["select3"].value,
            priority: taskForm.controls["select4"].value,
            description: taskForm.controls["description"].value
        }
        console.log(postData);
        this.apiCalls.updateTask(postData).subscribe({
            next: response => {
                console.log("Task updated", response);
            }, error: error => {
                if (error.status === 400) {
                    console.error("PUT request failed", error);
                } else {
                    console.error("Error: ", error);
                }
            }
        })
    }

    onNextTask() {
        this.enableNextTask = !this.enableNextTask;
        this.latestTaskId = null;
    }

    onSaveActivity(activityForm: NgForm) {
        if (!this.latestTaskId) {
            alert("No task to link activity with!");
            return;
        }
        const postData: Activity = {
            id: '',
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
