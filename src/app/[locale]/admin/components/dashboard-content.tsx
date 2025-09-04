import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, AlertTriangle, Users } from "lucide-react"
import { alerts, lastUpdate, recentShipments, stats } from "@/mocks/admin"

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Badge variant="outline" className="text-logistics-primary border-logistics-primary">
          Actualizado hace {lastUpdate}
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
              {alerts.map((alert, index) => {
                const bgColor = alert.type === 'error' ? 'bg-red-50' : alert.type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
                const borderColor = alert.type === 'error' ? 'border-red-200' : alert.type === 'warning' ? 'border-yellow-200' : 'border-blue-200'
                const textColor = alert.type === 'error' ? 'text-red-900' : alert.type === 'warning' ? 'text-yellow-900' : 'text-blue-900'
                const descriptionColor = alert.type === 'error' ? 'text-red-700' : alert.type === 'warning' ? 'text-yellow-700' : 'text-blue-700'
                const iconColor = alert.type === 'error' ? 'text-red-500' : alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                const Icon = alert.type === 'error' ? AlertTriangle : alert.type === 'warning' ? Clock : Users

                return (
                  <div key={index} className={`flex items-start gap-3 p-4 ${bgColor} rounded-lg border ${borderColor}`}>
                    <Icon className={`w-5 h-5 ${iconColor} mt-0.5`} />
                    <div>
                      <p className={`font-medium ${textColor}`}>{alert.title}</p>
                      <p className={`text-sm ${descriptionColor}`}>{alert.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
