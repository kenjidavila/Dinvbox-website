"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, ArrowLeft, HelpCircle, FileText, CreditCard, AlertTriangle, Users, Calendar } from "lucide-react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Todas las preguntas frecuentes combinadas y organizadas por categorías
  const faqCategories = [
    {
      id: "general",
      name: "General",
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          question: "¿Qué incluye el plan gratuito?",
          answer:
            "El plan gratuito incluye 3 envíos VERI*FACTU, gestión básica de clientes, acceso desde cualquier dispositivo y soporte por email. Es perfecto para autónomos que están comenzando o tienen un volumen bajo de facturación. Las facturas emitidas cumplen con toda la normativa de la AEAT.",
        },
        {
          question: "¿Las facturas cumplen con la normativa de la AEAT?",
          answer:
            "Sí, todas las facturas emitidas con DINVBOX cumplen con la normativa de la Agencia Tributaria española y son compatibles con el sistema VeriFactu, Factura-e y VERI*FACTU. Nuestro sistema se actualiza automáticamente para adaptarse a los cambios legislativos, por lo que nunca tendrás que preocuparte por incumplir la normativa.",
        },
        {
          question: "¿Ofrecen soporte técnico en español?",
          answer:
            "Sí, todo nuestro equipo de soporte es español y entiende perfectamente las necesidades y preocupaciones de autónomos y pymes en España. Todos los planes, incluido el gratuito, incluyen soporte por email. Los planes de pago ofrecen soporte prioritario y los planes Estándar y Premium incluyen soporte telefónico.",
        },
      ],
    },
    {
      id: "precios",
      name: "Precios y Pagos",
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          question: "¿Qué es un Envío VERI*FACTU?",
          answer:
            "Un Envío VERI*FACTU es el proceso por el cual nuestro sistema envía de forma segura y automática a la Agencia Tributaria (AEAT) los registros de facturación generados en el momento de emitir cada factura. Cada envío se realiza en formato XML estructurado y cifrado, cumpliendo con todos los requisitos técnicos de la AEAT. Cada vez que generas una factura, se realiza automáticamente un Envío VERI*FACTU.",
        },
        {
          question: "¿Los Envíos VERI*FACTU caducan?",
          answer:
            "No, los Envíos VERI*FACTU que adquieres no caducan. Puedes utilizarlos cuando los necesites sin preocuparte por fechas límite. Una vez comprados, permanecen en tu cuenta hasta que los utilices para enviar facturas a la AEAT.",
        },
        {
          question: "¿Puedo cambiar de plan en cualquier momento?",
          answer:
            "Sí, puedes cambiar de plan o adquirir más Envíos VERI*FACTU en cualquier momento según tus necesidades. No hay penalizaciones por cambiar entre planes.",
        },
        {
          question: "¿Hay costos ocultos?",
          answer:
            "No, en DINVBOX creemos en la transparencia total. El precio que ves es el precio que pagas. No hay cargos adicionales ni sorpresas en tu factura.",
        },
        {
          question: "¿Ofrecen descuentos para volúmenes grandes?",
          answer:
            "Sí, para empresas con grandes volúmenes de facturación ofrecemos planes personalizados con precios especiales. Contacta con nuestro equipo comercial para obtener una cotización adaptada a tus necesidades.",
        },
        {
          question: "¿Necesito tarjeta de crédito para registrarme?",
          answer:
            "No, el registro en el plan gratuito no requiere ninguna tarjeta de crédito ni datos bancarios. Puedes comenzar a usar DINVBOX sin ningún compromiso financiero. Solo te pediremos tus datos fiscales para poder emitir facturas correctamente.",
        },
        {
          question: "¿Qué pasa si supero mis Envíos VERI*FACTU gratuitos?",
          answer:
            "Si consumes los 3 Envíos VERI*FACTU del plan gratuito, recibirás una notificación para actualizar a un plan de pago. No podrás realizar más envíos a la AEAT hasta que adquieras más Envíos VERI*FACTU, pero seguirás teniendo acceso a todas tus facturas anteriores. No hay cargos automáticos ni sorpresas.",
        },
      ],
    },
    {
      id: "facturacion",
      name: "Facturación",
      icon: <FileText className="h-5 w-5" />,
      questions: [
        {
          question: "¿Cómo envío una factura a mi cliente?",
          answer:
            "Una vez creada la factura en DINVBOX, puedes enviarla directamente por email a tu cliente desde la plataforma, descargarla en PDF para enviarla manualmente, o compartir un enlace seguro para que tu cliente la visualice y descargue.",
        },
        {
          question: "¿Puedo personalizar mis facturas?",
          answer:
            "Sí, puedes personalizar tus facturas con tu logo, colores corporativos y datos de contacto. También puedes crear plantillas personalizadas para diferentes tipos de clientes o servicios.",
        },
        {
          question: "¿Es posible emitir facturas recurrentes?",
          answer:
            "Sí, DINVBOX te permite configurar facturas recurrentes para clientes con los que trabajas de forma periódica. Puedes establecer la frecuencia (mensual, trimestral, etc.) y la plataforma generará y enviará las facturas automáticamente.",
        },
      ],
    },
    {
      id: "impuestos",
      name: "Impuestos y Obligaciones",
      icon: <Calendar className="h-5 w-5" />,
      questions: [
        {
          question: "¿Me ayuda con la presentación de impuestos trimestrales?",
          answer:
            "Sí, DINVBOX genera automáticamente informes para los modelos 303 (IVA) y 130 (IRPF) con todos los datos necesarios para presentar tus impuestos trimestrales. Además, te envía recordatorios antes de las fechas límite para que nunca te olvides de presentarlos a tiempo.",
        },
        {
          question: "¿Cómo me avisa de las fechas importantes?",
          answer:
            "DINVBOX incluye un calendario fiscal personalizado según tu tipo de actividad y régimen fiscal. Recibirás notificaciones por email y dentro de la plataforma sobre próximas fechas importantes, con tiempo suficiente para preparar la documentación necesaria.",
        },
        {
          question: "¿La plataforma se actualiza con los cambios normativos?",
          answer:
            "Sí, nuestro equipo de expertos fiscales mantiene la plataforma constantemente actualizada con los cambios normativos de la AEAT y otras administraciones. No tendrás que preocuparte por estar al día con las nuevas regulaciones.",
        },
      ],
    },
    {
      id: "seguridad",
      name: "Seguridad y Datos",
      icon: <AlertTriangle className="h-5 w-5" />,
      questions: [
        {
          question: "¿Mis datos están seguros?",
          answer:
            "Absolutamente. DINVBOX cumple con todas las normativas de protección de datos (RGPD) y utiliza encriptación de nivel bancario para proteger tu información. Además, realizamos copias de seguridad diarias para garantizar que nunca pierdas tus datos.",
        },
        {
          question: "¿Quién tiene acceso a mi información fiscal?",
          answer:
            "Solo tú y las personas a las que explícitamente des acceso pueden ver tu información fiscal. Nuestro equipo técnico tiene acceso limitado y solo para tareas de mantenimiento, siempre bajo estrictos protocolos de confidencialidad.",
        },
        {
          question: "¿Puedo exportar mis datos si decido cambiar de plataforma?",
          answer:
            "Sí, DINVBOX te permite exportar todos tus datos en formatos estándar (CSV, Excel) en cualquier momento. Tus datos son tuyos y siempre tendrás control total sobre ellos.",
        },
      ],
    },
    {
      id: "soporte",
      name: "Soporte y Ayuda",
      icon: <Users className="h-5 w-5" />,
      questions: [
        {
          question: "¿Cómo puedo contactar con soporte?",
          answer:
            "Puedes contactar con nuestro equipo de soporte por email en soporte@dinvbox.com, a través del chat en la plataforma, o por teléfono si tienes un plan Estándar o Premium. Nuestro horario de atención es de lunes a viernes de 9:00 a 18:00.",
        },
        {
          question: "¿Ofrecen formación para usar la plataforma?",
          answer:
            "Sí, ofrecemos webinars gratuitos de formación, tutoriales en video y una completa base de conocimiento. Además, los planes de pago incluyen sesiones personalizadas de onboarding para ayudarte a sacar el máximo partido a DINVBOX.",
        },
        {
          question: "¿Qué es Facturito y cómo me ayuda?",
          answer:
            "Facturito es nuestra IA tributaria que te guía paso a paso en la creación de facturas, te alerta de posibles errores y responde a tus dudas fiscales en tiempo real. Es como tener un asesor fiscal disponible 24/7, pero mucho más rápido y siempre actualizado con la última normativa.",
        },
      ],
    },
  ]

  // Filtrar preguntas basadas en la búsqueda
  const filteredFAQs = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqCategories

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
            <Button asChild variant="ghost" className="mb-6 text-navy-600 hover:text-navy-800 hover:bg-navy-50">
              <Link href="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Preguntas Frecuentes
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra respuestas a las dudas más comunes sobre DINVBOX, facturación electrónica, precios y más
            </p>

            {/* Buscador */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar pregunta o palabra clave..."
                  className="pl-10 pr-4 py-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
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

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            {searchQuery ? (
              // Resultados de búsqueda
              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-8">
                  {filteredFAQs.reduce((total, category) => total + category.questions.length, 0)} resultados para "
                  {searchQuery}"
                </h2>

                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-12">
                    <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-lg text-gray-600">No encontramos resultados para tu búsqueda</p>
                    <p className="mt-2 text-gray-500">Intenta con otros términos o explora las categorías</p>
                    <Button className="mt-6" onClick={() => setSearchQuery("")}>
                      Ver todas las preguntas
                    </Button>
                  </div>
                ) : (
                  filteredFAQs.map((category) => (
                    <div key={category.id} className="mb-12">
                      <h3 className="text-xl font-semibold text-navy-900 mb-4 flex items-center">
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </h3>
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, index) => (
                          <AccordionItem key={index} value={`${category.id}-${index}`}>
                            <AccordionTrigger className="text-left text-navy-900 hover:text-orange-500">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))
                )}
              </div>
            ) : (
              // Vista normal por categorías con tabs
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8">
                  {faqCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                      {category.icon}
                      <span className="hidden md:inline">{category.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {faqCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center">
                      {category.icon}
                      <span className="ml-2">{category.name}</span>
                    </h2>

                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, index) => (
                        <AccordionItem key={index} value={`${category.id}-${index}`}>
                          <AccordionTrigger className="text-left text-navy-900 hover:text-orange-500">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-navy-900 font-heading">
                  ¿No encuentras respuesta a tu pregunta?
                </h2>
                <p className="mt-4 text-gray-600">
                  Nuestro equipo de soporte está listo para ayudarte. Contáctanos y te responderemos a la mayor brevedad
                  posible.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
                  >
                    <Link href="/contacto">Contactar con soporte</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-navy-300 text-navy-800 hover:bg-navy-50">
                    <Link href="/demo">Ver demostración</Link>
                  </Button>
                </div>
              </div>
              <div className="relative hidden md:block bg-gradient-to-br from-orange-50 to-orange-100 p-12">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-orange-200 flex items-center justify-center">
                    <HelpCircle className="h-16 w-16 text-orange-500" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
