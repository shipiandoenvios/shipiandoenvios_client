"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Search, Mail, Phone, Package, Eye, Edit } from "lucide-react"
import { useEffect, useCallback, useState } from "react"
import { ClientStatus } from '@/contracts/user'
import { getClientStatusColor } from '@/lib/status'
import { useStatusTranslation } from '@/packages/internationalization/useStatusTranslation'
import { Skeleton } from "@/components/ui/skeleton"
import { usePagination } from "@/hooks/use-pagination"
import { Pagination } from "@/components/ui/pagination"

import { getApiUrl } from "@/packages/config"
import { appendPaginationToUrl } from '@/lib/pagination'
import { listClients } from '@/lib/api/client'
import { useError } from "@/hooks/use-error"
import { ErrorMessage } from "@/components/ui/error-message"


export function ClientsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState<any[]>([]);
  const [clientStats, setClientStats] = useState<any>({ totalClients: 0, vipClients: 0, newClients: 0, activeClients: 0 });
  const [loading, setLoading] = useState(false);
  const { error, showError, clearError } = useError();
  const { page, setPage, limit, setLimit, total, pages, setMeta } = usePagination({ initialLimit: 20 });

  const fetchClients = useCallback(async () => {
    setLoading(true);
    clearError();
    try {
      const url = appendPaginationToUrl(getApiUrl(`/api/client`), { page, limit, search: searchTerm });
      const { items, pagination, stats } = await listClients({ page, limit, search: searchTerm });
      setClients(items);
      setMeta({ total: pagination?.total || 0 });
      setClientStats(stats || { totalClients: 0, vipClients: 0, newClients: 0, activeClients: 0 });
    } catch (err: any) {
      showError(err?.message || "Error al obtener clientes");
      setClients([]);
      setClientStats({ totalClients: 0, vipClients: 0, newClients: 0, activeClients: 0 });
    } finally {
      setLoading(false);
    }
  }, [page, limit, searchTerm, setMeta, showError, clearError]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const tStatus = useStatusTranslation();

  const getStatusColor = (status: ClientStatus | string) => getClientStatusColor(status?.toString?.() ?? "");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
        <Button className="bg-logistics-primary hover:bg-logistics-primary/90 text-white rounded-lg">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-md">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} className="border-0 shadow-md">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <Skeleton className="w-5 h-5" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                          <Skeleton className="h-4 w-40 mb-2" />
                          <Skeleton className="h-3 w-24" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : clients.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No se encontraron clientes.</div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Cliente</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Contacto</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Envíos</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Último Pedido</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((client) => (
                        <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-logistics-primary/10 rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-logistics-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{client.name}</p>
                                <p className="text-sm text-gray-600">{client.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Mail className="w-4 h-4" />
                                {client.email}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-700">
                                <Phone className="w-4 h-4" />
                                {client.phone}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-logistics-primary" />
                              <span className="font-medium text-gray-900">{client.totalShipments}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className={`${getStatusColor(client.status)} text-white`}>{tStatus.client(client.status ?? "")}</Badge>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{client.lastOrder}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-800">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-800">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
      </Card>
      {/* Clients Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-8 text-gray-500">Cargando clientes...</div>
            ) : clients.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No se encontraron clientes.</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Cliente</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Contacto</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Envíos</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Último Pedido</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-logistics-primary/10 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-logistics-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{client.name}</p>
                            <p className="text-sm text-gray-600">{client.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Mail className="w-4 h-4" />
                            {client.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Phone className="w-4 h-4" />
                            {client.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-logistics-primary" />
                          <span className="font-medium text-gray-900">{client.totalShipments}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${getStatusColor(client.status)} text-white`}>{tStatus.client(client.status ?? "")}</Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{client.lastOrder}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-800">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-800">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
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
