import { fetchJson, extractList } from '../api';
import { appendPaginationToUrl } from '../pagination';
import { getApiUrl } from '@/packages/config';

export async function listClients(options?: { page?: number; limit?: number; search?: string; [key: string]: any }) {
  const { page = 1, limit = 20, search, ...rest } = options || {};
  const params = { page, limit, search, ...rest };
  const url = appendPaginationToUrl(getApiUrl('/api/client'), params as any);
  const data = await fetchJson(url);
  const { items, pagination } = extractList(data);
  const stats = data?.stats ?? undefined;
  return { items: items as any[], pagination, stats };
}

export async function getClient(id: string) {
  const url = getApiUrl(`/api/client/${id}`);
  return await fetchJson(url) as { success: boolean; data?: any };
}
