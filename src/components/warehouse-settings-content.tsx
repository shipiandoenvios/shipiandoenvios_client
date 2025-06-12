import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Settings, Users, MapPin, Package, Save } from "lucide-react"

export function WarehouseSettingsContent() {
  const authorizedUsers = [
    { id: 1, name: "Ana López", role: "Operador", shift: "Mañana", status: "Activo" },
    { id: 2, name: "Carlos Mendoza", role: "Supervisor", shift: "Tarde", status: "Activo" },
    { id: 3, name: "María Fernández", role: "Operador", shift: "Noche", status: "Inactivo" },
  ]

  const zones = [
    { id: 1, name: "Zona Norte", areas: ["Palermo", "Belgrano", "Núñez", "Recoleta"] },
    { id: 2, name: "Zona Sur", areas: ["San Telmo", "La Boca", "Barracas"] },
    { id: 3, name: "Zona Oeste", areas: ["Caballito", "Flores", "Almagro"] },
  ]

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Configuración del Depósito</h1>
        <p className="text-xl text-gray-600">Gestiona la configuración y usuarios del sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Settings className="w-6 h-6 text-logistics-primary" />
              Configuración General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="warehouse-name">Nombre del Depósito</Label>
              <Input id="warehouse-name" defaultValue="Depósito Central SHIPIANDO" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-capacity">Capacidad Máxima (paquetes)</Label>
              <Input id="max-capacity" type="number" defaultValue="500" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-notifications">Notificaciones Automáticas</Label>
                <p className="text-sm text-gray-600">Alertas cuando se alcance el umbral</p>
              </div>
              <Switch id="auto-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="qr-scanner">Escáner QR Habilitado</Label>
                <p className="text-sm text-gray-600">Permitir escaneo de códigos QR</p>
              </div>
              <Switch id="qr-scanner" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Estado del Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Package className="w-8 h-8 text-green-600" />
                </div>
                <p className="font-medium text-gray-900">Capacidad Actual</p>
                <p className="text-2xl font-bold text-green-600">65%</p>
                <p className="text-sm text-gray-600">325/500 paquetes</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <p className="font-medium text-gray-900">Personal Activo</p>
                <p className="text-2xl font-bold text-blue-600">3/4</p>
                <p className="text-sm text-gray-600">Turno actual</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Authorized Users */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-6 h-6 text-logistics-primary" />
                Usuarios Autorizados
              </CardTitle>
              <Button size="sm" className="bg-logistics-primary hover:bg-logistics-primary/90">
                Agregar Usuario
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {authorizedUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">
                      {user.role} - {user.shift}
                    </p>
                  </div>
                  <Badge className={user.status === "Activo" ? "bg-green-500" : "bg-gray-500"}>{user.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Zones */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-logistics-primary" />
                Zonas de Entrega
              </CardTitle>
              <Button size="sm" className="bg-logistics-primary hover:bg-logistics-primary/90">
                Nueva Zona
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {zones.map((zone) => (
                <div key={zone.id} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{zone.name}</h4>
                  <p className="text-sm text-gray-600">Áreas: {zone.areas.join(", ")}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="text-center">
        <Button className="bg-logistics-primary hover:bg-logistics-primary/90 text-white px-8 py-3">
          <Save className="w-5 h-5 mr-2" />
          Guardar Configuración
        </Button>
      </div>
    </div>
  )
}
