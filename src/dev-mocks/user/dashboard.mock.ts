import { Package, Truck, MapPin, User } from "lucide-react"
import { ActiveSection } from "@/app/[locale]/user/page"

export const userStats: Array<{
  title: string;
  value: string;
  icon: any;
  color: string;
  bgColor: string;
  section: ActiveSection;
}> = [
  {
    title: "Paquetes Activos",
    value: "3",
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    section: "packages" as ActiveSection,
  },
  {
    title: "En Reparto",
    value: "1",
    icon: Truck,
    color: "text-green-600",
    bgColor: "bg-green-50",
    section: "packages" as ActiveSection,
  },
  {
    title: "Direcciones",
    value: "2",
    icon: MapPin,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    section: "addresses" as ActiveSection,
  },
  {
    title: "Mi Perfil",
    value: "Completo",
    icon: User,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    section: "profile" as ActiveSection,
  },
]

export const userRecentActivity = [
  {
    icon: Package,
    bgColor: "bg-blue-50",
    color: "text-blue-600",
    title: "Nuevo paquete recibido",
    description: "TRK-001234 - Libro JavaScript",
    time: "Hace 2 horas",
  },
  {
    icon: Truck,
    bgColor: "bg-green-50",
    color: "text-green-600",
    title: "Paquete en reparto",
    description: "TRK-001235 - Auriculares Bluetooth",
    time: "Hace 5 horas",
  },
]
