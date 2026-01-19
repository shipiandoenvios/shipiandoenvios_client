export const driverStats = {
    totalDrivers: 24,
    onRoute: 18,
    available: 4,
    outOfService: 2,
}

import { DriverStatus } from '@/contracts/user'

export const drivers = [
    {
        id: "DRV-001",
        name: "Roberto Sánchez",
        zone: "Microcentro",
        vehicle: "Furgoneta - ABC-123",
        assignedShipments: 12,
        status: DriverStatus.ON_ROUTE,
        rating: 4.8,
        deliveries: 156,
    },
    {
        id: "DRV-002",
        name: "Carmen Ruiz",
        zone: "Zona Norte",
        vehicle: "Camión - XYZ-456",
        assignedShipments: 8,
        status: DriverStatus.ACTIVE,
        rating: 4.9,
        deliveries: 203,
    },
    {
        id: "DRV-003",
        name: "Miguel Torres",
        zone: "Zona Sur",
        vehicle: "Furgoneta - DEF-789",
        assignedShipments: 0,
        status: DriverStatus.OUT_OF_SERVICE,
        rating: 4.6,
        deliveries: 89,
    },
    {
        id: "DRV-004",
        name: "Laura Jiménez",
        zone: "Zona Oeste",
        vehicle: "Motocicleta - GHI-012",
        assignedShipments: 15,
        status: DriverStatus.ON_ROUTE,
        rating: 4.7,
        deliveries: 134,
    },
]