import { PackageStatus } from '@/contracts/package'

export interface Package {
    id: string;
    recipient: string;
    destination: string;
    weight: string;
    priority: "Express" | "Urgente" | "Normal";
    status: PackageStatus;
}

// Only interfaces/types should remain here. All mock/example data has been removed as data now comes from the backend.