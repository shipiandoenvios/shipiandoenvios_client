export interface RoutePackage {
    id: string;
    recipient: string;
    address: string;
    distance: string;
    priority: "Express" | "Urgente" | "Normal";
    status: "Entregado" | "En camino" | "Pendiente";
    order: number;
}

export const routeStatusColors = {
    "Entregado": "bg-green-500",
    "En camino": "bg-blue-500",
    "Pendiente": "bg-orange-500",
    "default": "bg-gray-500",
}

export const routePriorityColors = {
    "Express": "bg-red-500",
    "Urgente": "bg-orange-500",
    "Normal": "bg-blue-500",
    "default": "bg-gray-500",
}

// Only interfaces/types should remain here. All mock/example data has been removed as data now comes from the backend.
