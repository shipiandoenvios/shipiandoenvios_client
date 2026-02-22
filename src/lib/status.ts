import { PackageStatus } from '@/contracts/package'

export function normalizeStatusKey(value?: string) {
  if (!value) return ''
  return String(value)
    .trim()
    .replace(/\s+/g, '_')
    .replace(/-+/g, '_')
    .toUpperCase()
}

export const packageStatusColors: Partial<Record<PackageStatus | 'default', string>> = {
  [PackageStatus.AWAITING_CHECKIN]: 'bg-yellow-500',
  [PackageStatus.IN_TRANSIT]: 'bg-blue-500',
  [PackageStatus.DELIVERED]: 'bg-green-500',
  [PackageStatus.CANCELLED]: 'bg-gray-500',
  default: 'bg-gray-500',
}

export function getPackageStatusColor(status?: string): string {
  const key = normalizeStatusKey(status) as keyof typeof packageStatusColors
  return (packageStatusColors[key] || packageStatusColors.default) as string
}

export const driverStatusColors: Record<string, string> = {
  // Reuse or add driver-specific colors if necessary
  ON_ROUTE: 'bg-blue-500',
  ACTIVE: 'bg-green-500',
  OUT_OF_SERVICE: 'bg-red-500',
  REST: 'bg-yellow-500',
  BUSY: 'bg-orange-500',
  default: 'bg-gray-500',
}

export function getDriverStatusColor(status?: string) {
  const key = normalizeStatusKey(status)
  return driverStatusColors[key] || driverStatusColors.default
}

export const clientStatusColors: Record<string, string> = {
  VIP: 'bg-purple-500',
  ACTIVE: 'bg-green-500',
  NEW: 'bg-blue-500',
  INACTIVE: 'bg-gray-500',
  default: 'bg-gray-500',
}

export function getClientStatusColor(status?: string) {
  const key = normalizeStatusKey(status)
  return clientStatusColors[key] || clientStatusColors.default
}
