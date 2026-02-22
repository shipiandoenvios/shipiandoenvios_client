"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Plus, Trash2, Edit, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchJson, extractList } from "@/lib/api"

type Address = { id: string; name: string; street: string; city: string; state?: string; zipCode?: string; isDefault?: boolean }

export function UserAddressesContent() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchJson('/api/user/addresses').catch(() => null);
      const itemsList = extractList(res);
      setAddresses(itemsList.items);
    } catch (e: any) {
      setError(e?.message || 'Error cargando direcciones');
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (mounted) await fetchAddresses();
    })();
    return () => { mounted = false };
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Direcciones</h1>
          <p className="text-gray-600">Gestiona tus direcciones de entrega</p>
        </div>
        <div>
          <Button onClick={() => fetchAddresses()} disabled={loading} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" /> {loading ? 'Recargando...' : 'Recargar'}
          </Button>
        </div>
      </div>

      {/* Add New Address */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-logistics-primary" />
            <h2 className="text-xl font-bold text-gray-900">Agregar Nueva Dirección</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Nombre de la dirección" />
            <Input placeholder="Calle y número" />
            <Input placeholder="Ciudad" />
            <Input placeholder="Provincia" />
            <Input placeholder="Código Postal" />
            <div className="flex items-center gap-2">
              <Button className="w-full bg-logistics-primary hover:bg-logistics-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Dirección
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Addresses List */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <Card key={address.id} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{address.name}</h3>
                    {address.isDefault && (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Predeterminada
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{address.street}</p>
                  <p className="text-gray-600">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 
