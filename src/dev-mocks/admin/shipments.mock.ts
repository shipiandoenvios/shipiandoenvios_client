export const shipments = [
    {
        id: "ENV-001",
        client: "Juan Pérez",
        destination: "Palermo, Buenos Aires",
        weight: "2.5 kg",
        status: "En tránsito",
        date: "2024-01-15",
        tracking: "TRK123456789",
    },
    {
        id: "ENV-002",
        client: "María García",
        destination: "Belgrano, Buenos Aires",
        weight: "1.2 kg",
        status: "Entregado",
        date: "2024-01-14",
        tracking: "TRK987654321",
    },
    {
        id: "ENV-003",
        client: "Carlos López",
        destination: "San Telmo, Buenos Aires",
        weight: "3.8 kg",
        status: "Pendiente",
        date: "2024-01-15",
        tracking: "TRK456789123",
    },
    {
        id: "ENV-004",
        client: "Ana Martín",
        destination: "Recoleta, Buenos Aires",
        weight: "0.8 kg",
        status: "Cancelado",
        date: "2024-01-13",
        tracking: "TRK789123456",
    },
]

export const shipmentStatusFilters = [
    { value: "all", label: "Todos los estados" },
    { value: "pending", label: "Pendiente" },
    { value: "transit", label: "En tránsito" },
    { value: "delivered", label: "Entregado" },
    { value: "cancelled", label: "Cancelado" },
]

export const statusColors = {
    "Entregado": "bg-green-500",
    "En tránsito": "bg-blue-500",
    "Pendiente": "bg-yellow-500",
    "Cancelado": "bg-red-500",
    "default": "bg-gray-500",
}
