import { Component, inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { User } from '../interfaces/user';
import { Task } from '../interfaces/task';
import { ApiService } from '../api.service';
import { Activity } from '../interfaces/activity';
import { HeaderComponent } from '../header/header.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-task-fields',
    imports: [
        FormsModule,
        HeaderComponent,
        ReactiveFormsModule,
        ToastModule,
        ButtonModule,
        Toast, TabsModule,
        CommonModule
    ],
    providers: [MessageService],
    templateUrl: './task-fields.component.html',
    styleUrl: './task-fields.component.css',
})
export class TaskFieldsComponent implements OnInit {
    apiCalls = inject(ApiService);


    loggedUser?: User;
    toDate: string;
    enableNextTask: boolean = false;
    latestTaskId: string | null = null;
    editData?: Task;
    editMode$: Observable<boolean> = this.apiCalls.editMode$;

    taskForm!: FormGroup;
    actForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService
    ) {
        this.loggedUser = this.getLoggedUser();
        this.toDate = new Date().toISOString().split('T')[0];
        // this.editMode$ = ;
    }

    async ngOnInit(): Promise<void> {
        await this.editMode$.subscribe((next) => {
            if (next) {
                this.editData = this.apiCalls.dataToEdit!;

                this.taskForm = this.fb.group({
                    clientName: [this.editData.clientName, Validators.required],
                    projectName: [this.editData.projectName, Validators.required],
                    taskTitle: [this.editData.taskTitle, Validators.required],
                    taskETA: [
                        this.editData.hours,
                        [Validators.required, Validators.min(0.1), Validators.max(24)],
                    ],
                    taskDate: [this.editData.dateTime.toString().split('T')[0], Validators.required],
                    assignedTo: [this.editData.assignedTo, Validators.required],
                    assignedBy: [this.editData.assignedBy, Validators.required],
                    taskState: [this.editData.taskState, Validators.required],
                    taskPriority: [this.editData.priority, Validators.required],
                    description: [this.editData.description, Validators.required],
                });

                this.actForm = this.fb.group({
                    actTitle: ['', Validators.required],
                    actDescription: ['', Validators.required],
                    actHours: [
                        null,
                        [Validators.required, Validators.min(0.1), Validators.max(2)],
                    ],
                });
            } else {
                this.taskForm = this.fb.group({
                    clientName: ['', Validators.required],
                    projectName: ['', Validators.required],
                    taskTitle: ['', Validators.required],
                    taskETA: [
                        null,
                        [Validators.required, Validators.min(0.1), Validators.max(24)],
                    ],
                    taskDate: [this.toDate.substring(0, 10), Validators.required],
                    assignedTo: [this.loggedUser!.username, Validators.required],
                    assignedBy: ['', Validators.required],
                    taskState: ['', Validators.required],
                    taskPriority: ['', Validators.required],
                    description: ['', Validators.required],
                });

                this.actForm = this.fb.group({
                    actTitle: ['', Validators.required],
                    actDescription: ['', Validators.required],
                    actHours: [
                        null,
                        [Validators.required, Validators.min(0.1), Validators.max(2)],
                    ],
                });
            }
        });
    }

    getLoggedUser(): User {
        const loggedUser = sessionStorage.getItem('LoggedUser');
        return JSON.parse(loggedUser!);
    }

    onSaveTask() {
        if (!this.taskForm.valid) return;
        const postData: Task = {
            id: this.loggedUser!.id!,
            userId: this.loggedUser!.id!,
            clientName: this.taskForm.controls['clientName'].value,
            projectName: this.taskForm.controls['projectName'].value,
            taskTitle: this.taskForm.controls['taskTitle'].value,
            hours: this.taskForm.controls['taskETA'].value,
            dateTime: this.taskForm.controls['taskDate'].value,
            assignedTo: this.taskForm.controls['assignedTo'].value,
            assignedBy: this.taskForm.controls['assignedBy'].value,
            taskState: this.taskForm.controls['taskState'].value,
            priority: this.taskForm.controls['taskPriority'].value,
            description: this.taskForm.controls['description'].value,
        };
        console.log(postData);
        this.apiCalls.addNewTask(postData).subscribe({
            next: (response: any) => {
                this.latestTaskId = response;
                this.enableNextTask = !this.enableNextTask;
                // console.log("Task added!", this.latestTaskId);
                this.showToast(
                    'success',
                    'Task Created!',
                    'Another masterpiece added to your task list!'
                );
            },
            error: (error) => {
                if (error.status === 400) {
                    console.error('Error: ', error);
                } else {
                    console.error('POST request failed', error);
                }
                this.showToast(
                    'error',
                    'Oops!',
                    'The server is taking a coffee break. Try again in a bit!'
                );
            },
        });
    }

    // onEditMode(editMode: boolean) {
    //     if (editMode) {
    //         this.editModeFieldsData = this.apiCalls.dataToEdit;
    //     }
    // }

    onUpdateTask() {
        const postData: Task = {
            id: this.editData!.id,
            userId: this.editData!.userId,
            clientName: this.taskForm.controls['clientName'].value,
            projectName: this.taskForm.controls['projectName'].value,
            taskTitle: this.taskForm.controls['taskTitle'].value,
            hours: this.taskForm.controls['taskETA'].value,
            dateTime: this.taskForm.controls['taskDate'].value,
            assignedTo: this.taskForm.controls['assignedTo'].value,
            assignedBy: this.taskForm.controls['assignedBy'].value,
            taskState: this.taskForm.controls['taskState'].value,
            priority: this.taskForm.controls['taskPriority'].value,
            description: this.taskForm.controls['description'].value,
        };
        console.log(postData);
        this.apiCalls.updateTask(postData).subscribe({
            next: (response) => {
                console.log('Task updated', response);
            },
            error: (error) => {
                if (error.status === 400) {
                    console.error('PUT request failed', error);
                } else {
                    console.error('Error: ', error);
                }
            },
        });
    }

    onNextTask() {
        this.enableNextTask = !this.enableNextTask;
        this.latestTaskId = null;
        this.onTaskFormReset();
    }

    onSaveActivity() {
        if (!this.latestTaskId) {
            this.showToast(`warn`, `Uh-oh!`, `No task to link activity with!`);
            return;
        }
        const postData: Activity = {
            id: this.latestTaskId!,
            taskId: this.latestTaskId!,
            activityTitle: this.actForm.controls['actTitle'].value,
            description: this.actForm.controls['actDescription'].value,
            hours: this.actForm.controls['actHours'].value,
        };
        this.apiCalls.addNewActivity(postData).subscribe({
            next: (response) => {
                // console.log('Activity added!', response);
                this.showToast(
                    `success`,
                    `Activity Added!`,
                    `Your task journey just got brighter!`
                );
            },
            error: (error) => {
                if (error.status === 400) {
                    console.error('Error: ', error);
                } else {
                    console.error('POST request failed', error);
                }
                this.showToast(
                    'error',
                    'Oops!',
                    'The server is taking a coffee break. Try again in a bit!'
                );
            },
        });
        this.onActFormReset();
    }

    onTaskFormReset() {
        console.log(`runs`);
        this.taskForm.reset({
            taskDate: this.toDate.substring(0, 10),
            assignedTo: this.loggedUser!.username,
        });
    }

    onActFormReset() {
        this.actForm.reset();
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
