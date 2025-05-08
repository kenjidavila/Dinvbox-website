"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, FolderOpen, Users, Shield } from "lucide-react"

export default function GestionDocumental() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-50 to-white -z-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-orange-300 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-300 rounded-full filter blur-3xl opacity-10 -z-10"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 mb-6">
                <FolderOpen className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Administración Digital de Documentos</span>
              </div>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
                <span className="block">Resguarda y automatiza</span>
                <span className="block mt-1 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                  tus expedientes
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Recopila, organiza y protege documentos importantes de forma electrónica. Ideal para proveedores,
                clientes y personal. Cumple con ISO 27001 y SOC 3.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
                >
                  <Link href="/registro">Comenzar gratis</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-navy-500 text-navy-900 font-medium hover:bg-navy-50"
                >
                  <Link href="/demo" className="flex items-center">
                    Ver demostración
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
                <Badge variant="outline" className="bg-white/80 text-gray-600 border-gray-200">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> Todo en un solo lugar
                </Badge>
                <Badge variant="outline" className="bg-white/80 text-gray-600 border-gray-200">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> Para todos los equipos
                </Badge>
                <Badge variant="outline" className="bg-white/80 text-gray-600 border-gray-200">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> Protección garantizada
                </Badge>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="relative">
                  <div className="absolute -top-4 -right-4 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"></div>
                  <div className="absolute -bottom-4 -left-4 h-72 w-72 rounded-full bg-navy-500/10 blur-3xl"></div>

                  {/* Main image */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 bg-white">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/80 to-transparent z-10 pointer-events-none"></div>
                    <Image
                      src="/placeholder.svg?key=34tcz"
                      alt="Gestión documental DINVBOX"
                      width={600}
                      height={400}
                      className="w-full"
                      priority
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl font-heading">
              Gestión documental simplificada
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Organiza, almacena y comparte documentos importantes con total seguridad
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-3 w-16 h-16 flex items-center justify-center mb-6">
                <FolderOpen className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Todo en un solo lugar</h3>
              <p className="text-gray-600">
                Centraliza todos tus documentos importantes en un único repositorio seguro y accesible desde cualquier
                dispositivo.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-3 w-16 h-16 flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Para todos los equipos</h3>
              <p className="text-gray-600">
                Comparte documentos con tu equipo, clientes o proveedores con permisos personalizados para cada usuario.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-3 w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Protección garantizada</h3>
              <p className="text-gray-600">
                Certificaciones ISO 27001 y SOC 3 que garantizan la seguridad y confidencialidad de todos tus
                documentos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-900 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-12 md:p-12 lg:px-16 lg:py-14 text-center md:text-left">
              <div className="md:flex md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Organiza tus documentos digitalmente</h2>
                  <p className="mt-3 text-gray-300">
                    Prueba gratis nuestro sistema de gestión documental y organiza tus archivos importantes.
                  </p>
                </div>
                <div className="mt-8 md:mt-0">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
                  >
                    <Link href="/registro">Crear cuenta gratis</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
