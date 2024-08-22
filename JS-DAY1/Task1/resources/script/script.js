let calculator = document.querySelector('.calculator');
let answer = document.getElementById('interest');
let total = document.getElementById('total-amount');
let addInfo = document.getElementById('add-info');
let result = 0;

calculator.addEventListener("submit", function(def) {
    def.preventDefault();

    let principal = parseFloat(document.getElementById('principal').value);
    let rateOfInterest = parseFloat(document.getElementById('rate-of-interest').value);
    let time = parseFloat(document.getElementById('time').value);

    if (isNaN(principal) || isNaN(rateOfInterest) || isNaN(time)) {
        alert("Invalid Input Type!")
        calculator.reset();
    }

    result = (principal * rateOfInterest * time) / 100;

    answer.textContent = principal.toFixed(2);
    total.textContent = (principal + result).toFixed(2); 
});
