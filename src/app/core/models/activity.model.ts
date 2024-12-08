import { Destination } from "./destination.model";

export enum ActivityType {
  SIGHTSEEING = "Visites turístiques", // Sightseeing
  ADVENTURE = "Aventura", // Adventure
  RELAXATION = "Relaxació", // Relaxation
  CULTURAL = "Cultural", // Cultural
  FOOD_AND_DRINK = "Gastronomia i begudes", // Food and Drink
  SHOPPING = "Compres", // Shopping
  NIGHTLIFE = "Vida nocturna", // Nightlife
  SPORT = "Esport", // Sport
  NATURE = "Connexió amb la natura", // Nature
  ATTRACTION = "Atraccións", // Attraction
  OTHER = "Altres activitats", // Other
}
export interface Activity {
  _id?: string;
  name: string;
  type: ActivityType;
  description: string;
  date: Date;
  destination?: Destination;
  comment?: string;
  travelId: string;
}

export const ActivityIcon: Record<ActivityType, string> = {
  [ActivityType.SIGHTSEEING]: "archway",
  [ActivityType.ADVENTURE]: "person-hiking",
  [ActivityType.RELAXATION]: "spa",
  [ActivityType.CULTURAL]: "landmark",
  [ActivityType.FOOD_AND_DRINK]: "utensils",
  [ActivityType.SHOPPING]: "bag-shopping",
  [ActivityType.NIGHTLIFE]: "martini-glass-citrus",
  [ActivityType.SPORT]: "basketball",
  [ActivityType.NATURE]: "mountain-sun",
  [ActivityType.ATTRACTION]: "rocket",
  [ActivityType.OTHER]: "ellipsis",
};