import { fetchJson } from '@/lib/api';
import { getApiUrl } from '@/packages/config';
import type { PackageDto, PaginatedResult, CreatePackageDto, UpdatePackageDto } from './apiTypes';

const BASE = (path: string) => getApiUrl(path);

export async function listPackages(query?: Record<string, any>): Promise<PaginatedResult<PackageDto>> {
  const url = BASE('/api/package') + (query ? `?${new URLSearchParams(query as any).toString()}` : '');
  return fetchJson(url) as Promise<PaginatedResult<PackageDto>>;
}

export async function getPackage(id: string): Promise<PackageDto> {
  return fetchJson(BASE(`/api/package/${id}`)) as Promise<PackageDto>;
}

export async function createPackage(dto: CreatePackageDto): Promise<PackageDto> {
  return fetchJson(BASE('/api/package'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dto) }) as Promise<PackageDto>;
}

export async function updatePackage(id: string, dto: UpdatePackageDto): Promise<PackageDto> {
  return fetchJson(BASE(`/api/package/${id}`), { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dto) }) as Promise<PackageDto>;
}

export async function changePackageStatus(id: string, status: string): Promise<PackageDto> {
  return updatePackage(id, { status } as any);
}