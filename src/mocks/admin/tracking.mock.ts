export const trackingStats = {
    activeVehicles: 18,
    packagesInTransit: 35,
    deliveredToday: 127,
    averageTime: "2.4h"
}

export const activeDeliveries = [
    {
        id: "ENV-001",
        driver: "Roberto Sánchez",
        vehicle: "ABC-123",
        packages: 12,
        currentLocation: "Av. Corrientes, Microcentro",
        destination: "Palermo Soho",
        estimatedTime: "15 min",
        status: "En ruta",
    },
    {
        id: "ENV-004",
        driver: "Laura Jiménez",
        vehicle: "GHI-012",
        packages: 15,
        currentLocation: "Plaza San Martín, Retiro",
        destination: "La Boca",
        estimatedTime: "8 min",
        status: "Próxima entrega",
    },
    {
        id: "ENV-007",
        driver: "Carmen Ruiz",
        vehicle: "XYZ-456",
        packages: 8,
        currentLocation: "Av. Santa Fe, Barrio Norte",
        destination: "Villa Crespo",
        estimatedTime: "22 min",
        status: "En ruta",
    },
]

export const recentDeliveries = [
    {
        id: "ENV-002",
        client: "María García",
        time: "14:30",
        location: "Belgrano",
        status: "Entregado",
    },
    {
        id: "ENV-005",
        client: "Pedro Martínez",
        time: "13:45",
        location: "San Telmo",
        status: "Entregado",
    },
    {
        id: "ENV-008",
        client: "Ana López",
        time: "12:15",
        location: "Recoleta",
        status: "Entregado",
    },
]

export const deliveryStatusColors = {
    "Próxima entrega": "bg-orange-500",
    "En ruta": "bg-blue-500",
    "default": "bg-gray-500"
}
