"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { QrCode, Package, CheckCircle, AlertTriangle } from "lucide-react"
import { useEffect } from "react"
import { fetchJson } from "@/lib/api"

type IPackage = {
  id: string;
  status?: string;
  priority?: string;
  recipient?: string;
  destination?: string;
  weight?: string;
}



export function CarrierPickupContent() {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([])
  const [scanMode, setScanMode] = useState(false)
  const [assignedPackages, setAssignedPackages] = useState<IPackage[]>([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetchJson('/api/shipment?assignedTo=me&limit=200').catch(() => [])
        const items = Array.isArray(res) ? res : res?.items ?? res?.data ?? []
        if (mounted) setAssignedPackages(items)
      } catch {
        if (mounted) setAssignedPackages([])
      }
    })()
    return () => { mounted = false }
  }, [])



  const handleSelectPackage = (packageId: string) => {
    setSelectedPackages((prev) =>
      prev.includes(packageId) ? prev.filter((id) => id !== packageId) : [...prev, packageId],
    )
  }

  const handleConfirmPickup = () => {
    if (selectedPackages.length === 0) {
      alert("Selecciona al menos un paquete para retirar")
      return
    }
    alert(`Retiro confirmado: ${selectedPackages.length} paquetes`)
    setSelectedPackages([])
  }

  const getStatusColor = (status: IPackage["status"]): string => {
    switch (status) {
      case "Listo":
        return "bg-green-500"
      case "Retirado":
        return "bg-blue-500"
      case "Falta":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: IPackage["priority"]): string => {
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

  const readyPackages = assignedPackages.filter((pkg) => pkg.status === "Listo")

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Retiro de Paquetes</h1>
  <p className="text-xl text-gray-600">Confirma el retiro de {assignedPackages.length} paquetes asignados</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <Package className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">{readyPackages.length}</p>
            <p className="text-sm text-gray-600">Listos</p>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {assignedPackages.filter((p) => p.status === "Retirado").length}
            </p>
            <p className="text-sm text-gray-600">Retirados</p>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">0</p>
            <p className="text-sm text-gray-600">Faltan</p>
          </CardContent>
        </Card>
      </div>

      {/* Verification Method */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Método de Verificación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              onClick={() => setScanMode(true)}
              variant={scanMode ? "default" : "outline"}
              className={`flex-1 h-16 ${scanMode ? "bg-logistics-primary hover:bg-logistics-primary/90" : ""}`}
            >
              <QrCode className="w-6 h-6 mr-2" />
              <div className="text-left">
                <p className="font-medium">Escanear Códigos</p>
                <p className="text-xs opacity-80">Verificación automática</p>
              </div>
            </Button>
            <Button
              onClick={() => setScanMode(false)}
              variant={!scanMode ? "default" : "outline"}
              className={`flex-1 h-16 ${!scanMode ? "bg-logistics-primary hover:bg-logistics-primary/90" : ""}`}
            >
              <Package className="w-6 h-6 mr-2" />
              <div className="text-left">
                <p className="font-medium">Selección Manual</p>
                <p className="text-xs opacity-80">Marcar individualmente</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* QR Scanner */}
      {scanMode && (
        <Card className="border-0 shadow-lg border-l-4 border-l-logistics-primary">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <QrCode className="w-6 h-6 text-logistics-primary" />
              Escáner de Códigos QR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Apunta la cámara al código QR del paquete</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">💡 Escanea cada paquete para confirmar automáticamente su retiro</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Package List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-logistics-primary" />
            Paquetes Asignados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignedPackages.map((pkg: IPackage) => (
              <div
                key={pkg.id}
                className={`p-4 rounded-lg border-l-4 ${pkg.status === "Listo"
                    ? selectedPackages.includes(pkg.id)
                      ? "bg-green-100 border-l-green-500"
                      : "bg-green-50 border-l-green-500"
                    : pkg.status === "Retirado"
                      ? "bg-blue-50 border-l-blue-500"
                      : "bg-red-50 border-l-red-500"
                  }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {!scanMode && pkg.status === "Listo" && (
                      <Checkbox
                        checked={selectedPackages.includes(pkg.id)}
                        onCheckedChange={() => handleSelectPackage(pkg.id)}
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-logistics-primary">{pkg.id}</span>
                        <Badge className={`${getPriorityColor(pkg.priority)} text-white`}>{pkg.priority}</Badge>
                      </div>
                      <p className="font-medium text-gray-900">{pkg.recipient}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(pkg.status)} text-white`}>{pkg.status}</Badge>
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Destino:</span> {pkg.destination}
                  </p>
                  <p>
                    <span className="font-medium">Peso:</span> {pkg.weight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation */}
      {!scanMode && selectedPackages.length > 0 && (
        <Card className="border-0 shadow-lg bg-logistics-primary text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-xl mb-2">Confirmar Retiro</h3>
                <p className="opacity-90">{selectedPackages.length} paquetes seleccionados para retirar</p>
              </div>
              <Button
                onClick={handleConfirmPickup}
                variant="secondary"
                className="bg-white text-logistics-primary hover:bg-gray-100 font-medium px-8 py-3"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Iniciar Reparto
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
