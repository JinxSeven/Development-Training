export interface FormFieldValidations {
  email?: string | null,
  username?: string | null,
  password?: string | null,
  confirmPassword?: string | null,
  server?: string | null
}

export interface UserLoginRequest {
  username: string,
  password: string
}

export interface UserLoginResponse {
  id: string,
  username: string,
  email: string
}
