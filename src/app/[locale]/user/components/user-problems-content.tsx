"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Phone } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchJson, extractList } from "@/lib/api"
import { PackageStatus } from '@/contracts/package'
import { useStatusTranslation } from '@/packages/internationalization/useStatusTranslation'

type ProblemPackage = { id: string; description: string; problem: string; status: PackageStatus; lastAttempt?: string }

const defaultProblemTypes = [
  { value: 'lost', label: 'Paquete perdido' },
  { value: 'damaged', label: 'Paquete dañado' },
  { value: 'delay', label: 'Retraso' },
]

const defaultEmergencyContact = { description: 'Soporte 24/7', phone: '+1-800-000-000' }

export function UserProblemsContent() {
  const tStatus = useStatusTranslation();
  const [trackingCode, setTrackingCode] = useState("")
  const [problemType, setProblemType] = useState("")
  const [description, setDescription] = useState("")
  const [problemPackages, setProblemPackages] = useState<ProblemPackage[]>([])
  const [problemTypes, setProblemTypes] = useState(defaultProblemTypes)
  const [emergencyContact, setEmergencyContact] = useState(defaultEmergencyContact)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [pkgsRes, typesRes, contactRes] = await Promise.all([
          fetchJson('/api/problems?user=me&status=active').catch(() => []),
          fetchJson('/api/problem-types').catch(() => null),
          fetchJson('/api/support/contact').catch(() => null),
        ])
        if (!mounted) return
        const pkgsList = extractList(pkgsRes)
        setProblemPackages(pkgsList.items)
        if (typesRes) setProblemTypes(typesRes)
        if (contactRes) setEmergencyContact(contactRes)
      } catch {
        if (mounted) {
          setProblemPackages([])
        }
      }
    })()
    return () => { mounted = false }
  }, [])

  const handleSubmit = () => {
    if (!trackingCode || !problemType || !description.trim()) {
      alert("Por favor completa todos los campos")
      return
    }
    alert("Problema reportado exitosamente")
    setTrackingCode("")
    setProblemType("")
    setDescription("")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Reportar Problema</h1>
        <p className="text-gray-600">¿Tienes algún inconveniente con tu envío?</p>
      </div>

      {/* Report Form */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="tracking">Código de Seguimiento</Label>
            <Input
              id="tracking"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Ej: TRK-001234"
              className="h-12"
            />
          </div>
          <div>
            <Label htmlFor="problem">Tipo de Problema</Label>
            <Select value={problemType} onValueChange={setProblemType}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecciona el problema" />
              </SelectTrigger>
              <SelectContent>
                {problemTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe qué ocurrió..."
              className="h-24"
            />
          </div>
          <Button onClick={handleSubmit} className="w-full bg-red-600 hover:bg-red-700 h-12">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Reportar Problema
          </Button>
        </CardContent>
      </Card>

      {/* Active Problems */}
  {problemPackages.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Problemas Activos</h3>
            <div className="space-y-4">
              {problemPackages.map((pkg) => (
                <div key={pkg.id} className="p-4 bg-orange-50 rounded-lg border-l-4 border-l-orange-500">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-logistics-primary">{pkg.id}</p>
                      <p className="text-gray-900">{pkg.description}</p>
                      <p className="text-sm text-gray-600">Problema: {pkg.problem}</p>
                    </div>
                    <Badge className="bg-orange-500 text-white">{tStatus.status(pkg.status ?? '')}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Último intento: {pkg.lastAttempt}</p>
                  <Button size="sm" className="bg-logistics-primary hover:bg-logistics-primary/90">
                    Reprogramar Entrega
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emergency Contact */}
      <Card className="border-0 shadow-lg bg-logistics-primary text-white">
        <CardContent className="p-6 text-center">
          <Phone className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">¿Necesitas ayuda urgente?</h3>
          <p className="text-white/80 mb-4">{emergencyContact.description}</p>
          <div className="text-2xl font-bold">{emergencyContact.phone}</div>
        </CardContent>
      </Card>
    </div>
  )
}
