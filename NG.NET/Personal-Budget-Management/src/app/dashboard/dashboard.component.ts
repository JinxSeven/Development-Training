import { Component, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserDash, UserDetails } from '../interfaces/user-dash';
import { UserService } from '../services/user.service';
import { MainContentComponent } from './main-content/main-content.component';
import { ApicallsService } from '../services/apicalls.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        HeaderComponent,
        MainContentComponent,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
    userService = inject(UserService);
    apiCalls =inject(ApicallsService);
    loggedId: number = this.userService.getLoggedUserId();
    loggedUserDetails: UserDetails = this.userService.getUserDetails();

    constructor() {}

    ngOnInit(): void {}
}
