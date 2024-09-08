// import Chart from 'chart.js';
import { getCurrentLoggedUser } from './utils.js';
const loggedUser = getCurrentLoggedUser();
const totalIncomeDsp = document.querySelectorAll('.income-div label:nth-child(3)');
const totalExpenseDsp = document.querySelectorAll('.expense-div label:nth-child(3)');
const totalBalanceDsp = document.querySelectorAll('.balance-div label:nth-child(3)');
const profileNameDsp = document.querySelector('.profile-div p');
const newGoalBtn = document.getElementById('new-goal-btn');
const closeGoalPopup = document.getElementById('close-goal-popup');
const newBillBtn = document.getElementById('new-bill-btn');
const closeBillPopup = document.getElementById('close-bill-popup');
const newTransactionBtn = document.getElementById('new-transaction-btn');
const closeTransactionPopup = document.getElementById('close-transaction-popup');
const overlay = document.getElementById('overlay');
const newGoalPopup = document.getElementById('new-goal-popup');
const newBillPopup = document.getElementById('new-bill-popup');
const newTransactionPopup = document.getElementById('new-transaction-popup');
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
newTransactionPopup.addEventListener('click', function () {
    overlay.style.display = 'none';
    newTransactionPopup.style.display = 'none';
});
let XData = ["Entertainment", "Health", "Shopping", "Travel", "Education", "Other"];
let YData = [15, 40, 42, 24, 35, 30];
// @ts-expect-error
new Chart("expense-chart", {
    type: "bar",
    data: {
        labels: XData,
        datasets: [{
                backgroundColor: "rgba(255,0,0,0.5)",
                data: YData
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
