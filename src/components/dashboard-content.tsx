import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, Clock, AlertTriangle, TrendingUp, Users } from "lucide-react"

export function DashboardContent() {
  const stats = [
    { title: "Envíos Hoy", value: "127", icon: Package, color: "bg-blue-500" },
    { title: "En Tránsito", value: "45", icon: Truck, color: "bg-yellow-500" },
    { title: "Entregados", value: "82", icon: TrendingUp, color: "bg-green-500" },
    { title: "Retrasos", value: "8", icon: Clock, color: "bg-red-500" },
  ]

  const recentShipments = [
    { id: "ENV-001", client: "Juan Pérez", status: "En tránsito", destination: "Palermo" },
    { id: "ENV-002", client: "María García", status: "Entregado", destination: "Belgrano" },
    { id: "ENV-003", client: "Carlos López", status: "Pendiente", destination: "San Telmo" },
    { id: "ENV-004", client: "Ana Martín", status: "En tránsito", destination: "Recoleta" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Badge variant="outline" className="text-logistics-primary border-logistics-primary">
          Actualizado hace 2 min
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentShipments.map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-logistics-primary" />
                    <div>
                      <p className="font-medium text-gray-900">{shipment.id}</p>
                      <p className="text-sm text-gray-600">{shipment.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={shipment.status === "Entregado" ? "default" : "secondary"}
                      className={shipment.status === "Entregado" ? "bg-green-500" : ""}
                    >
                      {shipment.status}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-1">{shipment.destination}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Alertas Importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900">Retraso en ruta Microcentro-Zona Norte</p>
                  <p className="text-sm text-red-700">8 envíos afectados - Estimado 2h de retraso</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <Clock className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-900">Mantenimiento programado</p>
                  <p className="text-sm text-yellow-700">Sistema de rastreo - Mañana 02:00-04:00</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Users className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Nuevo cliente registrado</p>
                  <p className="text-sm text-blue-700">Empresa ABC S.L. - Requiere configuración</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
