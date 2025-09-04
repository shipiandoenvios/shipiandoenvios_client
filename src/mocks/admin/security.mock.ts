export const recentSessions = [
    {
        user: "Admin Principal",
        ip: "192.168.1.100",
        location: "Madrid, España",
        device: "Chrome - Windows",
        time: "2024-01-15 14:30",
        status: "Activa",
    },
    {
        user: "Operador 1",
        ip: "192.168.1.105",
        location: "Barcelona, España",
        device: "Firefox - macOS",
        time: "2024-01-15 13:45",
        status: "Cerrada",
    },
    {
        user: "Repartidor 3",
        ip: "10.0.0.45",
        location: "Valencia, España",
        device: "Mobile App - Android",
        time: "2024-01-15 12:20",
        status: "Activa",
    },
]

export const activityLogs = [
    {
        user: "Admin Principal",
        action: "Creó nuevo envío ENV-125",
        time: "2024-01-15 14:25",
        type: "create",
        ip: "192.168.1.100",
    },
    {
        user: "Operador 1",
        action: 'Actualizó estado de ENV-123 a "Entregado"',
        time: "2024-01-15 14:20",
        type: "update",
        ip: "192.168.1.105",
    },
    {
        user: "Admin Principal",
        action: "Eliminó cliente CLI-045",
        time: "2024-01-15 14:15",
        type: "delete",
        ip: "192.168.1.100",
    },
    {
        user: "Repartidor 3",
        action: "Marcó entrega como completada",
        time: "2024-01-15 14:10",
        type: "delivery",
        ip: "10.0.0.45",
    },
]
