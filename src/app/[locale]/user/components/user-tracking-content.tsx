"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, MapPin, Clock, CheckCircle, Home, Warehouse, AlertTriangle, Package as PackageIcon } from "lucide-react"
import { ActiveSection } from "@/app/[locale]/user/page"

interface TimelineEvent {
  status: string
  date: string
  completed: boolean
  current?: boolean
}

import { TrackingData, PackageStatus, TrackingEventType } from "@/contracts/package"
import { useStatusTranslation } from "@/packages/internationalization/useStatusTranslation"
import { Skeleton } from "@/components/ui/skeleton"

import { useEffect, useState } from "react"
import { fetchJson } from "@/lib/api"

interface UserTrackingContentProps {
  package: TrackingData
  setActiveSection: (section: ActiveSection) => void
}

export function UserTrackingContent({ package: pkg, setActiveSection }: UserTrackingContentProps) {
  const tStatus = useStatusTranslation();
  const [events, setEvents] = useState<Array<{
    type: string;
    eventAt: string;
    location?: string;
    description?: string;
    responsible?: string;
    latitude?: number;
    longitude?: number;
  }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);
      try {
        // Fetch tracking events for the shipment/package
        if (!pkg.shipmentId) {
          setEvents([]);
          setLoading(false);
          return;
        }
        const res = await fetchJson(`/api/tracking-event?shipmentId=${pkg.shipmentId}`);
        // Accepts either { items: [...] } or array
        const items = Array.isArray(res) ? res : res.items || res.data || [];
        setEvents(items);
      } catch (e: any) {
        setError(e?.message || "Error al obtener eventos de tracking");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [pkg.shipmentId]);

  const getStatusIcon = (status: PackageStatus | undefined) => {
    switch (status) {
      case PackageStatus.DELIVERED:
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case PackageStatus.OUT_FOR_DELIVERY:
        return <Truck className="w-5 h-5 text-blue-500" />
      case PackageStatus.IN_TRANSIT:
        return <Truck className="w-5 h-5 text-blue-500" />
      default:
        return <Clock className="w-5 h-5 text-orange-500" />
    }
  }

  // Progreso: porcentaje según posición en la timeline
  const progress = events.length > 1 ? Math.round(((events.findIndex(e => e.type === pkg.status) + 1) / events.length) * 100) : 0;

  // Icono por tipo de evento
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'CREATED': return <Home className="w-5 h-5 text-gray-400" />;
      case 'LABEL_PRINTED': return <PackageIcon className="w-5 h-5 text-gray-400" />;
      case 'PICKED_UP': return <Truck className="w-5 h-5 text-blue-500" />;
      case 'IN_WAREHOUSE': return <Warehouse className="w-5 h-5 text-purple-500" />;
      case 'IN_TRANSIT': return <Truck className="w-5 h-5 text-blue-500" />;
      case 'OUT_FOR_DELIVERY': return <Truck className="w-5 h-5 text-orange-500" />;
      case 'DELIVERED': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'RETURNED': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'EXCEPTION': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Seguimiento del Paquete</h1>
        <p className="text-gray-600">Estado actual y ubicación del envío</p>
      </div>

      {/* Package Status */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {getStatusIcon(pkg.status)}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{pkg.code}</h2>
                <p className="text-gray-600">{pkg.description ?? "Sin descripción"}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setActiveSection("detail")}
              className="text-logistics-primary"
            >
              Ver Detalles
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Estado Actual</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Estado:</span> {pkg.status ? tStatus.status(pkg.status) : "Sin estado"}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Fecha Estimada:</span> {pkg.createdAt ?? "-"}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Ubicación Actual</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-logistics-primary" />
                <p>{pkg.location ?? "-"}</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progreso del Envío</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${progress === 100 ? "bg-green-500" : "bg-logistics-primary"}`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline visual */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Línea de Tiempo</h3>
          {loading && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="w-8 h-8" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-4">
            {!loading && !error && events.length === 0 && <p className="text-gray-500">No hay eventos de tracking disponibles.</p>}
            {events.map((event, idx) => {
              // Visual feedback for error/intermediate states
              let eventBg = "bg-gray-200 text-gray-500";
              let icon = getEventIcon(event.type);
              if (event.type === 'EXCEPTION') {
                eventBg = "bg-red-100 text-red-700 border border-red-400";
                icon = <AlertTriangle className="w-5 h-5 text-red-500" />;
              } else if (event.type === 'DELAYED') {
                eventBg = "bg-yellow-100 text-yellow-700 border border-yellow-400";
                icon = <Clock className="w-5 h-5 text-yellow-500" />;
              } else if (event.type === pkg.status) {
                eventBg = "bg-logistics-primary text-white";
              }
              return (
                <div key={idx} className="flex items-center gap-4">
                  <div className={`rounded-full p-2 ${eventBg}`}>{icon}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{tStatus.status(event.type)}</div>
                    <div className="text-xs text-gray-500">{event.eventAt ? new Date(event.eventAt).toLocaleString() : ""}</div>
                    {event.location && <div className="text-xs text-gray-400"><span className="font-medium">Ubicación:</span> {event.location}</div>}
                    {event.responsible && <div className="text-xs text-gray-400"><span className="font-medium">Responsable:</span> {event.responsible}</div>}
                    {event.description && <div className="text-xs text-gray-400">{event.description}</div>}
                    {(event.latitude !== undefined && event.longitude !== undefined) && (
                      <div className="text-xs text-gray-400">
                        <span className="font-medium">Coordenadas:</span> {event.latitude}, {event.longitude}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
