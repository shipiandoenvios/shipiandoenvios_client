import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, MapPin, Navigation, Target } from "lucide-react"
import { fetchJson, getCount } from "@/lib/api";
import { useError } from "@/hooks/use-error";
import { ErrorMessage } from "@/components/ui/error-message";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type PriorityType = "Express" | "Urgente" | "Normal";

export function CarrierDashboardContent() {
  const getPriorityColor = (priority: PriorityType) => {
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
  const { error, showError, clearError } = useError();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name?: string; pendingPackages?: number } | null>(null);
  const [statsVals, setStatsVals] = useState<{ title: string; value: number; color: string; icon: any }[]>([]);
  const [deliveries, setDeliveries] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      clearError();
      try {
        // try to fetch simple user info (assumption: endpoint exists)
        try {
          const u = await fetchJson('/api/user/me');
          if (mounted) setUser({ name: u?.name ?? u?.username ?? 'Repartidor', pendingPackages: u?.pendingPackages ?? 0 });
        } catch (e: any) {
          // ignore user fetch errors, we'll still show the rest
          if (mounted) setUser({ name: 'Repartidor', pendingPackages: 0 });
        }

        // Stats: counts from API. We use getCount which gracefully returns 0 on error.
        const [assignedCount, deliveredCount, totalShipments] = await Promise.all([
          getCount('/api/shipment?status=assigned'),
          getCount('/api/shipment?status=delivered'),
          getCount('/api/shipment')
        ]);

        if (mounted) {
          setStatsVals([
            { title: 'Pendientes', value: assignedCount, color: 'text-logistics-primary', icon: MapPin },
            { title: 'Entregados', value: deliveredCount, color: 'text-green-500', icon: CheckCircle },
            { title: 'Total viajes', value: totalShipments, color: 'text-gray-700', icon: Target },
            { title: "Mi próxima", value: 0, color: 'text-blue-500', icon: Navigation }
          ]);
        }

        // Next deliveries: fetch a small list from shipments endpoint (assumption: returns array)
        try {
          const res = await fetchJson('/api/shipment?limit=5&page=1');
          const items = Array.isArray(res) ? res : res?.data ?? res?.items ?? [];
          if (mounted) setDeliveries(items.slice(0, 5));
        } catch (e: any) {
          // fallback to empty list
          if (mounted) setDeliveries([]);
        }
      } catch (err: any) {
        showError(err?.message ?? 'Error cargando datos');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="space-y-8 p-6">
      return (
        <div className="space-y-8 p-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Panel de Repartidor</h1>
            <p className="text-xl text-gray-600">Bienvenido al sistema de gestión SHIPIANDO</p>
          </div>

          {/* Error */}
          {error && <ErrorMessage message={error} className="mb-4" />}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
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
              statsVals.map((stat, i) => (
                <Card key={i} className="text-center border-0 shadow-lg">
                  <CardContent className="p-6">
                    {stat.icon && <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />}
                    <div className="text-lg font-semibold">{stat.title}</div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Deliveries */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Mis Entregas</h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="border-0 shadow-md">
                    <CardContent className="p-4">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-20" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : deliveries.length === 0 ? (
              <div className="text-gray-500">No hay entregas asignadas.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* ...existing code... */}
              </div>
            )}
          </div>
        </div>
      );
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-logistics-primary">{delivery.id ?? delivery.trackingId ?? '—'}</span>
                      <Badge className={`${getPriorityColor((delivery.priority as PriorityType) ?? 'Normal')} text-white`}>{delivery.priority ?? 'Normal'}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">{delivery.distance ?? delivery.eta ?? ''}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">{delivery.recipientName ?? delivery.recipient ?? delivery.customerName ?? '—'}</p>
                    <div className="flex items-start gap-1">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{delivery.address ?? delivery.destination ?? '—'}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1 bg-logistics-primary hover:bg-logistics-primary/90 text-white">
                      <Navigation className="w-4 h-4 mr-2" />
                      Ir Ahora
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Entregar
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
