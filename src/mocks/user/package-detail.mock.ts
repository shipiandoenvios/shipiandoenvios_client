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

export const userPackageStatusColors: { [key: string]: string } = {
  "Entregado": "bg-green-500",
  "En reparto": "bg-blue-500",
  "default": "bg-orange-500",
}

// Only interfaces/types should remain here. All mock/example data has been removed as data now comes from the backend.
