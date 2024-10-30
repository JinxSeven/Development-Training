import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from './interfaces/user';
import { Task } from './interfaces/task';
import { Activity } from './interfaces/activity';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    editMode: boolean = false;
    dataToEdit: any;

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
            `https://localhost:7042/api/User/Login?username=${username}&password=${password}`
        );
    }

    addNewUser(postData: User): Observable<any> {
        return this.http.post<any>(
            'https://localhost:7042/api/User', postData
        );
    }

    addNewTask(postData: Task): Observable<any> {
        return this.http.post<any>(
            'https://localhost:7042/api/Task/Post', postData
        );
    }

    addNewActivity(postData: Activity): Observable<any> {
        return this.http.post<any>(
            'https://localhost:7042/api/Activity/Post', postData
        );
    }

    getUserTasks(userId: number): Observable<any> {
        return this.http.get<any>(
            `https://localhost:7042/api/Task/Get?user_id=${userId}`
        );
    }

    getTaskActivities(taskId: number): Observable<any> {
        return this.http.get<any>(
            `https://localhost:7042/api/Activity/Get?taskId=${taskId}`
        );
    }

    updateTask(postData: Task): Observable<any> {
        return this.http.put<any>(
            'https://localhost:7042/api/Task/Edit', postData
        );
    }

    deleteTask(taskId: number): Observable<any> {
        return this.http.delete<any>(
            `https://localhost:7042/api/Task/Delete?taskId=${taskId}`
        )
    }
}
