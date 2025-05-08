"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

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

const testimonials = [
  {
    content:
      "DINVBOX ha transformado por completo nuestra gestión de facturación. Ahora todo es más rápido, seguro y eficiente. El soporte técnico es excelente y siempre están disponibles para ayudar.",
    author: "María Rodríguez",
    role: "Directora Financiera, TechSolutions",
    avatar: "/diverse-group-avatars.png",
  },
  {
    content:
      "Como autónomo, necesitaba una solución sencilla pero completa. DINVBOX me ha permitido cumplir con la normativa sin complicaciones y a un precio muy competitivo. ¡Totalmente recomendable!",
    author: "Carlos Martínez",
    role: "Diseñador Freelance",
    avatar: "/diverse-group-avatars.png",
  },
  {
    content:
      "Llevamos años buscando una plataforma que se adaptara a nuestras necesidades específicas. Con DINVBOX finalmente hemos encontrado la solución perfecta para nuestra empresa internacional.",
    author: "Ana López",
    role: "CEO, Distribuciones Globales",
    avatar: "/diverse-group-avatars.png",
  },
]

export default function TestimonialSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-navy-100 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-orange-100 rounded-full filter blur-3xl opacity-20"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection className="text-center">
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl font-heading">
              Lo que Dicen Nuestros Clientes
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Miles de empresas confían en DINVBOX para su facturación electrónica. Descubre por qué somos la opción
              preferida.
            </p>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <QuoteIcon className="h-10 w-10 text-orange-400 mb-6" />
                  <p className="text-gray-600 mb-8 italic">{testimonial.content}</p>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.author.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}
