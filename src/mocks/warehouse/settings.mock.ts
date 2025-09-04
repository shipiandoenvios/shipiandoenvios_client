export interface WarehouseAuthorizedUser {
    id: number;
    name: string;
    role: string;
    shift: string;
    status: "Activo" | "Inactivo";
}

export interface WarehouseZone {
    id: number;
    name: string;
    areas: string[];
}

export const warehouseSettingsAuthorizedUsers: WarehouseAuthorizedUser[] = [
    { id: 1, name: "Ana López", role: "Operador", shift: "Mañana", status: "Activo" },
    { id: 2, name: "Carlos Mendoza", role: "Supervisor", shift: "Tarde", status: "Activo" },
    { id: 3, name: "María Fernández", role: "Operador", shift: "Noche", status: "Inactivo" },
]

export const warehouseSettingsZones: WarehouseZone[] = [
    { id: 1, name: "Zona Norte", areas: ["Palermo", "Belgrano", "Núñez", "Recoleta"] },
    { id: 2, name: "Zona Sur", areas: ["San Telmo", "La Boca", "Barracas"] },
    { id: 3, name: "Zona Oeste", areas: ["Caballito", "Flores", "Almagro"] },
]
