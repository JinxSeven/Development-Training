import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CardModule } from 'primeng/card';
import { MeterGroup } from 'primeng/metergroup';
import { DividerModule } from 'primeng/divider';
import { ApiService } from '../api.service';
import { TaskStats } from '../interfaces/taskStats';

@Component({
    standalone: true,
    selector: 'app-admin-dash',
    imports: [CommonModule, HeaderComponent, CardModule, MeterGroup, DividerModule],
    templateUrl: './admin-dash.component.html',
    styleUrl: './admin-dash.component.css',
})
export class AdminDashComponent {
    apiCalls = inject(ApiService);
    userTaskStats: TaskStats[] = [];

    constructor() {
        this.apiCalls.getUserTaskStats().subscribe((taskStats) => {
            this.userTaskStats = taskStats;
            this.addValues();
        });
    }

    addValues() {
        this.userTaskStats.forEach((stat) => {
            stat.username = stat.username
                .split('.')
                .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                .join(' ');
            stat.value = stat.value || []; // Ensure it's initialized
            stat.value.push(
                { label: 'New', color: '#0d6efd', value: stat.newPercentage },
                { label: 'Active', color: '#ffc107', value: stat.activePercentage },
                { label: 'Complete', color: '#198754', value: stat.completePercentage }
            );
        });

        console.log(this.userTaskStats);
    }
}
