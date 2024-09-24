import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
    onLogin(loginForm: NgForm) {
        console.log(loginForm);
        if (
            loginForm.controls['email'].touched &&
            loginForm.controls['email'].invalid
        ) {
            console.log("Email is invalid but was touched");
        }
    }
}
