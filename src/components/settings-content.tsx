import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, DollarSign, MapPin, Bell, Users, Save } from "lucide-react"

export function SettingsContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h1>
        <Button className="bg-logistics-primary hover:bg-logistics-primary/90 text-white rounded-lg">
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pricing Settings */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-logistics-primary" />
              <CardTitle className="text-xl font-semibold text-gray-900">Tarifas y Precios</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="base-price">Tarifa Base (€)</Label>
              <Input id="base-price" type="number" placeholder="5.00" className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price-per-kg">Precio por Kg (€)</Label>
              <Input id="price-per-kg" type="number" placeholder="1.50" className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="express-multiplier">Multiplicador Express</Label>
              <Input id="express-multiplier" type="number" placeholder="1.5" className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zone-pricing">Tarifas por Zona</Label>
              <Select>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Configurar zonas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local - $500</SelectItem>
                  <SelectItem value="regional">AMBA - $800</SelectItem>
                  <SelectItem value="national">Interior - $1200</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Zones */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-logistics-primary" />
              <CardTitle className="text-xl font-semibold text-gray-900">Zonas de Entrega</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="zone-name">Nombre de Zona</Label>
              <Input id="zone-name" placeholder="Microcentro" className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal-codes">Códigos Postales</Label>
              <Input id="postal-codes" placeholder="C1001, C1002, C1003..." className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery-time">Tiempo de Entrega (horas)</Label>
              <Input id="delivery-time" type="number" placeholder="24" className="rounded-lg" />
            </div>
            <Button className="w-full bg-logistics-primary hover:bg-logistics-primary/90 text-white rounded-lg">
              Agregar Zona
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-logistics-primary" />
              <CardTitle className="text-xl font-semibold text-gray-900">Notificaciones</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Notificaciones por Email</Label>
                <p className="text-sm text-gray-600">Recibir alertas por correo electrónico</p>
              </div>
              <Switch id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">Notificaciones SMS</Label>
                <p className="text-sm text-gray-600">Alertas críticas por mensaje de texto</p>
              </div>
              <Switch id="sms-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="delay-alerts">Alertas de Retraso</Label>
                <p className="text-sm text-gray-600">Notificar cuando hay retrasos</p>
              </div>
              <Switch id="delay-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="delivery-confirmations">Confirmaciones de Entrega</Label>
                <p className="text-sm text-gray-600">Notificar entregas completadas</p>
              </div>
              <Switch id="delivery-confirmations" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-logistics-primary" />
              <CardTitle className="text-xl font-semibold text-gray-900">Gestión de Usuarios</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-role">Rol Administrador</Label>
              <Select>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Permisos completos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Permisos completos</SelectItem>
                  <SelectItem value="limited">Permisos limitados</SelectItem>
                  <SelectItem value="readonly">Solo lectura</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="operator-role">Rol Operador</Label>
              <Select>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Gestión de envíos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shipments">Gestión de envíos</SelectItem>
                  <SelectItem value="clients">Gestión de clientes</SelectItem>
                  <SelectItem value="both">Ambos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="driver-role">Rol Repartidor</Label>
              <Select>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Solo entregas asignadas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assigned">Solo entregas asignadas</SelectItem>
                  <SelectItem value="zone">Toda la zona</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-logistics-primary hover:bg-logistics-primary/90 text-white rounded-lg">
              Actualizar Roles
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Shipment Status Settings */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-logistics-primary" />
            <CardTitle className="text-xl font-semibold text-gray-900">Estados de Envío Personalizados</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status-1">Estado 1</Label>
              <Input id="status-1" placeholder="Pendiente" className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status-2">Estado 2</Label>
              <Input id="status-2" placeholder="En tránsito" className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status-3">Estado 3</Label>
              <Input id="status-3" placeholder="Entregado" className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status-4">Estado 4</Label>
              <Input id="status-4" placeholder="Cancelado" className="rounded-lg" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
