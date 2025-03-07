import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CardModule } from 'primeng/card';
import { MeterGroup } from 'primeng/metergroup';
import { DividerModule } from 'primeng/divider';
import { ApiService } from '../api.service';
import { TaskStats } from '../interfaces/taskStats';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule, NgForm } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { User } from '../interfaces/user';
import { MessageService } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import { Client } from '../interfaces/client';
import { Project } from '../interfaces/project';

@Component({
    standalone: true,
    selector: 'app-admin-dash',
    imports: [
        CommonModule,
        HeaderComponent,
        CardModule,
        MeterGroup,
        Dialog,
        Toast, AccordionModule,
        FormsModule,
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

    constructor(private messageService: MessageService) {
        this.apiCalls.getUserTaskStats().subscribe((taskStats) => {
            this.userTaskStats = taskStats;
            this.addValues();
        });
        console.log(this.userTaskStats);

        this.apiCalls.getAllClients().subscribe((clients) => {
            this.clientData = clients;
            this.apiCalls.getProjectsByClientId(this.clientData[0].id).subscribe((projects) =>{
                this.projectsByClient = projects;
            });
        });

    }

    getProjectDataByClientId(clientId: string) {
        console.log(clientId);
        this.apiCalls.getProjectsByClientId(clientId).subscribe((projects) =>{
            this.projectsByClient = projects;
        });
        // throw new Error('Method not implemented.');
    }

    showCreateUserDialog() {
        this.showCreateUser = true;
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
                    `The new account is now ready to be used`
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
                    `500... The server is experiencing an existential crisis`
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
            life: 2000,
        });
    }
}
