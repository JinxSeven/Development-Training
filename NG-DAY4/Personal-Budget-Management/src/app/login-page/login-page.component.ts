import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
    errorText: string = "‎";

    constructor (
        private userService: UserService,
        private route: Router
    ) {}

    onLogin(loginForm: NgForm) {
        const auth = this.userService.authenticateUserCreds(
            loginForm.controls["email"].value,
            loginForm.controls["password"].value
        )
        if (auth == -1) {
            this.errorText = "Account not found!, Redirecting...";
            setTimeout(() => {
                this.route.navigate(["/register"]);
            }, 2500);
        } else if (auth == -2) {
            this.errorText = "Invalid email or password!";
        } else {
            this.userService.setLoggedIndx(auth.toString());
            alert("Login successful!");
        }
    }
}
