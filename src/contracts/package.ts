// Centralized contracts for Package, Tracking, and related enums
// This file should be kept in sync with backend DTOs and enums

export enum PackageStatus {
  CREATED = 'CREATED',
  AWAITING_CHECKIN = 'AWAITING_CHECKIN',
  AT_ORIGIN = 'AT_ORIGIN',
  IN_WAREHOUSE = 'IN_WAREHOUSE',
  IN_TRANSIT = 'IN_TRANSIT',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
  EXCEPTION = 'EXCEPTION',
}

export enum TrackingEventType {
  CREATED = 'CREATED',
  LABEL_PRINTED = 'LABEL_PRINTED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  HUB_TRANSFER = 'HUB_TRANSFER',
  IN_WAREHOUSE = 'IN_WAREHOUSE',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  DELAYED = 'DELAYED',
  EXCEPTION = 'EXCEPTION',
  RETURN_INITIATED = 'RETURN_INITIATED',
  RETURNED = 'RETURNED',
}

export interface PackageData {
  id: string;
  trackingCode: string;
  status: PackageStatus;
  lastStatusAt?: string;
  lastScanAt?: string;
  heightCm?: number;
  lengthCm?: number;
  widthCm?: number;
  weightKg?: number;
  origin?: AddressInfo | null;
  destination?: AddressInfo | null;
  shipmentId?: string;
  [key: string]: any; // For backend extensions
}

export interface TrackingData {
  id: string;
  shipmentId: string;
  type: TrackingEventType;
  eventAt: string;
  location?: string;
  description?: string;
  responsible?: string;
  latitude?: number;
  longitude?: number;
}

export interface AddressInfo {
  id: string;
  city: string;
  country: string;
  street?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
