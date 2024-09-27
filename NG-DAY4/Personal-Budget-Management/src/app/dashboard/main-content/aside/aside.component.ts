import { Component, inject } from '@angular/core';
import { UserDash } from '../../../interfaces/user-dash';
import { GoalService } from '../../../services/goal.service';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-aside',
    standalone: true,
    imports: [],
    templateUrl: './aside.component.html',
    styleUrl: './aside.component.css',
})
export class AsideComponent {
    userService = inject(UserService);
    goalService = inject(GoalService);
    userDashData: UserDash[] = this.userService.getUserDashData();
    loggedIndx: number = this.userService.getLoggedIndx();
    loggedUserDashData: UserDash = this.userDashData[this.loggedIndx];

    updateDashBoardData() {
        this.userDashData = this.userService.getUserDashData();
        this.loggedIndx = this.userService.getLoggedIndx();
        this.loggedUserDashData = this.userDashData[this.loggedIndx];
    }

    ngDoCheck() {
        if (this.goalService.goalUpdate) {
            this.updateDashBoardData();
            this.goalService.goalUpdate = false;
        }
    }
}
