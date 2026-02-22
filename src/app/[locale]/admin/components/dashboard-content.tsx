import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, AlertTriangle, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { useStatusTranslation } from '@/packages/internationalization/useStatusTranslation'
import { Skeleton } from "@/components/ui/skeleton"
import { fetchJson, getCount, extractList } from "@/lib/api"
import { useError } from "@/hooks/use-error"
import { ErrorMessage } from "@/components/ui/error-message"

export function DashboardContent() {
  const { error, showError, clearError } = useError()
  const [usersCount, setUsersCount] = useState<number | null>(null)
  const [shipmentsCount, setShipmentsCount] = useState<number | null>(null)
  const [packagesCount, setPackagesCount] = useState<number | null>(null)
  const [recentShipments, setRecentShipments] = useState<any[]>([])
  const tStatus = useStatusTranslation()
  const [alerts, setAlerts] = useState<any[]>([])
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toLocaleString())

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const [u, s, p] = await Promise.all([
          getCount("/api/user"),
          getCount("/api/shipment"),
          getCount("/api/package"),
        ])
        if (!mounted) return
        setUsersCount(u)
        setShipmentsCount(s)
        setPackagesCount(p)

        // recent shipments
        try {
          const data = await fetchJson("/api/shipment?limit=5&page=1")
          const dataList = extractList(data)
          setRecentShipments(dataList.items)
        } catch (err: any) {
          // non-fatal for recent list
          console.debug("recent shipments load failed", err)
        }

        // alerts (admin alerts endpoint may or may not exist)
        try {
          const a = await fetchJson("/api/admin/alerts?limit=5&page=1")
          const aList = extractList(a)
          setAlerts(aList.items)
        } catch {
          // fallback to empty alerts
          setAlerts([])
        }

        setLastUpdate(new Date().toLocaleString())
      } catch (err: any) {
        showError(err?.message || "Error cargando datos del dashboard")
      }
    }

    load()
    return () => {
      mounted = false
      clearError()
    }
  }, [showError, clearError])

  const stats = [
    { title: "Usuarios", value: usersCount ?? "—", color: "bg-blue-500", icon: Users },
    { title: "Envíos", value: shipmentsCount ?? "—", color: "bg-green-500", icon: Package },
    { title: "Paquetes", value: packagesCount ?? "—", color: "bg-indigo-500", icon: Package },
    { title: "Última actualización", value: lastUpdate, color: "bg-gray-500", icon: Clock },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Badge variant="outline" className="text-logistics-primary border-logistics-primary">
          Actualizado hace {lastUpdate}
        </Badge>
      </div>

      {error ? <ErrorMessage message={error} /> : null}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentShipments.length === 0 ? (
                <div className="text-gray-500">No hay envíos recientes.</div>
              ) : (
                recentShipments.map((s, idx) => (
                  <div key={s.id || idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{s.trackingNumber || s.id}</p>
                      <p className="text-xs text-gray-600">{tStatus.status(s.status ?? '')}</p>
                    </div>
                    <span className="text-sm text-gray-600">{s.updatedAt ? new Date(s.updatedAt).toLocaleString() : ''}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Alertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.length === 0 ? (
                <div className="text-gray-500">No hay alertas.</div>
              ) : (
                alerts.map((a, idx) => (
                  <div key={a.id || idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-yellow-100">
                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{a.title || a.message || 'Alerta'}</p>
                        <p className="text-sm text-gray-600">{a.description}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">{a.time || ''}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
