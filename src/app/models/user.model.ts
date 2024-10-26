export interface User {
    id?: string;
    name: string;
    surname: string;
    alias: string;
    email: string;
    password?: string; // Opcional, ja que no es farà servir en el frontend
    travels?: string[]; // Array d'IDs de viatges
}