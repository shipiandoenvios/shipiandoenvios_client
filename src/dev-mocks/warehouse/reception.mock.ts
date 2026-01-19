export interface WarehouseReceptionPackageData {
  tracking: string;
  sender: string;
  recipient: string;
  destination: string;
  weight: string;
}

export const warehouseReceptionMockPackage: WarehouseReceptionPackageData = {
  tracking: "TRK-001237",
  sender: "Roberto Silva",
  recipient: "Laura Fernández",
  destination: "Palermo",
  weight: "2.5 kg",
}
