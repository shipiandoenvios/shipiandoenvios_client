import { DriverStatus } from '@/contracts/user'

export interface WarehouseAuthorizedUser {
    id: number;
    name: string;
    role: string;
    shift: string;
    status: DriverStatus | string;
}

export interface WarehouseZone {
    id: number;
    name: string;
    areas: string[];
}

export const warehouseSettingsAuthorizedUsers: WarehouseAuthorizedUser[] = [
    { id: 1, name: "Ana López", role: "Operador", shift: "Mañana", status: DriverStatus.ACTIVE },
    { id: 2, name: "Carlos Mendoza", role: "Supervisor", shift: "Tarde", status: DriverStatus.ACTIVE },
    { id: 3, name: "María Fernández", role: "Operador", shift: "Noche", status: DriverStatus.OUT_OF_SERVICE },
]

export const warehouseSettingsZones: WarehouseZone[] = [
    { id: 1, name: "Zona Norte", areas: ["Palermo", "Belgrano", "Núñez", "Recoleta"] },
    { id: 2, name: "Zona Sur", areas: ["San Telmo", "La Boca", "Barracas"] },
    { id: 3, name: "Zona Oeste", areas: ["Caballito", "Flores", "Almagro"] },
]
