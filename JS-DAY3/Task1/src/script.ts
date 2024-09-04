const display = document.getElementById('display') as HTMLInputElement;
const buttons = document.querySelectorAll('.btn');
let output = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = (button as HTMLElement).innerText;

        if (value === 'C') clearDisplay();
        else if (value === '=') calculateResult();
        else handleInput(value);
    });
});

function clearDisplay() {
    output = '';
    display.value = '0';
}

function calculateResult() {
    let result = eval(output);
    output = result.toString();
    display.value = output;
}

function handleInput(num: string) {
    if (output === '0' && num === '0') return;
    output += num;
    display.value = output;
}
