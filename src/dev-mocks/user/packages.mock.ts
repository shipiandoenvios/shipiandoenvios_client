export const defaultTrackingTimeline = [
  { status: "Paquete recibido", date: "14/01 09:30", completed: true },
  { status: "En tránsito", date: "14/01 14:20", completed: true },
  { status: "En depósito", date: "15/01 08:15", completed: true },
  { status: "En reparto", date: "16/01 14:30", completed: false, current: true },
  { status: "Entregado", date: "Estimado 16:30", completed: false },
]

export const defaultCurrentLocation = "En tránsito"
import { CheckCircle, Truck, Clock } from "lucide-react"

export interface PackageData {
  id: string;
  description: string;
  sender: string;
  status: "Entregado" | "En reparto" | "En tránsito";
  date: string;
  progress: number;
}

export interface TrackingData extends PackageData {
  estimatedDate: string;
  currentLocation: string;
  timeline: Array<{
    status: string;
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
    status: "En reparto",
    date: "Hoy 16:30",
    progress: 90,
  },
  {
    id: "TRK-001235",
    description: "Auriculares Bluetooth",
    sender: "MercadoLibre",
    status: "En tránsito",
    date: "Mañana",
    progress: 60,
  },
  {
    id: "TRK-001236",
    description: "Medicamentos",
    sender: "Farmacia Online",
    status: "Entregado",
    date: "Ayer",
    progress: 100,
  },
]

export const packageStatusIcons = {
  "Entregado": CheckCircle,
  "En reparto": Truck,
  "En tránsito": Clock,
}

export const packageStatusColors: { [key: string]: string } = {
  "Entregado": "bg-green-500",
  "En reparto": "bg-logistics-primary",
  "En tránsito": "bg-orange-500",
  "default": "bg-gray-500",
}
