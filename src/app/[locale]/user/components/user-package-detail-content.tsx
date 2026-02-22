import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, MapPin, User, Calendar, Phone } from "lucide-react"
import { PackageData, PackageStatus } from "@/contracts/package"
import { getPackageStatusColor } from '@/lib/status'
import { Button } from "@/components/ui/button"
import { canCancelPackage } from "@/utils/canCancelPackage"
import { useAuthStore } from "@/store/store"
import { fetchJson } from "@/lib/api"
import { getApiUrl } from "@/packages/config"
import { toast } from "sonner"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { useStatusTranslation } from "@/packages/internationalization/useStatusTranslation"
import { useTranslations } from 'next-intl'

interface UserPackageDetailContentProps {
  selectedPackage?: PackageData
}

export function UserPackageDetailContent({ selectedPackage }: UserPackageDetailContentProps) {
  const tStatus = useStatusTranslation();
  const t = useTranslations('logistics');
  const packageDetail = selectedPackage;
  const user = useAuthStore((state) => state.user);
  const canCancel = packageDetail && user ? canCancelPackage(user, packageDetail) : false;
  const [loading, setLoading] = useState(false);
  const getStatusColor = (status?: string) => getPackageStatusColor(status)

  if (!packageDetail) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 text-center py-12">
        <p className="text-gray-600">Selecciona un paquete para ver los detalles.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-4" />
          <Skeleton className="h-5 w-64 mx-auto" />
        </div>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-5 w-40" />
              </div>
              <Skeleton className="h-8 w-24" />
            </div>
            <Skeleton className="h-4 w-full mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Detalle del Envío</h1>
        <p className="text-gray-600">Información completa de tu paquete</p>
      </div>

      {/* Package Info */}
      <Card className="border-0 shadow-lg border-l-4 border-l-logistics-primary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-logistics-primary">{packageDetail.id}</h2>
              <p className="text-gray-900 font-medium text-lg">{packageDetail.description}</p>
            </div>
            <Badge className={`${getStatusColor(packageDetail.status)} text-white px-4 py-2`}>
              {tStatus.status(packageDetail.status)}
            </Badge>
          </div>

          {/* Cancel button if allowed */}
          {canCancel && (
            <div className="mb-4 flex justify-end">
              <Button
                variant="destructive"
                disabled={loading}
                onClick={async () => {
                  if (!packageDetail) return;
                  setLoading(true);
                  try {
                    await fetchJson(getApiUrl(`/api/package/${packageDetail.id}`), {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ status: "CANCELLED" })
                    });
                    toast.success(t('labels.packageCanceled'));
                    // Opcional: recargar la página o refrescar datos
                    window.location.reload();
                  } catch (err: any) {
                    // Mostrar siempre el mensaje exacto del backend si existe
                    const backendMsg = err?.data?.message || err?.message;
                    toast.error(backendMsg || t('labels.errorCancelPackage'));
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {loading ? t('labels.canceling') : t('labels.cancelPackage')}
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-logistics-primary" />
                <div>
                  <p className="text-sm text-gray-600">Remitente</p>
                  <p className="font-medium">{packageDetail.sender}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-logistics-primary" />
                <div>
                  <p className="text-sm text-gray-600">Fecha de Envío</p>
                  <p className="font-medium">{packageDetail.date ?? '—'}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-logistics-primary" />
                <div>
                  <p className="text-sm text-gray-600">Entrega Estimada</p>
                  <p className="font-medium">{packageDetail.estimatedDate ?? packageDetail.eta ?? '—'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-logistics-primary" />
                <div>
                  <p className="text-sm text-gray-600">Peso</p>
                  <p className="font-medium">{packageDetail.weightKg ?? packageDetail.weight ?? '—'}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Info */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <User className="w-6 h-6 text-logistics-primary" />
            Información de Entrega
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-logistics-primary" />
              <div>
                <p className="text-sm text-gray-600">Destinatario</p>
                <p className="font-medium">{packageDetail.recipient}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-logistics-primary mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Dirección</p>
                <p className="font-medium">{typeof packageDetail.destination === 'string' ? packageDetail.destination : packageDetail.destination ? `${packageDetail.destination.street ? packageDetail.destination.street + ', ' : ''}${packageDetail.destination.city}, ${packageDetail.destination.country}` : '—'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-logistics-primary" />
              <div>
                <p className="text-sm text-gray-600">Teléfono</p>
                <p className="font-medium">{packageDetail.recipientPhone ?? packageDetail.phone ?? '—'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
