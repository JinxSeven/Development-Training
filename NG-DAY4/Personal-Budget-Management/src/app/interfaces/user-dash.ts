export interface UserDash {
    email: string;
    income: number;
    expense: number;
    transactions: Transaction[];
    goals: Goal[];
}

export interface Transaction {
    type: string;
    amount: number;
    date: string;
    category: string;
}

export interface Goal {
    name: string;
    target: number;
    contribution: number;
}
