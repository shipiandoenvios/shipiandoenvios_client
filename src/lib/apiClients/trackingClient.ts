import { fetchJson } from '@/lib/api';
import { getApiUrl } from '@/packages/config';
import type { TrackingEventDto, PaginatedResult } from './apiTypes';

const BASE = (path: string) => getApiUrl(path);

export async function listTrackingEvents(query?: Record<string, any>): Promise<PaginatedResult<TrackingEventDto>> {
  const url = BASE('/api/tracking-event') + (query ? `?${new URLSearchParams(query as any).toString()}` : '');
  return fetchJson(url) as Promise<PaginatedResult<TrackingEventDto>>;
}

export async function createTrackingEvent(dto: Partial<TrackingEventDto>): Promise<TrackingEventDto> {
  return fetchJson(BASE('/api/tracking-event'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dto) }) as Promise<TrackingEventDto>;
}