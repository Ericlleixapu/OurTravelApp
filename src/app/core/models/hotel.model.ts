import { Destination } from "./destination.model";
import { Travel } from "./travel.model";

export interface Hotel {
    _id?: string;
    name: string;
    destination: Destination;
    address?: string;
    comment?: string;
    travelId: string;
    hotelDocuments?: Document[];
}