export async function fetchJson(url: string, opts: RequestInit = {}) {
  const headers = new Headers(opts.headers || {});

  try {
    const method = (opts.method || 'GET').toString().toUpperCase();
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      const csrfCookieName = process.env.NEXT_PUBLIC_AUTH_CSRF_COOKIE_NAME || 'sopy-csrf';
      let csrfToken: string | null = null;
      if (typeof document !== 'undefined') {
        const match = document.cookie.match(new RegExp('(^|; )' + csrfCookieName + '=([^;]*)'));
        csrfToken = match ? decodeURIComponent(match[2]) : null;
      }
      if (csrfToken) headers.set('x-csrf-token', csrfToken);
    }
  } catch (e) {
  }

  const res = await fetch(url, { credentials: 'include', ...opts, headers });
  const text = await res.text();
  let data: any = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { message: text }; }

  if (!res.ok) {
    // Try refresh once on 401
    if (res.status === 401 && !(opts as any)?._retry) {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
        const refreshUrl = `${apiBase}/api/auth/refresh`;
        const refreshRes = await fetch(refreshUrl, { method: 'POST', credentials: 'include' });
        if (refreshRes.ok) {
          // retry original request once
          const newOpts = { ...(opts || {}), headers: headers, ...( { _retry: true } as any) } as RequestInit & { _retry?: boolean };
          const retryRes = await fetch(url, { credentials: 'include', ...newOpts, headers });
          const retryText = await retryRes.text();
          let retryData: any = {};
          try { retryData = retryText ? JSON.parse(retryText) : {}; } catch { retryData = { message: retryText }; }
          if (!retryRes.ok) {
            const message = retryData?.message || `HTTP ${retryRes.status}`;
            const err: any = new Error(message);
            err.status = retryRes.status;
            err.data = retryData;
            throw err;
          }
          return retryData;
        }
      } catch (e) {
        // fallthrough to original error
      }
    }

    const message = data?.message || `HTTP ${res.status}`;
    const err: any = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export async function getCount(endpoint: string) {
  try {
    const url = `${endpoint}${endpoint.includes('?') ? '&' : '?'}limit=1&page=1`;
    const data = await fetchJson(url);
    return data?.pagination?.total ?? (Array.isArray(data) ? data.length : 0);
  } catch (err) {
    return 0;
  }
}
