let todoButton = document.getElementById('add-todo-task');
let taskInput = document.getElementById('todo-input');
let taskList = document.querySelector('ul');

todoButton.addEventListener('click', function() {
    let taskItem = document.createElement('li');
    let taskCheck = document.createElement('input');
    let taskButton = document.createElement('button');
    taskButton.innerText = 'Delete';
    taskButton.setAttribute('class', 'delete-button')

    taskCheck.setAttribute('type', 'checkbox');
    taskCheck.setAttribute('class', 'check-box');
    taskItem.append(taskCheck);
    taskItem.append(taskInput.value);
    taskItem.append(taskButton);

    taskList.append(taskItem);
    taskCheck.addEventListener('changed', function() {
        if (taskCheck.checked) {
            taskItem.style.textDecoration = 'line-through';
        }else{
            taskItem.style.textDecoration = 'none';
        }
    })
})

let deleteButton = document.getElementsByClassName('delete-button')

deleteButton.addEventListener('click', function deleteTask() {
    
})
