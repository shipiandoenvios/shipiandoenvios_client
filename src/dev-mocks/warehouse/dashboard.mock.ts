import { Package, PackageCheck, Truck, Clock } from "lucide-react"

export const warehouseStats = [
    { title: "Paquetes Recibidos Hoy", value: "47", icon: PackageCheck, color: "text-green-600" },
    { title: "En Depósito", value: "325", icon: Package, color: "text-blue-600" },
    { title: "Despachados Hoy", value: "32", icon: Truck, color: "text-orange-600" },
    { title: "Tiempo Promedio", value: "1.2h", icon: Clock, color: "text-purple-600" },
]

export const warehouseRecentActivity = [
    { id: "TRK-001245", action: "Paquete recibido", time: "15:45", user: "Ana López" },
    { id: "TRK-001244", action: "Despachado a Roberto", time: "15:30", user: "Carlos Mendoza" },
    { id: "TRK-001243", action: "Entrega completada", time: "15:15", user: "Laura Jiménez" },
]

export const warehouseUrgentPackages = [
    { id: "TRK-001240", recipient: "Carlos Mendoza", destination: "Microcentro", days: 2 },
    { id: "TRK-001238", recipient: "Sofia Torres", destination: "Palermo", days: 3 },
]
