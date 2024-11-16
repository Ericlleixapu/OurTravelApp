import { Destination } from "./destination.model";

export interface Hotel {
    _id: string;
    name: string;
    location: Destination;
    
    travelId: string;
}