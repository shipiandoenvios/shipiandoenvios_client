import { TrackingEventType } from '@/contracts/package'

export const defaultTrackingTimeline = [
  { status: TrackingEventType.CREATED, date: "14/01 09:30", completed: true },
  { status: TrackingEventType.IN_TRANSIT, date: "14/01 14:20", completed: true },
  { status: TrackingEventType.IN_WAREHOUSE, date: "15/01 08:15", completed: true },
  { status: TrackingEventType.OUT_FOR_DELIVERY, date: "16/01 14:30", completed: false, current: true },
  { status: TrackingEventType.DELIVERED, date: "Estimado 16:30", completed: false },
]

export const defaultCurrentLocation = "En tránsito"
import { CheckCircle, Truck, Clock } from "lucide-react"
import { PackageStatus } from '@/contracts/package'

export interface PackageData {
  id: string;
  description: string;
  sender: string;
  status: PackageStatus;
  date: string;
  progress: number;
}

export interface TrackingData extends PackageData {
  estimatedDate: string;
  currentLocation: string;
  timeline: Array<{
    status: TrackingEventType;
    date: string;
    completed: boolean;
    current?: boolean;
  }>;
}

export const packages: PackageData[] = [
  {
    id: "TRK-001234",
    description: "Libro JavaScript",
    sender: "Amazon",
    status: PackageStatus.OUT_FOR_DELIVERY,
    date: "Hoy 16:30",
    progress: 90,
  },
  {
    id: "TRK-001235",
    description: "Auriculares Bluetooth",
    sender: "MercadoLibre",
    status: PackageStatus.IN_TRANSIT,
    date: "Mañana",
    progress: 60,
  },
  {
    id: "TRK-001236",
    description: "Medicamentos",
    sender: "Farmacia Online",
    status: PackageStatus.DELIVERED,
    date: "Ayer",
    progress: 100,
  },
]

export const packageStatusIcons = {
  [PackageStatus.DELIVERED]: CheckCircle,
  [PackageStatus.OUT_FOR_DELIVERY]: Truck,
  [PackageStatus.IN_TRANSIT]: Clock,
}

export const packageStatusColors: { [key: string]: string } = {
  [PackageStatus.DELIVERED]: "bg-green-500",
  [PackageStatus.OUT_FOR_DELIVERY]: "bg-logistics-primary",
  [PackageStatus.IN_TRANSIT]: "bg-orange-500",
  default: "bg-gray-500",
}
