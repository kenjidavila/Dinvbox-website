"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import WorldMap from "@/components/world-map"

// Datos simplificados para la vista previa del mapa
const countryData = {
  // América Latina
  MX: {
    name: "México",
    status: "obligatorio",
  },
  CO: {
    name: "Colombia",
    status: "obligatorio",
  },
  BR: {
    name: "Brasil",
    status: "obligatorio",
  },
  AR: {
    name: "Argentina",
    status: "obligatorio",
  },
  // Europa
  ES: {
    name: "España",
    status: "obligatorio",
  },
  DE: {
    name: "Alemania",
    status: "parcial",
  },
  FR: {
    name: "Francia",
    status: "parcial",
  },
  IT: {
    name: "Italia",
    status: "obligatorio",
  },
  // Asia y Oceanía
  IN: {
    name: "India",
    status: "obligatorio",
  },
  CN: {
    name: "China",
    status: "parcial",
  },
  AU: {
    name: "Australia",
    status: "planificado",
  },
  // África y Medio Oriente
  EG: {
    name: "Egipto",
    status: "obligatorio",
  },
  SA: {
    name: "Arabia Saudita",
    status: "obligatorio",
  },
}

export default function WorldMapButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  const handleCountryClick = (countryCode) => {
    // Cerrar el diálogo y navegar a la página del mapa con el país seleccionado
    setIsDialogOpen(false)
    router.push(`/mapa-mundial?country=${countryCode}`)
  }

  return (
    <>
      <motion.button
        className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{
          rotate: { repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" },
          scale: { duration: 0.2 },
        }}
        onClick={() => setIsDialogOpen(true)}
        aria-label="Ver mapa mundial de facturación electrónica"
      >
        <div className="relative w-8 h-8">
          {/* Líneas del globo terráqueo */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full text-white"
          >
            {/* Líneas horizontales */}
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M12 2C14.5 4.5 16 8.5 16 12C16 15.5 14.5 19.5 12 22C9.5 19.5 8 15.5 8 12C8 8.5 9.5 4.5 12 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Tooltip que aparece al hacer hover */}
        <div className="absolute right-16 bg-white px-3 py-1.5 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Explorar facturación global
        </div>
      </motion.button>

      {/* Diálogo con vista previa del mapa */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-navy-900 mb-2">¿Cómo Factura el Mundo?</h2>
            <p className="text-gray-600 mb-2">
              Explora el estado de la facturación electrónica en diferentes países. Haz clic en un país para más
              detalles.
            </p>
          </div>

          <div className="relative aspect-[21/9] h-[50vh] max-h-[400px]">
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <WorldMap
                onCountryClick={handleCountryClick}
                countryData={countryData}
                disablePanning={true}
                showZoomControls={true}
              />
            </div>
          </div>

          <div className="p-3 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="flex flex-wrap gap-2 mr-auto mb-2 sm:mb-0">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm mr-1"></div>
                  <span className="text-xs text-gray-600">Obligatorio</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 bg-amber-500 rounded-sm mr-1"></div>
                  <span className="text-xs text-gray-600">Parcial</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm mr-1"></div>
                  <span className="text-xs text-gray-600">Voluntario</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 bg-violet-500 rounded-sm mr-1"></div>
                  <span className="text-xs text-gray-600">Planificado</span>
                </div>
              </div>

              <button
                className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap"
                onClick={() => {
                  setIsDialogOpen(false)
                  router.push("/mapa-mundial")
                }}
              >
                Ver mapa completo
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
