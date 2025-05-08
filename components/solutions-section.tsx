"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, FileText, Shield, Settings, CheckCircle } from "lucide-react"
import CalendlyWidget from "@/components/calendly-widget"

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

const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.02, 1],
    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
  },
}

interface SolutionCardProps {
  icon: React.ReactNode
  title: string
  tagline: string
  description: string
  benefits?: Array<{
    icon: React.ReactNode
    text: string
  }>
  buttonText: string
  buttonLink: string
  featured?: boolean
}

const SolutionCard = ({
  icon,
  title,
  tagline,
  description,
  benefits,
  buttonText,
  buttonLink,
  featured = false,
}: SolutionCardProps) => {
  return (
    <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }} className="h-full">
      <Card
        className={`h-full transition-all duration-300 overflow-hidden ${
          featured
            ? "border-orange-300 shadow-lg shadow-orange-100/50 relative"
            : "border-gray-200 hover:border-gray-300 hover:shadow-md"
        }`}
      >
        {featured && (
          <div className="absolute -right-12 top-6 bg-orange-500 text-white py-1 px-10 transform rotate-45 shadow-md">
            <span className="text-xs font-bold tracking-wider">DESTACADO</span>
          </div>
        )}
        <div
          className={`absolute top-0 left-0 w-full h-1 ${
            featured ? "bg-gradient-to-r from-orange-400 to-orange-600" : "bg-navy-200"
          }`}
        ></div>
        <CardHeader className={`pb-4 ${featured ? "bg-gradient-to-br from-orange-50 to-white" : ""}`}>
          <div className="mb-3">
            <div
              className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${
                featured
                  ? "bg-gradient-to-br from-orange-500 to-orange-400 text-white shadow-md shadow-orange-200"
                  : "bg-navy-100 text-navy-600"
              }`}
            >
              {icon}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-navy-900">{title}</CardTitle>
          <CardDescription className="text-base font-medium text-navy-700 mt-1">{tagline}</CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <p className="text-gray-600 leading-relaxed">{description}</p>

          {benefits && benefits.length > 0 && (
            <div className="mt-6 space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start bg-gray-50 p-2 rounded-md">
                  <div className={`mr-2 mt-0.5 ${featured ? "text-orange-500" : "text-navy-500"}`}>{benefit.icon}</div>
                  <span className="text-sm text-gray-700 font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className={`${featured ? "bg-gradient-to-br from-white to-orange-50" : ""}`}>
          <Button
            asChild
            variant={featured ? "default" : "outline"}
            className={`w-full justify-between font-medium ${
              featured
                ? "bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
                : "border-navy-200 text-navy-700 hover:bg-navy-50"
            }`}
          >
            <Link href={buttonLink}>
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function SolutionsSection() {
  const [showCalendly, setShowCalendly] = useState(false)

  const toggleCalendly = () => {
    setShowCalendly(!showCalendly)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl font-heading">
              Tres caminos, un mismo destino
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Que tu negocio crezca sin mirar atrás. Facturar, ordenar, cumplir... déjanos eso a nosotros. Para que tú
              avances sin freno.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            {...pulseAnimation}
            className="lg:scale-105 z-10"
          >
            <SolutionCard
              icon={<FileText className="h-7 w-7" />}
              title="Facturación Electrónica VERIFACTU"
              tagline="Evita líos, factura con DINVBOX."
              description="Cumple con la AEAT y la normativa Veri*factu sin dolores de cabeza. Un sistema intuitivo, profesional y 100% en la nube. Porque facturar debería ser tan sencillo como hacer clic."
              buttonText="Ver más"
              buttonLink="/facturacion-electronica"
              featured={true}
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <SolutionCard
              icon={<FileText className="h-6 w-6" />}
              title="Administración Digital de Documentos"
              tagline="Tus documentos, en orden. Tu mente, en paz."
              description="Organiza, protege y accede a lo importante sin rebuscar en carpetas. Ideal para proveedores, clientes y equipos. Cumplimos con ISO 27001 y SOC 3. Cumplimos por ti."
              benefits={[{ icon: <Shield className="h-4 w-4" />, text: "Todo seguro, todo conectado" }]}
              buttonText="Ver más"
              buttonLink="https://files.dinvbox.mx"
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <SolutionCard
              icon={<Settings className="h-6 w-6" />}
              title="API DINVBOX VERIFACTU"
              tagline="Integra. Automatiza. Respira."
              description="Nuestra API conecta tu software con la AEAT en minutos. Incluye sandbox, firma electrónica y respuesta en tiempo real. Olvídate de lo técnico, disfruta de la eficiencia."
              benefits={[{ icon: <CheckCircle className="h-4 w-4" />, text: "Cumple sin complicarte" }]}
              buttonText="Conectar API"
              buttonLink="/api-verifactu"
            />
          </motion.div>
        </motion.div>

        <div className="mt-16 text-center">
          <Badge variant="outline" className="mb-4 bg-orange-50 text-orange-600 border-orange-200 px-3 py-1">
            ¿No estás seguro de qué solución elegir?
          </Badge>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Nuestro equipo de expertos puede ayudarte a encontrar la solución perfecta para tu empresa. Agenda una
            consultoría gratuita y personalizada.
          </p>

          {!showCalendly ? (
            <Button onClick={toggleCalendly} className="bg-navy-800 hover:bg-navy-900 text-white rounded-full px-6">
              Solicitar asesoramiento gratuito
            </Button>
          ) : (
            <div className="mt-8 max-w-2xl mx-auto">
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
      </div>
    </section>
  )
}
