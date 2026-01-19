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

export const warehouseDispatchCarriers: Carrier[] = [
    {
        id: "C001",
        name: "Juan Pérez",
        zone: "Zona Norte",
        capacity: 10,
        status: DriverStatus.ACTIVE,
    },
    {
        id: "C002",
        name: "María López",
        zone: "Zona Sur",
        capacity: 8,
        status: DriverStatus.ACTIVE,
    },
]

export const warehouseDispatchPackages: PackageData[] = [
    {
        id: "TRK-001234",
        description: "Libro JavaScript",
        sender: "Amazon",
        status: PackageStatus.OUT_FOR_DELIVERY,
        date: "Hoy 16:30",
        progress: 90,
        zone: "Zona Norte",
        priority: "Normal",
        recipient: "María García",
        destination: "Palermo",
    },
    {
        id: "TRK-001235",
        description: "Auriculares Bluetooth",
        sender: "MercadoLibre",
        status: PackageStatus.IN_TRANSIT,
        date: "Mañana",
        progress: 60,
        zone: "Zona Norte",
        priority: "Express",
        recipient: "Ana Martín",
        destination: "Belgrano",
    },
    {
        id: "TRK-001236",
        description: "Medicamentos",
        sender: "Farmacia Online",
        status: PackageStatus.DELIVERED,
        date: "Ayer",
        progress: 100,
        zone: "Zona Sur",
        priority: "Normal",
        recipient: "Carlos Rodríguez",
        destination: "Caballito",
    },
]

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
