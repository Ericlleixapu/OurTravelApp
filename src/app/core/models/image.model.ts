import { User } from "./user.model";

export interface Image{
    _id?:string
    filename: string;
    description: string;
    owner: User | null;
    viewers?: User[];
    uploadedAt: Date;    
}