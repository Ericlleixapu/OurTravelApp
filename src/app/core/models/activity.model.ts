import { Destination } from "./destination.model";

export enum ActivityType {
    SIGHTSEEING = "Sightseeing", // Visitas turísticas
    ADVENTURE = "Adventure", // Actividades de aventura
    RELAXATION = "Relaxation", // Relajación
    CULTURAL = "Cultural", // Eventos culturales
    FOOD_AND_DRINK = "FoodAndDrink", // Gastronomía y bebidas
    SHOPPING = "Shopping", // Compras
    NIGHTLIFE = "Nightlife", // Vida nocturna
    SPORT = "Sport", // Actividades deportivas
    NATURE = "Nature", // Conexión con la naturaleza
    ATTRACTION = "Attraction", // Actividades de atracción
    OTHER = "Other", // Otras actividades
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