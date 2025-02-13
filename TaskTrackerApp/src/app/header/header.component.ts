import { Component, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';

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
    router = inject(Router);
    apiServe = inject(ApiService);
    logout() {
        this.router.navigate(['/login']);
        this.apiServe.setAuthenticated(false);
    }
    loggerUser!: User;

    constructor() {
        this.loggerUser = this.getLoggedUserId()
    }

    getLoggedUserId(): User {
        const loggedUser = sessionStorage.getItem("LoggedUser");
        return JSON.parse(loggedUser!);
    }
}
