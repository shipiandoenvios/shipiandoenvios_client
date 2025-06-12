"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, Plus, Search, Mail, Phone, Package, Eye, Edit } from "lucide-react"

export function ClientsContent() {
  const [searchTerm, setSearchTerm] = useState("")

  const clients = [
    {
      id: "CLI-001",
      name: "Juan Pérez",
      email: "juan.perez@email.com",
      phone: "+54 11 4567-8901",
      totalShipments: 15,
      status: "Activo",
      lastOrder: "2024-01-15",
    },
    {
      id: "CLI-002",
      name: "María García",
      email: "maria.garcia@email.com",
      phone: "+54 11 4567-8902",
      totalShipments: 8,
      status: "Activo",
      lastOrder: "2024-01-14",
    },
    {
      id: "CLI-003",
      name: "Carlos López",
      email: "carlos.lopez@email.com",
      phone: "+54 11 4567-8903",
      totalShipments: 23,
      status: "VIP",
      lastOrder: "2024-01-15",
    },
    {
      id: "CLI-004",
      name: "Ana Martín",
      email: "ana.martin@email.com",
      phone: "+54 11 4567-8904",
      totalShipments: 3,
      status: "Nuevo",
      lastOrder: "2024-01-13",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VIP":
        return "bg-purple-500"
      case "Activo":
        return "bg-green-500"
      case "Nuevo":
        return "bg-blue-500"
      case "Inactivo":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

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
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar clientes por nombre, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                <p className="text-3xl font-bold text-gray-900">1,247</p>
              </div>
              <Users className="w-8 h-8 text-logistics-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes VIP</p>
                <p className="text-3xl font-bold text-gray-900">89</p>
              </div>
              <Badge className="bg-purple-500 text-white">VIP</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Nuevos (Este mes)</p>
                <p className="text-3xl font-bold text-gray-900">34</p>
              </div>
              <Badge className="bg-blue-500 text-white">Nuevo</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Activos</p>
                <p className="text-3xl font-bold text-gray-900">1,158</p>
              </div>
              <Badge className="bg-green-500 text-white">Activo</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
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
                      <Badge className={`${getStatusColor(client.status)} text-white`}>{client.status}</Badge>
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
