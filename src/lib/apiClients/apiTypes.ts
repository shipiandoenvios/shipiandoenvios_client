export type Pagination = {
  page?: number;
  limit?: number;
  total?: number;
};

export type PaginatedResult<T> = {
  items: T[];
  meta?: {
    pagination?: Pagination;
  };
};

export type PackageDto = {
  id: string;
  trackingCode?: string | null;
  status?: string;
  orderId?: string | null;
  currentWarehouseId?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type CreatePackageDto = Partial<PackageDto> & { trackingCode?: string };
export type UpdatePackageDto = Partial<PackageDto>;

export type ShipmentDto = {
  id: string;
  status?: string;
  carrierId?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type TrackingEventDto = {
  id: string;
  shipmentId: string;
  code: string;
  type: string;
  description?: string;
  eventAt?: string;
};

export type ClientDto = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
};