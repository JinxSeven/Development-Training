import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../shared/interface.task';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.css',
})

export class TodoListComponent {
    taskData: Task[] = [];

    addNewTask(taskForm: NgForm) {
        const taskObj: Task = {
            taskName: taskForm.controls['taskName'].value,
            userName: taskForm.controls['userName'].value,
            taskStatus: false
        }
        this.taskData.push(taskObj);
        taskForm.reset();
    }

    onDeleteTask(index: number) {
        this.taskData.splice(index, 1);
    }

    onStatusChange(index: number) {
        const task = this.taskData[index];
        console.log(task);
    }
}
