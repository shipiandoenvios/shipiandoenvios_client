import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Clock, AlertTriangle, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchJson, getCount } from "@/lib/api"
import { useError } from "@/hooks/use-error"
import { ErrorMessage } from "@/components/ui/error-message"

export function DashboardContent() {
  const { error, showError, clearError } = useError()
  const [usersCount, setUsersCount] = useState<number | null>(null)
  const [shipmentsCount, setShipmentsCount] = useState<number | null>(null)
  const [packagesCount, setPackagesCount] = useState<number | null>(null)
  const [recentShipments, setRecentShipments] = useState<any[]>([])
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
          const items = Array.isArray(data) ? data : data?.items ?? data?.data ?? []
          setRecentShipments(items)
        } catch (err: any) {
          // non-fatal for recent list
          console.debug("recent shipments load failed", err)
        }

        // alerts (admin alerts endpoint may or may not exist)
        try {
          const a = await fetchJson("/api/admin/alerts?limit=5&page=1")
          const items = Array.isArray(a) ? a : a?.items ?? a?.data ?? []
          setAlerts(items)
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
              return (
                <div className="space-y-8 p-6">
                  {/* Header */}
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard</h1>
                    <p className="text-xl text-gray-600">Bienvenido al sistema de gestión SHIPIANDO</p>
                  </div>

                  {/* Error */}
                  {error && <ErrorMessage message={error} className="mb-4" />}

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {usersCount === null || shipmentsCount === null || packagesCount === null ? (
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

                  {/* Recent Shipments */}
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Envíos recientes</h2>
                    {usersCount === null || shipmentsCount === null || packagesCount === null ? (
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
                    ) : recentShipments.length === 0 ? (
                      <div className="text-gray-500">No hay envíos recientes.</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* ...existing code... */}
                      </div>
                    )}
                  </div>
                </div>
              )
              )}
