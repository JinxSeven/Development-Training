import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserDash } from '../interfaces/user-dash';
import { UserService } from '../services/user.service';
import { MainContentComponent } from './main-content/main-content.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        HeaderComponent,
        MainContentComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
    loggedUserDashData!: UserDash[];
    loggedIndx!: number;

    constructor(
        private userService: UserService
    ) {
        this.loggedUserDashData = this.userService.getUserDashData();
        this.loggedIndx = this.userService.getLoggedIndx();
    }

    ngOnInit(): void {

    }
}
