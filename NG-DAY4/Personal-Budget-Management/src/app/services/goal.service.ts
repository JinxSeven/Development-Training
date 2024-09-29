import { inject, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Goal, Transaction, UserDash } from '../interfaces/user-dash';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class GoalService {
    userService = inject(UserService);

    userDashData: UserDash[] = this.userService.getUserDashData();
    loggedIndx: number = this.userService.getLoggedIndx();
    loggedUserDashData: UserDash = this.userDashData[this.loggedIndx];

    updateDashBoardData() {
        this.userDashData = this.userService.getUserDashData();
        this.loggedIndx = this.userService.getLoggedIndx();
        this.loggedUserDashData = this.userDashData[this.loggedIndx];
    }

    openNewGoalPopup(overlay: HTMLDivElement, newGoalPopup: HTMLDivElement) {
        overlay.style.display = "block";
        newGoalPopup.style.display = "block";
    }

    checkDuplicateGoals(newGoalForm: NgForm): boolean {
        for (let goal of this.loggedUserDashData.goals) {
            if (goal.name == newGoalForm.form.get("goalName")?.value) {
                return true;
            }
        }
        return false;
    }

    addNewGoal(
        newGoalForm: NgForm,
        overlay: HTMLDivElement,
        newGoalPopup: HTMLDivElement
    ) {
        this.updateDashBoardData();
        console.log(this.loggedUserDashData.income);
        const newGoal: Goal = {
            name: newGoalForm.form.get("goalName")?.value,
            target: parseInt(newGoalForm.form.get("goalTrgt")?.value),
            contribution: parseInt(newGoalForm.form.get("initFund")?.value)
        }
        if (newGoal.contribution > 0) {
            const date2Day = new Date().toISOString().split('T')[0];
            const newTransaction: Transaction = {
                type: "expense",
                amount: newGoal.contribution,
                date: date2Day,
                category: "savings"
            }
            this.loggedUserDashData.transactions.push(newTransaction);
            if (newTransaction.type === "expense") {
                this.loggedUserDashData.expense += newTransaction.amount;
            }
        }
        this.loggedUserDashData.goals.push(newGoal);
        this.userDashData[this.loggedIndx] = this.loggedUserDashData;
        this.userService.setUserDashData(this.userDashData);
        this.closeNewGoalPopup(newGoalForm, overlay, newGoalPopup);
    }

    closeNewGoalPopup(
        newGoalForm: NgForm,
        overlay: HTMLDivElement,
        newGoalPopup: HTMLDivElement
    ) {
        newGoalForm.reset();
        overlay.style.display = "none";
        newGoalPopup.style.display = "none";
    }
}
