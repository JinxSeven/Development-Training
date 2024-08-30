const prodNameInp = document.getElementById('prod-name-inp');
const prodPriceInp = document.getElementById('prod-price-inp');
const prodQuantInp = document.getElementById('prod-quant-inp');
const addProdBtn = document.getElementById('add-prod-btn');
const table = document.querySelector('table');
const form = document.querySelector('form');

class Product {
    #name;
    #price;
    #quant;
    constructor(name, price, quant) {
        this.#name = name;
        this.#price = price;
        this.#quant = quant;
    }
    getName() {
        return this.#name;
    }
    getPrice() {
        return this.#price;
    }
    getQuant() {
        return this.#quant;
    }
    updateName(updatedName) {
        this.#name = updatedName;
    }
    updatePrice(updatedPrice) {
        this.#price = updatedPrice;
    }
    updateQuant(updatedQuant) {
        this.#quant = updatedQuant;
    }
}

function prodNameInpCheck() {
    if (prodNameInp.value == '') {
        document.getElementById('prod-err').style.opacity = '1';
        prodNameInp.style.borderColor = 'rgb(218, 43, 43)';
        return false;
    } else {
        document.getElementById('prod-err').style.opacity = '0';
        prodNameInp.style.borderColor = '#d8d8d8';
        return true;
    }
}

prodNameInp.addEventListener('blur', prodNameInpCheck);

function prodPriceInpCheck() {
    if (prodPriceInp.value == '') {
        document.getElementById('price-err').style.opacity = '1';
        prodPriceInp.style.borderColor = 'rgb(218, 43, 43)';
        return false;
    } else {
        document.getElementById('price-err').style.opacity = '0';
        prodPriceInp.style.borderColor = '#d8d8d8';
        return true;
    }
}

prodPriceInp.addEventListener('blur', prodPriceInpCheck);

function prodQuantInpCheck() {
    if (prodQuantInp.value == '') {
        document.getElementById('quant-err').style.opacity = '1';
        prodQuantInp.style.borderColor = 'rgb(218, 43, 43)';
        return false;
    } else {
        document.getElementById('quant-err').style.opacity = '0';
        prodQuantInp.style.borderColor = '#d8d8d8';
        return true;
    }
}

prodQuantInp.addEventListener('blur', prodQuantInpCheck);

let headRow = ['Product Name', 'Price', 'Quantity', '', ''];
let arrProd = [];
let rowCount = 0;
let modTog = 0;
let first = true;

addProdBtn.addEventListener('click', function(def) {
    def.preventDefault();

    if (!prodNameInpCheck() || !prodPriceInpCheck() || !prodQuantInpCheck()) return;

    if (first) {
        let tableRow = document.createElement('tr');
        for (let x = 0; x < headRow.length; x++) {
            let tableHead = document.createElement('th');
            tableHead.innerText = headRow[x];
            tableRow.append(tableHead);
        }
        table.append(tableRow);
        first = false;
    }

    let newProd = new Product(prodNameInp.value, prodPriceInp.value, prodQuantInp.value);
    arrProd.push(newProd);

    const tableRow = document.createElement('tr');
    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');

    let data = [];

    data.push(newProd.getName());
    data.push('$' + newProd.getPrice());
    data.push(newProd.getQuant());

    for (let i = 0; i < data.length + 2; i++) {
        const tableData = document.createElement('td');
        if (i == 3) {
            deleteBtn.setAttribute('class', 'delete-btn');
            deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
            tableData.append(deleteBtn);
            tableRow.append(tableData);
            continue;
        } else if (i == 4) {
            editBtn.setAttribute('class', 'edit-btn');
            editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
            tableData.append(editBtn);
            tableRow.append(tableData);
            continue;
        }
        const input = document.createElement('input');
        input.value = data[i];
        input.setAttribute('class', 'edit-data');
        input.setAttribute('readonly', 'true');
        tableData.append(input);
        tableRow.append(tableData);
        // input.addEventListener('blur', saveFun);
    }
    table.append(tableRow);

    deleteBtn.addEventListener('click', deleteFun);
    editBtn.addEventListener('click', function() {
        editFun(editBtn);
    })

    form.reset();
})

function deleteFun(event) {
    const closestTr = event.target.closest('tr');
    arrProd.splice(closestTr.rowIndex - 1, 1);
    table.removeChild(closestTr);
}

function editFun(editBtn) {
    const closestTr = editBtn.closest('tr');
    const inputs = closestTr.querySelectorAll('input');
    const editModeInfo = document.getElementById('edit-mode-info');

    if (modTog == 0) {
        inputs.forEach(input => {
            input.removeAttribute('readonly');
        });
        modTog = (modTog + 1) % 2;
        editBtn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>`;
        inputs[0].focus();
        editModeInfo.style.opacity = 1;
    } else {
        inputs.forEach(input => {
            input.setAttribute('readonly', 'true');
        });
        modTog = (modTog + 1) % 2;
        saveFun(editBtn);
        editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
        editModeInfo.style.opacity = 0;
    }
}

function saveFun(editBtn) {
    const closestTr = editBtn.closest('tr');
    const closestInps = editBtn.querySelectorAll('input');
    // const cellIdx = closestInps[x].parentNode.cellIndex;

    for (let x = 0; x < closestInps.length; x++) {
        if (x == 0) {
            if (closestInps[x].value == '') closestInps[x].value = arrProd[closestTr.rowIndex - 1].getName();
            if (closestInps[x].value !== arrProd[closestTr.rowIndex - 1]) {
                arrProd[closestTr.rowIndex - 1].updateName(closestInps[x].value);
            }  
            console.log(arrProd[closestTr.rowIndex - 1]);
        } else if (x == 1) {
            if (closestInps[x].value == '') closestInps[x].value = arrProd[closestTr.rowIndex - 1].getPrice();
            if (closestInps[x].value !== arrProd[closestTr.rowIndex - 1]) {
                arrProd[closestTr.rowIndex - 1].updatePrice(closestInps[x].value);
            }
            console.log(arrProd[closestTr.rowIndex - 1]);
        } else {
            if (closestInps[x].value == '') closestInps[x].value = arrProd[closestTr.rowIndex - 1].getQuant();
            if (closestInps[x].value !== arrProd[closestTr.rowIndex - 1]) {
                arrProd[closestTr.rowIndex - 1].updateQuant(closestInps[x].value);
            }
            console.log(arrProd[closestTr.rowIndex - 1]);
        }
    }
}
