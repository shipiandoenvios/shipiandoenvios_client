// Only interfaces/types should remain here. All mock/example data has been removed as data now comes from the backend.

export const priceSettings = {
    basePrice: 0,
    pricePerKg: 0,
    expressMultiplier: 1,
    zonePricing: [
        { value: "", label: "" },
    ]
}

export const zoneSettings = {
    defaultZone: {
        name: "",
        postalCodes: "",
        deliveryTime: 0
    }
}

export const notificationSettings = {
    emailNotifications: false,
    smsNotifications: false,
    delayAlerts: false,
    deliveryConfirmations: false
}

export const userRoleSettings = {
    adminRoles: [
        { value: "", label: "" },
    ],
    operatorRoles: [
        { value: "", label: "" },
    ],
    driverRoles: [
        { value: "", label: "" },
    ]
}

export const shipmentStatusSettings = {
    defaultStatuses: [
        { id: "", placeholder: "" },
    ]
}
