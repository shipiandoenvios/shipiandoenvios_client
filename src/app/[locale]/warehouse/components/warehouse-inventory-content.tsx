"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { warehouseInventoryPackages, warehouseInventoryStatusIconMap } from "@/mocks/warehouse"
import { Package, Search, Truck } from "lucide-react"

interface PackageData {
  id: string
  description: string
  sender: string
  status: "Entregado" | "En reparto" | "En tránsito"
  date: string
  progress: number
  zone: string
  priority: "Normal" | "Express" | "Urgente"
  recipient: string
  destination: string
  weight: string
  daysInWarehouse: number
}

export function WarehouseInventoryContent() {
  const [selectedPackages, setSelectedPackages] = useState<PackageData["id"][]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const packages = warehouseInventoryPackages
  const handleSelectPackage = (packageId: string) => {
    setSelectedPackages((prev) =>
      prev.includes(packageId) ? prev.filter((id) => id !== packageId) : [...prev, packageId],
    )
  }
  const getStatusIcon = (status: string) => {
    const mapping = warehouseInventoryStatusIconMap[status as keyof typeof warehouseInventoryStatusIconMap]
    if (!mapping) return null
    const Icon = mapping.icon
    return <Icon className={`w-5 h-5 ${mapping.color}`} />
  }

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Inventario del Depósito</h1>
        <p className="text-xl text-gray-600">Gestiona los paquetes almacenados</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">{packages.length}</p>
            <p className="text-sm text-gray-600">Total Paquetes</p>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">✓</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {packages.filter((p) => p.priority === "Express" || p.priority === "Urgente").length}
            </p>
            <p className="text-sm text-gray-600">Prioritarios</p>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">!</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {packages.filter((p) => p.daysInWarehouse >= 2).length}
            </p>
            <p className="text-sm text-gray-600">Más de 2 días</p>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">%</span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">65%</p>
            <p className="text-sm text-gray-600">Capacidad</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por tracking, destinatario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {selectedPackages.length > 0 && (
              <Button className="bg-logistics-primary hover:bg-logistics-primary/90">
                <Truck className="w-4 h-4 mr-2" />
                Preparar Despacho ({selectedPackages.length})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Package List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Paquetes en Depósito</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedPackages.includes(pkg.id)
                    ? "border-logistics-primary bg-logistics-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                  }`}
                onClick={() => handleSelectPackage(pkg.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(pkg.status)}
                    <div>
                      <div className="font-semibold text-logistics-primary text-lg">{pkg.id}</div>
                      <div className="text-gray-900 font-medium">{pkg.description}</div>
                      <div className="text-gray-600 text-sm">
                        De: {pkg.sender} | Para: {pkg.recipient}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{pkg.status}</div>
                    <div className="text-sm text-gray-600">{pkg.date}</div>
                    <div className="text-sm text-gray-600">{pkg.destination}</div>
                    <div className="text-sm text-gray-600">{pkg.weight}</div>
                    <div className="text-sm text-gray-600">{pkg.daysInWarehouse} días</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          className="flex-1 bg-logistics-primary hover:bg-logistics-primary/90"
          disabled={selectedPackages.length === 0}
        >
          Procesar Seleccionados ({selectedPackages.length})
        </Button>
        <Button variant="outline" className="flex-1">
          Procesar Todos
        </Button>
      </div>
    </div>
  )
}
