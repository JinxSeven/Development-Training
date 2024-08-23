let todoButton = document.getElementById('add-todo-task');
let taskInput = document.getElementById('todo-input');
let taskList = document.querySelector('ul');

todoButton.addEventListener('click', function() {
    let taskItem = document.createElement('li');
    let taskCheck = document.createElement('input');

    taskCheck.setAttribute('type', 'checkbox');
    taskItem.appendChild(taskCheck);
    taskItem.innerText = taskInput.value;

    taskList.append(taskItem);
    console.log(taskList.innerHTML);
})
