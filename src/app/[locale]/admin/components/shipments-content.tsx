"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PackageData } from "@/contracts/package"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react"
import { useEffect, useCallback, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useError } from "@/hooks/use-error"
import { ErrorMessage } from "@/components/ui/error-message"
import { usePagination } from "@/hooks/use-pagination"
import { Pagination } from "@/components/ui/pagination"
import { getApiUrl } from "@/packages/config"
const shipmentStatusFilters = [
  { value: "all", label: "Todos" },
  { value: "Pendiente", label: "Pendiente" },
  { value: "En tránsito", label: "En tránsito" },
  { value: "Entregado", label: "Entregado" },
  { value: "Cancelado", label: "Cancelado" },
];
const statusColors = {
  Pendiente: "bg-yellow-500",
  "En tránsito": "bg-blue-500",
  Entregado: "bg-green-500",
  Cancelado: "bg-gray-500",
  default: "bg-gray-500",
};

export function ShipmentsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [shipments, setShipments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { error, showError, clearError } = useError();
  const { page, setPage, limit, setLimit, total, pages, setMeta } = usePagination({ initialLimit: 20 });

  const fetchShipments = useCallback(async () => {
    setLoading(true);
    clearError();
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: searchTerm,
        status: statusFilter !== "all" ? statusFilter : "",
      });
      const res = await fetch(getApiUrl(`/api/shipment?${params}`), {
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        showError(errorData.message || "Error al obtener envíos");
        setShipments([]);
        return;
      }
      const data = await res.json();
      setShipments(data.items || []);
      setMeta({ total: data.pagination?.total || 0 });
    } catch (err) {
      showError("Error de conexión. Intenta de nuevo más tarde.");
      setShipments([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, searchTerm, statusFilter, setMeta, showError, clearError]);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  const getStatusColor = (status: string) => {
    return statusColors[status as keyof typeof statusColors] || statusColors.default;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Envíos</h1>
        <Button className="bg-logistics-primary hover:bg-logistics-primary/90 text-white rounded-lg">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Envío
        </Button>
      </div>

  {/* Error Message */}
  {error && <ErrorMessage message={error} className="mb-4" />}
  {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por ID, cliente o destino..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  className="pl-10 rounded-lg"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value); setPage(1); }}>
              <SelectTrigger className="w-full md:w-48 rounded-lg">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                {shipmentStatusFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="rounded-lg">
              <Filter className="w-4 h-4 mr-2" />
              Más filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Shipments Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Lista de Envíos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-100">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                ))}
              </div>
            ) : shipments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No se encontraron envíos.</div>
            ) : (
              <table className="w-full">
                {/* ...existing code... */}
              </table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      <Pagination page={page} pages={pages} setPage={setPage} />
    </div>
  );
}
