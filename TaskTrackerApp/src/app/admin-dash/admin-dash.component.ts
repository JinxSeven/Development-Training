import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardModule } from 'primeng/card';
import { MeterGroup } from 'primeng/metergroup';
import { DividerModule } from 'primeng/divider';
import { ApiService } from '../api.service';
import { TaskStats } from '../interfaces/taskStats';
import { Dialog } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { User } from '../interfaces/user';
import { MessageService } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import { Client } from '../interfaces/client';
import { Project } from '../interfaces/project';
import { Question } from '../interfaces/question';
import { Option } from '../interfaces/option';

@Component({
    standalone: true,
    selector: 'app-admin-dash',
    imports: [
        CommonModule,
        HeaderComponent,
        CardModule,
        MeterGroup,
        Dialog, StepperModule,
        Toast, AccordionModule,
        FormsModule, ReactiveFormsModule,
        DividerModule,
        ButtonModule,
    ],
    templateUrl: './admin-dash.component.html',
    styleUrl: './admin-dash.component.css',
    providers: [MessageService],
})
export class AdminDashComponent {
    apiCalls = inject(ApiService);
    userTaskStats: TaskStats[] = [];

    clientData: Client[] = [];
    projectsByClient: Project[] = [];

    showCreateUser = false;
    showCreateCompliance = false;

    optionCount = [1, 2];
    question: string = '';
    options: string[] = ['', ''];
    correctOptionIndx: number | null = null;

    questions: Question[] = [];

    selectedPresentation: File | null = null;

    complianceForm = new FormGroup({
        complianceTitle: new FormControl(''),
        complianceDesc: new FormControl(''),
        compliancePercent: new FormControl(100)
    });

    constructor(private messageService: MessageService) {
        this.apiCalls.getUserTaskStats().subscribe((taskStats) => {
            this.userTaskStats = taskStats;
            this.addValues();
        });

        this.apiCalls.getAllClients().subscribe((clients) => {
            this.clientData = clients;
            this.apiCalls.getProjectsByClientId(this.clientData[0].id).subscribe((projects) =>{
                this.projectsByClient = projects;
            });
        });
    }

    onFileChange(event: any) {
        const file = event.target.files[0]; // Get the selected file

        if (file) {
            // List of allowed file types (MIME types for .ppt and .pptx)
            const allowedTypes = ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];

            // Check if the selected file type is allowed
            if (!allowedTypes.includes(file.type)) {
                this.showToast(
                    `error`,
                    `Nope!`,
                    `Please choose a .ppt or .pptx file to continue.`
                );
                event.target.value = ''; // Reset the input field to allow another selection
                this.selectedPresentation = null;
                return; // Reject the file
            }

            // If file is valid, you can process it here
            this.selectedPresentation = file;
            // console.log('File selected:', this.selectedPresentation);
        }
    }

    addOption(count: number) {
        this.optionCount.push(count);
        this.options.push('');
    }

    removeOption() {
        this.optionCount.pop();
        this.options.pop();
    }

    setCorrectOption(index: number) {
        this.correctOptionIndx = index;
    }

    addQuestion() {
        if (this.question.trim() === '') {
            this.showToast(
                `warn`,
                `Hold On!`,
                `Your input is required: Please add a question.`
            );
            return;
        }

        if (this.options.some(option => option.trim() === '')) {
            this.showToast(
                `warn`,
                `Hold On!`,
                `Your input is required: Please add options.`
            );
            return;
        }

        if (this.correctOptionIndx === null) {
            this.showToast(
                `warn`,
                `Hold On!`,
                `The correct option is required to proceed.`
            );
            return;
        }

        const options: Option[] = [];

        for (let index = 0; index < this.options.length; index++) {
            options.push({
                option: this.options[index],
                isCorrect: this.correctOptionIndx === index ? true : false
            });
        }

        const question: Question = {
            question: this.question,
            options: options
        }

        this.questions.push(question);
        // const formValues = this.complianceForm.value;
    }

    saveCompliance() {
        if (this.questions.length === 0) {
            this.showToast(
                `warn`,
                `Hold On!`,
                `Requires a minimum of 1 question to proceed.`
            );
        }
    }

    getProjectDataByClientId(clientId: string) {
        this.apiCalls.getProjectsByClientId(clientId).subscribe((projects) =>{
            this.projectsByClient = projects;
        });
        // throw new Error('Method not implemented.');
        // console.log(this.projectsByClient);
    }

    showCreateUserDialog() {
        this.showCreateUser = true;
    }

    showCreateComplianceDialog() {
        this.showCreateCompliance = true;
    }

    addValues() {
        this.userTaskStats.forEach((stat) => {
            stat.username = stat.username
                .split('.')
                .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                .join(' ');
            stat.value = stat.value || []; // Ensure it's initialized
            stat.value.push(
                {
                    label: 'New',
                    color: '#0d6efd',
                    value: stat.newPercentage + 0.05,
                },
                {
                    label: 'Complete',
                    color: '#198754',
                    value: stat.completePercentage + 0.05,
                },
                {
                    label: 'Active',
                    color: '#ffc107',
                    value: stat.activePercentage + 0.05,
                }
            );
        });
    }

    onRegister(registerForm: NgForm) {
        const isUser =
            registerForm.controls['accrole'].value === 'user' ? true : false;
        const postData: User = {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            username: registerForm.controls['usrname'].value,
            email: registerForm.controls['email'].value,
            password: registerForm.controls['pass'].value,
            isAdmin: !isUser,
        };
        console.log(postData);
        this.apiCalls.addNewUser(postData).subscribe({
            next: (response) => {
                console.log('POST request successful', response);
                this.showToast(
                    `success`,
                    `Welcome Aboard!`,
                    `The new account is now ready to be used.`
                );
                this.apiCalls.getUserTaskStats().subscribe((taskStats) => {
                    this.userTaskStats = taskStats;
                    this.addValues();
                });
            },
            error: (error) => {
                if (
                    error.status === 400 &&
                    error.error.message.includes('UNIQUE constraint')
                ) {
                    console.error('Error: ', error);
                } else {
                    console.error('Error in POST request', error);
                }
                this.showToast(
                    `error`,
                    `Oops!`,
                    `500... The server is experiencing an existential crisis.`
                );
            },
        });

        this.showCreateUser = false;
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
