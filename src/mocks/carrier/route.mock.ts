export interface RoutePackage {
    id: string;
    recipient: string;
    address: string;
    distance: string;
    priority: "Express" | "Urgente" | "Normal";
    status: "Entregado" | "En camino" | "Pendiente";
    order: number;
}
export const routePackages: RoutePackage[] = [
    {
        id: "TRK-001234",
        recipient: "María García",
        address: "Av. Santa Fe 1234, Palermo",
        distance: "2.1 km",
        priority: "Normal",
        status: "Pendiente",
        order: 1,
    },
    {
        id: "TRK-001235",
        recipient: "Carlos López",
        address: "Av. Cabildo 5678, Belgrano",
        distance: "3.5 km",
        priority: "Express",
        status: "Pendiente",
        order: 2,
    },
    {
        id: "TRK-001237",
        recipient: "Roberto Silva",
        address: "Av. Corrientes 3456, Microcentro",
        distance: "0 km",
        priority: "Normal",
        status: "Entregado",
        order: 0,
    },
]

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
