export const priceSettings = {
    basePrice: 5.00,
    pricePerKg: 1.50,
    expressMultiplier: 1.5,
    zonePricing: [
        { value: "local", label: "Local - $500" },
        { value: "regional", label: "AMBA - $800" },
        { value: "national", label: "Interior - $1200" },
    ]
}

export const zoneSettings = {
    defaultZone: {
        name: "Microcentro",
        postalCodes: "C1001, C1002, C1003",
        deliveryTime: 24
    }
}

export const notificationSettings = {
    emailNotifications: false,
    smsNotifications: false,
    delayAlerts: true,
    deliveryConfirmations: true
}

export const userRoleSettings = {
    adminRoles: [
        { value: "full", label: "Permisos completos" },
        { value: "limited", label: "Permisos limitados" },
        { value: "readonly", label: "Solo lectura" }
    ],
    operatorRoles: [
        { value: "shipments", label: "Gestión de envíos" },
        { value: "clients", label: "Gestión de clientes" },
        { value: "both", label: "Ambos" }
    ],
    driverRoles: [
        { value: "assigned", label: "Solo entregas asignadas" },
        { value: "zone", label: "Toda la zona" }
    ]
}

export const shipmentStatusSettings = {
    defaultStatuses: [
        { id: "status-1", placeholder: "Pendiente" },
        { id: "status-2", placeholder: "En tránsito" },
        { id: "status-3", placeholder: "Entregado" },
        { id: "status-4", placeholder: "Cancelado" }
    ]
}
