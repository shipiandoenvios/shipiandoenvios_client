import { useStatusTranslation } from "@/packages/internationalization/useStatusTranslation"
import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Truck, Package, Clock, Navigation } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { getCount, fetchJson } from "@/lib/api"
import { getPackageStatusColor } from '@/lib/status'
import { listShipments } from '@/lib/api/shipment'
import { PackageStatus } from '@/contracts/package'
import { useError } from "@/hooks/use-error"

const getDeliveryColor = getPackageStatusColor

export function TrackingContent() {
  const tStatus = useStatusTranslation();
  const { error, showError, clearError } = useError();
  const [stats, setStats] = useState<any>({ activeVehicles: 0, packagesInTransit: 0, deliveredToday: 0, averageTime: '—' });
  const [activeDeliveriesState, setActiveDeliveriesState] = useState<any[]>([]);
  const [recentDeliveriesState, setRecentDeliveriesState] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // try aggregated endpoint first
        const agg = await fetchJson('/api/admin/tracking').catch(() => null);
        if (agg && mounted) {
          setStats(agg.stats || agg);
          setActiveDeliveriesState(agg.activeDeliveries || agg.active || []);
          setRecentDeliveriesState(agg.recentDeliveries || agg.recent || []);
          return;
        }

        // fallback: compute from available endpoints
        const [vehiclesActive, inTransit, deliveredAll] = await Promise.all([
          getCount('/api/vehicle?status=active'),
          getCount('/api/shipment?status=in_transit'),
          getCount('/api/shipment?status=delivered'),
        ]);
        if (!mounted) return;
        setStats({ activeVehicles: vehiclesActive, packagesInTransit: inTransit, deliveredToday: deliveredAll, averageTime: '—' });

        const { items: activeItems } = await listShipments({ status: PackageStatus.IN_TRANSIT, limit: 10 }).catch(() => ({ items: [] }));
        if (mounted) setActiveDeliveriesState(activeItems);

        const { items: recentItems } = await listShipments({ limit: 10, page: 1 }).catch(() => ({ items: [] }));
        if (mounted) setRecentDeliveriesState(recentItems);
      } catch (e: any) {
        showError(e?.message || 'Error cargando rastreo');
      }
    })();
    return () => { mounted = false };
  }, [showError]);

  const t = useTranslations('logistics');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Rastreo en Tiempo Real</h1>
        <Badge variant="outline" className="text-logistics-primary border-logistics-primary">
          <Navigation className="w-4 h-4 mr-2" />
          GPS Activo
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vehículos Activos</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeVehicles}</p>
              </div>
              <Truck className="w-8 h-8 text-logistics-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Ruta</p>
                <p className="text-3xl font-bold text-gray-900">{stats.packagesInTransit}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('labels.deliveredToday')}</p>
                <p className="text-3xl font-bold text-gray-900">{stats.deliveredToday}</p>
              </div>
              <Badge className="bg-green-500 text-white">Completado</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
                <p className="text-3xl font-bold text-gray-900">{stats.averageTime}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Deliveries */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Entregas Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeDeliveriesState.map((delivery: any) => (
                <div key={delivery.id} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-logistics-primary" />
                      <span className="font-medium text-gray-900">{delivery.driver}</span>
                      <Badge variant="outline" className="text-xs">
                        {delivery.vehicle}
                      </Badge>
                    </div>
                    <Badge className={`${getDeliveryColor(delivery.status)} text-white`}>{tStatus.status(delivery.status)}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Package className="w-4 h-4" />
                      {delivery.packages} paquetes
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="w-4 h-4" />
                      Actual: {delivery.currentLocation}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Navigation className="w-4 h-4" />
                      Destino: {delivery.destination}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 h-4" />
                      ETA: {delivery.estimatedTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

