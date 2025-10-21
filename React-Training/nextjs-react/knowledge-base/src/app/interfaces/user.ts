export interface UserLoginRequest {
  username: string,
  password: string
}

export interface FormFieldValidations {
  email?: string | null,
  username?: string | null,
  password?: string | null,
  confirmPassword?: string | null,
  server?: string | null
}

export interface UserLoginResponse {
  id: string,
  username: string,
  email: string,
  token: string
}

export interface UserStats {
  totalTasks: number;
  newTasksPercentage: number;
  activeTasksPercentage: number;
  completedTasksPercentage: number;
  totalCompliances: number;
  completedCompliances: number;
  totalHoursLogged: number;
  totalHoursWorkedForWeek: number;
  totalHoursWorkedForDay: number;
}