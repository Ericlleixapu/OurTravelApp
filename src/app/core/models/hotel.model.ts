import { Destination } from "./destination.model";
import { Travel } from "./travel.model";

export interface Hotel {
    _id?: string;
    name: string;
    destination: Destination|null;
    address?: string;
    comment?: string;
    travelId: string;
    hotelDocuments?: Document[];
}