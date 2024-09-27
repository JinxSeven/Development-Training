import { inject, Injectable } from '@angular/core';
import { UserDash } from '../interfaces/user-dash';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    userDashData!: UserDash[];
    loggedIndx!: number;
    userService = inject(UserService);
    loggedUserDashData!: UserDash;

    constructor() {
        this.userDashData = this.userService.getUserDashData();
        this.loggedIndx = this.userService.getLoggedIndx();
        this.loggedUserDashData = this.userDashData[this.loggedIndx];
    }

    openNewTransactPopup(overlay: HTMLDivElement, newTransactPopup: HTMLDivElement) {
        overlay.style.display = "block";
        newTransactPopup.style.display = "block";
    }
}
