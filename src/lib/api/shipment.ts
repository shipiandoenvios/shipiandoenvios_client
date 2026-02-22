import { fetchJson, extractList } from '../api';
import { appendPaginationToUrl } from '../pagination';
import { getApiUrl } from '@/packages/config';
import type { PackageData, PaginatedResult } from '@/contracts/package';

export async function listShipments(options?: { page?: number; limit?: number; search?: string; status?: string; [key: string]: any }) {
  const { page = 1, limit = 20, search, status, ...rest } = options || {};
  // Accept both enum values or snake_case strings for status. If enum-like value (e.g. IN_TRANSIT) is provided, normalize to snake_case lowercase 'in_transit'
  const normalizedStatus = status && status.includes('_') ? status.toLowerCase() : status;
  const params = { page, limit, search, status: normalizedStatus !== 'all' ? normalizedStatus : undefined, ...rest };
  const url = appendPaginationToUrl(getApiUrl('/api/shipment'), params as any);
  const data = await fetchJson(url);
  const { items, pagination } = extractList(data);
  return { items: items as any[], pagination } as PaginatedResult<any>;
}

export async function getShipment(id: string) {
  const url = getApiUrl(`/api/shipment/${id}`);
  return await fetchJson(url) as { success: boolean; data?: any };
}
