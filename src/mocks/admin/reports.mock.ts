import { TrendingUp, Users, Package, Clock } from "lucide-react"

export const recentReports = [
    {
        name: "Envíos Enero 2024",
        type: "Mensual",
        date: "2024-01-15 14:30",
        size: "2.4 MB",
    },
    {
        name: "Clientes VIP",
        type: "Análisis",
        date: "2024-01-14 09:15",
        size: "1.8 MB",
    },
    {
        name: "Retrasos Semana 2",
        type: "Semanal",
        date: "2024-01-13 16:45",
        size: "956 KB",
    },
]
export const reportTypes = [
    {
        title: "Reporte de Envíos Mensuales",
        description: "Resumen completo de todos los envíos del mes",
        icon: Package,
        lastGenerated: "2024-01-15",
        format: "PDF, Excel",
    },
    {
        title: "Análisis de Clientes Frecuentes",
        description: "Top clientes y patrones de envío",
        icon: Users,
        lastGenerated: "2024-01-14",
        format: "PDF, Excel",
    },
    {
        title: "Reporte de Retrasos",
        description: "Análisis de entregas tardías y causas",
        icon: Clock,
        lastGenerated: "2024-01-13",
        format: "PDF",
    },
    {
        title: "Rendimiento de Transportistas",
        description: "Métricas de desempeño por conductor",
        icon: TrendingUp,
        lastGenerated: "2024-01-12",
        format: "Excel",
    },
]

export const quickStats = [
    { label: "Reportes Generados", value: "156", period: "Este mes" },
    { label: "Descargas Totales", value: "1,247", period: "Último año" },
    { label: "Reportes Programados", value: "8", period: "Activos" },
    { label: "Tiempo Promedio", value: "2.3s", period: "Generación" },
]