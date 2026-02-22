import { Package, Truck, Clock, TrendingUp } from "lucide-react"
import { PackageStatus } from '@/contracts/package'

export const stats = [
    { title: "Envíos Hoy", value: "127", icon: Package, color: "bg-blue-500" },
    { title: "En Tránsito", value: "45", icon: Truck, color: "bg-yellow-500" },
    { title: "Entregados", value: "82", icon: TrendingUp, color: "bg-green-500" },
    { title: "Retrasos", value: "8", icon: Clock, color: "bg-red-500" },
]

export const recentShipments = [
    { id: "ENV-001", client: "Juan Pérez", status: PackageStatus.IN_TRANSIT, destination: "Palermo" },
    { id: "ENV-002", client: "María García", status: PackageStatus.DELIVERED, destination: "Belgrano" },
    { id: "ENV-003", client: "Carlos López", status: PackageStatus.CREATED, destination: "San Telmo" },
    { id: "ENV-004", client: "Ana Martín", status: PackageStatus.IN_TRANSIT, destination: "Recoleta" },
]

export const alerts = [
    {
        type: "error",
        title: "Retraso en ruta Microcentro-Zona Norte",
        description: "8 envíos afectados - Estimado 2h de retraso",
    },
    {
        type: "warning",
        title: "Mantenimiento programado",
        description: "Sistema de rastreo - Mañana 02:00-04:00",
    },
    {
        type: "info",
        title: "Nuevo cliente registrado",
        description: "Empresa ABC S.L. - Requiere configuración",
    },
]

export const lastUpdate = "2 min"
