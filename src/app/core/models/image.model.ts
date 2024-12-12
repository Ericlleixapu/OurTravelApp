import { User } from "./user.model";

export interface Image{
    _id?:string
    filename: string;
    imageUrl: string;
    fileType: string;
    description?: string;
    owner: User;
    viewers?: User[];
    comments: string[];
    uploadedAt?: Date;    
    travelId: string
}