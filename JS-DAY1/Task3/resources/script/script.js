let studForm = document.querySelector('.form-container');
let studInput = document.getElementById('stud-name-input');
let gradeInput = document.getElementById('grade-input');
let addStudBtn = document.getElementById('add-stud-btn');
let dispGradeBtn = document.getElementById('disp-grade-btn');
let calcAvgBtn = document.getElementById('calc-avg-btn');
let gradeList = document.getElementById('grades-list');
let avgOut = document.getElementById('avg-out');

class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
    getName() {
        return this.name;
    }
    getGrade() {
        return this.grade;
    }
}

let arrStuds = [];
let listCount = 0;

studInput.addEventListener('blur', function() {
    if (studInput.value == '' || !isNaN(studInput.value)) { 
        alert('Name cannot be empty or a number!');
        studInput.style.borderColor = '#ff474c';
    } else {
        studInput.style.borderColor = '#90ee90';
    }
})

gradeInput.addEventListener('blur', function() {
    if (gradeInput.value == '' || isNaN(gradeInput.value)) {
        alert('Grade cannot be empty or invalid type!');
        gradeInput.style.borderColor = '#ff474c';
    } else {
        gradeInput.style.borderColor = '#90ee90';
    }
})

addStudBtn.addEventListener('click', function(def) {
    def.preventDefault();
    
    const newStud = new Student(studInput.value, gradeInput.value);
    arrStuds.push(newStud); 
    console.log(arrStuds.length);
    if (listCount < arrStuds.length) {
        for (let x = listCount; x < arrStuds.length; x++) {
            let listItem = document.createElement('li');
            let studentData = arrStuds[x].getName() + ' - Grade: ' + arrStuds[x].getGrade();
            let data = document.createTextNode(studentData);
            listItem.append(data)
            console.log(arrStuds[x]);
            gradeList.append(listItem);
            listCount++;
        }
    }
})

let toggle = 0;

dispGradeBtn.addEventListener('click', function(def){
    def.preventDefault();
    let showList = document.querySelector('ol');
    if (toggle == 0) {
        showList.style.display = 'block';
        toggle = (toggle + 1) % 2;
    } else {
        showList.style.display = 'none';
        toggle = (toggle + 1) % 2;
    }
})

calcAvgBtn.addEventListener('click', function() {
    let avg = 0;
    for (let x = 0; x < arrStuds.length; x++) {
        avg += parseFloat(arrStuds[x].getGrade());
    }

    avg = avg / arrStuds.length;
    console.log(avg);
    avgOut.textContent = avg.toFixed(2);
})
