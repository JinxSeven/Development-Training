import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        RegisterComponent,
        LoginComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'Task Tracker Application';
}
