"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { fetchJson, getCount } from "@/lib/api"
import { ErrorMessage } from "@/components/ui/error-message"
import { useError } from "@/hooks/use-error"
import { ActiveSection } from "@/app/[locale]/user/page"

interface UserDashboardContentProps {
  setActiveSection: (section: ActiveSection) => void
}

export function UserDashboardContent({ setActiveSection }: UserDashboardContentProps) {
  const [stats, setStats] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { error: shownError, showError, clearError } = useError();
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [packagesCount, shipmentsCount, trackingCount] = await Promise.all([
          getCount('/api/package'),
          getCount('/api/shipment'),
          getCount('/api/tracking-event'),
        ]);
        if (!mounted) return;
        setStats([
          { title: 'Paquetes', value: packagesCount, section: 'packages', bgColor: 'bg-blue-50', color: 'text-blue-600', icon: (() => null) },
          { title: 'Envíos', value: shipmentsCount, section: 'shipments', bgColor: 'bg-green-50', color: 'text-green-600', icon: (() => null) },
          { title: 'Eventos', value: trackingCount, section: 'tracking', bgColor: 'bg-yellow-50', color: 'text-yellow-600', icon: (() => null) },
        ]);
      } catch (err: any) {
        const msg = err?.message || 'Error cargando estadísticas';
        setError(msg);
        showError(msg);
      }
    }
    load();
    // fetch recent activity separately
    (async () => {
      try {
        const a = await fetchJson('/api/user/activity?limit=5').catch(() => null);
        setRecentActivity(a?.items || a || []);
      } catch {
        setRecentActivity([]);
      }
    })();
    return () => { mounted = false };
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Bienvenido a tu Portal</h1>
        <p className="text-gray-600">Gestiona tus envíos y mantén tu información actualizada</p>
      </div>
      {/* Stats Grid */}
      {error && <ErrorMessage message={error} className="mb-4" />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon || (() => null);
          return (
            <Card key={stat.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</h3>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-600 hover:text-gray-900"
                  onClick={() => setActiveSection(stat.section)}
                >
                  Ver detalles
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Actividad Reciente</h2>
              <div className="space-y-4">
                {recentActivity.map((activity: any, idx) => {
                  const Icon = activity.icon || (() => null)
                  return (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${activity.bgColor || 'bg-gray-100'}`}>
                          <Icon className={`w-5 h-5 ${activity.color || 'text-gray-500'}`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">{activity.time}</span>
                    </div>
                  )
                })}
              </div>
        </CardContent>
      </Card>
    </div>
  )
}
