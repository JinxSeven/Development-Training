import { UserLoginResponse } from "../interfaces/user";

export function setUserLocalStorage(userRes: UserLoginResponse) {
  localStorage.setItem("Username", userRes.username);
  localStorage.setItem("Email", userRes.email);
  localStorage.setItem("Id", userRes.id);
  localStorage.setItem("Authorization", userRes.token);
}
