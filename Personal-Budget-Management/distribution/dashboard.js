import { universalNaNValidator, getCurrentLoggedUser, getUserDash, universalValidator, setUserDash, universalLenValidator } from './utils.js';
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
const saveTransactionBtn = document.getElementById('save-transaction-btn');
const newGoalName = document.getElementById('new-goal-name-inp');
const newGoalTarget = document.getElementById('new-goal-trgt-inp');
const newGoalInit = document.getElementById('new-goal-init-inp');
const saveGoalBtn = document.getElementById('save-goal-btn');
const savingGoalsDiv = document.querySelector('aside .saving-goals-div');
const zeroGoalsDiv = document.getElementById('zero-goals-div');
const goalFundBtns = document.querySelectorAll('.goal-fund-btn');
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
// filterChartReset.addEventListener('click', () => {
//     window.location.reload();
// });
function updateDashUserData() {
    totalExpenseDsp.innerText = String(loggedUserDash[userDashIndx].totalExpense);
    totalIncomeDsp.innerText = String(loggedUserDash[userDashIndx].totalIncome);
    profileNameDsp.innerText = String(loggedUserDash[userDashIndx].name);
    totalBalanceDsp.innerText = String(loggedUserDash[userDashIndx].totalBalance);
    updateSavingGoalData();
    updateExpenseChartData();
}
function updateSavingGoalData() {
    const arrayOfGoals = loggedUserDash[userDashIndx].goals;
    if (arrayOfGoals.length == 0) {
        zeroGoalsDiv.style.display = 'flex';
    }
    else {
        zeroGoalsDiv.style.display = 'none';
    }
    for (let itr = 0; itr < arrayOfGoals.length; itr++) {
        const initGoalProg = ((arrayOfGoals[itr].contribution / arrayOfGoals[itr].target) * 100).toFixed(1);
        const newGoalDiv = `<div style="display: flex;justify-content: space-evenly; align-items: center;" class="goals-div">
                                <p>${arrayOfGoals[itr].name}</p><progress style="height:30px;width: 20%;" class="goal-prog-bar" value="${arrayOfGoals[itr].contribution}" max="${arrayOfGoals[itr].target}"></progress>
                                <p id="progressPercentage">${initGoalProg}%</p>
                                <button style="background-color: #b6ffd6;" id="${itr}" class="goal-mod-btn goal-fund-btn"><i class="fa-solid fa-circle-dollar-to-slot fa-lg"></i></button>
                                <button style="background-color: #ffd4d4;" id="${itr}" class="goal-mod-btn goal-del-btn"><i class="fa-solid fa-trash-can fa-lg"></i></button>
                            </div>`;
        savingGoalsDiv === null || savingGoalsDiv === void 0 ? void 0 : savingGoalsDiv.insertAdjacentHTML('beforeend', newGoalDiv);
    }
}
function updateExpenseChartData() {
    const arrayOfTransactions = loggedUserDash[userDashIndx].transactions;
    const expTransArr = arrayOfTransactions.filter(itr => itr.type == 'expense');
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
saveGoalBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (!universalValidator(newGoalName))
        return;
    if (!universalValidator(newGoalTarget))
        return;
    if (!universalLenValidator(newGoalName, 17))
        return;
    if (!universalNaNValidator(newGoalTarget))
        return;
    const userGoals = loggedUserDash[userDashIndx].goals;
    for (let i = 0; i < userGoals.length; i++) {
        if (userGoals[i].name === newGoalName.value) {
            newGoalName.style.borderColor = '#ba2b2b';
            alert('No duplicate goals allowed!');
            return;
        }
        newGoalName.style.borderColor = '#d8d8d8';
    }
    if (Number(newGoalInit.value) > loggedUserDash[userDashIndx].totalBalance) {
        newGoalInit.style.borderColor = '#ba2b2b';
        alert('Not enough balance!');
        newGoalInit.value = '';
        return;
    }
    else if (Number(newGoalInit.value) > Number(newGoalTarget.value)) {
        newGoalInit.style.borderColor = '#ba2b2b';
        alert('Contribution > Target!');
        newGoalInit.value = '';
        return;
    }
    else {
        newGoalInit.style.borderColor = '#d8d8d8';
    }
    const newGoal = {
        name: newGoalName.value,
        target: Number(newGoalTarget.value),
        contribution: Number(newGoalInit.value)
    };
    if (newGoal.contribution > 0) {
        const date = new Date();
        const formatted = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        const goalTransaction = {
            type: "expense",
            amount: newGoal.contribution,
            date: formatted,
            purpose: "other"
        };
        loggedUserDash[userDashIndx].totalExpense += goalTransaction.amount;
        loggedUserDash[userDashIndx].transactions.push(goalTransaction);
    }
    loggedUserDash[userDashIndx].goals.push(newGoal);
    setUserDash(loggedUserDash);
    closeGoalFunctionReload();
});
goalFundBtns.forEach(fund => {
    fund.addEventListener('click', () => {
        const idx = Number(fund.id);
        const userGoals = loggedUserDash[userDashIndx].goals;
    });
});
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
saveTransactionBtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (!universalValidator(newTransactionDate))
        return;
    if (!universalValidator(newTransactionAmount))
        return;
    if (newTransactionType.value === 'expense') {
        if (Number(newTransactionAmount.value) > loggedUserDash[userDashIndx].totalBalance) {
            newTransactionAmount.style.borderColor = '#ba2b2b';
            alert('Expense > Balance!');
            newTransactionAmount.value = '';
            return;
        }
        newTransactionAmount.style.borderColor = '#d8d8d8';
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
    closeTransactionFunctionReload();
});
newGoalBtn.addEventListener('click', function () {
    overlay.style.display = 'block';
    newGoalPopup.style.display = 'block';
});
function closeGoalFunction() {
    overlay.style.display = 'none';
    newGoalPopup.style.display = 'none';
}
function closeGoalFunctionReload() {
    overlay.style.display = 'none';
    newGoalPopup.style.display = 'none';
    window.location.reload();
}
closeGoalPopup.addEventListener('click', closeGoalFunction);
newBillBtn.addEventListener('click', function () {
    overlay.style.display = 'block';
    newBillPopup.style.display = 'block';
});
function closeBillFunction() {
    overlay.style.display = 'none';
    newBillPopup.style.display = 'none';
    // window.location.reload();
}
closeBillPopup.addEventListener('click', closeBillFunction);
newTransactionBtn.addEventListener('click', function () {
    overlay.style.display = 'block';
    newTransactionPopup.style.display = 'block';
});
function closeTransactionFunction() {
    overlay.style.display = 'none';
    newTransactionPopup.style.display = 'none';
}
function closeTransactionFunctionReload() {
    overlay.style.display = 'none';
    newTransactionPopup.style.display = 'none';
    window.location.reload();
}
closeTransactionPopup.addEventListener('click', closeTransactionFunction);
updateDashUserData();
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
