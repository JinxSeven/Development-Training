const prodNameInp = document.getElementById('prod-name-inp');
const prodPriceInp = document.getElementById('prod-price-inp');
const prodQuantInp = document.getElementById('prod-quant-inp');
const addProdBtn = document.getElementById('add-prod-btn');
const table = document.querySelector('table');
const form = document.querySelector('form');

class Product {
    constructor(name, price, quant) {
        this.name = name;
        this.price = price;
        this.quant = quant;
    }
    getName() {
        return this.name;
    }
    getPrice() {
        return this.price;
    }
    getQuant() {
        return this.quant;
    }
    updateQuant(updatedQuant) {
        this.quant = updatedQuant;
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

let arrHead = ['Product Name', 'Price', 'Quantity', '‎'];
let arrProd = [];
let rowCount = 0;
let first = true;

addProdBtn.addEventListener('click', function(def) {
    def.preventDefault();

    if (!prodNameInpCheck() || !prodPriceInpCheck() || !prodQuantInpCheck()) return;

    if (first) {
        let tableRow = document.createElement('tr');
        for (let x = 0; x < arrHead.length; x++) {
            let tableHead = document.createElement('th');
            tableHead.innerText = arrHead[x];
            tableRow.append(tableHead);
        }
        table.append(tableRow);
        first = false;
    }

    let newProduct = new Product(prodNameInp.value, prodPriceInp.value, prodQuantInp.value);
    arrProd.push(newProduct);

    if (rowCount < arrProd.length) {
        let tableRow = document.createElement('tr');
        let deleteBtn = document.createElement('button');
        let input = document.createElement('input');
        let data = [];
        for (let x = rowCount; x < arrProd.length; x++) {
            data.push(arrProd[rowCount].getName());
            data.push('$' + arrProd[rowCount].getPrice());
            data.push(arrProd[rowCount].getQuant());
            for (let i = 0; i < data.length; i++) {
                let tableData = document.createElement('td');
                if (i == 2) {
                    input.value = data[i];
                    input.setAttribute('id', 'edit-quant-inp');
                    tableData.append(input);
                    tableRow.append(tableData);
                    continue;
                }
                tableData.innerText = data[i];
                tableRow.append(tableData);
            }
            deleteBtn.setAttribute('id', 'delete-btn');
            deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
            tableRow.append(deleteBtn);
            table.append(tableRow);
        }
        rowCount++;
        deleteBtn.addEventListener('click', function() {
            arrProd.splice(tableRow.rowIndex - 1, 1);
            table.removeChild(tableRow);
            rowCount--;
        })

        input.addEventListener('blur', function() {
            if (input.value == '') input.value = arrProd[tableRow.rowIndex - 1].getQuant();
            if (input.value !== arrProd[tableRow.rowIndex - 1]) {
                arrProd[tableRow.rowIndex - 1].updateQuant(input.value);
            }   
        })
    }
    form.reset();
})
