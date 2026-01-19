import { PackageStatus } from '@/contracts/package'

export const shipments = [
    {
        id: "ENV-001",
        client: "Juan Pérez",
        destination: "Palermo, Buenos Aires",
        weight: "2.5 kg",
        status: PackageStatus.IN_TRANSIT,
        date: "2024-01-15",
        tracking: "TRK123456789",
    },
    {
        id: "ENV-002",
        client: "María García",
        destination: "Belgrano, Buenos Aires",
        weight: "1.2 kg",
        status: PackageStatus.DELIVERED,
        date: "2024-01-14",
        tracking: "TRK987654321",
    },
    {
        id: "ENV-003",
        client: "Carlos López",
        destination: "San Telmo, Buenos Aires",
        weight: "3.8 kg",
        status: PackageStatus.CREATED,
        date: "2024-01-15",
        tracking: "TRK456789123",
    },
    {
        id: "ENV-004",
        client: "Ana Martín",
        destination: "Recoleta, Buenos Aires",
        weight: "0.8 kg",
        status: PackageStatus.CANCELLED,
        date: "2024-01-13",
        tracking: "TRK789123456",
    },
]

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
    [PackageStatus.CREATED]: "bg-yellow-500",
    [PackageStatus.CANCELLED]: "bg-red-500",
    default: "bg-gray-500",
}
