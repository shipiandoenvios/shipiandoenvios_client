export interface Delivery {
    id: string;
    recipient: string;
    address: string;
    phone: string;
    status: "Entregado" | "Fallido" | "Pendiente";
    time: string;
    receivedBy: string;
    comments: string;
    priority: "Express" | "Urgente" | "Normal";
    failureReason?: string;
}

export const deliveryHistory: Delivery[] = [
    {
        id: "TRK-001237",
        recipient: "Roberto Silva",
        address: "Av. Corrientes 3456, Microcentro",
        phone: "+54 11 4567-8904",
        status: "Entregado",
        time: "14:30",
        receivedBy: "Roberto Silva",
        comments: "Entregado en recepción del edificio",
        priority: "Normal",
    },
    {
        id: "TRK-001233",
        recipient: "Patricia Gómez",
        address: "Av. Santa Fe 7890, Palermo",
        phone: "+54 11 4567-8905",
        status: "Entregado",
        time: "13:45",
        receivedBy: "Patricia Gómez",
        comments: "Entregado en mano propia",
        priority: "Express",
    },
    {
        id: "TRK-001232",
        recipient: "Diego Morales",
        address: "Av. Las Heras 5432, Recoleta",
        phone: "+54 11 4567-8906",
        status: "Fallido",
        time: "12:20",
        receivedBy: "",
        comments: "Destinatario ausente, se intentará mañana",
        priority: "Normal",
        failureReason: "Destinatario ausente",
    },
]