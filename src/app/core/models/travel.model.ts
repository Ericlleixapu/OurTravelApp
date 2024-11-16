import { Activity } from "./activity.model";
import { Destination } from "./destination.model";
import { Expense } from "./expense.model";
import { Hotel } from "./hotel.model";
import { Image } from "./image.model";
import { Journey } from "./journey.model";
import { TravelDocument } from "./travel-document.model";
import { User } from "./user.model";

export class Travel {

    _id: string;
    name?: string;
    destinations: Destination[];
    journeys: Journey[];
    hotels: Hotel[];
    activities: Activity[];
    expenses: Expense[];
    images: Image[];
    documents: TravelDocument[];
    members: User[];
    createdBy: User;
    dateFrom?: Date|null; 
    dateTo?: Date|null;
    createdOn: Date;

    constructor(user:User){ 
        this._id="";
        this.destinations=[];
        this.journeys=[];
        this.hotels=[];
        this.activities = [];
        this.expenses=[];
        this.images=[];
        this.documents=[];
        this.members=[];
        this.members.push(user);
        this.createdBy=user;
        this.createdOn=new Date();
    }

}

