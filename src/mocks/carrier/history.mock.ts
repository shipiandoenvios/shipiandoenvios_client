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

// Only interfaces/types should remain here. All mock/example data has been removed as data now comes from the backend.