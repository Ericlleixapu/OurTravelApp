import { User } from "./user.model";

export interface Image{
    filename: string;
    description: string;
    owner: User | null;
    viewers?: User[];
    uploadedAt: number;    
}