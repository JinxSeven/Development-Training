import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TaskFieldsComponent } from './task-fields/task-fields.component';
import { TaskTrackerComponent } from './task-tracker/task-tracker.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: "", component:LoginComponent},
    {path: "login", component:LoginComponent},
    {path: "register", component:RegisterComponent},
    {path: "taskfields", component:TaskFieldsComponent, canActivate: [authGuard]},
    {path: "tasktracker", component:TaskTrackerComponent, canActivate: [authGuard]}
];
