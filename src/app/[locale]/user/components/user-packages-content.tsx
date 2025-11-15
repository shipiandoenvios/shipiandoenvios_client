"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Package, Search, CheckCircle, Truck } from "lucide-react"
import { ActiveSection } from "@/app/[locale]/user/page"
// Local display mapping (replace mocks) — colors/icons by PackageStatus
const packageStatusColors: Record<string, string> = {
  CREATED: 'bg-gray-400',
  AWAITING_CHECKIN: 'bg-indigo-500',
  AT_ORIGIN: 'bg-indigo-400',
  IN_WAREHOUSE: 'bg-yellow-500',
  IN_TRANSIT: 'bg-blue-600',
  OUT_FOR_DELIVERY: 'bg-orange-500',
  DELIVERED: 'bg-green-500',
  RETURNED: 'bg-gray-600',
  EXCEPTION: 'bg-red-500',
  default: 'bg-gray-400',
};
import { PackageData, TrackingData, PackageStatus, TrackingEventType } from "@/contracts/package"
import { useStatusTranslation } from "@/packages/internationalization/useStatusTranslation"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useCallback } from "react"
import { useError } from "@/hooks/use-error"
import { ErrorMessage } from "@/components/ui/error-message"
import { usePagination } from "@/hooks/use-pagination"
import { Pagination } from "@/components/ui/pagination"
import { getApiUrl } from "@/packages/config"

interface UserPackagesContentProps {
  setSelectedPackage: (pkg: TrackingData) => void
  setActiveSection: (section: ActiveSection) => void
}

export function UserPackagesContent({ setSelectedPackage, setActiveSection }: UserPackagesContentProps) {
  const tStatus = useStatusTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(false);
  const { error, showError, clearError } = useError();
  const { page, setPage, limit, setLimit, total, pages, setMeta } = usePagination({ initialLimit: 20 });

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    clearError();
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: searchTerm,
      });
      const res = await fetch(getApiUrl(`/api/package?${params}`), {
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        showError(errorData.message || "Error al obtener paquetes");
        setPackages([]);
        return;
      }
      const data = await res.json();
      setPackages(data.items || []);
      setMeta({ total: data.pagination?.total || 0 });
    } catch (err) {
      showError("Error de conexión. Intenta de nuevo más tarde.");
      setPackages([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, searchTerm, setMeta, showError, clearError]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const convertToTrackingData = (pkg: PackageData): TrackingData => ({
    code: pkg.trackingCode ?? pkg.id,
    shipmentId: pkg.shipmentId ?? "",
    type: TrackingEventType.CREATED,
    description: pkg.description,
    createdAt: pkg.date,
    location: pkg.zone,
    status: pkg.status,
  });

  const getStatusIcon = (status: PackageStatus) => {
    // Map PackageStatus to display icon
    switch (status) {
      case PackageStatus.DELIVERED:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case PackageStatus.OUT_FOR_DELIVERY:
      case PackageStatus.IN_TRANSIT:
        return <Truck className="w-5 h-5 text-blue-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: PackageStatus) => packageStatusColors[status] || packageStatusColors["default"];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mis Paquetes</h1>
        <p className="text-gray-600">Gestiona y rastrea todos tus envíos</p>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar por código o descripción..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>


      {/* Error Message */}
  {error && <ErrorMessage message={error || ''} className="mb-4" />}
      {/* Packages List */}
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10" />
                      <div>
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24 mt-2" />
                      </div>
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-6 w-20 mb-2" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-3 w-full mb-4" />
                  <div className="flex gap-3">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? null : packages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No se encontraron paquetes.</div>
        ) : (
          packages.map((pkg) => (
            <Card key={pkg.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                {/* ...existing code... */}
                    <Search className="w-4 h-4 mr-2" />
                    Ver Seguimiento
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedPackage(convertToTrackingData(pkg));
                      setActiveSection("detail");
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Ver Detalle
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <Pagination page={page} pages={pages} setPage={setPage} />
    </div>
  );
}
