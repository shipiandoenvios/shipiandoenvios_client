import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, MapPin, User, Calendar, Phone } from "lucide-react"

interface UserPackageDetailContentProps {
  selectedPackage?: any
}

export function UserPackageDetailContent({ selectedPackage }: UserPackageDetailContentProps) {
  const packageDetail = selectedPackage || {
    id: "TRK-001234",
    description: "Libro JavaScript",
    sender: "Amazon",
    status: "En reparto",
    estimatedDate: "Hoy 16:30",
    weight: "0.5 kg",
    recipient: "María García",
    recipientAddress: "Av. Santa Fe 1234, Palermo",
    recipientPhone: "+54 11 4567-8901",
    shippingDate: "14/01/2024",
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregado":
        return "bg-green-500"
      case "En reparto":
        return "bg-blue-500"
      default:
        return "bg-orange-500"
    }
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
              {packageDetail.status}
            </Badge>
          </div>

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
                  <p className="font-medium">{packageDetail.shippingDate}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-logistics-primary" />
                <div>
                  <p className="text-sm text-gray-600">Entrega Estimada</p>
                  <p className="font-medium">{packageDetail.estimatedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-logistics-primary" />
                <div>
                  <p className="text-sm text-gray-600">Peso</p>
                  <p className="font-medium">{packageDetail.weight}</p>
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
                <p className="font-medium">{packageDetail.recipientAddress}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-logistics-primary" />
              <div>
                <p className="text-sm text-gray-600">Teléfono</p>
                <p className="font-medium">{packageDetail.recipientPhone}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
