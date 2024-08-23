let todoButton = document.getElementById('add-todo-task');
let taskInput = document.getElementById('todo-input');
let taskList = document.querySelector('ul');

todoButton.addEventListener('click', function() {
    let taskItem = document.createElement('li');
    let taskCheck = document.createElement('input');
    let deleteButton = document.createElement('button');
    let p = document.createElement('p');
    
    if (taskInput.value == '') {
        alert('Enter task before adding!'); 
        taskList.removeChild(taskItem);
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
        } else{
            taskItem.style.textDecoration = 'none';
        }
    })

    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
    })
})
