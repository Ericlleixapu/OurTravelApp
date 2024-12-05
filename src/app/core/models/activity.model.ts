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
    OTHER = "Other", // Otras actividades
  }
export interface Activity {
    _id?: string;
    name: string;
    description: string;
    travelId: string;
}

export const ActivityIcon: Record<ActivityType, string> = {
    [ActivityType.SIGHTSEEING]: "fa-archway",
    [ActivityType.ADVENTURE]: "fa-person-hiking",
    [ActivityType.RELAXATION]: "fa-spa",
    [ActivityType.CULTURAL]: "fa-landmark",
    [ActivityType.FOOD_AND_DRINK]: "fa-utensils",
    [ActivityType.SHOPPING]: "fa-bag-shopping",
    [ActivityType.NIGHTLIFE]: "fa-martini-glass-citrus",
    [ActivityType.SPORT]: "fa-basketball",
    [ActivityType.NATURE]: "fa-mountain-sun",
    [ActivityType.OTHER]: "fa-ellipsis",
  };