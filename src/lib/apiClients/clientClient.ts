import { fetchJson } from '@/lib/api';
import { getApiUrl } from '@/packages/config';
import type { ClientDto, PaginatedResult } from './apiTypes';

const BASE = (path: string) => getApiUrl(path);

export async function listClients(query?: Record<string, any>): Promise<PaginatedResult<ClientDto>> {
  const url = BASE('/api/client') + (query ? `?${new URLSearchParams(query as any).toString()}` : '');
  return fetchJson(url) as Promise<PaginatedResult<ClientDto>>;
}

export async function getClient(id: string): Promise<ClientDto> {
  return fetchJson(BASE(`/api/client/${id}`)) as Promise<ClientDto>;
}
