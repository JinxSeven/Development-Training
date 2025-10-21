import { UserLoginRequest, UserLoginResponse } from "../interfaces/user";
import { setUserSession } from "../lib/sessionStorageUtils";

export async function authLogin(cred: UserLoginRequest): Promise<UserLoginResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_AUTH_CONTROLLER_NAME}/TokenAuth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cred),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Request failed (${res.status}): ${errorText || res.statusText}`
      );
    }

    const data = await res.json() 
    setUserSession(data)

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
