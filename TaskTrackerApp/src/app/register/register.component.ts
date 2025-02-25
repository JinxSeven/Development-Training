import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { User } from '../interfaces/user';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-register',
    imports: [FormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    apiCalls = inject(ApiService);

    onRegister(registerForm: NgForm) {
        console.log(registerForm);
        const postData: User = {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            username: registerForm.controls['usrname'].value,
            email: registerForm.controls['email'].value,
            password: registerForm.controls['pass'].value,
        };
        console.log(postData);
        this.apiCalls.addNewUser(postData).subscribe({
            next: response => {
                console.log('POST request successful', response);
            },
            error: error => {
                if (error.status === 400 && error.error.message.includes('UNIQUE constraint')) {
                    console.error('Error: ', error);
                } else {
                    console.error('Error in POST request', error);
                }
            }
        });
    }
}
