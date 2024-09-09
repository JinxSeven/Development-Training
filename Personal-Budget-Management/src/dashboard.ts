import {
    UserDash, Goal,
    Bill, Transaction,
    getCurrentLoggedUser,
    getUserDash,
    universalValidator,
    setUserDash
} from './utils.js';

const loggedUser = getCurrentLoggedUser();
const loggedUserDash = getUserDash();

const userDashIndx = loggedUserDash.findIndex(itr => itr.email === loggedUser.email);

const totalIncomeDsp = document.getElementById('total-income-dsp') as HTMLLabelElement;
const totalExpenseDsp = document.getElementById('total-expense-dsp') as HTMLLabelElement;
const totalBalanceDsp = document.getElementById('total-balance-dsp') as HTMLLabelElement;
const profileNameDsp = document.querySelector('.profile-div p') as HTMLParagraphElement;

const newGoalBtn = document.getElementById('new-goal-btn') as HTMLButtonElement;
const closeGoalPopup = document.getElementById('close-goal-popup') as HTMLButtonElement;
const newBillBtn = document.getElementById('new-bill-btn') as HTMLButtonElement;
const closeBillPopup = document.getElementById('close-bill-popup') as HTMLButtonElement;
const newTransactionBtn = document.getElementById('new-transaction-btn') as HTMLButtonElement;
const closeTransactionPopup = document.getElementById('close-transaction-popup') as HTMLButtonElement;

const newTransactionType = document.getElementById('new-transaction-type-select') as HTMLSelectElement;
const newTransactionAmount = document.getElementById('new-transaction-amt-inp') as HTMLInputElement;
const newTransactionDate = document.getElementById('new-transaction-date-inp') as HTMLInputElement;
const newTransactionPurpose = document.getElementById('new-transaction-purpose-select') as HTMLSelectElement;
const saveTransactionBtn = document.getElementById('save-transaction-btn') as HTMLButtonElement;

const overlay = document.getElementById('overlay') as HTMLDivElement;
const newGoalPopup = document.getElementById('new-goal-popup') as HTMLDivElement;
const newBillPopup = document.getElementById('new-bill-popup') as HTMLDivElement;
const newTransactionPopup = document.getElementById('new-transaction-popup') as HTMLDivElement;

function updateDashUserData() {
    totalExpenseDsp.innerText = String(loggedUserDash[userDashIndx].totalExpense);
    totalIncomeDsp.innerText = String(loggedUserDash[userDashIndx].totalIncome);
    profileNameDsp.innerText = String(loggedUserDash[userDashIndx].name);
    totalBalanceDsp.innerText = String(loggedUserDash[userDashIndx].totalBalance);
}

updateDashUserData();

saveTransactionBtn.addEventListener('click', function() {
    if (!universalValidator(newTransactionAmount)) return;
    if (!universalValidator(newTransactionDate)) return;
    if (newTransactionType.value === 'expense' && Number(newTransactionAmount.value) > loggedUserDash[userDashIndx].totalBalance) {
        alert('Expense > Balance!');
        return;
    }
    const newTransaction: Transaction = {
        type: newTransactionType.value,
        amount: Number(newTransactionAmount.value),
        date: newTransactionDate.value,
        purpose: newTransactionPurpose.value
    }
    
    loggedUserDash[userDashIndx].transactions.push(newTransaction);

    if (newTransaction.type === 'income') {
        loggedUserDash[userDashIndx].totalIncome += newTransaction.amount;
    } else {
        loggedUserDash[userDashIndx].totalExpense += newTransaction.amount;
    }
    loggedUserDash[userDashIndx].totalBalance = loggedUserDash[userDashIndx].totalIncome - loggedUserDash[userDashIndx].totalExpense;
    setUserDash(loggedUserDash);
    updateDashUserData();
})

newGoalBtn.addEventListener('click', function() {
    overlay.style.display = 'block';
    newGoalPopup.style.display = 'block';
})

closeGoalPopup.addEventListener('click', function() {
    overlay.style.display = 'none';
    newGoalPopup.style.display = 'none';
})

newBillBtn.addEventListener('click', function() {
    overlay.style.display = 'block';
    newBillPopup.style.display = 'block';
})

closeBillPopup.addEventListener('click', function() {
    overlay.style.display = 'none';
    newBillPopup.style.display = 'none';
})

newTransactionBtn.addEventListener('click', function() {
    overlay.style.display = 'block';
    newTransactionPopup.style.display = 'block';
})

closeTransactionPopup.addEventListener('click', function() {
    overlay.style.display = 'none';
    newTransactionPopup.style.display = 'none';
})

let X = ["Entertainment", "Health", "Shopping", "Travel", "Education", "Other"];
let Y = [15, 40, 42, 24, 35, 30];
// @ts-expect-error
new Chart("expense-chart", {
    type: "bar",
    data: {
        labels: X,
        datasets: [{
            backgroundColor: "rgba(255,0,0,0.5)",
            data: Y
        }]
    },
    options: {
        legend: { display: false },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
        },
    }
});
