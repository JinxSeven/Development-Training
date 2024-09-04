"use strict";
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const roleInput = document.getElementById('role-select');
const addUserButton = document.getElementById('add-user-btn');
const mainList = document.getElementById('main-list');
function nameInputValidation() {
    if (nameInput.value == '') {
        nameInput.setAttribute('placeholder', "Name can't be empty!");
        nameInput.style.color = '';
    }
    else {
        nameInput.removeAttribute('placeholder');
    }
}
nameInput.addEventListener('blur', nameInputValidation);
class User {
    constructor(name, email, role) {
        this.name = name;
        this.email = email;
        this.role = role;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return this.role ? 'User' : 'Admin';
    }
    updateName(name) {
        this.name = name;
    }
    updateEmail(email) {
        this.email = email;
    }
    updateRole(role) {
        this.role = role;
    }
}
let userData = [];
let editMode = false;
let editIndx;
let editOL;
addUserButton.addEventListener('click', () => {
    if (editMode) {
        updateDataFunction();
        return;
    }
    let isUser = true;
    if (roleInput.value == 'admin')
        isUser = false;
    const newUser = new User(nameInput.value, emailInput.value, isUser);
    userData.push(newUser);
    const div = document.createElement('div');
    const listItem = document.createElement('li');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    deleteButton.innerText = 'Delete';
    listItem.innerHTML = `<p>${newUser.getName()}</p><p>${newUser.getEmail()}</p><p>${newUser.getRole()}</p>`;
    div.append(editButton);
    div.append(deleteButton);
    listItem.append(div);
    mainList.append(listItem);
    nameInput.value = '';
    emailInput.value = '';
    roleInput.value = 'admin';
    deleteButton.addEventListener('click', () => {
        deleteButtonFunction(deleteButton);
    });
    editButton.addEventListener('click', () => {
        editButtonFunction(editButton);
    });
});
function deleteButtonFunction(deleteButton) {
    const closestLi = deleteButton.closest('li');
    const oL = Array.from(closestLi.parentElement.children);
    const indx = oL.indexOf(closestLi);
    const parent = closestLi === null || closestLi === void 0 ? void 0 : closestLi.parentElement;
    parent === null || parent === void 0 ? void 0 : parent.removeChild(closestLi);
    userData.splice(indx, 1);
    nameInput.value = '';
    emailInput.value = '';
    roleInput.value = 'admin';
}
function editButtonFunction(editButton) {
    const closestLi = editButton.closest('li');
    const oL = Array.from(closestLi.parentElement.children);
    const indx = oL.indexOf(closestLi);
    nameInput.value = userData[indx].getName();
    emailInput.value = userData[indx].getEmail();
    roleInput.value = userData[indx].getRole() ? 'user' : 'admin';
    editMode = true;
    addUserButton.innerText = 'Update';
    editIndx = indx;
    editOL = oL;
}
function updateDataFunction() {
    userData[editIndx].updateName(nameInput.value);
    userData[editIndx].updateEmail(emailInput.value);
    let isUser = true;
    if (roleInput.value == 'admin')
        isUser = false;
    userData[editIndx].updateRole(isUser);
    const editListItem = editOL[editIndx];
    const pTags = editListItem.children;
    pTags[0].innerText = userData[editIndx].getName();
    pTags[1].innerText = userData[editIndx].getEmail();
    pTags[2].innerText = userData[editIndx].getRole();
    addUserButton.innerText = 'Add User';
    editMode = false;
    nameInput.value = '';
    emailInput.value = '';
    roleInput.value = 'admin';
}
