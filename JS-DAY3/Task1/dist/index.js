"use strict";
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentValue = '';
let operator = '';
let previousValue = '';
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        if (value === 'C') {
            clearDisplay();
        }
        else if (value === '=') {
            calculateResult();
        }
        else if (['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
        }
        else {
            handleNumber(value);
        }
    });
});
function clearDisplay() {
    currentValue = '';
    operator = '';
    previousValue = '';
    display.value = '0';
}
function calculateResult() {
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    display.value = result.toString();
    currentValue = result.toString();
    operator = '';
    previousValue = '';
}
function handleOperator(op) {
    if (currentValue === '')
        return;
    if (previousValue !== '') {
        calculateResult();
    }
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}
function handleNumber(num) {
    if (currentValue === '0' && num === '0')
        return;
    currentValue += num;
    display.value = currentValue;
}
