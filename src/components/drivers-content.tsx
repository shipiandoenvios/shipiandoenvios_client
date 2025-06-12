import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, Plus, MapPin, Package, Clock, Star } from "lucide-react"

export function DriversContent() {
  const drivers = [
    {
      id: "DRV-001",
      name: "Roberto Sánchez",
      zone: "Microcentro",
      vehicle: "Furgoneta - ABC-123",
      assignedShipments: 12,
      status: "En ruta",
      rating: 4.8,
      deliveries: 156,
    },
    {
      id: "DRV-002",
      name: "Carmen Ruiz",
      zone: "Zona Norte",
      vehicle: "Camión - XYZ-456",
      assignedShipments: 8,
      status: "Activo",
      rating: 4.9,
      deliveries: 203,
    },
    {
      id: "DRV-003",
      name: "Miguel Torres",
      zone: "Zona Sur",
      vehicle: "Furgoneta - DEF-789",
      assignedShipments: 0,
      status: "Fuera de servicio",
      rating: 4.6,
      deliveries: 89,
    },
    {
      id: "DRV-004",
      name: "Laura Jiménez",
      zone: "Zona Oeste",
      vehicle: "Motocicleta - GHI-012",
      assignedShipments: 15,
      status: "En ruta",
      rating: 4.7,
      deliveries: 134,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En ruta":
        return "bg-blue-500"
      case "Activo":
        return "bg-green-500"
      case "Fuera de servicio":
        return "bg-red-500"
      case "Descanso":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Transportistas</h1>
        <Button className="bg-logistics-primary hover:bg-logistics-primary/90 text-white rounded-lg">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Transportista
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transportistas</p>
                <p className="text-3xl font-bold text-gray-900">24</p>
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
                <p className="text-3xl font-bold text-gray-900">18</p>
              </div>
              <Badge className="bg-blue-500 text-white">En ruta</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disponibles</p>
                <p className="text-3xl font-bold text-gray-900">4</p>
              </div>
              <Badge className="bg-green-500 text-white">Activo</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fuera de Servicio</p>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </div>
              <Badge className="bg-red-500 text-white">Inactivo</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <Card key={driver.id} className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-logistics-primary/10 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-logistics-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">{driver.name}</CardTitle>
                    <p className="text-sm text-gray-600">{driver.id}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(driver.status)} text-white`}>{driver.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{driver.zone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{driver.vehicle}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{driver.assignedShipments} envíos asignados</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{driver.deliveries} entregas completadas</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-700">{driver.rating}/5.0 valoración</span>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button size="sm" variant="outline" className="flex-1 rounded-lg">
                  Ver Detalles
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-logistics-primary hover:bg-logistics-primary/90 text-white rounded-lg"
                >
                  Asignar Envío
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
