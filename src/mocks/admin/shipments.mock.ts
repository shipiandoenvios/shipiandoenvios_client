// Only interfaces/types should remain here. All mock/example data has been removed as data now comes from the backend.

import { PackageStatus } from '@/contracts/package'

export const shipmentStatusFilters = [
    { value: 'all', label: 'Todos los estados' },
    { value: PackageStatus.CREATED, label: 'Pendiente' },
    { value: PackageStatus.IN_TRANSIT, label: 'En tránsito' },
    { value: PackageStatus.DELIVERED, label: 'Entregado' },
    { value: PackageStatus.CANCELLED, label: 'Cancelado' },
]

export const statusColors = {
    [PackageStatus.DELIVERED]: "bg-green-500",
    [PackageStatus.IN_TRANSIT]: "bg-blue-500",
    default: "bg-gray-500",
}
