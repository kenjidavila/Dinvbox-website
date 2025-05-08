"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

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

export default function PricingSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-gray-50"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100 rounded-full filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-navy-100 rounded-full filter blur-3xl opacity-30"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection className="text-center">
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl font-heading">
              Planes Adaptados a tus Necesidades
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Comienza gratis y escala a medida que crece tu negocio. Sin compromisos ni sorpresas.
            </p>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <motion.div variants={fadeIn}>
            <PricingCard
              title="Paquete Básico"
              price="8€"
              description="Ideal para autónomos y pequeñas empresas con bajo volumen de facturación."
              features={[
                "10 timbres (0,80€ por timbre)",
                "Emisión de facturas electrónicas",
                "Gestión de clientes",
                "Acceso desde cualquier dispositivo",
                "Soporte por email",
              ]}
              buttonText="Comenzar gratis"
              buttonVariant="outline"
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <PricingCard
              title="Paquete Estándar"
              price="15€"
              description="Perfecto para pequeñas y medianas empresas con volumen medio de facturación."
              features={[
                "30 timbres (0,50€ por timbre)",
                "Todas las características del plan Básico",
                "Informes y análisis básicos",
                "Exportación de datos",
                "Soporte prioritario",
              ]}
              buttonText="Comprar"
              buttonVariant="default"
              highlighted={true}
            />
          </motion.div>

          <motion.div variants={fadeIn}>
            <PricingCard
              title="Paquete Premium"
              price="23€"
              description="Diseñado para empresas con alto volumen de facturación y necesidades avanzadas."
              features={[
                "50 timbres (0,46€ por timbre)",
                "Todas las características del plan Estándar",
                "Informes y análisis avanzados",
                "API para integración con otros sistemas",
                "Soporte telefónico dedicado",
              ]}
              buttonText="Comprar"
              buttonVariant="outline"
            />
          </motion.div>
        </AnimatedSection>

        <div className="mt-12 text-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                <HelpCircle className="h-4 w-4 mr-1" />
                ¿Qué es un timbre?
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  Un timbre es un crédito que se consume cada vez que emites una factura electrónica. Cada factura
                  requiere un timbre para su validación y envío.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="mt-8 text-center">
          <Button asChild variant="ghost" className="text-navy-700 hover:text-orange-500">
            <Link href="/precios">Ver todos los detalles de los planes</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant = "default",
  highlighted = false,
}: {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant?: "default" | "outline"
  highlighted?: boolean
}) {
  return (
    <Card
      className={`flex flex-col h-full transform transition-all duration-300 hover:-translate-y-2 ${
        highlighted
          ? "border-orange-200 shadow-xl shadow-orange-100/50 relative overflow-hidden"
          : "border-gray-200 shadow-lg hover:shadow-xl"
      }`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-bold px-4 py-1 transform rotate-45 translate-x-5 translate-y-3 shadow-sm">
            Popular
          </div>
        </div>
      )}

      <CardHeader className={`pb-0 ${highlighted ? "pt-8" : "pt-6"}`}>
        <div className="text-center">
          <h3 className="text-xl font-bold text-navy-900">{title}</h3>
          <div className="mt-4 flex items-baseline justify-center">
            <span className="text-4xl font-extrabold text-navy-900">{price}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-6">
        <p className="text-center text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <span className="ml-3 text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className={`pt-0 ${highlighted ? "pb-8" : "pb-6"}`}>
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
      </CardFooter>
    </Card>
  )
}
