import { fetchJson } from '@/lib/api';
import { getApiUrl } from '@/packages/config';
import type { ShipmentDto, PaginatedResult } from './apiTypes';

const BASE = (path: string) => getApiUrl(path);

export async function listShipments(query?: Record<string, any>): Promise<PaginatedResult<ShipmentDto>> {
  const url = BASE('/api/shipment') + (query ? `?${new URLSearchParams(query as any).toString()}` : '');
  return fetchJson(url) as Promise<PaginatedResult<ShipmentDto>>;
}

export async function getShipment(id: string): Promise<ShipmentDto> {
  return fetchJson(BASE(`/api/shipment/${id}`)) as Promise<ShipmentDto>;
}

export async function updateShipment(id: string, data: Partial<ShipmentDto>): Promise<ShipmentDto> {
  return fetchJson(BASE(`/api/shipment/${id}`), { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }) as Promise<ShipmentDto>;
}