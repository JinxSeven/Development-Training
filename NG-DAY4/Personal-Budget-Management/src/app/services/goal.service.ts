import { inject, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Goal, Transaction, UserDash } from '../interfaces/user-dash';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class GoalService {
    goalUpdate: boolean = false;

    userDashData!: UserDash[];
    loggedIndx!: number;
    userService = inject(UserService);
    loggedUserDashData!: UserDash;

    constructor() {
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
        const newGoal: Goal = {
            name: newGoalForm.form.get("goalName")?.value,
            target: newGoalForm.form.get("goalTrgt")?.value,
            contribution: newGoalForm.form.get("initFund")?.value
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
        }
        this.loggedUserDashData.goals.push(newGoal);
        this.userDashData[this.loggedIndx] = this.loggedUserDashData;
        this.userService.setUserDashData(this.userDashData);
        this.closeNewGoalPopup(newGoalForm, overlay, newGoalPopup);
        this.goalUpdate = !this.goalUpdate;
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
