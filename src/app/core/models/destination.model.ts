export interface Destination{
    _id?:string
    country: string; 
    location: string; 
    dateFrom: Date|null; 
    dateTo: Date|null;
    comment?:string;
    travelId:string
    imageUrl?:string
}