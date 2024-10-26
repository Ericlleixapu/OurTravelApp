export interface Travel {
    id?: string;
    name: string;
    destinations: { location: string; date: Date }[];
    activities: { name: string; date: Date; description?: string }[];
    budget: number;
    members: string[]; // Array d'IDs d'usuaris
    createdBy: string; // ID de l'usuari creador
}