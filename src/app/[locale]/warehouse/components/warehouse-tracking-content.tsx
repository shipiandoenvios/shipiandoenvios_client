"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Package, Clock, MapPin, CheckCircle, Truck } from "lucide-react"
import { useStatusTranslation } from '@/packages/internationalization/useStatusTranslation'
import { PackageStatus, TrackingEventType } from '@/contracts/package'

interface TimelineEvent {
  status: TrackingEventType;
  timestamp: string;
  responsible: string;
  location: string;
}

interface PackageHistory {
  id: string;
  currentStatus: PackageStatus;
  carrier: string;
  recipient: string;
  destination: string;
  timeline: TimelineEvent[];
}

export function WarehouseTrackingContent() {
  const tStatus = useStatusTranslation();
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPackage, setSelectedPackage] = useState<PackageHistory | null>(null)

  const packageHistory: PackageHistory = {
    id: "TRK-001234",
    currentStatus: PackageStatus.OUT_FOR_DELIVERY,
    carrier: "Roberto Sánchez",
    recipient: "María García",
    destination: "Palermo",
      timeline: [
      {
        status: TrackingEventType.CREATED,
        timestamp: "2024-01-15 14:30",
        responsible: "Ana López",
        location: "Depósito Central",
      },
      {
        status: TrackingEventType.IN_WAREHOUSE,
        timestamp: "2024-01-15 14:31",
        responsible: "Sistema",
        location: "Depósito Central - Zona A",
      },
      {
        status: TrackingEventType.HUB_TRANSFER,
        timestamp: "2024-01-16 09:15",
        responsible: "Carlos Mendoza",
        location: "Depósito Central",
      },
      {
        status: TrackingEventType.OUT_FOR_DELIVERY,
        timestamp: "2024-01-16 09:30",
        responsible: "Roberto Sánchez",
        location: "Zona Norte",
      },
    ],
  }

  const handleSearch = () => {
    if (searchTerm === "TRK-001234") {
      setSelectedPackage(packageHistory)
    } else {
      setSelectedPackage(null)
      alert("Paquete no encontrado")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Recibido en depósito":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "En depósito":
        return <Package className="w-5 h-5 text-blue-500" />
      case "Despachado":
        return <Truck className="w-5 h-5 text-orange-500" />
      case "En ruta con cartero":
        return <MapPin className="w-5 h-5 text-purple-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Seguimiento Interno</h1>
        <p className="text-xl text-gray-600">Rastrea el estado de los paquetes en tiempo real</p>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-lg max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Buscar Paquete</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Ingresa el código de tracking..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} className="bg-logistics-primary hover:bg-logistics-primary/90">
              Buscar
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            <p>
              💡 Prueba buscar: <code className="bg-gray-100 px-2 py-1 rounded">TRK-001234</code>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Search Result */}
      {selectedPackage && (
        <Card className="border-0 shadow-lg border-l-4 border-l-logistics-primary max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900">Tracking: {selectedPackage.id}</CardTitle>
              <Badge className="bg-logistics-primary text-white">{tStatus.status(selectedPackage.currentStatus)}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Destinatario</p>
                <p className="font-medium">{selectedPackage.recipient}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Destino</p>
                <p className="font-medium">{selectedPackage.destination}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cartero Asignado</p>
                <p className="font-medium">{selectedPackage.carrier}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Línea de Tiempo</h4>
              <div className="space-y-4">
                {selectedPackage.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      {getStatusIcon(event.status)}
                      {index < selectedPackage.timeline.length - 1 && (
                        <div className="w-px h-12 bg-gray-300 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium text-gray-900">{tStatus.trackingEvent(event.status)}</h5>
                        <span className="text-sm text-gray-500">{event.timestamp}</span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Responsable:</span> {event.responsible}
                        </p>
                        <p>
                          <span className="font-medium">Ubicación:</span> {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
