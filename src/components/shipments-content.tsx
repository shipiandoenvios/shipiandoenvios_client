"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Plus, Search, Filter, Eye, Edit, Trash2 } from "lucide-react"

export function ShipmentsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const shipments = [
    {
      id: "ENV-001",
      client: "Juan Pérez",
      destination: "Palermo, Buenos Aires",
      weight: "2.5 kg",
      status: "En tránsito",
      date: "2024-01-15",
      tracking: "TRK123456789",
    },
    {
      id: "ENV-002",
      client: "María García",
      destination: "Belgrano, Buenos Aires",
      weight: "1.2 kg",
      status: "Entregado",
      date: "2024-01-14",
      tracking: "TRK987654321",
    },
    {
      id: "ENV-003",
      client: "Carlos López",
      destination: "San Telmo, Buenos Aires",
      weight: "3.8 kg",
      status: "Pendiente",
      date: "2024-01-15",
      tracking: "TRK456789123",
    },
    {
      id: "ENV-004",
      client: "Ana Martín",
      destination: "Recoleta, Buenos Aires",
      weight: "0.8 kg",
      status: "Cancelado",
      date: "2024-01-13",
      tracking: "TRK789123456",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregado":
        return "bg-green-500"
      case "En tránsito":
        return "bg-blue-500"
      case "Pendiente":
        return "bg-yellow-500"
      case "Cancelado":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Envíos</h1>
        <Button className="bg-logistics-primary hover:bg-logistics-primary/90 text-white rounded-lg">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Envío
        </Button>
      </div>

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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-lg"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48 rounded-lg">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="transit">En tránsito</SelectItem>
                <SelectItem value="delivered">Entregado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
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
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">ID Envío</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Cliente</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Destino</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Peso</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Fecha</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-logistics-primary" />
                        <span className="font-medium text-gray-900">{shipment.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{shipment.client}</td>
                    <td className="py-4 px-4 text-gray-700">{shipment.destination}</td>
                    <td className="py-4 px-4 text-gray-700">{shipment.weight}</td>
                    <td className="py-4 px-4">
                      <Badge className={`${getStatusColor(shipment.status)} text-white`}>{shipment.status}</Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{shipment.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-800">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-800">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
