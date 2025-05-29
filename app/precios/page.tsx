"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Shield, Award, HelpCircle } from "lucide-react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function PreciosPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    telefono: "",
    mensaje: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData)
    // Resetear el formulario
    setFormData({
      nombre: "",
      email: "",
      empresa: "",
      telefono: "",
      mensaje: "",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-50 to-white -z-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-orange-300 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-300 rounded-full filter blur-3xl opacity-10 -z-10"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-heading text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
              Planes y{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                Precios
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades. Todos nuestros planes incluyen las funcionalidades
              esenciales para gestionar tu facturación electrónica sin complicaciones.
            </p>
          </motion.div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full text-white"
            viewBox="0 0 1440 120"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 120L48 105C96 90 192 60 288 55C384 50 480 70 576 75C672 80 768 70 864 65C960 60 1056 60 1152 65C1248 70 1344 80 1392 85L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" />
          </svg>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {/* Plan Freemium */}
            <motion.div variants={fadeIn}>
              <Card className="flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 border-gray-200 shadow-lg hover:shadow-xl">
                <div className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-navy-900">Freemium</h3>
                    <div className="mt-4 flex items-baseline justify-center">
                      <span className="text-4xl font-extrabold text-navy-900">0€</span>
                      <span className="ml-1 text-xl font-medium text-gray-500">/mes</span>
                    </div>

                    <div className="mt-2 flex flex-wrap justify-center gap-2">
                      <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
                        Sin tarjeta
                      </Badge>
                      <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
                        Sin permanencia
                      </Badge>
                    </div>
                  </div>

                  <p className="mt-4 text-center text-gray-600">Ideal para autónomos que están empezando.</p>

                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">3 envíos VERI*FACTU incluidos</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Emisión de facturas electrónicas</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Gestión básica de clientes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Acceso desde cualquier dispositivo</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Soporte por email</span>
                    </li>
                  </ul>

                  <div className="mt-8">
                    <Button
                      className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 rounded-full"
                      variant="outline"
                    >
                      Comenzar gratis
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Plan Básico */}
            <motion.div variants={fadeIn}>
              <Card className="flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 border-gray-200 shadow-lg hover:shadow-xl">
                <div className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-navy-900">Paquete Básico</h3>
                    <div className="mt-4 flex items-baseline justify-center">
                      <span className="text-4xl font-extrabold text-navy-900">8€</span>
                    </div>
                  </div>

                  <p className="mt-4 text-center text-gray-600">10 envíos VERI*FACTU (€0,80 por envío)</p>

                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">10 envíos VERI*FACTU</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Emisión de facturas electrónicas</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Gestión de clientes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Acceso desde cualquier dispositivo</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Soporte por email</span>
                    </li>
                  </ul>

                  <div className="mt-8">
                    <Button
                      className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 rounded-full"
                      variant="outline"
                    >
                      Comprar
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Plan Estándar */}
            <motion.div variants={fadeIn}>
              <Card className="flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 border-orange-200 shadow-xl shadow-orange-100/50 relative overflow-hidden">
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-bold px-4 py-1 transform rotate-45 translate-x-5 translate-y-3 shadow-sm">
                    Popular
                  </div>
                </div>
                <div className="p-6 pt-8">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-navy-900">Paquete Estándar</h3>
                    <div className="mt-4 flex items-baseline justify-center">
                      <span className="text-4xl font-extrabold text-navy-900">15€</span>
                    </div>
                  </div>

                  <p className="mt-4 text-center text-gray-600">30 envíos VERI*FACTU (€0,50 por envío)</p>

                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">30 envíos VERI*FACTU</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Emisión de facturas electrónicas</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Gestión de clientes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Exportación de datos</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Soporte prioritario</span>
                    </li>
                  </ul>

                  <div className="mt-8">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-lg rounded-full">
                      Comprar
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Plan Premium */}
            <motion.div variants={fadeIn}>
              <Card className="flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 border-gray-200 shadow-lg hover:shadow-xl">
                <div className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-navy-900">Paquete Premium</h3>
                    <div className="mt-4 flex items-baseline justify-center">
                      <span className="text-4xl font-extrabold text-navy-900">23€</span>
                    </div>
                  </div>

                  <p className="mt-4 text-center text-gray-600">50 envíos VERI*FACTU (€0,46 por envío)</p>

                  <ul className="mt-6 space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">50 envíos VERI*FACTU</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Emisión de facturas electrónicas</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Gestión de clientes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Informes y análisis avanzados</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="ml-3 text-gray-600">Soporte telefónico prioritario</span>
                    </li>
                  </ul>

                  <div className="mt-8">
                    <Button
                      className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 rounded-full"
                      variant="outline"
                    >
                      Comprar
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cotización Personalizada */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="p-8 md:p-12 lg:p-16 relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-10"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-300 rounded-full filter blur-3xl opacity-10"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
                <div>
                  <h2 className="text-3xl font-bold text-white font-heading">¿Necesitas un plan a medida?</h2>
                  <p className="mt-4 text-gray-300">
                    Nos adaptamos al tamaño de tu empresa y a tus necesidades específicas. Solicita una cotización
                    personalizada y te ayudaremos a encontrar la solución perfecta para tu negocio.
                  </p>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-400/20 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-orange-400" />
                      </div>
                      <span className="ml-3 text-gray-300">Volúmenes personalizados de facturas</span>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-400/20 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-orange-400" />
                      </div>
                      <span className="ml-3 text-gray-300">Integraciones con tu software actual</span>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-400/20 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-orange-400" />
                      </div>
                      <span className="ml-3 text-gray-300">Soporte técnico dedicado</span>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-400/20 flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-orange-400" />
                      </div>
                      <span className="ml-3 text-gray-300">Formación para tu equipo</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    size="lg"
                    asChild
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                  >
                    <Link href="/contacto">
                      Solicitar cotización
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 font-heading">
              Preguntas frecuentes sobre precios
            </h2>
            <p className="mt-4 text-lg text-gray-600">Resolvemos tus dudas sobre nuestros planes y precios</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 space-y-8"
          >
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-navy-900">¿Qué es un envío VERI*FACTU?</h3>
              <p className="mt-2 text-gray-600">
                Un envío VERI*FACTU se refiere al proceso por el cual los sistemas informáticos de facturación (SIF)
                envían de forma segura y automática a la Agencia Tributaria (AEAT) los registros de facturación
                generados en el momento de emitir cada factura en un formato XML estructurado y cifrado.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-navy-900">¿Los envíos VERI*FACTU caducan?</h3>
              <p className="mt-2 text-gray-600">
                No, los envíos VERI*FACTU que adquieres no caducan. Puedes utilizarlos cuando los necesites sin
                preocuparte por fechas límite. Una vez comprados, permanecen en tu cuenta hasta que los utilices.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-navy-900">¿Puedo cambiar de plan en cualquier momento?</h3>
              <p className="mt-2 text-gray-600">
                Sí, puedes cambiar de plan o adquirir más envíos VERI*FACTU en cualquier momento según tus necesidades.
                No hay penalizaciones por cambiar entre planes.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-navy-900">¿Hay costos ocultos?</h3>
              <p className="mt-2 text-gray-600">
                No, en DINVBOX creemos en la transparencia total. El precio que ves es el precio que pagas. No hay
                cargos adicionales ni sorpresas en tu factura.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-navy-900">¿Ofrecen descuentos para volúmenes grandes?</h3>
              <p className="mt-2 text-gray-600">
                Sí, para empresas con grandes volúmenes de facturación ofrecemos planes personalizados con precios
                especiales. Contacta con nuestro equipo comercial para obtener una cotización adaptada a tus
                necesidades.
              </p>
            </div>
          </motion.div>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="border-navy-300 text-navy-800 hover:bg-navy-50">
              <Link href="/faq">Ver todas las preguntas frecuentes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 mb-6 self-start">
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">100% Legal y Verificado</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-navy-900 font-heading">
                  Comienza a facturar electrónicamente hoy mismo
                </h2>
                <p className="mt-4 text-gray-600">
                  Únete a miles de autónomos y empresas que ya confían en DINVBOX para su facturación electrónica.
                  Regístrate gratis y emite tu primera factura en minutos.
                </p>
                <div className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
                  >
                    <Link href="/registro">Crear cuenta gratis</Link>
                  </Button>
                </div>
              </div>
              <div className="relative hidden md:block">
                <Image
                  src="/images/professional-woman-dinvbox.png"
                  alt="Profesional usando DINVBOX para facturación electrónica"
                  width={600}
                  height={400}
                  className="object-cover h-full w-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-navy-900 mb-12 font-heading">Certificaciones y garantías</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center"
            >
              <div className="bg-orange-100 rounded-full p-4 mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Certificado por AEAT</h4>
              <p className="text-gray-600">
                Plataforma homologada que cumple con todos los requisitos de la Agencia Tributaria española.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center"
            >
              <div className="bg-orange-100 rounded-full p-4 mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Compatible con VeriFactu</h4>
              <p className="text-gray-600">
                Integración completa con el sistema de verificación de facturas electrónicas español.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center"
            >
              <div className="bg-orange-100 rounded-full p-4 mb-4">
                <HelpCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Soporte garantizado</h4>
              <p className="text-gray-600">
                Equipo de soporte español disponible para ayudarte con cualquier duda o problema que puedas tener.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
