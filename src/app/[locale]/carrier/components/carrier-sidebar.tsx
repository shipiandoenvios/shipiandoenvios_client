"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Home, Map, Package, CheckCircle, Clock, LogOut, User, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CarrierSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const carrierMenuItems = [
  { id: "dashboard", title: "Dashboard", icon: Home },
  { id: "route", title: "Mi Ruta", icon: Map },
  { id: "pickup", title: "Retiro", icon: Package },
  { id: "delivery", title: "Entrega", icon: CheckCircle },
  { id: "history", title: "Historial", icon: Clock },
]

export function CarrierSidebar({ activeSection, setActiveSection }: CarrierSidebarProps) {
  const currentTime = new Date().toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Sidebar className="border-r border-gray-200" collapsible="icon">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-logistics-primary rounded-lg flex items-center justify-center">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-xl font-bold text-gray-900">SHIPIANDO</h2>
            <p className="text-sm text-gray-600">Sistema de Cartero</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {carrierMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className="w-full justify-start gap-3 px-4 py-3 rounded-lg hover:bg-logistics-primary/10 data-[active=true]:bg-logistics-primary data-[active=true]:text-white"
                    tooltip={item.title}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <div className="mb-4 p-3 bg-gray-50 rounded-lg group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-logistics-primary" />
            <span className="font-medium text-gray-900">Roberto Sánchez</span>
          </div>
          <p className="text-sm text-gray-600">Cartero - Zona Norte</p>
          <div className="flex items-center gap-2 mt-2">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-500">{currentTime}</span>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900">
          <LogOut className="w-5 h-5" />
          <span className="group-data-[collapsible=icon]:hidden">Finalizar Jornada</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
