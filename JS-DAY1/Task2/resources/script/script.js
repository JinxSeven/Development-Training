let todoButton = document.getElementById('add-todo-task');
let taskInput = document.getElementById('todo-input');
let taskList = document.querySelector('ul');

taskInput.addEventListener('blur', function() {
    if (taskInput.value == '') {
        document.getElementById('task-err').style.opacity = '1';
        taskInput.style.borderColor = 'rgb(218, 43, 43)'
        taskList.removeChild(taskItem);
    } else {
        document.getElementById('task-err').style.opacity = '0';
        taskInput.style.borderColor = '#d8d8d8';
    }
})

todoButton.addEventListener('click', function() {
    let taskItem = document.createElement('li');
    let taskCheck = document.createElement('input');
    let deleteButton = document.createElement('button');
    let p = document.createElement('p');
    
    if (taskInput.value == '') {
        document.getElementById('task-err').style.opacity = '1';
        taskInput.style.borderColor = 'rgb(218, 43, 43)'
        taskList.removeChild(taskItem);
    } else {
        document.getElementById('task-err').style.opacity = '0';
        taskInput.style.borderColor = '#d8d8d8';
    }

    p.innerText = taskInput.value;
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('class', 'delete-button')

    taskCheck.setAttribute('type', 'checkbox');
    taskCheck.setAttribute('class', 'check-box');

    taskItem.append(taskCheck);
    taskItem.append(p);
    taskItem.append(deleteButton);

    taskList.append(taskItem);

    taskCheck.addEventListener('change', function() {
        if (taskCheck.checked) {
            p.style.textDecoration = 'line-through';
        } else {
            p.style.textDecoration = 'none';
        }
    })

    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
    })
})
