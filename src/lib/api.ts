import { AUTH_CSRF_COOKIE_NAME, CSRF_HEADER } from '@/packages/auth/constants';

export async function fetchJson(url: string, opts: RequestInit = {}) {
  const headers = new Headers(opts.headers || {});

  function extractMessageFromData(d: any) {
    if (!d) return null;
    const candidate = d?.message ?? d?.error ?? d?.errors ?? d?.messages;
    if (Array.isArray(candidate)) return candidate.join(', ');
    if (candidate == null) return null;
    return typeof candidate === 'string' ? candidate : String(candidate);
  }

  try {
    const method = (opts.method || 'GET').toString().toUpperCase();
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      const csrfCookieName = AUTH_CSRF_COOKIE_NAME;
      let csrfToken: string | null = null;
      if (typeof document !== 'undefined') {
        const match = document.cookie.match(new RegExp('(^|; )' + csrfCookieName + '=([^;]*)'));
        csrfToken = match ? decodeURIComponent(match[2]) : null;
      }
      if (csrfToken) headers.set(CSRF_HEADER, csrfToken);
    }
  } catch (e) {
  }

  const res = await fetch(url, { credentials: 'include', ...opts, headers });
  const text = await res.text();
  let data: any = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { message: text }; }

  if (!res.ok) {
    if (res.status === 401 && !(opts as any)?._retry) {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
        const refreshUrl = `${apiBase}/api/auth/refresh`;
        const refreshRes = await fetch(refreshUrl, { method: 'POST', credentials: 'include' });
        if (refreshRes.ok) {
          const newOpts = { ...(opts || {}), headers: headers, ...( { _retry: true } as any) } as RequestInit & { _retry?: boolean };
          const retryRes = await fetch(url, { credentials: 'include', ...newOpts, headers });
          const retryText = await retryRes.text();
          let retryData: any = {};
          try { retryData = retryText ? JSON.parse(retryText) : {}; } catch { retryData = { message: retryText }; }
          if (!retryRes.ok) {
            const message = extractMessageFromData(retryData) || `HTTP ${retryRes.status}`;
            const err: any = new Error(message);
            err.status = retryRes.status;
            err.response = retryData;
            throw err;
          }
          return retryData;
        }
      } catch (e) {
        try { emitAuthEvent('refresh-failed'); } catch (err) { console.error('Failed to emit auth event', err); }
      }
    }

    const message = extractMessageFromData(data) || `HTTP ${res.status}`;
    const err: any = new Error(message);
    err.status = res.status;
    err.response = data;
    throw err;
  }
  return data;
} 

export function extractList(response: any) {
  if (!response) return { items: [], pagination: undefined };
  const items = Array.isArray(response)
    ? response
    : Array.isArray(response.data)
    ? response.data
    : Array.isArray(response.items)
    ? response.items
    : [];
  const pagination = response?.meta?.pagination ?? response?.pagination ?? undefined;
  return { items, pagination };
}

import { appendPaginationToUrl } from './pagination';
import { emitAuthEvent } from './auth-events';

export async function getCount(endpoint: string) {
  try {
    const url = appendPaginationToUrl(endpoint, { limit: 1, page: 1 });
    const data = await fetchJson(url);
    const { pagination, items } = extractList(data);
    return pagination?.total ?? (Array.isArray(items) ? items.length : 0);
  } catch (err) {
    return 0;
  }
}
