export interface User {
    userName: string;
    email: string;
    password: string;
}

export interface UserDash {
    name: string;
    email: string;
    totalIncome: number;
    totalExpense: number;
    balance: number;
    goals: Goal[];
    bills: Bill[];
    transactions: Transaction[];
}

export interface Goal {
    name: string;
    target: number;
    initialContribution: number;
}

export interface Bill {
    name: string;
    amount: number;
    dueDate: string;
}

export interface Transaction {
    type: 'income' | 'expense';
    amount: number;
    date: string;
    purpose: string;
}

export interface LoggedUser {
    email: string;
}

export function validateEmailInput(emailInput: HTMLInputElement, errorDisplay: HTMLParagraphElement): boolean {
    const email = emailInput.value.trim();
    const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        emailInput.style.borderColor = 'rgb(218, 43, 43)';
        errorDisplay.innerText = 'Email field empty!';
        errorDisplay.style.opacity = '1';
        return false;
    }
    if (!regEx.test(email)) {
        emailInput.style.borderColor = 'rgb(218, 43, 43)';
        errorDisplay.innerText = 'Invalid email!';
        errorDisplay.style.opacity = '1';
        return false;
    }
    // errorDisplay.innerText = 'Invalid username or password!';
    errorDisplay.style.opacity = '0';
    emailInput.style.borderColor = '#d8d8d8';
    return true;
}

export function validatePassInput(passwordInput: HTMLInputElement, errorDisplay: HTMLParagraphElement): boolean {
    const email = passwordInput.value.trim();

    if (!email) {
        passwordInput.style.borderColor = 'rgb(218, 43, 43)';
        errorDisplay.innerText = 'Password field empty!';
        errorDisplay.style.opacity = '1';
        return false;
    }
    // errorDisplay.innerText = 'Invalid username or password!';
    errorDisplay.style.opacity = '0';
    passwordInput.style.borderColor = '#d8d8d8';
    return true;
}

export function getUsersFromLocalStorage(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

export function saveUsersToLocalStorage(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
}

export function getCurrentLoggedUser(): string {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) return loggedUser;
    else return '';
}

export function setCurrentLoggedUser(loggedUser: LoggedUser) {
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
}

export function isEmailDuplicate(email: string): boolean {
    const users = getUsersFromLocalStorage();
    for (const user of users) {
        if (user.email === email) {
            return true
        };
    }
    return false;
}
