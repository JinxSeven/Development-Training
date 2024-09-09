import { getCurrentLoggedUser, getUserDash, universalValidator, setUserDash } from './utils.js';
const loggedUser = getCurrentLoggedUser();
const loggedUserDash = getUserDash();
let chartDataY = [];
let chartDataX = ["Entertainment", "Health", "Shopping", "Travel", "Education", "Other"];
let incomeSelector = ["Earnings", "Winnings", "Gift", "Freelance", "Returns", "Other"];
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
const newTransactionOptions = document.querySelectorAll('#new-transaction-purpose-select option');
const saveTransactionBtn = document.getElementById('save-transaction-btn');
const newGoalName = document.getElementById('new-goal-name-inp');
const newGoalTarget = document.getElementById('new-goal-trgt-inp');
const newGoalInit = document.getElementById('new-goal-init-inp');
const saveGoalBtn = document.getElementById('save-goal-btn');
const overlay = document.getElementById('overlay');
const newGoalPopup = document.getElementById('new-goal-popup');
const newBillPopup = document.getElementById('new-bill-popup');
const newTransactionPopup = document.getElementById('new-transaction-popup');
const filterChartEntertain = document.getElementById('chart-filter-entertain');
const filterChartHealth = document.getElementById('chart-filter-health');
const filterChartShopping = document.getElementById('chart-filter-shopping');
const filterChartTravel = document.getElementById('chart-filter-travel');
const filterChartEdu = document.getElementById('chart-filter-education');
const filterChartOther = document.getElementById('chart-filter-other');
const filterChartReset = document.getElementById('chart-filter-reset');
filterChartReset.addEventListener('click', updateDashUserData);
function updateDashUserData() {
    totalExpenseDsp.innerText = String(loggedUserDash[userDashIndx].totalExpense);
    totalIncomeDsp.innerText = String(loggedUserDash[userDashIndx].totalIncome);
    profileNameDsp.innerText = String(loggedUserDash[userDashIndx].name);
    totalBalanceDsp.innerText = String(loggedUserDash[userDashIndx].totalBalance);
    updateExpenseChartData();
}
updateDashUserData();
function updateExpenseChartData() {
    const transArr = loggedUserDash[userDashIndx].transactions;
    const expTransArr = transArr.filter(itr => itr.type == 'expense');
    let temp = new Map();
    temp.set('Entertainment', 0);
    temp.set('Health', 0);
    temp.set('Shopping', 0);
    temp.set('Travel', 0);
    temp.set('Education', 0);
    temp.set('Other', 0);
    for (let x = 0; x < expTransArr.length; x++) {
        const purpose = expTransArr[x].purpose;
        const amount = expTransArr[x].amount;
        switch (purpose) {
            case 'entertainment':
                temp.set('Entertainment', temp.get('Entertainment') + amount);
                break;
            case 'health':
                temp.set('Health', temp.get('Health') + amount);
                break;
            case 'shopping':
                temp.set('Shopping', temp.get('Shopping') + amount);
                break;
            case 'travel':
                temp.set('Travel', temp.get('Travel') + amount);
                break;
            case 'education':
                temp.set('Education', temp.get('Education') + amount);
                break;
            case 'other':
                temp.set('Other', temp.get('Other') + amount);
                break;
            default:
                break;
        }
    }
    chartDataY = Array.from(temp.values());
}
newTransactionType.addEventListener('change', () => {
    const options = newTransactionPurpose.options;
    if (newTransactionType.value === 'expense') {
        Array.from(options).forEach(option => {
            option.value = chartDataX[option.index].toLowerCase();
            option.textContent = chartDataX[option.index];
        });
    }
    else {
        Array.from(options).forEach(option => {
            option.value = incomeSelector[option.index].toLowerCase();
            option.textContent = incomeSelector[option.index];
        });
    }
});
saveTransactionBtn.addEventListener('click', function () {
    if (!universalValidator(newTransactionAmount))
        return;
    if (!universalValidator(newTransactionDate))
        return;
    if (newTransactionType.value === 'expense') {
        if (Number(newTransactionAmount.value) > loggedUserDash[userDashIndx].totalBalance) {
            alert('Expense > Balance!');
            return;
        }
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
closeGoalPopup.addEventListener('click', function () {
    overlay.style.display = 'none';
    newGoalPopup.style.display = 'none';
});
newGoalBtn.addEventListener('click', function () {
    overlay.style.display = 'block';
    newGoalPopup.style.display = 'block';
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
// @ts-expect-error
new Chart("expense-chart", {
    type: "bar",
    data: {
        labels: chartDataX,
        datasets: [{
                backgroundColor: "rgba(255,0,0,0.5)",
                data: chartDataY
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
