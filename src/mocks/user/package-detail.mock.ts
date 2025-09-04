export interface UserPackageDetail {
  id: string;
  description: string;
  sender: string;
  status: string;
  estimatedDate: string;
  weight: string;
  recipient: string;
  recipientAddress: string;
  recipientPhone: string;
  shippingDate: string;
}

export const userPackageDetail: UserPackageDetail = {
  id: "TRK-001234",
  description: "Libro JavaScript",
  sender: "Amazon",
  status: "En reparto",
  estimatedDate: "Hoy 16:30",
  weight: "0.5 kg",
  recipient: "María García",
  recipientAddress: "Av. Santa Fe 1234, Palermo",
  recipientPhone: "+54 11 4567-8901",
  shippingDate: "14/01/2024",
}

export const userPackageStatusColors: { [key: string]: string } = {
  "Entregado": "bg-green-500",
  "En reparto": "bg-blue-500",
  "default": "bg-orange-500",
}
