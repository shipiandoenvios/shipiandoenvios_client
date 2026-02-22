import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, DollarSign, MapPin, Bell, Users, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchJson } from "@/lib/api"

const defaultPriceSettings = { basePrice: 1.0, pricePerKg: 0.5, expressMultiplier: 1.5, zonePricing: [] }
const defaultZoneSettings = { defaultZone: { name: '', postalCodes: '', deliveryTime: 24 } }
const defaultNotificationSettings = { emailNotifications: false, smsNotifications: false, delayAlerts: false, deliveryConfirmations: false }
const defaultUserRoleSettings = { adminRoles: [], operatorRoles: [], driverRoles: [] }
const defaultShipmentStatusSettings = { defaultStatuses: [] }


export function SettingsContent() {
  const [priceSettings, setPriceSettings] = useState<any>(defaultPriceSettings)
  const [zoneSettings, setZoneSettings] = useState<any>(defaultZoneSettings)
  const [notificationSettings, setNotificationSettings] = useState<any>(defaultNotificationSettings)
  const [userRoleSettings, setUserRoleSettings] = useState<any>(defaultUserRoleSettings)
  const [shipmentStatusSettings, setShipmentStatusSettings] = useState<any>(defaultShipmentStatusSettings)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetchJson('/api/admin/settings').catch(() => null)
        if (!mounted) return
        if (res) {
          setPriceSettings(res.priceSettings || res.price || defaultPriceSettings)
          setZoneSettings(res.zoneSettings || res.zones || defaultZoneSettings)
          setNotificationSettings(res.notificationSettings || defaultNotificationSettings)
          setUserRoleSettings(res.userRoleSettings || defaultUserRoleSettings)
          setShipmentStatusSettings(res.shipmentStatusSettings || defaultShipmentStatusSettings)
        }
      } catch {
        if (mounted) {
          setPriceSettings(defaultPriceSettings)
          setZoneSettings(defaultZoneSettings)
          setNotificationSettings(defaultNotificationSettings)
        }
      }
    })()
    return () => { mounted = false }
  }, [])
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
              <Input id="base-price" type="number" placeholder={priceSettings.basePrice.toString()} className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price-per-kg">Precio por Kg (€)</Label>
              <Input id="price-per-kg" type="number" placeholder={priceSettings.pricePerKg.toString()} className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="express-multiplier">Multiplicador Express</Label>
              <Input id="express-multiplier" type="number" placeholder={priceSettings.expressMultiplier.toString()} className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zone-pricing">Tarifas por Zona</Label>
              <Select>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Configurar zonas" />
                </SelectTrigger>
                <SelectContent>
                  {priceSettings.zonePricing.map((zone: any) => (
                    <SelectItem key={zone.value} value={zone.value}>{zone.label}</SelectItem>
                  ))}
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
              <Input id="zone-name" placeholder={zoneSettings.defaultZone.name} className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal-codes">Códigos Postales</Label>
              <Input id="postal-codes" placeholder={zoneSettings.defaultZone.postalCodes} className="rounded-lg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery-time">Tiempo de Entrega (horas)</Label>
              <Input id="delivery-time" type="number" placeholder={zoneSettings.defaultZone.deliveryTime.toString()} className="rounded-lg" />
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
              <Switch id="email-notifications" checked={notificationSettings.emailNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications">Notificaciones SMS</Label>
                <p className="text-sm text-gray-600">Alertas críticas por mensaje de texto</p>
              </div>
              <Switch id="sms-notifications" checked={notificationSettings.smsNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="delay-alerts">Alertas de Retraso</Label>
                <p className="text-sm text-gray-600">Notificar cuando hay retrasos</p>
              </div>
              <Switch id="delay-alerts" checked={notificationSettings.delayAlerts} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="delivery-confirmations">Confirmaciones de Entrega</Label>
                <p className="text-sm text-gray-600">Notificar entregas completadas</p>
              </div>
              <Switch id="delivery-confirmations" checked={notificationSettings.deliveryConfirmations} />
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
                  {userRoleSettings.adminRoles.map((role: any) => (
                    <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                  ))}
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
                  {userRoleSettings.operatorRoles.map((role: any) => (
                    <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                  ))}
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
                  {userRoleSettings.driverRoles.map((role: any) => (
                    <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                  ))}
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
            {shipmentStatusSettings.defaultStatuses.map((status: any) => (
              <div key={status.id} className="space-y-2">
                <Label htmlFor={status.id}>Estado {status.id.split('-')[1]}</Label>
                <Input id={status.id} placeholder={status.placeholder} className="rounded-lg" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
