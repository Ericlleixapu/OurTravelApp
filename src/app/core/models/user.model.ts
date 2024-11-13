export interface User {
    _id: string;
    name: string;
    surname: string;
    alias: string;
    email: string;
    profileImage?: string;
    password?: string;
    travels?: string[];
}