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
}

prodNameInp.addEventListener('blur', function() {
    if (prodNameInp.value == '') {
        alert('Product name cant be null!')
    }
})

prodPriceInp.addEventListener('blur', function() {
    if (prodPriceInp.value == '') {
        alert('Product price cant be null!')
    }
})

prodQuantInp.addEventListener('blur', function() {
    if (prodQuantInp.value == '') {
        alert('Product quantity cant be null!')
    }
})

let arrHead = ['Product Name', 'Price', 'Quantity'];
let arrProd = [];
let rowCount = 0;

addProdBtn.addEventListener('click', function(def) {
    def.preventDefault();

    if (rowCount == 0) {
        let tableRow = document.createElement('tr');
        for (let x = 0; x < arrHead.length; x++) {
            let tableHead = document.createElement('th');
            tableHead.innerText = arrHead[x];
            tableRow.append(tableHead);
        }
        table.append(tableRow);
    }

    let newProduct = new Product(prodNameInp.value, prodPriceInp.value, prodQuantInp.value);
    arrProd.push(newProduct);

    if (rowCount < arrProd.length) {
        let tableRow = document.createElement('tr');
        let data = [];
        for (let x = rowCount; x < arrProd.length; x++) {
            data.push(arrProd[rowCount].getName());
            data.push(arrProd[rowCount].getPrice());
            data.push(arrProd[rowCount].getQuant());
            for (let i = 0; i < data.length; i++) {
                let tableData = document.createElement('td');
                tableData.innerText = data[i];
                tableRow.append(tableData);
            }
            table.append(tableRow);
        }
        rowCount++;
    }
    form.reset();
})
