import { CheckCircle, Truck, Clock } from "lucide-react"

export interface PackageData {
    id: string
    description: string
    sender: string
    status: "Entregado" | "En reparto" | "En tránsito"
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
    status: "Disponible" | "En ruta" | "Ocupado"
}

export const warehouseDispatchCarriers: Carrier[] = [
    {
        id: "C001",
        name: "Juan Pérez",
        zone: "Zona Norte",
        capacity: 10,
        status: "Disponible",
    },
    {
        id: "C002",
        name: "María López",
        zone: "Zona Sur",
        capacity: 8,
        status: "Disponible",
    },
]

export const warehouseDispatchPackages: PackageData[] = [
    {
        id: "TRK-001234",
        description: "Libro JavaScript",
        sender: "Amazon",
        status: "En reparto",
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
        status: "En tránsito",
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
        status: "Entregado",
        date: "Ayer",
        progress: 100,
        zone: "Zona Sur",
        priority: "Normal",
        recipient: "Carlos Rodríguez",
        destination: "Caballito",
    },
]

export const warehouseDispatchStatusIconMap = {
    Entregado: {
        icon: CheckCircle,
        color: "text-green-500",
    },
    "En reparto": {
        icon: Truck,
        color: "text-blue-500",
    },
    "En tránsito": {
        icon: Clock,
        color: "text-orange-500",
    },
}
