import { Package, CheckCircle, Clock, MapPin } from "lucide-react"
export const stats = [
    { title: "Paquetes Asignados", value: "15", icon: Package, color: "text-blue-600" },
    { title: "Entregados", value: "8", icon: CheckCircle, color: "text-green-600" },
    { title: "Pendientes", value: "7", icon: Clock, color: "text-orange-600" },
    { title: "Próxima Parada", value: "2.1km", icon: MapPin, color: "text-purple-600" },
]

export const nextDeliveries = [
    {
        id: "TRK-001234",
        recipient: "María García",
        address: "Av. Santa Fe 1234, Palermo",
        distance: "2.1 km",
        priority: "Normal",
    },
    {
        id: "TRK-001235",
        recipient: "Carlos López",
        address: "Av. Cabildo 5678, Belgrano",
        distance: "3.5 km",
        priority: "Express",
    },
]

export const userInfo = {
    name: "Roberto",
    lastName: "Sánchez",
    email: "roberto.sanchez@example.com",
    phone: "+54 9 11 2345-6789",
    vehicle: "ABC-123",
    pendingPackages: 7,
}
