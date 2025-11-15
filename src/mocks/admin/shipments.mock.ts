// Only interfaces/types should remain here. All mock/example data has been removed as data now comes from the backend.

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
