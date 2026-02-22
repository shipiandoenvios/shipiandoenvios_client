import { fetchJson, extractList } from '../api';
import { appendPaginationToUrl } from '../pagination';
import { getApiUrl } from '@/packages/config';

export async function listTrackingEvents(options?: { page?: number; limit?: number; shipmentId?: string; [key: string]: any }) {
  const { page = 1, limit = 20, shipmentId, ...rest } = options || {};
  const params = { page, limit, shipmentId, ...rest };
  const url = appendPaginationToUrl(getApiUrl('/api/tracking-event'), params as any);
  const data = await fetchJson(url);
  const { items, pagination } = extractList(data);
  return { items: items as any[], pagination };
}

export async function getTrackingEvent(id: string) {
  const url = getApiUrl(`/api/tracking-event/${id}`);
  return await fetchJson(url) as { success: boolean; data?: any };
}
