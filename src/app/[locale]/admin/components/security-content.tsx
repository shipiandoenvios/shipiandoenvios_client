import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Clock, User, AlertTriangle, CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchJson, extractList } from "@/lib/api"

type Session = { user: string; status: string; ip?: string; location?: string; device?: string; time?: string }
type Log = { user: string; action: string; type: string; time?: string; ip?: string }


export function SecurityContent() {
  const [recentSessions, setRecentSessions] = useState<Session[]>([])
  const [activityLogs, setActivityLogs] = useState<Log[]>([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [sessionsRes, logsRes] = await Promise.all([
          fetchJson('/api/admin/sessions').catch(() => []),
          fetchJson('/api/admin/activity-logs?limit=50').catch(() => []),
        ])
        if (!mounted) return
        setRecentSessions(extractList(sessionsRes).items)
        setActivityLogs(extractList(logsRes).items)
      } catch {
        if (mounted) {
          setRecentSessions([])
          setActivityLogs([])
        }
      }
    })()
    return () => { mounted = false }
  }, [])

  const getActionIcon = (type: string) => {
    switch (type) {
      case "create":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "update":
        return <Eye className="w-4 h-4 text-blue-500" />
      case "delete":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "delivery":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Eye className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Seguridad y Acceso</h1>
        <Button className="bg-logistics-primary hover:bg-logistics-primary/90 text-white rounded-lg">
          <Shield className="w-4 h-4 mr-2" />
          Configurar Seguridad
        </Button>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sesiones Activas</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <User className="w-8 h-8 text-logistics-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Intentos Fallidos</p>
                <p className="text-3xl font-bold text-gray-900">3</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Acciones Hoy</p>
                <p className="text-3xl font-bold text-gray-900">247</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Última Auditoría</p>
                <p className="text-3xl font-bold text-gray-900">2d</p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Sessions */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Sesiones Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSessions.map((session, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-logistics-primary" />
                      <span className="font-medium text-gray-900">{session.user}</span>
                    </div>
                    <Badge
                      className={`${session.status === "Activa" ? "bg-green-500" : "bg-gray-500"} text-white`}
                    >
                      {session.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      IP: {session.ip} • {session.location}
                    </p>
                    <p>{session.device}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {session.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Registro de Actividad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border">
                  {getActionIcon(log.type)}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{log.user}</p>
                    <p className="text-sm text-gray-700">{log.action}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {log.time}
                      </div>
                      <span>IP: {log.ip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Policies */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Políticas de Seguridad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium text-green-900">Autenticación 2FA</span>
              </div>
              <p className="text-sm text-green-700">Activada para todos los administradores</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium text-green-900">Contraseñas Seguras</span>
              </div>
              <p className="text-sm text-green-700">Política de 8+ caracteres aplicada</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-yellow-900">Sesiones Automáticas</span>
              </div>
              <p className="text-sm text-yellow-700">Cierre después de 30 min de inactividad</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-blue-900">Auditoría Completa</span>
              </div>
              <p className="text-sm text-blue-700">Todas las acciones son registradas</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium text-green-900">Backup Automático</span>
              </div>
              <p className="text-sm text-green-700">Respaldo diario de datos críticos</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium text-green-900">Encriptación SSL</span>
              </div>
              <p className="text-sm text-green-700">Comunicación segura habilitada</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
