let calculator = document.querySelector('.calculator');
let answer = document.getElementById('interest');
let total = document.getElementById('total-amount');
let addInfo = document.getElementById('add-info');
let principalInput = document.getElementById('principal');
let roiInput = document.getElementById('rate-of-interest');
let timeInput = document.getElementById('time');
let interest = 0;

principalInput.addEventListener('blur', function(){
    if (principalInput.value < 500) {
        console.log('if');
    } else {
        console.log('else')
    }
})

calculator.addEventListener("submit", function(def) {
    def.preventDefault();

    let principal = parseFloat(document.getElementById('principal').value);
    let rateOfInterest = parseFloat(document.getElementById('rate-of-interest').value);
    let time = parseFloat(document.getElementById('time').value);

    if (principal < 1000 && rateOfInterest < 5) rateOfInterest = 5;
    if (principal < 5000 && rateOfInterest < 7) rateOfInterest = 7;
    if (principal > 5000 && rateOfInterest < 10) rateOfInterest = 10;

    if (time > 5) {
        rateOfInterest += 2;
        addInfo.textContent = "You got an additional 2% bonus!"
    }
    else addInfo.textContent = "You got no bonus!"

    interest = (principal * rateOfInterest * time) / 100;

    answer.textContent = interest.toFixed(2);
    total.textContent = (principal + interest).toFixed(2);
    calculator.reset();
})
