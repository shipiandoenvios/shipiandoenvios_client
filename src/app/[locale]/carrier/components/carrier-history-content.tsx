"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, AlertTriangle, Clock, Package, MapPin, Phone, FileText } from "lucide-react"
import { Delivery, deliveryHistory } from "@/mocks/carrier"



export function CarrierHistoryContent() {
  const [statusFilter, setStatusFilter] = useState("all")

  

  const getStatusColor = (status: Delivery["status"]): string => {
    switch (status) {
      case "Entregado":
        return "bg-green-500"
      case "Fallido":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: Delivery["priority"]): string => {
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

  const getStatusIcon = (status: Delivery["status"]) => {
    switch (status) {
      case "Entregado":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "Fallido":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <Package className="w-5 h-5 text-gray-500" />
    }
  }

  const filteredHistory = deliveryHistory.filter((delivery) => {
    if (statusFilter !== "all" && delivery.status.toLowerCase() !== statusFilter) return false
    return true
  })

  const successfulDeliveries = deliveryHistory.filter((d) => d.status === "Entregado").length
  const failedDeliveries = deliveryHistory.filter((d) => d.status === "Fallido").length
  const successRate = Math.round((successfulDeliveries / deliveryHistory.length) * 100)

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Historial del Día</h1>
        <p className="text-xl text-gray-600">Resumen de entregas realizadas y pendientes</p>
      </div>

      {/* Daily Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">{deliveryHistory.length}</p>
            <p className="text-sm text-gray-600">Total</p>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">{successfulDeliveries}</p>
            <p className="text-sm text-gray-600">Exitosas</p>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">{failedDeliveries}</p>
            <p className="text-sm text-gray-600">Fallidas</p>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">%</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{successRate}%</p>
            <p className="text-sm text-gray-600">Éxito</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="entregado">Entregado</SelectItem>
                <SelectItem value="fallido">Fallido</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-logistics-primary hover:bg-logistics-primary/90 text-white">
              <FileText className="w-4 h-4 mr-2" />
              Resumen de Jornada
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delivery History */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-logistics-primary" />
            Historial de Entregas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredHistory.map((delivery) => (
              <div
                key={delivery.id}
                className={`p-4 rounded-lg border-l-4 ${
                  delivery.status === "Entregado" ? "bg-green-50 border-l-green-500" : "bg-red-50 border-l-red-500"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(delivery.status)}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-logistics-primary">{delivery.id}</span>
                        <Badge className={`${getPriorityColor(delivery.priority)} text-white`}>
                          {delivery.priority}
                        </Badge>
                      </div>
                      <p className="font-medium text-gray-900">{delivery.recipient}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor(delivery.status)} text-white mb-1`}>{delivery.status}</Badge>
                    <p className="text-sm text-gray-500">{delivery.time}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-start gap-1">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{delivery.address}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">{delivery.phone}</p>
                  </div>
                  {delivery.receivedBy && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Recibido por:</span> {delivery.receivedBy}
                    </p>
                  )}
                  {delivery.failureReason && (
                    <p className="text-sm text-red-600">
                      <span className="font-medium">Motivo:</span> {delivery.failureReason}
                    </p>
                  )}
                </div>

                <div className="p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Comentarios:</span> {delivery.comments}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Day Summary */}
      <Card className="border-0 shadow-lg bg-logistics-primary text-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Resumen de la Jornada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{successfulDeliveries}</p>
              <p className="opacity-90">Entregas Exitosas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{successRate}%</p>
              <p className="opacity-90">Tasa de Éxito</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">24.5 km</p>
              <p className="opacity-90">Distancia Recorrida</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/30">
            <p className="opacity-90 text-center">
              ¡Excelente trabajo Roberto! Has completado {successfulDeliveries} de {deliveryHistory.length} entregas
              programadas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
