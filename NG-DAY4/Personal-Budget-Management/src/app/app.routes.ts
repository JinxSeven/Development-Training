import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewUserComponent } from './new-user/new-user.component';

export const routes: Routes = [
    {path: "", component:LoginPageComponent},
    {path: "register", component:NewUserComponent}
];
