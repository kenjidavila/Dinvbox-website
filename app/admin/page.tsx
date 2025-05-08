"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Globe, Users, Settings, Calendar, AlertTriangle, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-900">Panel de Administración</h1>
          <p className="text-gray-500">Bienvenido al panel de control de DINVBOX</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md rounded-full">
            <Settings className="mr-2 h-4 w-4" />
            Configuración
          </Button>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-orange-100 p-3">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/admin/mapa-mundial">
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </Link>
                </Button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-navy-900">Mapa Mundial</h3>
                <p className="mt-1 text-sm text-gray-500">Gestionar datos de facturación por país</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-blue-100 p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/admin/blog">
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </Link>
                </Button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-navy-900">Blog</h3>
                <p className="mt-1 text-sm text-gray-500">Gestionar artículos y contenidos</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-green-100 p-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/admin/usuarios">
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </Link>
                </Button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-navy-900">Usuarios</h3>
                <p className="mt-1 text-sm text-gray-500">Administrar usuarios y permisos</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-amber-100 p-3">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/admin/calendario-fiscal">
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </Link>
                </Button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-navy-900">Calendario Fiscal</h3>
                <p className="mt-1 text-sm text-gray-500">Gestionar eventos del calendario fiscal</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="rounded-full bg-purple-100 p-3">
                  <Settings className="h-6 w-6 text-purple-600" />
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/admin/configuracion">
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </Link>
                </Button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-navy-900">Configuración</h3>
                <p className="mt-1 text-sm text-gray-500">Ajustes generales del sistema</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Actividad reciente y tareas pendientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between bg-white px-6 py-4 border-b border-gray-100">
            <CardTitle className="text-lg font-medium text-navy-900">Actividad reciente</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-navy-700">
              Ver todo
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {[
                {
                  icon: Globe,
                  color: "bg-orange-100 text-orange-600",
                  title: "Actualización de datos de México",
                  time: "Hace 2 horas",
                },
                {
                  icon: FileText,
                  color: "bg-blue-100 text-blue-600",
                  title: "Nuevo artículo publicado",
                  time: "Hace 5 horas",
                },
                {
                  icon: Users,
                  color: "bg-green-100 text-green-600",
                  title: "Nuevo administrador añadido",
                  time: "Ayer",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center p-4 hover:bg-gray-50">
                  <div className={`h-10 w-10 rounded-full ${item.color} flex items-center justify-center mr-4`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-navy-800">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between bg-white px-6 py-4 border-b border-gray-100">
            <CardTitle className="text-lg font-medium text-navy-900">Tareas pendientes</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-navy-700">
              Ver todo
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {[
                {
                  icon: AlertTriangle,
                  color: "bg-red-100 text-red-600",
                  title: "Actualizar datos de facturación de Francia",
                  deadline: "Hoy",
                },
                {
                  icon: Calendar,
                  color: "bg-amber-100 text-amber-600",
                  title: "Programar publicación de artículo",
                  deadline: "Mañana",
                },
                {
                  icon: Clock,
                  color: "bg-blue-100 text-blue-600",
                  title: "Revisar estadísticas mensuales",
                  deadline: "En 3 días",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center p-4 hover:bg-gray-50">
                  <div className={`h-10 w-10 rounded-full ${item.color} flex items-center justify-center mr-4`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-navy-800">{item.title}</p>
                    <p className="text-sm text-gray-500">Vence: {item.deadline}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Completar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
