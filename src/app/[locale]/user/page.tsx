"use client"

import { useState } from "react"
import { UserAddressesContent, UserDashboardContent, UserDetailContent, UserPackagesContent, UserProfileContent, UserSidebar, UserTrackingContent } from "./components"
import { Package, Menu } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"

export type ActiveSection = "dashboard" | "packages" | "addresses" | "profile" | "tracking" | "detail"

interface TimelineEvent {
  status: string
  date: string
  completed: boolean
  current?: boolean
}

interface TrackingData {
  id: string
  description: string
  sender: string
  status: "Entregado" | "En reparto" | "En tránsito"
  date: string
  progress: number
  estimatedDate: string
  currentLocation: string
  timeline: TimelineEvent[]
}

export default function UserPage() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard")
  const [selectedPackage, setSelectedPackage] = useState<TrackingData | null>(null)

  const handleSectionChange = (section: ActiveSection) => {
    setActiveSection(section)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <UserSidebar activeSection={activeSection} setActiveSection={handleSectionChange} />
        <main className="flex-1">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Package className="w-6 h-6 text-logistics-primary" />
              <span className="text-xl font-bold">Shipiando</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeSection === "dashboard" && <UserDashboardContent setActiveSection={handleSectionChange} />}
            {activeSection === "packages" && (
              <UserPackagesContent setSelectedPackage={setSelectedPackage} setActiveSection={handleSectionChange} />
            )}
            {activeSection === "addresses" && <UserAddressesContent />}
            {activeSection === "profile" && <UserProfileContent />}
            {activeSection === "tracking" && selectedPackage && (
              <UserTrackingContent package={selectedPackage} setActiveSection={handleSectionChange} />
            )}
            {activeSection === "detail" && selectedPackage && (
              <UserDetailContent package={selectedPackage} setActiveSection={handleSectionChange} />
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
