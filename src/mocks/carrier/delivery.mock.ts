export interface DeliveryPackage {
    id: string;
    recipient: string;
    address: string;
    phone: string;
    weight: string;
    priority: string;
}

// Only interfaces/types should remain here. All mock/example data has been removed as data now comes from the backend.