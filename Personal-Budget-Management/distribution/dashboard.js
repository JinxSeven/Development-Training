import { getCurrentLoggedUser, getUserDash, universalValidator, setUserDash } from './utils.js';
const loggedUser = getCurrentLoggedUser();
const loggedUserDash = getUserDash();
const userDashIndx = loggedUserDash.findIndex(itr => itr.email === loggedUser.email);
const totalIncomeDsp = document.getElementById('total-income-dsp');
const totalExpenseDsp = document.getElementById('total-expense-dsp');
const totalBalanceDsp = document.getElementById('total-balance-dsp');
const profileNameDsp = document.querySelector('.profile-div p');
const newGoalBtn = document.getElementById('new-goal-btn');
const closeGoalPopup = document.getElementById('close-goal-popup');
const newBillBtn = document.getElementById('new-bill-btn');
const closeBillPopup = document.getElementById('close-bill-popup');
const newTransactionBtn = document.getElementById('new-transaction-btn');
const closeTransactionPopup = document.getElementById('close-transaction-popup');
const newTransactionType = document.getElementById('new-transaction-type-select');
const newTransactionAmount = document.getElementById('new-transaction-amt-inp');
const newTransactionDate = document.getElementById('new-transaction-date-inp');
const newTransactionPurpose = document.getElementById('new-transaction-purpose-select');
const saveTransactionBtn = document.getElementById('save-transaction-btn');
const overlay = document.getElementById('overlay');
const newGoalPopup = document.getElementById('new-goal-popup');
const newBillPopup = document.getElementById('new-bill-popup');
const newTransactionPopup = document.getElementById('new-transaction-popup');
function updateDashUserData() {
    totalExpenseDsp.innerText = String(loggedUserDash[userDashIndx].totalExpense);
    totalIncomeDsp.innerText = String(loggedUserDash[userDashIndx].totalIncome);
    profileNameDsp.innerText = String(loggedUserDash[userDashIndx].name);
    totalBalanceDsp.innerText = String(loggedUserDash[userDashIndx].totalBalance);
}
updateDashUserData();
saveTransactionBtn.addEventListener('click', function () {
    if (!universalValidator(newTransactionAmount))
        return;
    if (!universalValidator(newTransactionDate))
        return;
    if (newTransactionType.value === 'expense' && Number(newTransactionAmount.value) > loggedUserDash[userDashIndx].totalBalance) {
        alert('Expense > Balance!');
        return;
    }
    const newTransaction = {
        type: newTransactionType.value,
        amount: Number(newTransactionAmount.value),
        date: newTransactionDate.value,
        purpose: newTransactionPurpose.value
    };
    loggedUserDash[userDashIndx].transactions.push(newTransaction);
    if (newTransaction.type === 'income') {
        loggedUserDash[userDashIndx].totalIncome += newTransaction.amount;
    }
    else {
        loggedUserDash[userDashIndx].totalExpense += newTransaction.amount;
    }
    loggedUserDash[userDashIndx].totalBalance = loggedUserDash[userDashIndx].totalIncome - loggedUserDash[userDashIndx].totalExpense;
    setUserDash(loggedUserDash);
    updateDashUserData();
});
newGoalBtn.addEventListener('click', function () {
    overlay.style.display = 'block';
    newGoalPopup.style.display = 'block';
});
closeGoalPopup.addEventListener('click', function () {
    overlay.style.display = 'none';
    newGoalPopup.style.display = 'none';
});
newBillBtn.addEventListener('click', function () {
    overlay.style.display = 'block';
    newBillPopup.style.display = 'block';
});
closeBillPopup.addEventListener('click', function () {
    overlay.style.display = 'none';
    newBillPopup.style.display = 'none';
});
newTransactionBtn.addEventListener('click', function () {
    overlay.style.display = 'block';
    newTransactionPopup.style.display = 'block';
});
closeTransactionPopup.addEventListener('click', function () {
    overlay.style.display = 'none';
    newTransactionPopup.style.display = 'none';
});
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
