import { Truck, CheckCircle, Clock } from "lucide-react"
import { PackageStatus } from '@/contracts/package'

export interface WarehouseInventoryPackageData {
  id: string
  description: string
  sender: string
  status: PackageStatus
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
    status: PackageStatus.OUT_FOR_DELIVERY,
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
    status: PackageStatus.IN_TRANSIT,
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
    status: PackageStatus.DELIVERED,
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
