"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, FileText, Shield, Clock, AlertTriangle } from "lucide-react"

export default function FacturacionElectronica() {
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
                <FileText className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Facturación Electrónica VERIFACTU</span>
              </div>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
                <span className="block">Facturación electrónica</span>
                <span className="block mt-1 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                  sin complicaciones
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Cumple con los requisitos de la AEAT y la normativa Veri*factu con nuestro sistema de facturación
                intuitivo, profesional y 100% en la nube.
              </p>
              <div className="mt-10 flex justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
                >
                  <a href="https://testing.dinvbox.es/login" target="_blank" rel="noopener noreferrer">
                    Comenzar gratis
                  </a>
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
                <Badge variant="outline" className="bg-white/80 text-gray-600 border-gray-200">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> 100% legal
                </Badge>
                <Badge variant="outline" className="bg-white/80 text-gray-600 border-gray-200">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> Verificado AEAT
                </Badge>
                <Badge variant="outline" className="bg-white/80 text-gray-600 border-gray-200">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> Soporte español
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

                  {/* Main dashboard image */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 bg-white">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/80 to-transparent z-10 pointer-events-none"></div>
                    <Image
                      src="/images/dinvbox-login-screen.png"
                      alt="Pantalla de acceso a la plataforma de facturación electrónica DINVBOX"
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
              Todo lo que necesitas para facturar electrónicamente
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Diseñado específicamente para autónomos y pymes españolas que buscan cumplir con la normativa sin
              complicaciones
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-3 w-16 h-16 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">100% Legal y Verificado</h3>
              <p className="text-gray-600">
                Cumple automáticamente con toda la normativa de la AEAT, Factura-e y VERI*FACTU. Verificado por expertos
                fiscales.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-3 w-16 h-16 flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Factura en 2 minutos</h3>
              <p className="text-gray-600">
                Interfaz intuitiva diseñada para que puedas crear y enviar facturas en tiempo récord, sin formación
                previa.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-3 w-16 h-16 flex items-center justify-center mb-6">
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Evita multas y sanciones</h3>
              <p className="text-gray-600">
                Sistema de alertas que previene errores antes de enviar tus facturas y te avisa de posibles incidencias.
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
                  <h2 className="text-2xl font-bold text-white">Comienza a facturar electrónicamente hoy mismo</h2>
                  <p className="mt-3 text-gray-300">
                    Prueba gratis nuestro sistema de facturación electrónica y emite tus primeras facturas sin coste.
                  </p>
                </div>
                <div className="mt-8 md:mt-0">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
                  >
                    <a href="https://testing.dinvbox.es/login" target="_blank" rel="noopener noreferrer">
                      Crear cuenta gratis
                    </a>
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
