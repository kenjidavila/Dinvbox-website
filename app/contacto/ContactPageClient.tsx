"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ContactForm from "@/components/contact-form"
import CalendlyWidget from "@/components/calendly-widget"
import { MapPin, Phone, Mail, Calendar, ArrowRight } from "lucide-react"

export default function ContactPageClient() {
  const [showCalendly, setShowCalendly] = useState(false)

  const toggleCalendly = () => {
    setShowCalendly(!showCalendly)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-50 to-white -z-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-orange-300 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-300 rounded-full filter blur-3xl opacity-10 -z-10"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl mb-6">
              Contacto
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Estamos aquí para ayudarte. Ponte en contacto con nosotros o agenda una llamada para conocer más sobre
              nuestras soluciones de facturación electrónica.
            </p>
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

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Formulario de contacto */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold tracking-tight text-navy-900 font-heading mb-6">Envíanos un mensaje</h2>
              <ContactForm />
            </div>

            {/* Información de contacto y Calendly */}
            <div className="space-y-8">
              {/* Oficina */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold tracking-tight text-navy-900 font-heading mb-6">Nuestra oficina</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 bg-orange-100 rounded-full p-2 mr-4">
                      <MapPin className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900">Madrid</h3>
                      <p className="text-gray-600">Calle Marqués de Riscal #11,3º, Prta. 5</p>
                      <p className="text-gray-600">28010 Madrid</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mt-1 bg-orange-100 rounded-full p-2 mr-4">
                      <Phone className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900">Teléfono</h3>
                      <p className="text-gray-600">+34 644 78 36 22</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mt-1 bg-orange-100 rounded-full p-2 mr-4">
                      <Mail className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900">Email</h3>
                      <p className="text-gray-600">contacto@dinvbox.es</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Programar llamada */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-start mb-6">
                  <div className="mt-1 bg-orange-100 rounded-full p-2 mr-4">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-navy-900 font-heading">Programar llamada</h2>
                    <p className="text-gray-600 mt-2">
                      Agenda una llamada con nuestro equipo para resolver todas tus dudas sobre facturación electrónica.
                    </p>
                  </div>
                </div>

                {!showCalendly ? (
                  <Button
                    onClick={toggleCalendly}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
                  >
                    Agendar ahora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <div className="mt-6">
                    <CalendlyWidget />
                    <Button
                      onClick={toggleCalendly}
                      variant="outline"
                      className="mt-4 w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                    >
                      Ocultar calendario
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-300 rounded-full filter blur-3xl opacity-10"></div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
                ¿Listo para simplificar tu facturación?
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Únete a miles de empresas que ya confían en DINVBOX para su facturación electrónica.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
              >
                Comenzar ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
