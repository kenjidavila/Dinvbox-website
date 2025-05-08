"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Settings, RefreshCw, Code, Zap } from "lucide-react"

export default function ApiVerifactu() {
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
                <Settings className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">API DINVBOX VERIFACTU</span>
              </div>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
                <span className="block">Integra VeriFactu</span>
                <span className="block mt-1 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                  en tu software en minutos
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Nuestra API permite a cualquier sistema ERP, CRM o software propio emitir facturas conforme a
                Veri*factu. Incluye documentación técnica, sandbox, firma electrónica y respuesta en tiempo real desde
                la AEAT.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
                >
                  <Link href="/registro">Conectar API</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-navy-500 text-navy-900 font-medium hover:bg-navy-50"
                >
                  <Link href="/documentacion-api" className="flex items-center">
                    Ver documentación
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
                <Badge variant="outline" className="bg-white/80 text-gray-600 border-gray-200">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> REST API simple
                </Badge>
                <Badge variant="outline" className="bg-white/80 text-gray-600 border-gray-200">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> Respuesta instantánea AEAT
                </Badge>
                <Badge variant="outline" className="bg-white/80 text-gray-600 border-gray-200">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> Documentación completa
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

                  {/* Code example */}
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 bg-gray-900 font-mono text-sm text-gray-200 p-6">
                    <div className="mb-4 text-gray-400">// Ejemplo de integración con la API DINVBOX VERIFACTU</div>
                    <div>
                      <span className="text-blue-400">const</span> response ={" "}
                      <span className="text-blue-400">await</span> fetch(
                      <span className="text-green-400">'https://api.dinvbox.com/v1/factura'</span>, {"{"}
                    </div>
                    <div className="pl-4">
                      method: <span className="text-green-400">'POST'</span>,
                    </div>
                    <div className="pl-4">headers: {"{"}</div>
                    <div className="pl-8">
                      <span className="text-green-400">'Content-Type'</span>:{" "}
                      <span className="text-green-400">'application/json'</span>,
                    </div>
                    <div className="pl-8">
                      <span className="text-green-400">'Authorization'</span>:{" "}
                      <span className="text-green-400">'Bearer YOUR_API_KEY'</span>
                    </div>
                    <div className="pl-4">{"}"},</div>
                    <div className="pl-4">body: JSON.stringify({"{"}</div>
                    <div className="pl-8">
                      emisor: {"{"} nif: <span className="text-green-400">'B12345678'</span>, nombre:{" "}
                      <span className="text-green-400">'Mi Empresa SL'</span> {"}"},
                    </div>
                    <div className="pl-8">
                      receptor: {"{"} nif: <span className="text-green-400">'A87654321'</span>, nombre:{" "}
                      <span className="text-green-400">'Cliente SA'</span> {"}"},
                    </div>
                    <div className="pl-8">conceptos: [</div>
                    <div className="pl-12">
                      {"{"} descripcion: <span className="text-green-400">'Servicio profesional'</span>, cantidad: 1,
                      precio: 100, iva: 21 {"}"}
                    </div>
                    <div className="pl-8">]</div>
                    <div className="pl-4">{"}"})</div>
                    <div>{"}"})</div>
                    <div className="mt-4">
                      <span className="text-blue-400">const</span> data = <span className="text-blue-400">await</span>{" "}
                      response.json()
                    </div>
                    <div className="mt-4 text-gray-400">// Respuesta con el ID de factura y estado en AEAT</div>
                    <div>
                      console.log(data){" "}
                      <span className="text-gray-400">
                        // {"{"} id: 'F12345', estado: 'VERIFICADA', url_pdf: '...' {"}"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl font-heading">
              Integración sencilla y potente
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Conecta tu software con nuestra API y emite facturas electrónicas verificadas por la AEAT
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-3 w-16 h-16 flex items-center justify-center mb-6">
                <Code className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">REST API simple</h3>
              <p className="text-gray-600">
                API RESTful fácil de integrar con cualquier lenguaje de programación o plataforma. Documentación
                completa y ejemplos.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-3 w-16 h-16 flex items-center justify-center mb-6">
                <RefreshCw className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Respuesta instantánea AEAT</h3>
              <p className="text-gray-600">
                Recibe confirmación inmediata de la AEAT sobre el estado de tus facturas. Validación en tiempo real.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-3 w-16 h-16 flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Sandbox de desarrollo</h3>
              <p className="text-gray-600">
                Entorno de pruebas completo para que puedas desarrollar y probar tu integración antes de pasar a
                producción.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-900 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-12 md:p-12 lg:px-16 lg:py-14 text-center md:text-left">
              <div className="md:flex md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Integra VeriFactu en tu software</h2>
                  <p className="mt-3 text-gray-300">
                    Solicita acceso a nuestra API y comienza a emitir facturas electrónicas desde tu propio software.
                  </p>
                </div>
                <div className="mt-8 md:mt-0">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
                  >
                    <Link href="/registro">Conectar API</Link>
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
