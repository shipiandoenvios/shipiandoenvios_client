export type PaginationParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  [key: string]: any;
};

export function buildPaginationQuery(params: PaginationParams = {}) {
  const qs = new URLSearchParams();
  if (params.page !== undefined) qs.set('page', String(params.page));
  if (params.limit !== undefined) qs.set('limit', String(params.limit));
  if (params.sortBy) qs.set('sortBy', params.sortBy);
  if (params.sortOrder) qs.set('sortOrder', params.sortOrder);
  if (params.search) qs.set('search', params.search);
  // include additional params as-is
  Object.keys(params).forEach((k) => {
    if (!['page', 'limit', 'sortBy', 'sortOrder', 'search'].includes(k) && params[k] !== undefined) {
      qs.set(k, String(params[k]));
    }
  });
  const str = qs.toString();
  return str ? `?${str}` : '';
}

export function appendPaginationToUrl(url: string, params: PaginationParams = {}) {
  const query = buildPaginationQuery(params);
  if (!query) return url;
  return `${url}${url.includes('?') ? '&' : '?'}${query.replace(/^\?/, '')}`;
}
