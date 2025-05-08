import type { Metadata } from "next"
import SolutionsSection from "@/components/solutions-section"

export const metadata: Metadata = {
  title: "Soluciones | DINVBOX",
  description:
    "Descubre nuestras soluciones de facturación electrónica, gestión documental y API para integración con AEAT y VeriFactu.",
}

export default function SolucionesPage() {
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
            <h1 className="font-heading text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Nuestras Soluciones
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Herramientas diseñadas específicamente para autónomos y empresas españolas que buscan simplificar su
              gestión electrónica y cumplir con la normativa fiscal.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <SolutionsSection />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-900 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-12 md:p-12 lg:px-16 lg:py-14 text-center md:text-left">
              <div className="md:flex md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">¿No encuentras lo que buscas?</h2>
                  <p className="mt-3 text-gray-300">
                    Nuestro equipo de expertos puede ayudarte a encontrar la solución perfecta para tu empresa o crear
                    una personalizada que se adapte a tus necesidades específicas.
                  </p>
                </div>
                <div className="mt-8 md:mt-0">
                  <a
                    href="/contacto"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500"
                  >
                    Contactar con un asesor
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
