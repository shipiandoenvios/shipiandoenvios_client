import React from "react";

interface PaginationProps {
  page: number;
  pages: number;
  setPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, pages, setPage }) => {
  if (pages <= 1) return null;

  return (
    <nav className="flex justify-center items-center gap-2 mt-4">
      <button
        className="px-3 py-1 rounded border bg-white text-gray-700 disabled:opacity-50"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        &lt;
      </button>
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i + 1}
          className={`px-3 py-1 rounded border ${page === i + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded border bg-white text-gray-700 disabled:opacity-50"
        onClick={() => setPage(page + 1)}
        disabled={page === pages}
      >
        &gt;
      </button>
    </nav>
  );
};
