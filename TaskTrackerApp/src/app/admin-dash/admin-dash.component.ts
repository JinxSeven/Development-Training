import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CardModule } from 'primeng/card';
import { MeterGroup } from 'primeng/metergroup';

@Component({
    standalone: true,
    selector: 'app-admin-dash',
    imports: [CommonModule, HeaderComponent, CardModule, MeterGroup],
    templateUrl: './admin-dash.component.html',
    styleUrl: './admin-dash.component.css',
})
export class AdminDashComponent {
    value = [
        { label: 'New', color: '#60a5fa', value: 45 },
        { label: 'Active', color: '#fbbf24', value: 35 },
        { label: 'Complete', color: '#34d399', value: 20 },
    ];
}
