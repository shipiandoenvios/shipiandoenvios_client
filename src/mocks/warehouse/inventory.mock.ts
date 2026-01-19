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

// Only interfaces/types should remain here. All mock/example data has been removed as data now comes from the backend.

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
