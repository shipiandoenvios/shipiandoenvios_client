"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Package, Search, CheckCircle, Truck, RefreshCw } from "lucide-react"
import { ActiveSection } from "@/app/[locale]/user/types"
import { getPackageStatusColor } from '@/lib/status'
import { PackageData, PackageStatus, TrackingEventType } from "@/contracts/package"
import { TrackingData } from "@/app/[locale]/user/types"
import { useStatusTranslation } from "@/packages/internationalization/useStatusTranslation"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useCallback, Dispatch, SetStateAction, useRef } from "react"
import { useError } from "@/hooks/use-error"
import { ErrorMessage } from "@/components/ui/error-message"
import { usePagination } from "@/hooks/use-pagination"
import { Pagination } from "@/components/ui/pagination"
import { getApiUrl } from "@/packages/config"
import { appendPaginationToUrl } from '@/lib/pagination'
import { listPackages } from '@/lib/api/package'

interface UserPackagesContentProps {
  setSelectedPackage: Dispatch<SetStateAction<TrackingData | null>>
  setActiveSection: (section: ActiveSection) => void
}

export function UserPackagesContent({ setSelectedPackage, setActiveSection }: UserPackagesContentProps) {
  const tStatus = useStatusTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(false);
  const { error, showError, clearError } = useError();
  const { page, setPage, limit, setLimit, total, pages, setMeta } = usePagination({ initialLimit: 20 });

  // Debounce search input to avoid firing requests on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const abortRef = useRef<AbortController | null>(null);

  const fetchPackages = useCallback(async () => {
    // Cancel previous pending request (if any)
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    clearError();
    try {
      const { items, pagination } = await listPackages({ page, limit, search: debouncedSearch, signal: controller.signal });
      setPackages(items);
      setMeta({ total: pagination?.total || 0 });
    } catch (err: any) {
      // Ignore abort errors
      if (err?.name === 'AbortError') return;
      console.debug('[UserPackages] fetchPackages error:', err);
      showError(err ?? "Error de conexión. Intenta de nuevo más tarde.");
      setPackages([]);
    } finally {
      setLoading(false);
      // clear ref if this was the last controller
      if (abortRef.current === controller) abortRef.current = null;
    }
  }, [page, limit, debouncedSearch, setMeta, showError, clearError]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const convertToTrackingData = (pkg: PackageData): TrackingData => ({
    id: pkg.trackingCode ?? pkg.id,
    code: pkg.trackingCode ?? pkg.id,
    shipmentId: pkg.shipmentId,
    description: pkg.description ?? "",
    sender: undefined,
    status: pkg.status as PackageStatus,
    date: pkg.lastStatusAt ?? pkg.lastScanAt ?? new Date().toISOString(),
    createdAt: pkg.lastStatusAt ?? pkg.lastScanAt ?? new Date().toISOString(),
    progress: 0,
    estimatedDate: undefined,
    currentLocation: (pkg as any).zone ?? undefined,
    location: (pkg as any).zone ?? undefined,
    timeline: [],
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

  const getStatusColor = (status: PackageStatus) => getPackageStatusColor(status)

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
          <div className="flex gap-3 items-center">
            <div className="relative flex-1">
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
            <Button onClick={() => { setPage(1); fetchPackages(); }} disabled={loading} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" /> Recargar
            </Button>
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
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Package className="w-10 h-10 text-gray-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{pkg.trackingCode ?? pkg.id}</h3>
                      <p className="text-sm text-gray-600">{pkg.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor(pkg.status as PackageStatus)} text-white`}>{tStatus.status(pkg.status as PackageStatus)}</Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">Última actualización: {pkg.date}</p>
                <div className="flex gap-3">
                  <Button onClick={() => { setSelectedPackage(convertToTrackingData(pkg)); setActiveSection("tracking"); }} className="flex-1 bg-logistics-primary hover:bg-logistics-primary/90 text-white">
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
