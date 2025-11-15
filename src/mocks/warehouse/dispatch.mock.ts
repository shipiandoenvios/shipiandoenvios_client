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

// Only interfaces/types should remain here. All mock/example data has been removed as data now comes from the backend.
