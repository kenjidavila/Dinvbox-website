"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  CreditCard,
  TrendingUp,
  Calculator,
  ArrowUpRight,
  Download,
  Eye,
  Filter,
  Calendar,
  ChevronDown,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const [dateFilter, setDateFilter] = useState("Este mes")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-900">Dashboard</h1>
          <p className="text-gray-500">Bienvenido de nuevo, Juan</p>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-200">
                <Calendar className="mr-2 h-4 w-4" />
                {dateFilter}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setDateFilter("Hoy")}>Hoy</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateFilter("Esta semana")}>Esta semana</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateFilter("Este mes")}>Este mes</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateFilter("Este año")}>Este año</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md rounded-full">
            <FileText className="mr-2 h-4 w-4" />
            Nueva Factura
          </Button>
        </div>
      </div>

      <Tabs defaultValue="resumen" className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1 rounded-lg">
          <TabsTrigger
            value="resumen"
            className="rounded-md data-[state=active]:bg-navy-50 data-[state=active]:text-navy-900"
          >
            Resumen
          </TabsTrigger>
          <TabsTrigger
            value="analisis"
            className="rounded-md data-[state=active]:bg-navy-50 data-[state=active]:text-navy-900"
          >
            Análisis
          </TabsTrigger>
          <TabsTrigger
            value="informes"
            className="rounded-md data-[state=active]:bg-navy-50 data-[state=active]:text-navy-900"
          >
            Informes
          </TabsTrigger>
          <TabsTrigger
            value="timbres"
            className="rounded-md data-[state=active]:bg-navy-50 data-[state=active]:text-navy-900"
          >
            Timbres
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <StatsCard
                title="Facturas emitidas"
                value="3"
                description="+0% desde el mes pasado"
                icon={<FileText className="h-5 w-5 text-orange-600" />}
                iconBg="bg-orange-100"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <StatsCard
                title="Cuentas por cobrar"
                value="0"
                description="Facturas pendientes de cobro"
                icon={<CreditCard className="h-5 w-5 text-blue-600" />}
                iconBg="bg-blue-100"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <StatsCard
                title="Ingresos totales"
                value="3.180,00 €"
                description="+0% desde el mes pasado"
                icon={<TrendingUp className="h-5 w-5 text-green-600" />}
                iconBg="bg-green-100"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <StatsCard
                title="IVA a declarar"
                value="667,80 €"
                description="Trimestre actual"
                icon={<Calculator className="h-5 w-5 text-purple-600" />}
                iconBg="bg-purple-100"
              />
            </motion.div>
          </div>

          {/* Recent Invoices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card className="overflow-hidden border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between bg-white px-6 py-4 border-b border-gray-100">
                <CardTitle className="text-lg font-medium text-navy-900">Facturas recientes</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 border-gray-200">
                    <Filter className="mr-2 h-3.5 w-3.5" />
                    Filtrar
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-navy-700">
                    <Eye className="mr-2 h-3.5 w-3.5" />
                    Ver todas
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-6 py-3 font-medium text-gray-500">Nº FACTURA</th>
                        <th className="px-6 py-3 font-medium text-gray-500">FECHA</th>
                        <th className="px-6 py-3 font-medium text-gray-500">CLIENTE</th>
                        <th className="px-6 py-3 text-right font-medium text-gray-500">IMPORTE</th>
                        <th className="px-6 py-3 text-right font-medium text-gray-500">ESTADO</th>
                        <th className="px-6 py-3 text-right font-medium text-gray-500">ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-navy-700">F{i}</td>
                          <td className="px-6 py-4 text-gray-600">30/04/2025</td>
                          <td className="px-6 py-4 text-gray-600">APPLE RETAIL SPAIN SL</td>
                          <td className="px-6 py-4 text-right font-medium text-navy-700">1.060,00 €</td>
                          <td className="px-6 py-4 text-right">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              emitida
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4 text-gray-500" />
                              <span className="sr-only">Descargar</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Timbres Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-white px-6 py-4 border-b border-gray-100">
                <CardTitle className="text-lg font-medium text-navy-900">Compra de Timbres</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6">Adquiere timbres para continuar facturando</p>
                <div className="grid gap-6 md:grid-cols-3">
                  <TimbrePackage title="Paquete Básico" count={10} price="8€" unitPrice="0,80€" />
                  <TimbrePackage title="Paquete Estándar" count={30} price="15€" unitPrice="0,50€" highlighted />
                  <TimbrePackage title="Paquete Premium" count={50} price="23€" unitPrice="0,46€" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="analisis">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Análisis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Contenido de análisis en desarrollo.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="informes">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Informes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Contenido de informes en desarrollo.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timbres">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Timbres</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Gestión de timbres en desarrollo.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatsCard({
  title,
  value,
  description,
  icon,
  iconBg,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  iconBg: string
}) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`rounded-full ${iconBg} p-3`}>{icon}</div>
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-navy-900">{value}</h3>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function TimbrePackage({
  title,
  count,
  price,
  unitPrice,
  highlighted = false,
}: {
  title: string
  count: number
  price: string
  unitPrice: string
  highlighted?: boolean
}) {
  return (
    <Card
      className={`border-0 ${highlighted ? "shadow-xl bg-gradient-to-b from-white to-orange-50" : "shadow-lg bg-white"} hover:shadow-xl transition-all duration-300 h-full`}
    >
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-navy-900 mb-4">{title}</h3>
        <div className="text-center mb-4">
          <p className="text-5xl font-bold text-navy-900">{count}</p>
          <p className="text-sm text-gray-500">timbres</p>
          <p className="text-xs text-gray-500">({unitPrice} por timbre)</p>
        </div>
        <p className="text-2xl font-bold text-center text-navy-900 mb-6">{price}</p>
        <Button
          className={`w-full rounded-full ${
            highlighted
              ? "bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md"
              : "bg-navy-800 hover:bg-navy-900 text-white"
          }`}
        >
          Comprar
        </Button>
      </CardContent>
    </Card>
  )
}
