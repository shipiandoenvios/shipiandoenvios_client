// User related enums and types for the client

export enum ClientStatus {
  VIP = "VIP",
  ACTIVE = "ACTIVE",
  NEW = "NEW",
  INACTIVE = "INACTIVE",
}

export enum DriverStatus {
  ON_ROUTE = "ON_ROUTE",
  ACTIVE = "ACTIVE",
  OUT_OF_SERVICE = "OUT_OF_SERVICE",
  BUSY = "BUSY",
  REST = "REST",
  UNKNOWN = "UNKNOWN",
}

export interface AuthorizedUser {
  id: string;
  name: string;
  role: string;
  shift?: string;
  status?: DriverStatus | string; // string fallback for compatibility
}
