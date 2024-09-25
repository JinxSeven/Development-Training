import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root',
})

export class UserService {
    constructor() {}

    getUserLoginData(): User[] {
        const userData = localStorage.getItem("userLoginData");
        return userData ? JSON.parse(userData) : [];
    }

    setUserLoginData(updatedUserData: User[]) {
        localStorage.setItem("userLoginData", JSON.stringify(updatedUserData));
        console.log(updatedUserData);
    }

    authenticateUserCreds(userEmail: string, userPass: string): number {
        const userData = this.getUserLoginData();
        console.log(userData);
        console.log(userEmail);
        console.log(userPass);
        let indx: number = -1;
        for (let x = 0; x < userData.length; x++) {
            console.log(userData[x].email);
            if (userData[x].email == userEmail) {
                indx = x;
                break;
            }
        }
        if (indx < 0) return indx;
        if (userData[indx].password == userPass) {
            return 0;
        }
        return 1;
    }
}
