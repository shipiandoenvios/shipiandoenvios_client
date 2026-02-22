"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock, Package, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { PackageStatus } from '@/contracts/package'
import { getPackageStatusColor } from '@/lib/status'
import { useStatusTranslation } from '@/packages/internationalization/useStatusTranslation'
import { useTranslations } from 'next-intl'
import { listShipments } from '@/lib/api/shipment'

type RoutePackage = {
  id: string;
  order?: number;
  status?: PackageStatus;
  priority?: string;
  recipient?: string;
  address?: string;
  distance?: string;
}

// Local color maps (UI-only)
const routePriorityColors: Record<string, string> = {
  Alta: 'bg-red-500',
  Media: 'bg-yellow-500',
  Baja: 'bg-blue-500',
  default: 'bg-gray-400',
}
 



export function CarrierRouteContent() {


  const getStatusColor = (status: RoutePackage["status"]): string => getPackageStatusColor(status)

  const getPriorityColor = (priority: RoutePackage["priority"]): string => {
    return routePriorityColors[priority ?? "default"] || routePriorityColors["default"];
  }

  const getStatusIcon = (status: RoutePackage["status"]) => {
    switch (status) {
      case PackageStatus.DELIVERED:
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case PackageStatus.IN_TRANSIT:
        return <Navigation className="w-5 h-5 text-blue-500" />
      case PackageStatus.AWAITING_CHECKIN:
        return <Clock className="w-5 h-5 text-orange-500" />
      default:
        return <Package className="w-5 h-5 text-gray-500" />
    }
  }

  const [routePackages, setRoutePackages] = useState<RoutePackage[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { items } = await listShipments({ assignedTo: 'me', limit: 200 });
        if (mounted) setRoutePackages(items as RoutePackage[]);
      } catch (e) {
        if (mounted) setRoutePackages([]);
      }
    })();
    return () => { mounted = false }
  }, []);

  const completedDeliveries = routePackages.filter((pkg: RoutePackage) => pkg.status === PackageStatus.DELIVERED).length

  const tStatus = useStatusTranslation();
  const t = useTranslations('logistics');
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Mi Hoja de Ruta</h1>
  <p className="text-xl text-gray-600">{routePackages.length} entregas programadas para hoy</p>
      </div>

      {/* Route Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">{routePackages.length}</p>
            <p className="text-sm text-gray-600">Total Paquetes</p>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">{completedDeliveries}</p>
            <p className="text-sm text-gray-600">{tStatus.status(PackageStatus.DELIVERED)}</p>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {routePackages.filter((p: RoutePackage) => p.status === PackageStatus.AWAITING_CHECKIN).length}
            </p>
            <p className="text-sm text-gray-600">{tStatus.status(PackageStatus.AWAITING_CHECKIN)}</p>
          </CardContent>
        </Card>
        <Card className="text-center border-0 shadow-lg">
          <CardContent className="p-6">
            <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <p className="text-3xl font-bold text-gray-900 mb-2">12.8</p>
            <p className="text-sm text-gray-600">km Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Route Actions */}
      <Card className="border-0 shadow-lg bg-logistics-primary text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-xl mb-2">Control de Ruta</h3>
              <p className="opacity-90">Gestiona tu ruta de entregas</p>
            </div>
            <div className="flex gap-4">
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Navigation className="w-5 h-5 mr-2" />
                Iniciar Ruta
              </Button>
              <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <MapPin className="w-5 h-5 mr-2" />
                Ver Mapa
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-logistics-primary" />
            Lista de Entregas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routePackages
              .slice()
              .sort((a: RoutePackage, b: RoutePackage) => (a.order ?? 0) - (b.order ?? 0))
              .map((pkg: RoutePackage) => (
                <div
                  key={pkg.id}
                  className={`p-4 rounded-lg border-l-4 ${pkg.status === PackageStatus.DELIVERED
                      ? "bg-green-50 border-l-green-500"
                      : pkg.status === PackageStatus.AWAITING_CHECKIN
                        ? "bg-orange-50 border-l-orange-500"
                        : "bg-blue-50 border-l-blue-500"
                    }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">
                        {pkg.order || "✓"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-logistics-primary">{pkg.id}</span>
                          <Badge className={`${getPriorityColor(pkg.priority)} text-white`}>{pkg.priority}</Badge>
                        </div>
                        <p className="font-medium text-gray-900">{pkg.recipient}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(pkg.status)}
                      <Badge className={`${getStatusColor(pkg.status)} text-white`}>{pkg.status ? tStatus.status(pkg.status) : ''}</Badge>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-start gap-1">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{pkg.address}</p>
                    </div>
                    <p className="text-sm text-gray-600">Distancia: {pkg.distance}</p>
                  </div>

                  <div className="flex gap-2">
                    {pkg.status === PackageStatus.AWAITING_CHECKIN && (
                      <>
                        <Button
                          size="sm"
                          className="flex-1 bg-logistics-primary hover:bg-logistics-primary/90 text-white"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Ir Ahora
                        </Button>
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Entregar
                        </Button>
                      </>
                    )}
                    {pkg.status === PackageStatus.DELIVERED && (
                      <Button size="sm" variant="outline" className="w-full" disabled>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {t('labels.delivered')}
                        </Button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
