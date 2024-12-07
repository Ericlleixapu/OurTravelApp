export interface Destination{
    _id?:string
    country: string; 
    location: string; 
    dateFrom: Date; 
    dateTo: Date;
    comment?:string;
    travelId:string
    imageUrl?:string
}