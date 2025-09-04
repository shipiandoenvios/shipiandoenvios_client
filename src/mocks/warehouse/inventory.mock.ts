import { Truck, CheckCircle, Clock } from "lucide-react"

export interface WarehouseInventoryPackageData {
  id: string
  description: string
  sender: string
  status: "Entregado" | "En reparto" | "En tránsito"
  date: string
  progress: number
  zone: string
  priority: "Normal" | "Express" | "Urgente"
  recipient: string
  destination: string
  weight: string
  daysInWarehouse: number
}

export const warehouseInventoryPackages: WarehouseInventoryPackageData[] = [
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
    weight: "2.5 kg",
    daysInWarehouse: 1
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
    weight: "1.2 kg",
    daysInWarehouse: 1
  },
  {
    id: "TRK-001236",
    description: "Medicamentos",
    sender: "Farmacia Online",
    status: "Entregado",
    date: "Ayer",
    progress: 100,
    zone: "Zona Sur",
    priority: "Urgente",
    recipient: "Carlos Rodríguez",
    destination: "Caballito",
    weight: "0.8 kg",
    daysInWarehouse: 2
  }
]

export const warehouseInventoryPriorityColorMap = {
  Express: "bg-red-500",
  Urgente: "bg-orange-500",
  Normal: "bg-blue-500",
}

export const warehouseInventoryStatusIconMap = {
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
