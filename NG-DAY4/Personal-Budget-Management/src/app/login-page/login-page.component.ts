import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
    errorText: string = "‎";

    constructor (private userService: UserService) {}

    onLogin(loginForm: NgForm) {
        const auth = this.userService.authenticateUserCreds(
            loginForm.controls["email"].value,
            loginForm.controls["password"].value
        )
        if (auth == 1) {
            this.errorText = "Invalid email or password!";
        } else if (auth == 0) {
            alert("Login successfull!");
        } else {
            this.errorText = "Email not found!";
        }
    }
}
