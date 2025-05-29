"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Clock,
  FileText,
  Zap,
  Users,
  Award,
  Globe,
  HelpCircle,
  AlertTriangle,
  MessageCircle,
  BarChart,
  Calendar,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import WorldMapButton from "@/components/world-map-button"
import IOSCalendar from "@/components/ios-calendar"
import CalendlyWidget from "@/components/calendly-widget"
// import SolutionsSection from "@/components/solutions-section"

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

const AnimatedSection = ({ children, className }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={staggerContainer} className={className}>
      {children}
    </motion.div>
  )
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-3 w-16 h-16 flex items-center justify-center mb-6">
        {icon}
      </div>{" "}
      <h3 className="text-xl font-bold text-navy-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function PricingCard({
  title,
  price,
  period = "/mes",
  description,
  features,
  buttonText,
  buttonVariant = "default",
  mostPopular = false,
  badges = [],
}: {
  title: string
  price: string
  period?: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant?: "default" | "outline"
  mostPopular?: boolean
  badges?: string[]
}) {
  return (
    <Card
      className={`flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 ${
        mostPopular
          ? "border-orange-200 shadow-xl shadow-orange-100/50 relative overflow-hidden"
          : "border-gray-200 shadow-lg hover:shadow-xl"
      }`}
    >
      {mostPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-bold px-4 py-1 transform rotate-45 translate-x-5 translate-y-3 shadow-sm">
            Popular
          </div>
        </div>
      )}

      <div className={`p-6 ${mostPopular ? "pt-8" : "pt-6"}`}>
        <div className="text-center">
          <h3 className="text-xl font-bold text-navy-900">{title}</h3>
          <div className="mt-4 flex items-baseline justify-center">
            <span className="text-4xl font-extrabold text-navy-900">{price}</span>
            <span className="ml-1 text-xl font-medium text-gray-500">{period}</span>
          </div>

          {badges.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {badges.map((badge, index) => (
                <Badge key={index} variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">
                  {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-gray-600">{description}</p>

        <ul className="mt-6 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                <CheckCircle className="h-3 w-3 text-green-600" />
              </div>
              <span className="ml-3 text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button
            className={`w-full ${
              buttonVariant === "default"
                ? "bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-lg"
                : "border-orange-500 text-orange-500 hover:bg-orange-50"
            } rounded-full`}
            variant={buttonVariant}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)

  const toggleCalendly = () => {
    setShowCalendly(!showCalendly)
  }

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section - Optimizado para conversión y adaptado al contexto español */}
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
                <Zap className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">Facturación electrónica sin complicaciones</span>
              </div>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
                <span className="block">Factura sin errores.</span>
                <span className="block mt-1">Sin miedo.</span>
                <span className="block mt-1 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                  Sin pagar de más.
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                Cumple con AEAT, Facturae y VERI*FACTU en minutos.
                <br />
                Con Facturito, tu IA tributaria de confianza, facturarás bien desde el primer intento.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
                >
                  <a href="https://testing.dinvbox.es/login" target="_blank" rel="noopener noreferrer">
                    Crea tu cuenta gratis
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-navy-500 text-navy-900 font-medium hover:bg-navy-50"
                >
                  <Link href="/demo" className="flex items-center">
                    ¿Cómo me ayuda Facturito?
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-2">
                <Badge variant="outline" className="bg-white/80 text-gray-600 border-gray-200">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> Sin tarjeta
                </Badge>
                <Badge variant="outline" className="bg-white/80 text-gray-600 border-gray-200">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> Sin líos
                </Badge>
                <Badge variant="outline" className="bg-white/80 text-gray-600 border-gray-200">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> Solo resultados
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
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%203%20may%202025%2C%2001_30_51%20p.m.-gNkVFzK0fVJCS7IcOQpXvkDem4Y76S.png"
                      alt="Dashboard DINVBOX"
                      width={600}
                      height={400}
                      className="w-full"
                    />
                  </div>

                  {/* Floating elements */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-3 border border-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 rounded-full p-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Plan</p>
                        <p className="font-semibold text-navy-900">Gratis</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-3 border border-gray-100"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-orange-100 rounded-full p-2">
                        <Shield className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Verificado</p>
                        <p className="font-semibold text-navy-900">AEAT</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
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

      {/* Sección de Soluciones */}
      {/* <SolutionsSection /> */}

      {/* 2. Beneficios Clave - Adaptados al contexto español */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl font-heading">
                ¿Por qué elegir DINVBOX?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Diseñado específicamente para autónomos y emprendedores españoles que buscan tranquilidad y eficiencia
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div variants={fadeIn}>
              <BenefitCard
                icon={<Shield className="h-8 w-8 text-orange-500" />}
                title="100% Legal y Verificado"
                description="Cumple automáticamente con toda la normativa de la AEAT, Factura-e y VERI*FACTU. Verificado por expertos fiscales."
              />
            </motion.div>
            <motion.div variants={fadeIn}>
              <BenefitCard
                icon={<Clock className="h-8 w-8 text-orange-500" />}
                title="Factura en 2 minutos"
                description="Interfaz intuitiva diseñada para que puedas crear y enviar facturas en tiempo récord, sin formación previa."
              />
            </motion.div>
            <motion.div variants={fadeIn}>
              <BenefitCard
                icon={<AlertTriangle className="h-8 w-8 text-orange-500" />}
                title="Evita multas y sanciones"
                description="Sistema de alertas que previene errores antes de enviar tus facturas y te avisa de posibles incidencias."
              />
            </motion.div>
            <motion.div variants={fadeIn}>
              <BenefitCard
                icon={<Users className="h-8 w-8 text-orange-500" />}
                title="Soporte humano español"
                description="Atención personalizada por email y teléfono con un equipo español que entiende tus necesidades reales."
              />
            </motion.div>
            <motion.div variants={fadeIn}>
              <BenefitCard
                icon={<BarChart className="h-8 w-8 text-orange-500" />}
                title="Optimización fiscal"
                description="Identifica automáticamente deducciones y te ayuda a maximizar los beneficios fiscales a los que tienes derecho."
              />
            </motion.div>
            <motion.div variants={fadeIn}>
              <BenefitCard
                icon={<FileText className="h-8 w-8 text-orange-500" />}
                title="Todo bajo tu control"
                description="Gestiona facturas, clientes, impuestos y documentos desde un único panel, sin depender de terceros."
              />
            </motion.div>
            <motion.div variants={fadeIn}>
              <BenefitCard
                icon={<MessageCircle className="h-8 w-8 text-orange-500" />}
                title="Asistencia inteligente con IA"
                description="Facturito resuelve tus dudas, te avisa de errores y te acompaña en cada paso para que factures sin complicaciones."
              />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Calendario Fiscal Español */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeIn}>
              <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl font-heading">
                Nunca más te perderás una fecha clave
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Calendario fiscal integrado con alertas personalizadas para tus obligaciones tributarias
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="mt-12">
            <motion.div
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <h3 className="text-lg font-semibold text-navy-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                  Próximas fechas importantes
                </h3>
                <Button variant="outline" size="sm" className="text-sm" onClick={() => setCalendarOpen(true)}>
                  Ver calendario completo
                </Button>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { date: "20 Mayo", description: "Presentación modelo 303 (IVA) - Primer trimestre", urgent: true },
                  {
                    date: "20 Julio",
                    description: "Presentación modelo 130 (IRPF) - Segundo trimestre",
                    urgent: false,
                  },
                  { date: "30 Julio", description: "Presentación modelo 303 (IVA) - Segundo trimestre", urgent: false },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                          item.urgent ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <span className="font-semibold text-sm">{item.date.split(" ")[0]}</span>
                      </div>
                      <div>
                        <p className="font-medium text-navy-800">{item.description}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                    </div>
                    {item.urgent && <Badge className="bg-red-100 text-red-600 border-red-200">Próximo</Badge>}
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-600">
                  DINVBOX te enviará recordatorios automáticos para que nunca te pierdas una fecha importante
                </p>
              </div>
            </motion.div>
          </AnimatedSection>
          {/* Calendario estilo iOS */}
          <IOSCalendar open={calendarOpen} onClose={() => setCalendarOpen(false)} tipoContribuyente="autonomos" />
        </div>
      </section>

      {/* 3. Cómo Funciona */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl font-heading">
                Facturar en 3 simples pasos
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Sin complicaciones, sin curva de aprendizaje, sin dolores de cabeza
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="mt-16">
            <div className="relative">
              {/* Connection line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 transform -translate-y-1/2 hidden md:block"></div>

              <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                <motion.div variants={fadeIn} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-6 relative z-10">
                      <span className="text-2xl font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 mb-3">Regístrate gratis</h3>
                    <p className="text-gray-600">
                      Crea tu cuenta en menos de 1 minuto sin necesidad de tarjeta de crédito ni datos bancarios.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-6 relative z-10">
                      <span className="text-2xl font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 mb-3">Personaliza tus datos</h3>
                    <p className="text-gray-600">
                      Configura tu perfil empresarial, logo y plantillas de factura según tus necesidades.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 mb-6 relative z-10">
                      <span className="text-2xl font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 mb-3">Emite tu primera factura</h3>
                    <p className="text-gray-600">
                      Crea y envía facturas electrónicas en segundos con nuestra interfaz intuitiva y la guía de
                      Facturito, tu IA tributaria de confianza.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>

          <div className="mt-16 text-center">
            <Button
              onClick={() => setIsVideoPlaying(true)}
              size="lg"
              className="bg-navy-800 hover:bg-navy-900 text-white rounded-full"
            >
              Ver video tutorial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {isVideoPlaying && (
              <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden">
                  <button
                    onClick={() => setIsVideoPlaying(false)}
                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/40 transition-colors z-10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                      title="Tutorial DINVBOX"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Prueba Social / Confianza - Adaptada al contexto español */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl font-heading">
                Miles de autónomos y pymes confían en nosotros
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Únete a la comunidad de profesionales españoles que han simplificado su facturación
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Logos de empresas y asociaciones españolas */}
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-6 items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex justify-center">
                <Image
                  src={`/generic-company-logo.png?height=40&width=120&query=company logo ${i}`}
                  alt={`Cliente ${i}`}
                  width={120}
                  height={40}
                  className="h-12 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>

          {/* Certificaciones */}
          <div className="mt-20">
            <AnimatedSection className="text-center">
              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-bold text-navy-900 mb-12">Certificaciones y garantías</h3>
              </motion.div>
            </AnimatedSection>

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
                  <Globe className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold text-navy-900 mb-2">ISO 27001</h4>
                <p className="text-gray-600">
                  Certificación internacional de seguridad de la información para proteger tus datos fiscales.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Testimonios adaptados al contexto español */}
          <div className="mt-20">
            <AnimatedSection className="text-center">
              <motion.div variants={fadeIn}>
                <h3 className="text-2xl font-bold text-navy-900 mb-12">Lo que dicen nuestros usuarios</h3>
              </motion.div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  content:
                    "Como autónomo, DINVBOX me ha quitado el miedo a Hacienda. Ahora sé que mis facturas cumplen con toda la normativa y puedo dormir tranquilo. El soporte en español es excelente.",
                  author: "Carlos Martínez",
                  role: "Diseñador Freelance, Madrid",
                },
                {
                  content:
                    "Por fin puedo gestionar mis facturas sin depender de mi gestor para cada cosa. La interfaz es tan sencilla que hasta mi padre, que tiene un pequeño comercio, la usa sin problemas.",
                  author: "María Rodríguez",
                  role: "Consultora Independiente, Barcelona",
                },
                {
                  content:
                    "El sistema de alertas me ha salvado de varias multas por errores en las facturas. Y el calendario fiscal me avisa con tiempo de todas mis obligaciones con Hacienda. Vale cada céntimo.",
                  author: "Ana López",
                  role: "Propietaria de Tienda Online, Valencia",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                  className="bg-white border border-gray-100 rounded-xl p-6 shadow-md"
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400 text-lg">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 italic flex-grow">{testimonial.content}</p>
                    <div className="mt-6 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold text-navy-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Planes Freemium y Premium - Adaptados al contexto español */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-gray-50"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-navy-100 rounded-full filter blur-3xl opacity-30"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl font-heading">
                Envíos VERI*FACTU
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Adquiere envíos VERI*FACTU para continuar facturando
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="mt-12">
            <AnimatedSection className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <motion.div variants={fadeIn}>
                <PricingCard
                  title="Freemium"
                  price="0€"
                  description="Ideal para autónomos que están empezando."
                  features={[
                    "3 envíos VERI*FACTU incluidos",
                    "Emisión de facturas electrónicas",
                    "Gestión básica de clientes",
                    "Acceso desde cualquier dispositivo",
                    "Soporte por email",
                  ]}
                  buttonText="Comenzar gratis"
                  buttonVariant="outline"
                  mostPopular={false}
                  badges={["Sin tarjeta", "Sin permanencia"]}
                />
              </motion.div>

              <motion.div variants={fadeIn}>
                <PricingCard
                  title="Paquete Básico"
                  price="8€"
                  period=""
                  description="10 envíos VERI*FACTU (€0,80 por envío)"
                  features={[
                    "10 envíos VERI*FACTU",
                    "Emisión de facturas electrónicas",
                    "Gestión de clientes",
                    "Acceso desde cualquier dispositivo",
                    "Soporte por email",
                  ]}
                  buttonText="Comprar"
                  buttonVariant="outline"
                  mostPopular={false}
                />
              </motion.div>

              <motion.div variants={fadeIn}>
                <PricingCard
                  title="Paquete Estándar"
                  price="15€"
                  period=""
                  description="30 envíos VERI*FACTU (€0,50 por envío)"
                  features={[
                    "30 envíos VERI*FACTU",
                    "Emisión de facturas electrónicas",
                    "Gestión de clientes",
                    "Exportación de datos",
                    "Soporte prioritario",
                  ]}
                  buttonText="Comprar"
                  buttonVariant="default"
                  mostPopular={true}
                />
              </motion.div>

              <motion.div variants={fadeIn}>
                <PricingCard
                  title="Paquete Premium"
                  price="23€"
                  period=""
                  description="50 envíos VERI*FACTU (€0,46 por envío)"
                  features={[
                    "50 envíos VERI*FACTU",
                    "Emisión de facturas electrónicas",
                    "Gestión de clientes",
                    "Informes y análisis avanzados",
                    "Soporte telefónico prioritario",
                  ]}
                  buttonText="Comprar"
                  buttonVariant="outline"
                  mostPopular={false}
                />
              </motion.div>
            </AnimatedSection>
          </div>

          <div className="mt-12 text-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  ¿Necesitas un plan personalizado?
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Contáctanos para crear un plan a medida para tu empresa con características y volumen de facturas
                    personalizados.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </section>

      {/* 6. Preguntas Frecuentes - Adaptadas al contexto español */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl font-heading">
                Preguntas frecuentes
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Resolvemos tus dudas sobre DINVBOX y la facturación electrónica
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="mt-12">
            <motion.div variants={fadeIn}>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-navy-900 hover:text-orange-500">
                    ¿Qué incluye el plan gratuito?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    El plan gratuito incluye 3 facturas electrónicas con envío a VERI*FACTU, gestión básica de clientes,
                    acceso desde cualquier dispositivo y soporte por email. Es perfecto para autónomos que están
                    comenzando o tienen un volumen bajo de facturación. Las facturas emitidas cumplen con toda la
                    normativa de la AEAT.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-navy-900 hover:text-orange-500">
                    ¿Necesito tarjeta de crédito para registrarme?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    No, el registro en el plan gratuito no requiere ninguna tarjeta de crédito ni datos bancarios.
                    Puedes comenzar a usar DINVBOX sin ningún compromiso financiero. Solo te pediremos tus datos
                    fiscales para poder emitir facturas correctamente.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-navy-900 hover:text-orange-500">
                    ¿Qué pasa si supero mis facturas gratuitas?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Si consumos los 3 envíos VERI*FACTU del plan gratuito, recibirás una notificación para actualizar a
                    un plan de pago. No podrás emitir más facturas hasta que adquieras más envíos VERI*FACTU, pero
                    seguirás teniendo acceso a todas tus facturas anteriores. No hay cargos automáticos ni sorpresas.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-navy-900 hover:text-orange-500">
                    ¿Las facturas cumplen con la normativa de la AEAT?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Sí, todas las facturas emitidas con DINVBOX cumplen con la normativa de la Agencia Tributaria
                    española y son compatibles con el sistema VeriFactu, Factura-e y VERI*FACTU. Nuestro sistema se
                    actualiza automáticamente para adaptarse a los cambios legislativos, por lo que nunca tendrás que
                    preocuparte por incumplir la normativa.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-navy-900 hover:text-orange-500">
                    ¿Me ayuda con la presentación de impuestos trimestrales?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Sí, DINVBOX genera automáticamente informes para los modelos 303 (IVA) y 130 (IRPF) con todos los
                    datos necesarios para presentar tus impuestos trimestrales. Además, te envía recordatorios antes de
                    las fechas límite para que nunca te olvides de presentarlos a tiempo.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left text-navy-900 hover:text-orange-500">
                    ¿Ofrecen soporte técnico en español?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Sí, todo nuestro equipo de soporte es español y entiende perfectamente las necesidades y
                    preocupaciones de autónomos y pymes en España. Todos los planes, incluido el gratuito, incluyen
                    soporte por email. Los planes de pago ofrecen soporte prioritario y los planes Estándar y Premium
                    incluyen soporte telefónico.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </AnimatedSection>

          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="border-navy-300 text-navy-800 hover:bg-navy-50">
              <Link href="/faq">Ver todas las preguntas frecuentes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section - Adaptada al contexto español */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent opacity-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-navy-300 rounded-full filter blur-3xl opacity-10"></div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 relative">
          <AnimatedSection className="text-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading">
                Olvídate de los dolores de cabeza con Hacienda
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
                Únete a miles de autónomos y empresas españolas que ya confían en DINVBOX para su facturación
                electrónica. Regístrate gratis y emite tu primera factura en minutos.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                >
                  <a href="https://testing.dinvbox.es/login" target="_blank" rel="noopener noreferrer">
                    Crear cuenta gratis
                  </a>
                </Button>
                {!showCalendly ? (
                  <Button
                    onClick={toggleCalendly}
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full flex items-center"
                  >
                    Hablar con un asesor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <div className="mt-8 w-full max-w-2xl mx-auto bg-white rounded-xl p-4 shadow-lg">
                    <CalendlyWidget />
                    <Button
                      onClick={toggleCalendly}
                      variant="outline"
                      className="mt-4 border-navy-300 text-navy-600 hover:bg-navy-50"
                    >
                      Ocultar calendario
                    </Button>
                  </div>
                )}
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="bg-transparent text-gray-300 border-gray-600">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-400" /> Sin tarjeta de crédito
                </Badge>
                <Badge variant="outline" className="bg-transparent text-gray-300 border-gray-600">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-400" /> Sin permanencia
                </Badge>
                <Badge variant="outline" className="bg-transparent text-gray-300 border-gray-600">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-400" /> Soporte en español
                </Badge>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Chat flotante */}
          <div className="fixed bottom-6 right-6 z-40">
            <Button className="h-14 w-14 rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg flex items-center justify-center p-0">
              <span className="absolute -top-1 -right-1 bg-green-500 h-3 w-3 rounded-full"></span>
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </section>

      {/* Botón del mapa mundial */}
      <WorldMapButton />
    </div>
  )
}
