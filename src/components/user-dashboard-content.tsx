"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Truck, MapPin, User } from "lucide-react"
import { ActiveSection } from "@/app/[locale]/user/page"

interface UserDashboardContentProps {
  setActiveSection: (section: ActiveSection) => void
}

export function UserDashboardContent({ setActiveSection }: UserDashboardContentProps) {
  const stats = [
    {
      title: "Paquetes Activos",
      value: "3",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: () => setActiveSection("packages"),
    },
    {
      title: "En Reparto",
      value: "1",
      icon: Truck,
      color: "text-green-600",
      bgColor: "bg-green-50",
      action: () => setActiveSection("packages"),
    },
    {
      title: "Direcciones",
      value: "2",
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      action: () => setActiveSection("addresses"),
    },
    {
      title: "Mi Perfil",
      value: "Completo",
      icon: User,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      action: () => setActiveSection("profile"),
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Bienvenido a tu Portal</h1>
        <p className="text-gray-600">Gestiona tus envíos y mantén tu información actualizada</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</h3>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:text-gray-900"
                  onClick={stat.action}
                >
                  Ver detalles
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Nuevo paquete recibido</p>
                  <p className="text-sm text-gray-600">TRK-001234 - Libro JavaScript</p>
                </div>
              </div>
              <span className="text-sm text-gray-600">Hace 2 horas</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Paquete en reparto</p>
                  <p className="text-sm text-gray-600">TRK-001235 - Auriculares Bluetooth</p>
                </div>
              </div>
              <span className="text-sm text-gray-600">Hace 5 horas</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
