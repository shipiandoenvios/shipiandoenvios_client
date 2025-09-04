"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Truck, MapPin, Clock, CheckCircle } from "lucide-react"
import { ActiveSection } from "@/app/[locale]/user/page"

interface TimelineEvent {
  status: string
  date: string
  completed: boolean
  current?: boolean
}

interface TrackingData {
  id: string
  description: string
  sender: string
  status: "Entregado" | "En reparto" | "En tránsito"
  date: string
  progress: number
  estimatedDate: string
  currentLocation: string
  timeline: TimelineEvent[]
}

interface UserDetailContentProps {
  package: TrackingData
  setActiveSection: (section: ActiveSection) => void
}

export function UserDetailContent({ package: pkg, setActiveSection }: UserDetailContentProps) {
  const getStatusIcon = (status: TrackingData["status"]) => {
    switch (status) {
      case "Entregado":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "En reparto":
        return <Truck className="w-5 h-5 text-blue-500" />
      default:
        return <Clock className="w-5 h-5 text-orange-500" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Detalles del Paquete</h1>
        <p className="text-gray-600">Información completa del envío</p>
      </div>

      {/* Package Info */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {getStatusIcon(pkg.status)}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{pkg.id}</h2>
                <p className="text-gray-600">{pkg.description}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setActiveSection("tracking")}
              className="text-logistics-primary"
            >
              Ver Seguimiento
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Información del Envío</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Remitente:</span> {pkg.sender}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Estado:</span> {pkg.status}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Fecha de Envío:</span> {pkg.date}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Fecha Estimada:</span> {pkg.estimatedDate}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Ubicación Actual</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-logistics-primary" />
                <p>{pkg.currentLocation}</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progreso del Envío</span>
              <span>{pkg.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  pkg.status === "Entregado" ? "bg-green-500" : "bg-logistics-primary"
                }`}
                style={{ width: `${pkg.progress}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Historial de Estados</h3>
          <div className="space-y-4">
            {pkg.timeline.map((event, index) => (
              <div key={index} className="flex items-start gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    event.completed
                      ? "bg-logistics-primary"
                      : event.current
                      ? "bg-blue-100"
                      : "bg-gray-200"
                  }`}
                >
                  {event.completed ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Clock className={`w-4 h-4 ${event.current ? "text-blue-600" : "text-gray-400"}`} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{event.status}</p>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 