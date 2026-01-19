export const clientStats = {
    totalClients: 1247,
    vipClients: 89,
    newClients: 34,
    activeClients: 1158,
}

import { ClientStatus } from '@/contracts/user'

export const clients = [
    {
        id: "CLI-001",
        name: "Juan Pérez",
        email: "juan.perez@email.com",
        phone: "+54 11 4567-8901",
        totalShipments: 15,
        status: ClientStatus.ACTIVE,
        lastOrder: "2024-01-15",
    },
    {
        id: "CLI-002",
        name: "María García",
        email: "maria.garcia@email.com",
        phone: "+54 11 4567-8902",
        totalShipments: 8,
        status: ClientStatus.ACTIVE,
        lastOrder: "2024-01-14",
    },
    {
        id: "CLI-003",
        name: "Carlos López",
        email: "carlos.lopez@email.com",
        phone: "+54 11 4567-8903",
        totalShipments: 23,
        status: ClientStatus.VIP,
        lastOrder: "2024-01-15",
    },
    {
        id: "CLI-004",
        name: "Ana Martín",
        email: "ana.martin@email.com",
        phone: "+54 11 4567-8904",
        totalShipments: 3,
        status: ClientStatus.NEW,
        lastOrder: "2024-01-13",
    },
]
