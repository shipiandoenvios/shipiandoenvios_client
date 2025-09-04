"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { QrCode, Camera, CheckCircle, AlertTriangle, MapPin, Phone, Package } from "lucide-react"
import { currentPackage, deliveryFailureReasons, priorityColors, DeliveryPackage } from "@/mocks/carrier"

export function CarrierDeliveryContent() {
  const [selectedPackage, setSelectedPackage] = useState<DeliveryPackage | null>(null)
  const [deliveryStatus, setDeliveryStatus] = useState("")
  const [comments, setComments] = useState("")
  const [recipientName, setRecipientName] = useState("")

  const handleScanPackage = () => {
    setSelectedPackage(currentPackage)
  }

  const handleDeliverySuccess = () => {
    if (!recipientName.trim()) {
      alert("Ingresa el nombre de quien recibe el paquete")
      return
    }
    alert(`Entrega confirmada exitosamente a ${recipientName}`)
    setSelectedPackage(null)
    setDeliveryStatus("")
    setComments("")
    setRecipientName("")
  }

  const handleDeliveryFailed = () => {
    if (!deliveryStatus || !comments.trim()) {
      alert("Selecciona un motivo y agrega comentarios")
      return
    }
    alert(`Entrega marcada como fallida: ${deliveryStatus}`)
    setSelectedPackage(null)
    setDeliveryStatus("")
    setComments("")
    setRecipientName("")
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Entrega de Paquete</h1>
        <p className="text-xl text-gray-600">Confirma la entrega con seguimiento detallado</p>
      </div>

      {/* Package Scanner */}
      {!selectedPackage && (
        <Card className="border-0 shadow-lg max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <QrCode className="w-6 h-6 text-logistics-primary" />
              Escanear Paquete a Entregar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Escanea el código QR del paquete</p>
                </div>
              </div>
              <Button
                onClick={handleScanPackage}
                className="bg-logistics-primary hover:bg-logistics-primary/90 px-6 py-3"
              >
                <Camera className="w-5 h-5 mr-2" />
                Simular Escaneo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Package Information */}
      {selectedPackage && (
        <div className="space-y-8 max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg border-l-4 border-l-logistics-primary">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-6 h-6 text-logistics-primary" />
                Información del Paquete
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Tracking ID</Label>
                    <p className="text-lg font-bold text-logistics-primary">{selectedPackage.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Destinatario</Label>
                    <p className="font-medium text-gray-900">{selectedPackage.recipient}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Teléfono</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <p>{selectedPackage.phone}</p>
                      <Button size="sm" variant="outline" className="ml-auto">
                        Llamar
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Dirección</Label>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p>{selectedPackage.address}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Peso</Label>
                    <p>{selectedPackage.weight}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Prioridad</Label>
                    <Badge className={`${priorityColors[selectedPackage.priority as keyof typeof priorityColors] || priorityColors.default} text-white`}>
                      {selectedPackage.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">Confirmar Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="recipient-name">Nombre de quien recibe</Label>
                <Input
                  id="recipient-name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Nombre completo de la persona que recibe"
                />
              </div>

              <div>
                <Label>Firma del Destinatario (opcional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                  <p className="text-gray-600">Área de firma digital</p>
                  <p className="text-xs text-gray-500 mt-1">Toca y mantén presionado para firmar</p>
                </div>
              </div>

              <div>
                <Label htmlFor="delivery-comments">Comentarios (opcional)</Label>
                <Textarea
                  id="delivery-comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Observaciones sobre la entrega..."
                  className="h-20"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleDeliverySuccess}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white h-14"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Marcar como Entregado
                </Button>
                <Button
                  onClick={() => setDeliveryStatus("failed")}
                  variant="outline"
                  className="px-8 h-14 border-red-300 text-red-600 hover:bg-red-50"
                >
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  No Entregado
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Failure Reasons */}
          {deliveryStatus === "failed" && (
            <Card className="border-0 shadow-lg bg-red-50 border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-red-900 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  Motivo de No Entrega
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="failure-reason">Selecciona el motivo</Label>
                  <Select value={deliveryStatus} onValueChange={setDeliveryStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      {deliveryFailureReasons.map((reason) => (
                        <SelectItem key={reason.value} value={reason.value}>
                          {reason.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="failure-comments">Comentarios detallados *</Label>
                  <Textarea
                    id="failure-comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Describe detalladamente qué ocurrió..."
                    className="h-24"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleDeliveryFailed} className="flex-1 bg-red-600 hover:bg-red-700 text-white h-14">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Confirmar No Entrega
                  </Button>
                  <Button onClick={() => setDeliveryStatus("")} variant="outline" className="px-8 h-14">
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
