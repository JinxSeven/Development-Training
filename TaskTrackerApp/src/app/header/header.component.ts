import { Component } from '@angular/core';
import { User } from '../interfaces/user';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        RouterModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    loggerUser!: User;

    constructor() {
        this.loggerUser = this.getLoggedUserId()
    }

    getLoggedUserId(): User {
        const loggedUser = sessionStorage.getItem("LoggedUser");
        return JSON.parse(loggedUser!);
    }
}
