"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, Search, CheckCircle, Truck, Clock } from "lucide-react"

interface PackageData {
  id: string
  description: string
  sender: string
  status: "Entregado" | "En reparto" | "En tránsito"
  date: string
  progress: number
  zone: string
  priority: "Normal" | "Express"
  recipient: string
  destination: string
}

interface Carrier {
  id: string
  name: string
  zone: string
  capacity: number
  status: "Disponible" | "En ruta" | "Ocupado"
}

export function WarehouseDispatchContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPackages, setSelectedPackages] = useState<PackageData["id"][]>([])
  const [selectedCarrier, setSelectedCarrier] = useState("")

  const carriers: Carrier[] = [
    {
      id: "C001",
      name: "Juan Pérez",
      zone: "Zona Norte",
      capacity: 10,
      status: "Disponible",
    },
    {
      id: "C002",
      name: "María López",
      zone: "Zona Sur",
      capacity: 8,
      status: "Disponible",
    },
  ]

  const packages: PackageData[] = [
    {
      id: "TRK-001234",
      description: "Libro JavaScript",
      sender: "Amazon",
      status: "En reparto",
      date: "Hoy 16:30",
      progress: 90,
      zone: "Zona Norte",
      priority: "Normal",
      recipient: "María García",
      destination: "Palermo",
    },
    {
      id: "TRK-001235",
      description: "Auriculares Bluetooth",
      sender: "MercadoLibre",
      status: "En tránsito",
      date: "Mañana",
      progress: 60,
      zone: "Zona Norte",
      priority: "Express",
      recipient: "Ana Martín",
      destination: "Belgrano",
    },
    {
      id: "TRK-001236",
      description: "Medicamentos",
      sender: "Farmacia Online",
      status: "Entregado",
      date: "Ayer",
      progress: 100,
      zone: "Zona Sur",
      priority: "Normal",
      recipient: "Carlos Rodríguez",
      destination: "Caballito",
    },
  ]

  const getStatusIcon = (status: PackageData["status"]) => {
    switch (status) {
      case "Entregado":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "En reparto":
        return <Truck className="w-5 h-5 text-blue-500" />
      default:
        return <Clock className="w-5 h-5 text-orange-500" />
    }
  }

  const togglePackage = (packageId: PackageData["id"]) => {
    setSelectedPackages((prev) =>
      prev.includes(packageId)
        ? prev.filter((id) => id !== packageId)
        : [...prev, packageId]
    )
  }

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedCarrierData = carriers.find((c) => c.id === selectedCarrier)
  const compatiblePackages = selectedCarrierData
    ? filteredPackages.filter((pkg) => pkg.zone === selectedCarrierData.zone)
    : filteredPackages

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Despacho de Paquetes</h1>
        <p className="text-gray-600">Selecciona los paquetes para despachar</p>
      </div>

      {/* Carrier Selection */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Seleccionar Transportista</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {carriers.map((carrier) => (
              <div
                key={carrier.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedCarrier === carrier.id
                    ? "border-logistics-primary bg-logistics-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedCarrier(carrier.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{carrier.name}</h3>
                    <p className="text-sm text-gray-600">Zona: {carrier.zone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{carrier.status}</p>
                    <p className="text-sm text-gray-600">Capacidad: {carrier.capacity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar por código o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Packages List */}
      <div className="space-y-4">
        {compatiblePackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedPackages.includes(pkg.id)
                ? "border-logistics-primary bg-logistics-primary/5"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => togglePackage(pkg.id)}
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          className="flex-1 bg-logistics-primary hover:bg-logistics-primary/90"
          disabled={selectedPackages.length === 0}
        >
          Despachar Seleccionados ({selectedPackages.length})
        </Button>
        <Button variant="outline" className="flex-1">
          Despachar Todos
        </Button>
      </div>
    </div>
  )
}
