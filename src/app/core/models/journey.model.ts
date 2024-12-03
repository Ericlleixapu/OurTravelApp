import { Destination } from "./destination.model"

export enum JourneyType {
    Flight = "plane",
    Train = "train",
    Bus = "bus",
    Boat = "ship",
    Car = "car",
    Other = "shuttle-space"
}

export interface Journey {
    _id?: string
    locationFrom: string
    locationTo: string
    dateTimeFrom: Date
    dateTimeTo: Date
    comment?: string
    from: Destination | null
    to: Destination | null
    travelId: string
    journeyType: JourneyType
    journeyDocuments?: Document[]
    comments?: string
}