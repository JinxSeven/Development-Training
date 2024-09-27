import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserDash } from '../../../interfaces/user-dash';
import { GoalService } from '../../../services/goal.service';
import { TransactionService } from '../../../services/transaction.service';

@Component({
    selector: 'app-section',
    standalone: true,
    imports: [
        FormsModule
    ],
    templateUrl: './section.component.html',
    styleUrl: './section.component.css',
})
export class SectionComponent {
    errorOut: string = "‎";
    userService = inject(UserService);
    goalService = inject(GoalService);
    userDashData: UserDash[] = this.userService.getUserDashData();
    loggedIndx: number = this.userService.getLoggedIndx();
    loggedUserDashData: UserDash = this.userDashData[this.loggedIndx];
    transactService = inject(TransactionService);

    addNewGoal(
        newGoalForm: NgForm,
        overlay: HTMLDivElement,
        newGoalPopup: HTMLDivElement
    ) {
        this.goalService.addNewGoal(newGoalForm, overlay, newGoalPopup);
    }

    openNewGoalPopup(overlay: HTMLDivElement, newGoalPopup: HTMLDivElement) {
        this.goalService.openNewGoalPopup(overlay, newGoalPopup);
    }

    checkDuplicateGoals(newGoalForm: NgForm): boolean {
        const bool = this.goalService.checkDuplicateGoals(newGoalForm);
        return bool;
    }

    closeNewGoalPopup(
        newGoalForm: NgForm,
        overlay: HTMLDivElement,
        newGoalPopup: HTMLDivElement
    ) {
        this.goalService.closeNewGoalPopup(newGoalForm, overlay, newGoalPopup);
    }

    openNewTransactPopup(overlay: HTMLDivElement, newTransactPopup: HTMLDivElement) {
        this.transactService.openNewTransactPopup(overlay, newTransactPopup);
    }
}
