import { PackageStatus } from '@/contracts/package'

export type ActiveSection = "dashboard" | "packages" | "addresses" | "profile" | "tracking" | "detail"

export interface TimelineEvent {
  status: string
  date: string
  completed: boolean
  current?: boolean
}

export interface TrackingData {
  id: string
  code?: string
  shipmentId?: string
  description?: string
  sender?: string
  status?: PackageStatus
  date?: string
  createdAt?: string
  progress?: number
  estimatedDate?: string
  currentLocation?: string
  location?: string
  timeline?: TimelineEvent[]
}
