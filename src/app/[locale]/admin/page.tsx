"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { ShipmentsContent } from "@/components/shipments-content"
import { ClientsContent } from "@/components/clients-content"
import { DriversContent } from "@/components/drivers-content"
import { TrackingContent } from "@/components/tracking-content"
import { ReportsContent } from "@/components/reports-content"
import { SettingsContent } from "@/components/settings-content"
import { SecurityContent } from "@/components/security-content"

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />
      case "shipments":
        return <ShipmentsContent />
      case "clients":
        return <ClientsContent />
      case "drivers":
        return <DriversContent />
      case "tracking":
        return <TrackingContent />
      case "reports":
        return <ReportsContent />
      case "settings":
        return <SettingsContent />
      case "security":
        return <SecurityContent />
      default:
        return <DashboardContent />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="h-8 w-8" />
              <h1 className="text-lg font-semibold text-gray-900">SHIPIANDO</h1>
            </div>
          </div>
          <div className="p-6">{renderContent()}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
