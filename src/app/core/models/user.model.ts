export interface User {
    _id: string;
    name: string;
    surname: string;
    alias: string;
    email: string;
    profileImage?: string;
    profileImageUrl?: string;
    password?: string;
    travels?: string[];
}