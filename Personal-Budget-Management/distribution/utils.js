export function validateEmailInput(emailInput, errorDisplay) {
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
export function validatePassInput(passwordInput, errorDisplay) {
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
export function getUsersFromLocalStorage() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}
export function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}
export function getCurrentLoggedUser() {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser)
        return loggedUser;
    else
        return '';
}
export function setCurrentLoggedUser(loggedUser) {
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
}
export function isEmailDuplicate(email) {
    const users = getUsersFromLocalStorage();
    for (const user of users) {
        if (user.email === email) {
            return true;
        }
        ;
    }
    return false;
}
