"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { WarehouseSidebar } from "@/components/warehouse-sidebar"
import { WarehouseReceptionContent } from "@/components/warehouse-reception-content"
import { WarehouseInventoryContent } from "@/components/warehouse-inventory-content"
import { WarehouseDispatchContent } from "@/components/warehouse-dispatch-content"
import { WarehouseTrackingContent } from "@/components/warehouse-tracking-content"
import { WarehouseSettingsContent } from "@/components/warehouse-settings-content"
import { WarehouseDashboardContent } from "@/components/warehouse-dashboard-content"
import { Warehouse } from "lucide-react"

export default function WarehousePanel() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <WarehouseDashboardContent />
      case "reception":
        return <WarehouseReceptionContent />
      case "inventory":
        return <WarehouseInventoryContent />
      case "dispatch":
        return <WarehouseDispatchContent />
      case "tracking":
        return <WarehouseTrackingContent />
      case "settings":
        return <WarehouseSettingsContent />
      default:
        return <WarehouseDashboardContent />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <WarehouseSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="h-8 w-8" />
              <div className="flex items-center gap-2">
                <Warehouse className="w-5 h-5 text-logistics-primary" />
                <h1 className="text-lg font-semibold text-gray-900">Depósito</h1>
              </div>
            </div>
          </div>
          <div className="p-6">{renderContent()}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
