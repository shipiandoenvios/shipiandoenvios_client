import { CheckCircle, Truck, Clock } from "lucide-react"
import { PackageStatus } from '@/contracts/package'
import { DriverStatus } from '@/contracts/user'

export interface PackageData {
    id: string
    description: string
    sender: string
    status: PackageStatus
    date: string
    progress: number
    zone: string
    priority: "Normal" | "Express"
    recipient: string
    destination: string
}

export interface Carrier {
    id: string
    name: string
    zone: string
    capacity: number
    status: DriverStatus | string
}

export const warehouseDispatchStatusIconMap = {
    [PackageStatus.DELIVERED]: {
        icon: CheckCircle,
        color: "text-green-500",
    },
    [PackageStatus.OUT_FOR_DELIVERY]: {
        icon: Truck,
        color: "text-blue-500",
    },
    [PackageStatus.IN_TRANSIT]: {
        icon: Clock,
        color: "text-orange-500",
    },
}

// Only interfaces/types should remain here. All mock/example data has been removed as data now comes from the backend.
