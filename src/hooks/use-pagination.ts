import { useState } from "react";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
}

export function usePagination(options: UsePaginationOptions = {}) {
  const [page, setPage] = useState(options.initialPage ?? 1);
  const [limit, setLimit] = useState(options.initialLimit ?? 10);
  const [total, setTotal] = useState(0);

  const pages = Math.ceil(total / limit);

  const setMeta = (meta: { total: number }) => {
    setTotal(meta.total);
  };

  return {
    page,
    setPage,
    limit,
    setLimit,
    total,
    pages,
    setMeta,
  };
}
