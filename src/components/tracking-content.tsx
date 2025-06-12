import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Truck, Package, Clock, Navigation } from "lucide-react"

export function TrackingContent() {
  const activeDeliveries = [
    {
      id: "ENV-001",
      driver: "Roberto Sánchez",
      vehicle: "ABC-123",
      packages: 12,
      currentLocation: "Av. Corrientes, Microcentro",
      destination: "Palermo Soho",
      estimatedTime: "15 min",
      status: "En ruta",
    },
    {
      id: "ENV-004",
      driver: "Laura Jiménez",
      vehicle: "GHI-012",
      packages: 15,
      currentLocation: "Plaza San Martín, Retiro",
      destination: "La Boca",
      estimatedTime: "8 min",
      status: "Próxima entrega",
    },
    {
      id: "ENV-007",
      driver: "Carmen Ruiz",
      vehicle: "XYZ-456",
      packages: 8,
      currentLocation: "Av. Santa Fe, Barrio Norte",
      destination: "Villa Crespo",
      estimatedTime: "22 min",
      status: "En ruta",
    },
  ]

  const recentDeliveries = [
    {
      id: "ENV-002",
      client: "María García",
      time: "14:30",
      location: "Belgrano",
      status: "Entregado",
    },
    {
      id: "ENV-005",
      client: "Pedro Martínez",
      time: "13:45",
      location: "San Telmo",
      status: "Entregado",
    },
    {
      id: "ENV-008",
      client: "Ana López",
      time: "12:15",
      location: "Recoleta",
      status: "Entregado",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Rastreo en Tiempo Real</h1>
        <Badge variant="outline" className="text-logistics-primary border-logistics-primary">
          <Navigation className="w-4 h-4 mr-2" />
          GPS Activo
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vehículos Activos</p>
                <p className="text-3xl font-bold text-gray-900">18</p>
              </div>
              <Truck className="w-8 h-8 text-logistics-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Ruta</p>
                <p className="text-3xl font-bold text-gray-900">35</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Entregados Hoy</p>
                <p className="text-3xl font-bold text-gray-900">127</p>
              </div>
              <Badge className="bg-green-500 text-white">Completado</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
                <p className="text-3xl font-bold text-gray-900">2.4h</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Deliveries */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Entregas Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeDeliveries.map((delivery) => (
                <div key={delivery.id} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-logistics-primary" />
                      <span className="font-medium text-gray-900">{delivery.driver}</span>
                      <Badge variant="outline" className="text-xs">
                        {delivery.vehicle}
                      </Badge>
                    </div>
                    <Badge
                      className={`${delivery.status === "Próxima entrega" ? "bg-orange-500" : "bg-blue-500"} text-white`}
                    >
                      {delivery.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Package className="w-4 h-4" />
                      {delivery.packages} paquetes
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4" />
                      Actual: {delivery.currentLocation}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Navigation className="w-4 h-4" />
                      Destino: {delivery.destination}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4" />
                      ETA: {delivery.estimatedTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Deliveries */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Entregas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{delivery.id}</p>
                      <p className="text-sm text-gray-600">{delivery.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500 text-white mb-1">{delivery.status}</Badge>
                    <p className="text-sm text-gray-600">{delivery.time}</p>
                    <p className="text-xs text-gray-500">{delivery.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Placeholder */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Mapa de Rastreo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Mapa de Rastreo en Tiempo Real</p>
              <p className="text-sm text-gray-500 mt-2">
                Aquí se mostraría el mapa interactivo con las ubicaciones de los vehículos
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
