export interface Package {
    id: string;
    recipient: string;
    destination: string;
    weight: string;
    priority: "Express" | "Urgente" | "Normal";
    status: "Listo" | "Retirado" | "Falta";
}

export const assignedPackages: Package[] = [
    {
        id: "TRK-001234",
        recipient: "María García",
        destination: "Palermo",
        weight: "2.5 kg",
        priority: "Normal",
        status: "Listo",
    },
    {
        id: "TRK-001235",
        recipient: "Carlos López",
        destination: "Belgrano",
        weight: "1.2 kg",
        priority: "Express",
        status: "Listo",
    },
    {
        id: "TRK-001236",
        recipient: "Ana Martín",
        destination: "Recoleta",
        weight: "0.8 kg",
        priority: "Urgente",
        status: "Retirado",
    },
]