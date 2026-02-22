import { PackageStatus } from '@/contracts/package'

export interface RoutePackage {
    id: string;
    recipient: string;
    address: string;
    distance: string;
    priority: "Express" | "Urgente" | "Normal";
    status: PackageStatus;
    order: number;
}
export const routePackages: RoutePackage[] = [
    {
        id: "TRK-001234",
        recipient: "María García",
        address: "Av. Santa Fe 1234, Palermo",
        distance: "2.1 km",
        priority: "Normal",
        status: PackageStatus.AWAITING_CHECKIN,
        order: 1,
    },
    {
        id: "TRK-001235",
        recipient: "Carlos López",
        address: "Av. Cabildo 5678, Belgrano",
        distance: "3.5 km",
        priority: "Express",
        status: PackageStatus.AWAITING_CHECKIN,
        order: 2,
    },
    {
        id: "TRK-001237",
        recipient: "Roberto Silva",
        address: "Av. Corrientes 3456, Microcentro",
        distance: "0 km",
        priority: "Normal",
        status: PackageStatus.DELIVERED,
        order: 0,
    },
]

export const routeStatusColors = {
    [PackageStatus.DELIVERED]: "bg-green-500",
    [PackageStatus.IN_TRANSIT]: "bg-blue-500",
    [PackageStatus.OUT_FOR_DELIVERY]: "bg-orange-500",
    default: "bg-gray-500",
}

export const routePriorityColors = {
    "Express": "bg-red-500",
    "Urgente": "bg-orange-500",
    "Normal": "bg-blue-500",
    "default": "bg-gray-500",
}
