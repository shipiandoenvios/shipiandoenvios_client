import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchJson, extractList } from "@/lib/api"

const defaultQuickStats: any[] = []
const defaultReportTypes: any[] = []
const defaultRecentReports: any[] = []

export function ReportsContent() {
  const [quickStats, setQuickStats] = useState<any[]>(defaultQuickStats)
  const [reportTypes, setReportTypes] = useState<any[]>(defaultReportTypes)
  const [recentReports, setRecentReports] = useState<any[]>(defaultRecentReports)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [qs, rt, rr] = await Promise.all([
          fetchJson('/api/admin/reports/quick-stats').catch(() => []),
          fetchJson('/api/admin/reports/types').catch(() => []),
          fetchJson('/api/admin/reports/recent?limit=10').catch(() => []),
        ])
        if (!mounted) return
        setQuickStats(extractList(qs).items)
        setReportTypes(extractList(rt).items)
        setRecentReports(extractList(rr).items)
      } catch {
        if (mounted) {
          setQuickStats([])
          setReportTypes([])
          setRecentReports([])
        }
      }
    })()
    return () => { mounted = false }
  }, [])
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
        <div className="flex gap-3">
          <Select>
            <SelectTrigger className="w-48 rounded-lg">
              <SelectValue placeholder="Período de tiempo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Este trimestre</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-logistics-primary hover:bg-logistics-primary/90 text-white rounded-lg">
            <FileText className="w-4 h-4 mr-2" />
            Nuevo Reporte
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.period}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-logistics-primary/10 rounded-lg flex items-center justify-center">
                  <report.icon className="w-6 h-6 text-logistics-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900">{report.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Último: {report.lastGenerated}
                </div>
                <div className="text-gray-600">Formatos: {report.format}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 rounded-lg">
                  <FileText className="w-4 h-4 mr-2" />
                  Generar
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-logistics-primary hover:bg-logistics-primary/90 text-white rounded-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Reportes Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Reporte</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Tipo</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Fecha</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Tamaño</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-logistics-primary" />
                        <span className="font-medium text-gray-900">{report.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{report.type}</td>
                    <td className="py-4 px-4 text-gray-700">{report.date}</td>
                    <td className="py-4 px-4 text-gray-700">{report.size}</td>
                    <td className="py-4 px-4">
                      <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-800">
                        <Download className="w-4 h-4" />
                      </Button>
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
