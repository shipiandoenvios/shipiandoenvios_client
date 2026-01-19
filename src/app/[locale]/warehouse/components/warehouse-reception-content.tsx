"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QrCode, Camera, Package, CheckCircle } from "lucide-react"
import { listPackages } from '@/lib/api/package'
import { useEffect } from "react"

interface PackageData {
  tracking: string;
  sender: string;
  recipient: string;
  destination: string;
  weight: string;
}

export function WarehouseReceptionContent() {
  const [scanMode, setScanMode] = useState(true)
  const [trackingCode, setTrackingCode] = useState("")
  const [packageData, setPackageData] = useState<PackageData | null>(null)

  const handleScan = async () => {
    // if trackingCode present (manual), search by tracking, otherwise simulate by fetching a recent package
    try {
        if (trackingCode) {
      // Use typed wrapper for package search
      const { items: itemsList } = await listPackages({ search: trackingCode, limit: 1 }).catch(() => ({ items: [] }));
        const item = itemsList?.[0] ?? null;
        setPackageData(item ? {
          tracking: item.trackingCode ?? item.id,
          sender: item.sender ?? item.from,
          recipient: item.recipient ?? item.to,
          destination: item.destination ?? item.zone,
          weight: item.weight ?? ''
        } : null);
      } else {
        const { items: itemsList } = await listPackages({ limit: 1 }).catch(() => ({ items: [] }))
        const item = itemsList?.[0] ?? null;
        setPackageData(item ? {
          tracking: item.trackingCode ?? item.id,
          sender: item.sender ?? item.from,
          recipient: item.recipient ?? item.to,
          destination: item.destination ?? item.zone,
          weight: item.weight ?? ''
        } : null);
      }
    } catch (e) {
      setPackageData(null);
    }
  }

  const handleConfirmReception = () => {
    alert("Paquete recibido exitosamente")
    setPackageData(null)
    setTrackingCode("")
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Recepción de Paquetes</h1>
        <p className="text-xl text-gray-600">Registra la llegada de nuevos paquetes al depósito</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Scanning Method */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Método de Ingreso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Button
                onClick={() => setScanMode(true)}
                variant={scanMode ? "default" : "outline"}
                className={`flex-1 h-16 ${scanMode ? "bg-logistics-primary hover:bg-logistics-primary/90" : ""}`}
              >
                <QrCode className="w-6 h-6 mr-2" />
                Escanear QR
              </Button>
              <Button
                onClick={() => setScanMode(false)}
                variant={!scanMode ? "default" : "outline"}
                className={`flex-1 h-16 ${!scanMode ? "bg-logistics-primary hover:bg-logistics-primary/90" : ""}`}
              >
                <Package className="w-6 h-6 mr-2" />
                Ingreso Manual
              </Button>
            </div>

            {scanMode ? (
              <div className="text-center space-y-4">
                <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Apunta la cámara al código QR</p>
                  </div>
                </div>
                <Button onClick={handleScan} className="bg-logistics-primary hover:bg-logistics-primary/90">
                  <Camera className="w-4 h-4 mr-2" />
                  Simular Escaneo
                </Button>
              </div>
            ) : (
              <div className="space-y-4 max-w-md mx-auto">
                <div>
                  <Label htmlFor="tracking">Código de Tracking</Label>
                  <Input
                    id="tracking"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    placeholder="Ingresa el código de tracking"
                    className="text-lg h-12"
                  />
                </div>
                <Button
                  onClick={handleScan}
                  className="w-full bg-logistics-primary hover:bg-logistics-primary/90"
                  disabled={!trackingCode}
                >
                  Buscar Paquete
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Package Information */}
        {packageData && (
          <Card className="border-0 shadow-lg border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Paquete Encontrado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Tracking ID</Label>
                    <p className="text-lg font-bold text-logistics-primary">{packageData.tracking}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Remitente</Label>
                    <p className="font-medium">{packageData.sender}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Destinatario</Label>
                    <p className="font-medium">{packageData.recipient}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Destino</Label>
                    <p className="font-medium">{packageData.destination}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleConfirmReception}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Confirmar Recepción
                </Button>
                <Button onClick={() => setPackageData(null)} variant="outline" className="px-8 h-12">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
