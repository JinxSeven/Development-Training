import { Component, inject } from '@angular/core';
import { UserDash } from '../../../interfaces/user-dash';
import { GoalService } from '../../../services/goal.service';
import { UserService } from '../../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-aside',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './aside.component.html',
    styleUrl: './aside.component.css',
})
export class AsideComponent {
    errorOut: string = "‎";

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
        this.updateDashBoardData();
    }

    editPopupGoalIndx!: number;
    editPopupGoalName!: string;
    editPopupGoalTrgt!: number;
    editPopupGoalFund!: number;
    editPopupGoalBlnc!: number;

    openEditGoal(
        indx: number,
        overlay: HTMLDivElement,
        editGoalPopup: HTMLDivElement
    ) {
        const goalToFund = this.loggedUserDashData.goals[indx];
        this.editPopupGoalIndx = indx;
        this.editPopupGoalName = goalToFund.name;
        this.editPopupGoalTrgt = goalToFund.target;
        if (!goalToFund.contribution) this.editPopupGoalFund = 0;
        else this.editPopupGoalFund = goalToFund.contribution;
        this.editPopupGoalBlnc = this.editPopupGoalTrgt - this.editPopupGoalFund;
        this.goalService.openGoalPopup(overlay, editGoalPopup);
    }

    updateGoal(
        editGoalForm: NgForm,
        overlay: HTMLDivElement,
        editGoalPopup: HTMLDivElement
    ) {
        this.goalService.updateGoal(editGoalForm, overlay, editGoalPopup, this.editPopupGoalIndx);
    }

    closeGoalPopup(
        goalForm: NgForm,
        overlay: HTMLDivElement,
        goalPopup: HTMLDivElement
    ) {
        this.goalService.closeGoalPopup(goalForm, overlay, goalPopup);
    }
}
