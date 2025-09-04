"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PackageCheck, Truck, AlertTriangle, Users } from "lucide-react"
import { warehouseStats, warehouseRecentActivity, warehouseUrgentPackages } from "@/mocks/warehouse"

export function WarehouseDashboardContent() {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard del Depósito</h1>
        <p className="text-xl text-gray-600">Bienvenido al sistema de gestión SHIPIANDO</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {warehouseStats.map((stat, index) => (
          <Card key={index} className="text-center border-0 shadow-lg">
            <CardContent className="p-6">
              <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {warehouseRecentActivity.map((activity, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-logistics-primary">{activity.id}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-500">Por: {activity.user}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Urgent Packages */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Paquetes Urgentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {warehouseUrgentPackages.map((pkg: { id: string; recipient: string; destination: string; days: number }) => (
                <div key={pkg.id} className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-red-700">{pkg.id}</span>
                    <Badge className="bg-red-500 text-white">{pkg.days} días</Badge>
                  </div>
                  <p className="text-sm text-gray-700">Para: {pkg.recipient}</p>
                  <p className="text-sm text-gray-600">Destino: {pkg.destination}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg bg-logistics-primary text-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="secondary" className="h-16 bg-white/20 hover:bg-white/30 text-white border-white/30">
              <PackageCheck className="w-6 h-6 mr-3" />
              <div className="text-left">
                <p className="font-medium">Recibir Paquete</p>
                <p className="text-xs opacity-80">Escanear o manual</p>
              </div>
            </Button>
            <Button variant="secondary" className="h-16 bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Truck className="w-6 h-6 mr-3" />
              <div className="text-left">
                <p className="font-medium">Despachar</p>
                <p className="text-xs opacity-80">Asignar a cartero</p>
              </div>
            </Button>
            <Button variant="secondary" className="h-16 bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Users className="w-6 h-6 mr-3" />
              <div className="text-left">
                <p className="font-medium">Ver Inventario</p>
                <p className="text-xs opacity-80">325 paquetes</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
