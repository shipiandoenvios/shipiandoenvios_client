"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CarrierSidebar } from "@/components/carrier-sidebar"
import { CarrierDashboardContent } from "@/components/carrier-dashboard-content"
import { CarrierRouteContent } from "@/components/carrier-route-content"
import { CarrierPickupContent } from "@/components/carrier-pickup-content"
import { CarrierDeliveryContent } from "@/components/carrier-delivery-content"
import { CarrierHistoryContent } from "@/components/carrier-history-content"
import { Truck } from "lucide-react"

export default function CarrierPanel() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <CarrierDashboardContent />
      case "route":
        return <CarrierRouteContent />
      case "pickup":
        return <CarrierPickupContent />
      case "delivery":
        return <CarrierDeliveryContent />
      case "history":
        return <CarrierHistoryContent />
      default:
        return <CarrierDashboardContent />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <CarrierSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="h-8 w-8" />
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-logistics-primary" />
                <h1 className="text-lg font-semibold text-gray-900">Cartero</h1>
              </div>
            </div>
          </div>
          <div className="p-4 md:p-6">{renderContent()}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
