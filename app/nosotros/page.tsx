"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Users, Cloud, CheckCircle, Award, Shield } from "lucide-react"

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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })
  const controls = useAnimation()

  if (isInView) {
    controls.start("visible")
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={staggerContainer} className={className}>
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-50 to-white -z-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-orange-300 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-300 rounded-full filter blur-3xl opacity-10 -z-10"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeIn}>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl mb-6">
                Quiénes somos
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                DINVBOX es una firma tecnológica con más de una década de experiencia en facturación electrónica.
                Combinamos innovación, cumplimiento normativo y un profundo conocimiento del entorno empresarial para
                ofrecer soluciones que simplifican la gestión fiscal y potencian el crecimiento de nuestros clientes.
              </p>
            </motion.div>
          </AnimatedSection>
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

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <motion.div variants={fadeIn}>
              <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl font-heading">
                Nos especializamos en tres pilares fundamentales
              </h2>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {/* Pilar 1: Inteligencia empresarial */}
            <motion.div variants={fadeIn} className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                <Brain className="h-16 w-16 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-4">Inteligencia empresarial</h3>
              <p className="text-gray-600">
                Desarrollamos herramientas que automatizan tareas complejas, reducen errores y generan informes claros y
                útiles para la toma de decisiones.
              </p>
            </motion.div>

            {/* Pilar 2: Apoyo profesional */}
            <motion.div variants={fadeIn} className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-navy-100 flex items-center justify-center mb-6">
                <Users className="h-16 w-16 text-navy-600" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-4">Apoyo profesional</h3>
              <p className="text-gray-600">
                Nuestro equipo de expertos fiscales y técnicos acompaña al cliente en todo momento. Aquí no hay bots:
                ofrecemos asistencia real, cercana y eficaz.
              </p>
            </motion.div>

            {/* Pilar 3: Computación en la nube */}
            <motion.div variants={fadeIn} className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                <Cloud className="h-16 w-16 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-4">Computación en la nube</h3>
              <p className="text-gray-600">
                Nuestras soluciones funcionan 100% en la nube, lo que garantiza agilidad, seguridad y acceso desde
                cualquier lugar.
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Nuestra historia */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl font-heading mb-6">
                Nuestra historia
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Hoy comenzamos nuestra andadura en España, con el compromiso de ofrecer una experiencia de facturación
                intuitiva, legal y sin complicaciones, adaptada a las exigencias de la AEAT y VeriFactu.
              </p>
              <p className="text-lg text-gray-600 mb-8">Confía en DINVBOX. Factura sin miedo. Crece con respaldo.</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-navy-900 font-medium">Más de 10 años de experiencia</span>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-navy-900 font-medium">Equipo de expertos fiscales</span>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-navy-900 font-medium">Tecnología de vanguardia</span>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeIn} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 bg-white">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/80 to-transparent z-10 pointer-events-none"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%203%20may%202025%2C%2001_51_23%20p.m.-8vnDyT4CUYWcGrru04pXcKPg6A09jX.png"
                  alt="Equipo DINVBOX"
                  width={600}
                  height={400}
                  className="w-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 rounded-full p-2">
                    <Award className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Certificados</p>
                    <p className="font-semibold text-navy-900">AEAT & VeriFactu</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <motion.div variants={fadeIn}>
              <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl font-heading">
                Certificaciones y garantías
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Cumplimos con los más altos estándares de calidad y seguridad
              </p>
            </motion.div>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center">
              <div className="bg-orange-100 rounded-full p-4 mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Certificado por AEAT</h4>
              <p className="text-gray-600">
                Plataforma homologada que cumple con todos los requisitos de la Agencia Tributaria española.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center">
              <div className="bg-orange-100 rounded-full p-4 mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">Compatible con VeriFactu</h4>
              <p className="text-gray-600">
                Integración completa con el sistema de verificación de facturas electrónicas español.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center">
              <div className="bg-orange-100 rounded-full p-4 mb-4">
                <Cloud className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy-900 mb-2">ISO 27001</h4>
              <p className="text-gray-600">
                Certificación internacional de seguridad de la información para proteger tus datos fiscales.
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-300 rounded-full filter blur-3xl opacity-10"></div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
                  ¿Listo para simplificar tu facturación?
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Únete a miles de empresas que ya confían en DINVBOX para su facturación electrónica.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                >
                  <Link href="/registro" className="flex items-center">
                    Comenzar ahora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
