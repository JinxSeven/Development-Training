import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { UserDash } from '../interfaces/user-dash';


@Component({
    selector: 'app-new-user',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './new-user.component.html',
    styleUrl: './new-user.component.css',
})
export class NewUserComponent {
    errorText: string = "‎";

    constructor(private userService: UserService) {}

    onRegister(regForm: NgForm) {
        const userData = this.userService.getUserLoginData();
        for (const user of userData) {
            if (user.email == regForm.controls['email'].value) {
                this.errorText = "Email already in use!";
                return;
            }
        }
        const newUser: User = {
            username: regForm.controls['username'].value,
            email: regForm.controls['email'].value,
            password: regForm.controls['password'].value
        };

        const userDashData = this.userService.getUserDashData();
        const newUserDashData: UserDash = {
            email: newUser.email,
            income: 0,
            expense: 0,
            transactions: [],
            goals: []
        };
        userData.push(newUser);
        this.userService.setUserLoginData(userData);
        userDashData.push(newUserDashData);
        this.userService.setUserDashData(userDashData);
        regForm.reset();
    }
}
