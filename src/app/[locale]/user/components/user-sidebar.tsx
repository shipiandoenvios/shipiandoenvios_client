"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Package, Truck, MapPin, User, LogOut, Menu } from "lucide-react"
import { ActiveSection } from "@/app/[locale]/user/types"

interface UserSidebarProps {
  activeSection: ActiveSection
  setActiveSection: (section: ActiveSection) => void
}

export function UserSidebar({ activeSection, setActiveSection }: UserSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Package },
    { id: "packages", label: "Mis Paquetes", icon: Truck },
    { id: "addresses", label: "Mis Direcciones", icon: MapPin },
    { id: "profile", label: "Mi Perfil", icon: User },
  ]

  return (
    <Card className={`h-screen border-0 shadow-lg transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Package className="w-8 h-8 text-logistics-primary" />
              <span className="text-xl font-bold text-gray-900">Shipiando</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${activeSection === item.id
                  ? "bg-logistics-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
                onClick={() => setActiveSection(item.id as ActiveSection)}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <Button
            variant="ghost"
            className="w-[17%] justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="size-5" />
            {!isCollapsed && <span>Cerrar Sesión</span>}
          </Button>
        </div>
      </div>
    </Card>
  )
}
