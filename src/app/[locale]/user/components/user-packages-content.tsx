"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Package, Search } from "lucide-react"
import { ActiveSection } from "@/app/[locale]/user/page"
import { packages, packageStatusIcons, packageStatusColors, PackageData, TrackingData, defaultTrackingTimeline, defaultCurrentLocation } from "@/mocks/user"

interface UserPackagesContentProps {
  setSelectedPackage: (pkg: TrackingData) => void
  setActiveSection: (section: ActiveSection) => void
}

export function UserPackagesContent({ setSelectedPackage, setActiveSection }: UserPackagesContentProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const convertToTrackingData = (pkg: PackageData): TrackingData => {
    return {
      ...pkg,
      estimatedDate: pkg.date,
      currentLocation: defaultCurrentLocation,
      timeline: defaultTrackingTimeline,
    };
  }

  const getStatusIcon = (status: PackageData["status"]) => {
    const Icon = packageStatusIcons[status] || Package
    const color = packageStatusColors[status] || packageStatusColors["default"]
    return <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
  }

  const getStatusColor = (status: PackageData["status"]) => packageStatusColors[status] || packageStatusColors["default"]

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mis Paquetes</h1>
        <p className="text-gray-600">Gestiona y rastrea todos tus envíos</p>
      </div>

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
        {filteredPackages.map((pkg) => (
          <Card key={pkg.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(pkg.status)}
                  <div>
                    <div className="font-semibold text-logistics-primary text-lg">{pkg.id}</div>
                    <div className="text-gray-900 font-medium">{pkg.description}</div>
                    <div className="text-gray-600 text-sm">De: {pkg.sender}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(pkg.status)} text-white mb-2`}>{pkg.status}</Badge>
                  <div className="text-sm text-gray-600">{pkg.date}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progreso</span>
                  <span>{pkg.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${pkg.status === "Entregado" ? "bg-green-500" : "bg-logistics-primary"}`}
                    style={{ width: `${pkg.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setSelectedPackage(convertToTrackingData(pkg))
                    setActiveSection("tracking")
                  }}
                  className="flex-1 bg-logistics-primary hover:bg-logistics-primary/90"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Ver Seguimiento
                </Button>
                <Button
                  onClick={() => {
                    setSelectedPackage(convertToTrackingData(pkg))
                    setActiveSection("detail")
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Ver Detalle
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
