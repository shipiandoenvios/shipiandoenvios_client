"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Home,
  Package,
  Users,
  Truck,
  MapPin,
  FileText,
  Settings,
  Shield,
  LogOut,
  Warehouse,
  Navigation,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: "dashboard", title: "Dashboard", icon: Home },
  { id: "shipments", title: "Gestión de Envíos", icon: Package },
  { id: "clients", title: "Gestión de Clientes", icon: Users },
  { id: "drivers", title: "Transportistas", icon: Truck },
  { id: "tracking", title: "Rastreo en Tiempo Real", icon: MapPin },
  { id: "reports", title: "Reportes", icon: FileText },
  { id: "settings", title: "Configuración", icon: Settings },
  { id: "security", title: "Seguridad", icon: Shield },
];

export function AppSidebar({
  activeSection,
  setActiveSection,
}: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-200" collapsible="icon">
      <SidebarHeader className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Image
            src="https://i.pinimg.com/736x/6d/af/c9/6dafc97bca1475385423ecef9f7f8899.jpg"
            alt="SHIPIANDO Logo"
            width={40}
            height={40}
            className="rounded-full size-10"
          />
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-xl font-bold text-gray-900">SHIPIANDO</h2>
            <p className="text-sm text-gray-600">Panel Administrativo</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => setActiveSection(item.id)}
                isActive={activeSection === item.id}
                className="w-full justify-start gap-3 px-4 py-3 rounded-lg hover:bg-logistics-primary/10 data-[active=true]:bg-logistics-primary data-[active=true]:text-white"
                tooltip={item.title}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium group-data-[collapsible=icon]:hidden">
                  {item.title}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {/* Acceso a Sistemas Especializados */}
        <div className="mt-6 space-y-4 group-data-[collapsible=icon]:hidden">
          {/* Sistema de Depósito */}
          {/* <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Warehouse className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Sistema de Depósito</span>
            </div>
            <p className="text-sm text-blue-700 mb-3">Módulo especializado para el personal del depósito</p>
            <Link href="/warehouse">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Abrir Depósito</Button>
            </Link>
          </div> */}

          {/* Sistema de Cartero */}
          {/* <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Navigation className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">Sistema de Cartero</span>
            </div>
            <p className="text-sm text-green-700 mb-3">Aplicación móvil para carteros y repartidores</p>
            <Link href="/carrier">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Abrir Cartero</Button>
            </Link>
          </div> */}

          {/* Portal del Cliente */}
          {/* <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900">Portal del Cliente</span>
            </div>
            <p className="text-sm text-purple-700 mb-3">Interfaz para que los clientes rastreen sus paquetes</p>
            <Link href="/user">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Abrir Portal</Button>
            </Link>
          </div> */}
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900"
        >
          <LogOut className="w-5 h-5" />
          <span className="group-data-[collapsible=icon]:hidden">
            Cerrar Sesión
          </span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
