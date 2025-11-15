import { useStatusTranslation } from "@/packages/internationalization/useStatusTranslation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Truck, Package, Clock, Navigation } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchJson, getCount } from "@/lib/api"
import { useError } from "@/hooks/use-error"

const deliveryStatusColors: Record<string, string> = {
  pending: 'bg-yellow-500',
  in_transit: 'bg-blue-500',
  delivered: 'bg-green-500',
  default: 'bg-gray-400',
}

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

        const activeList = await fetchJson('/api/shipment?status=in_transit&limit=10').catch(() => null);
        if (mounted) setActiveDeliveriesState(activeList?.items || activeList || []);

        const recent = await fetchJson('/api/shipment?limit=10&page=1').catch(() => null);
        if (mounted) setRecentDeliveriesState(recent?.items || recent || []);
      } catch (e: any) {
        showError(e?.message || 'Error cargando rastreo');
      }
    })();
    return () => { mounted = false };
  }, []);

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
                <p className="text-sm font-medium text-gray-600">Entregados Hoy</p>
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
                    <Badge
                      className={`${deliveryStatusColors[delivery.status as keyof typeof deliveryStatusColors] || deliveryStatusColors.default} text-white`}
                    >
                      {tStatus.status(delivery.status)}
                    </Badge>
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

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Rastreo en Tiempo Real</h1>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.activeVehicles === 0 && stats.packagesInTransit === 0 && stats.deliveredToday === 0 && stats.averageTime === '—' ? (
                [1, 2, 3, 4].map((i) => (
                  <Card key={i} className="text-center border-0 shadow-lg">
                    <CardContent className="p-6">
                      <Skeleton className="h-8 w-8 mx-auto mb-2" />
                      <Skeleton className="h-4 w-24 mx-auto mb-1" />
                      <Skeleton className="h-6 w-16 mx-auto" />
                    </CardContent>
                  </Card>
                ))
              ) : (
                <>
                  {/* ...existing code... */}
                </>
              )}
            </div>

            {/* Active Deliveries */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Entregas Activas</h2>
              {activeDeliveriesState.length === 0 ? (
                <div className="text-gray-500">No hay entregas activas.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* ...existing code... */}
                </div>
              )}
            </div>
          </div>
        )
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
