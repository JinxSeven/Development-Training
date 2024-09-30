import { Component, inject, numberAttribute } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserDash } from '../../../interfaces/user-dash';
import { GoalService } from '../../../services/goal.service';
import { TransactionService } from '../../../services/transaction.service';
import { Chart } from 'chart.js/auto';

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

    userDashData: UserDash[] = this.userService.getUserDashData();
    loggedIndx: number = this.userService.getLoggedIndx();
    loggedUserDashData: UserDash = this.userDashData[this.loggedIndx];

    errorOut: string = "‎";
    arrOfOptions: string[] = this.transactService.returnAptCategories("expense");
    chartData: number[] = this.updateExpenseChartData();

    updateDashBoardData() {
        this.userDashData = this.userService.getUserDashData();
        this.loggedIndx = this.userService.getLoggedIndx();
        this.loggedUserDashData = this.userDashData[this.loggedIndx];
    }

    ngDoCheck() {
        this.updateDashBoardData();
        this.transactService.updateDashBoardData();
        this.goalService.updateDashBoardData();
    }

    addNewGoal(
        newGoalForm: NgForm,
        overlay: HTMLDivElement,
        newGoalPopup: HTMLDivElement
    ) {
        this.goalService.addNewGoal(newGoalForm, overlay, newGoalPopup);
    }

    openNewGoalPopup(overlay: HTMLDivElement, newGoalPopup: HTMLDivElement) {
        this.goalService.openGoalPopup(overlay, newGoalPopup);
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
        this.goalService.closeGoalPopup(newGoalForm, overlay, newGoalPopup);
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

    ngAfterViewInit() {
        const chartx = document.getElementById('expenseChart') as HTMLCanvasElement;

        new Chart(chartx, {
            type: 'bar',
            data: {
                labels: [
                    "Entertainment",
                    "Health",
                    "Shopping",
                    "Travel",
                    "Education",
                    "Other"
                ],
                datasets: [{
                    label: 'Expense',
                    data: this.chartData,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    updateExpenseChartData() {
        const arrayOfTransactions = this.loggedUserDashData.transactions;
        const expenses = arrayOfTransactions.filter((itr: any) => itr.type == "expense");
        let temp = new Map();

        temp.set("Entertainment", 0);
        temp.set("Health", 0);
        temp.set("Shopping", 0);
        temp.set("Travel", 0);
        temp.set("Education", 0);
        temp.set("Other", 0);

        for (let x = 0; x < expenses.length; x++) {
            const purpose = expenses[x].category;
            const amount = expenses[x].amount;

            switch (purpose) {
                case "entertainment":
                    temp.set("Entertainment", temp.get("Entertainment")! + amount);
                    break;
                case "health":
                    temp.set("Health", temp.get("Health")! + amount);
                    break;
                case "shopping":
                    temp.set("Shopping", temp.get("Shopping")! + amount);
                    break;
                case "travel":
                    temp.set("Travel", temp.get("Travel")! + amount);
                    break;
                case "education":
                    temp.set("Education", temp.get("Education")! + amount);
                    break;
                case "other":
                    temp.set("Other", temp.get("Other")! + amount);
                    break;
                default:
                    break;
            }
        }
        return Array.from(temp.values());
    }
}
