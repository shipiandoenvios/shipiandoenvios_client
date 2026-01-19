import { fetchJson, extractList } from '../api';
import { appendPaginationToUrl } from '../pagination';
import { getApiUrl } from '@/packages/config';
import type { PackageData, PaginatedResult } from '@/contracts/package';

export async function listPackages(options?: { page?: number; limit?: number; search?: string; status?: string; }) {
  const { page = 1, limit = 20, search, status } = options || {};
  const url = appendPaginationToUrl(getApiUrl('/api/package'), { page, limit, search, status: status !== 'all' ? status : undefined });
  const data = await fetchJson(url);
  const { items, pagination } = extractList(data);
  return { items: items as PackageData[], pagination } as PaginatedResult<PackageData>;
}

export async function getPackage(id: string) {
  const url = getApiUrl(`/api/package/${id}`);
  return await fetchJson(url) as { success: boolean; data?: PackageData; };
}
