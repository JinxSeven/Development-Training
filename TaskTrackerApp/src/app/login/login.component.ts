import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {
    apiCalls = inject(ApiService);
    constructor(private router: Router) {}

    onLogin(loginForm: NgForm) {
        const username = loginForm.controls['usrname'].value;
        const password = loginForm.controls['pass'].value;
        this.apiCalls.LoggingUser(username, password).subscribe({
            next: (response: any) => {
                if (response) {
                    alert('Login successful!');
                    this.apiCalls.setAuthenticated(true);
                    sessionStorage.setItem('LoggedUser', JSON.stringify(response));
                    this.router.navigate(['/tasktracker']);
                }
            },
            error: (error: HttpErrorResponse) => {
                if (error.status === 400) {
                    alert('Invalid username or password: ' + error.error);
                } else if (error.status === 500) {
                    alert('Internal server error: ' + error.error);
                } else {
                    alert('Unexpected error occurred.');
                }
            },
        });
    }
}
