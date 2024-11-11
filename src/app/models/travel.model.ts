import { User } from "./user.model";

export enum travelType {
    vacation = "Vacances",
    roadtrip = "Roadtrip",
    cruise = "Creuer",
    getaway = "Escapada curta",
    relax = "Viatge de Relax",
    other = "Altres"
};

export class Travel {

    id?: string;
    name: string;
    country: string;
    description?:string;
    travelType: travelType;
    dateFrom: Date; 
    dateTo: Date;
    destinations: { location: string; dateFrom: Date; dateTo: Date }[];
    members: User[];
    createdBy: User;
    createdOn: Date;

    constructor(user:User){ 
        this.name="";
        this.country="";
        this.travelType=travelType.other;
        this.dateFrom=new Date();
        this.dateTo=new Date();
        this.destinations=[];
        this.members=[];
        this.createdBy=user;
        this.createdOn=new Date();
    }

    static getTypes(){
        return Object.values(travelType);
    }
}

