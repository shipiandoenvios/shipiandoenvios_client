import { PackageStatus } from '@/contracts/package'

export interface Package {
    id: string;
    recipient: string;
    destination: string;
    weight: string;
    priority: "Express" | "Urgente" | "Normal";
    status: PackageStatus;
}

export const assignedPackages: Package[] = [
    {
        id: "TRK-001234",
        recipient: "María García",
        destination: "Palermo",
        weight: "2.5 kg",
        priority: "Normal",
        status: PackageStatus.AWAITING_CHECKIN,
    },
    {
        id: "TRK-001235",
        recipient: "Carlos López",
        destination: "Belgrano",
        weight: "1.2 kg",
        priority: "Express",
        status: PackageStatus.AWAITING_CHECKIN,
    },
    {
        id: "TRK-001236",
        recipient: "Ana Martín",
        destination: "Recoleta",
        weight: "0.8 kg",
        priority: "Urgente",
        status: PackageStatus.OUT_FOR_DELIVERY,
    },
]
