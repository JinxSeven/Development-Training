export interface Task {
    id: number,
    userId: number,
    clientName: string,
    projectName: string,
    taskTitle: string,
    hours: number,
    dateTime: Date,
    assignedTo: string,
    assignedBy: string,
    supportType: string,
    priority: string,
    description: string
}
