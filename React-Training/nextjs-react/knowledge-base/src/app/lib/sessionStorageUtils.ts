import { UserLoginResponse } from "../interfaces/user";

export function setUserSession(userRes: UserLoginResponse) {
  const user: Partial<UserLoginResponse> = {
    id: userRes.id,
    email: userRes.email,
    username: userRes.username
  }
  sessionStorage.setItem("User", JSON.stringify(user));
  sessionStorage.setItem("Authorization", userRes.token);
}

export function getUserSession(): Partial<UserLoginResponse> {
  const userDataStr = sessionStorage.getItem("User")
  return JSON.parse(userDataStr!)
}