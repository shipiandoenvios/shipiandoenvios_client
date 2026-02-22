export interface DeliveryPackage {
    id: string;
    recipient: string;
    address: string;
    phone: string;
    weight: string;
    priority: string;
}

export const currentPackage: DeliveryPackage = {
    id: "TRK-001234",
    recipient: "María García",
    address: "Av. Santa Fe 1234, Piso 5, Depto B, Palermo",
    phone: "+54 11 4567-8901",
    weight: "2.5 kg",
    priority: "Normal",
}

export const deliveryFailureReasons = [
    { value: "absent", label: "Destinatario ausente" },
    { value: "wrong-address", label: "Dirección incorrecta" },
    { value: "refused", label: "Paquete rechazado" },
    { value: "no-access", label: "Sin acceso al edificio" },
    { value: "damaged", label: "Paquete dañado" },
    { value: "other", label: "Otro motivo" },
]

export const priorityColors = {
    "Normal": "bg-blue-500",
    "Alta": "bg-red-500",
    "Baja": "bg-green-500",
    "default": "bg-gray-500"
}
