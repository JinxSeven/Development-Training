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
    userService = inject(UserService);
    goalService = inject(GoalService);
    transactService = inject(TransactionService);
    // selector: string = "expense";

    userDashData: UserDash[] = this.userService.getUserDashData();
    loggedIndx: number = this.userService.getLoggedIndx();
    loggedUserDashData: UserDash = this.userDashData[this.loggedIndx];

    errorOut: string = "‎";
    arrOfOptions: string[] = this.transactService.returnAptCategories("expense");

    updateDashBoardData() {
        this.userDashData = this.userService.getUserDashData();
        this.loggedIndx = this.userService.getLoggedIndx();
        this.loggedUserDashData = this.userDashData[this.loggedIndx];
    }

    ngDoCheck() {
        this.updateDashBoardData();
    }

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

    loadAptCategories(newTransactForm: NgForm) {
        if (newTransactForm.form.get('transactTypeSel')?.value == "income") {
            this.arrOfOptions = this.transactService.returnAptCategories("income");
            console.log("income");
        } else {
            this.arrOfOptions = this.transactService.returnAptCategories("expense");
            console.log(this.arrOfOptions);
        }
    }

    addNewTransaction(
        newTransactForm: NgForm,
        overlay: HTMLDivElement,
        newTransactPopup: HTMLDivElement
    ) {
        console.log("newTransactAdded");
        this.transactService.addNewTransaction(newTransactForm, overlay, newTransactPopup);
    }

    closeTransactGoalPopup(
        newTransactForm: NgForm,
        overlay: HTMLDivElement,
        newTransactPopup: HTMLDivElement
    ) {
        this.transactService.closeTransactGoalPopup(newTransactForm, overlay, newTransactPopup);
    }
}
