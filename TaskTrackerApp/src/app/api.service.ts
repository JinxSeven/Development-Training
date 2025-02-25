import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './interfaces/user';
import { Task } from './interfaces/task';
import { Activity } from './interfaces/activity';
import { TaskData } from './interfaces/taskData';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    private editMode = new BehaviorSubject<boolean>(false);
    editMode$ = this.editMode.asObservable();

    dataToEdit!: TaskData | null;

    private loggedIn: boolean = false;

    isAuthenticated() { return this.loggedIn; }

    setAuthenticated(state: boolean) { this.loggedIn = state; }

    setEditMode(state: boolean) {
        this.editMode.next(state);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 200) {
            console.error(
                'Backend returned code 200, body was: ',
                JSON.stringify(error.error)
            );
        } else {
            console.error('An error occurred:', error.message);
        }
        return throwError(
            () => new Error('Something went wrong; please try again later.')
        );
    }

    LoggingUser(username: string, password: string): Observable<User> {
        return this.http.get<User>(
            `https://localhost:7042/api/User/GetLoggedUser?username=${username}&password=${password}`
        );
    }

    addNewUser(postData: User): Observable<any> {
        return this.http.post<any>(
            'https://localhost:7042/api/User/AddNewUser', postData
        );
    }

    getAdminList(): Observable<any> {
        return this.http.get<any>(
            `https://localhost:7042/api/User/GetAllAdminNames`
        )
    }

    getUserList(): Observable<any> {
        return this.http.get<any>(
            `https://localhost:7042/api/User/GetAllUserNames`
        )
    }

    addNewTask(postData: Task): Observable<any> {
        return this.http.post<any>(
            'https://localhost:7042/api/Task/AddNewTask', postData
        );
    }

    addNewActivity(postData: Activity): Observable<any> {
        return this.http.post<any>(
            'https://localhost:7042/api/Activity/AddNewActivity', postData
        );
    }

    getUserTasks(userId: string): Observable<any> {
        return this.http.get<any>(
            `https://localhost:7042/api/Task/GetTasks?userId=${userId}`
        );
    }

    getTaskActivities(taskId: string): Observable<Activity[]> {
        return this.http.get<any>(
            `https://localhost:7042/api/Activity/GetTaskActivities?taskId=${taskId}`
        );
    }

    async updateTaskState(taskId: string, newState: string): Promise<Response> {
        const link = `https://localhost:7042/api/Task/UpdateTaskState?taskId=${taskId}&taskState=${newState}`

        const response = await fetch(link, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    }

    updateTask(postData: Task): Observable<any> {
        return this.http.put<any>(
            'https://localhost:7042/api/Task/EditTask', postData
        );
    }

    deleteTask(taskId: string): Observable<any> {
        return this.http.delete<any>(
            `https://localhost:7042/api/Task/Delete?taskId=${taskId}`
        )
    }
}
