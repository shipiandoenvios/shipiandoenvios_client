"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Lock, Bell, Save } from "lucide-react"
import { userProfile } from "@/mocks/user/profile.mock"

export function UserProfileContent() {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    address: userProfile.address,
  })

  const [notifications, setNotifications] = useState({
    email: userProfile.notifications.email,
    sms: userProfile.notifications.sms,
    push: userProfile.notifications.push,
  })

  const handleSave = () => {
    alert("Perfil actualizado exitosamente")
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mi Perfil</h1>
        <p className="text-gray-600">Gestiona tu información personal</p>
      </div>
      {/* Account Status */}
      <Card className="border-0 shadow-lg bg-logistics-primary text-white">
        <CardContent className="p-6 text-center">
          <Badge className="bg-white text-logistics-primary mb-4">{userProfile.accountStatus.badge}</Badge>
          <h2 className="text-2xl font-bold mb-2">{userProfile.accountStatus.welcome}</h2>
          <p className="text-white/80">Miembro desde {userProfile.accountStatus.memberSince} • {userProfile.accountStatus.packagesReceived} paquetes recibidos</p>
        </CardContent>
      </Card>
      {/* Personal Info */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <User className="w-6 h-6 text-logistics-primary" />
              Información Personal
            </h3>
            <Button onClick={() => setIsEditing(!isEditing)} variant="outline" size="sm">
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                disabled={!isEditing}
                className="h-12"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  disabled={!isEditing}
                  className="pl-12 h-12"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="phone"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="pl-12 h-12"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Dirección</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <Input
                  id="address"
                  value={userData.address}
                  onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  disabled={!isEditing}
                  className="pl-12 h-12"
                />
              </div>
            </div>
            {isEditing && (
              <Button onClick={handleSave} className="w-full bg-logistics-primary hover:bg-logistics-primary/90 h-12">
                <Save className="w-5 h-5 mr-2" />
                Guardar Cambios
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Bell className="w-6 h-6 text-logistics-primary" />
            Notificaciones
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email</Label>
                <p className="text-sm text-gray-600">Recibe actualizaciones por correo</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS</Label>
                <p className="text-sm text-gray-600">Alertas por mensaje de texto</p>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Push</Label>
                <p className="text-sm text-gray-600">Notificaciones en tiempo real</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6 text-logistics-primary" />
            Cambiar Contraseña
          </h3>
          <div className="space-y-4">
            <Input type="password" placeholder="Contraseña actual" className="h-12" />
            <Input type="password" placeholder="Nueva contraseña" className="h-12" />
            <Input type="password" placeholder="Confirmar contraseña" className="h-12" />
            <Button className="w-full bg-logistics-primary hover:bg-logistics-primary/90 h-12">
              <Lock className="w-5 h-5 mr-2" />
              Cambiar Contraseña
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
