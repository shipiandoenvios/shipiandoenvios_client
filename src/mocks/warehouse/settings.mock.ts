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

// Only interfaces/types should remain here. All mock/example data has been removed as data now comes from the backend.
