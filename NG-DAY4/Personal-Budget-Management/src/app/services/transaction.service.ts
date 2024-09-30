import { inject, Injectable } from '@angular/core';
import { Transaction, UserDash } from '../interfaces/user-dash';
import { UserService } from './user.service';
import { NgForm } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    addedNewTransact: boolean = false;

    userService = inject(UserService);

    userDashData: UserDash[] = this.userService.getUserDashData();
    loggedIndx: number = this.userService.getLoggedIndx();
    loggedUserDashData: UserDash = this.userDashData[this.loggedIndx];


    updateDashBoardData() {
        this.userDashData = this.userService.getUserDashData();
        this.loggedIndx = this.userService.getLoggedIndx();
        this.loggedUserDashData = this.userDashData[this.loggedIndx];
    }

    openNewTransactPopup(overlay: HTMLDivElement, newTransactPopup: HTMLDivElement) {
        overlay.style.display = "block";
        newTransactPopup.style.display = "block";
    }

    returnAptCategories(type: string): string[] {
        const expense: string[] = [
            "Entertainment",
            "Health",
            "Shopping",
            "Travel",
            "Education",
            "Other"
        ];
        const income :string[] = [
            "Salary",
            "Bonus",
            "Share",
            "Freelance",
            "Returns",
            "Other"
        ];
        if (type === "expense") return expense;
        else return income;
    }

    closeTransactGoalPopup(
        newTransactForm: NgForm,
        overlay: HTMLDivElement,
        newTransactPopup: HTMLDivElement
    ) {
        newTransactForm.reset();
        overlay.style.display = "none";
        newTransactPopup.style.display = "none";
    }

    addNewTransaction(
        newTransactForm: NgForm,
        overlay: HTMLDivElement,
        newTransactPopup: HTMLDivElement
    ) {
        this.updateDashBoardData();
        const newTransaction: Transaction = {
            type: newTransactForm.form.get('transactTypeSel')?.value,
            amount: parseInt(newTransactForm.form.get('transactAmt')?.value),
            category: newTransactForm.form.get('transactCateg')?.value,
            date: newTransactForm.form.get('transactDate')?.value
        };
        this.loggedUserDashData.transactions.push(newTransaction);
        if (newTransaction.type === "expense") {
            this.loggedUserDashData.expense += newTransaction.amount;
        } else {
            this.loggedUserDashData.income += newTransaction.amount;
        }
        this.userDashData[this.loggedIndx] = this.loggedUserDashData;
        this.userService.setUserDashData(this.userDashData);
        this.closeTransactGoalPopup(newTransactForm, overlay, newTransactPopup);
        this.addedNewTransact = true;
    }
}
