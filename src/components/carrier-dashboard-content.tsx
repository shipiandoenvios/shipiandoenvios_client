import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, CheckCircle, Clock, MapPin, Navigation, Target } from "lucide-react"

type PriorityType = "Express" | "Urgente" | "Normal";

export function CarrierDashboardContent() {
  const stats = [
    { title: "Paquetes Asignados", value: "15", icon: Package, color: "text-blue-600" },
    { title: "Entregados", value: "8", icon: CheckCircle, color: "text-green-600" },
    { title: "Pendientes", value: "7", icon: Clock, color: "text-orange-600" },
    { title: "Próxima Parada", value: "2.1km", icon: MapPin, color: "text-purple-600" },
  ]

  const nextDeliveries = [
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

  const getPriorityColor = (priority: PriorityType) => {
    switch (priority) {
      case "Express":
        return "bg-red-500"
      case "Urgente":
        return "bg-orange-500"
      case "Normal":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Mi Jornada</h1>
        <p className="text-xl text-gray-600">Bienvenido Roberto, tienes 7 entregas pendientes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg bg-logistics-primary text-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Target className="w-6 h-6" />
            Acciones Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="secondary" className="h-16 bg-white/20 hover:bg-white/30 text-white border-white/30">
              <MapPin className="w-6 h-6 mr-3" />
              <div className="text-left">
                <p className="font-medium">Ver Mi Ruta</p>
                <p className="text-xs opacity-80">7 paradas restantes</p>
              </div>
            </Button>
            <Button variant="secondary" className="h-16 bg-white/20 hover:bg-white/30 text-white border-white/30">
              <CheckCircle className="w-6 h-6 mr-3" />
              <div className="text-left">
                <p className="font-medium">Entregar Paquete</p>
                <p className="text-xs opacity-80">Escanear código</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Next Deliveries */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-logistics-primary" />
            Próximas Entregas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nextDeliveries.map((delivery) => (
              <div key={delivery.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-l-logistics-primary">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-logistics-primary">{delivery.id}</span>
                    <Badge className={`${getPriorityColor(delivery.priority as PriorityType)} text-white`}>{delivery.priority}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">{delivery.distance}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">{delivery.recipient}</p>
                  <div className="flex items-start gap-1">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{delivery.address}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="flex-1 bg-logistics-primary hover:bg-logistics-primary/90 text-white">
                    <Navigation className="w-4 h-4 mr-2" />
                    Ir Ahora
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Entregar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
