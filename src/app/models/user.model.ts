export interface User {
    id?: string;
    name: string;
    surname: string;
    alias: string;
    email: string;
    password?: string;
    travels?: string[];
}