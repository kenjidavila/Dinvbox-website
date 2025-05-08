"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Info } from "lucide-react"

export default function MapLegend() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <div className="bg-white rounded-lg shadow-md p-3 text-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-navy-900">Estado de facturación electrónica</h3>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Información"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-500 rounded-sm mr-2"></div>
            <span>Obligatorio</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-amber-500 rounded-sm mr-2"></div>
            <span>Parcialmente obligatorio</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
            <span>Voluntario</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-violet-500 rounded-sm mr-2"></div>
            <span>Planificado</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-navy-800 rounded-sm mr-2"></div>
            <span>Sin información</span>
          </div>
        </div>

        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600"
          >
            <p>
              <strong>Obligatorio:</strong> La facturación electrónica es obligatoria para todos o la mayoría de los
              contribuyentes.
            </p>
            <p className="mt-1">
              <strong>Parcialmente obligatorio:</strong> Obligatorio solo para ciertos sectores, tamaños de empresa o
              tipos de transacciones (ej. B2G).
            </p>
            <p className="mt-1">
              <strong>Voluntario:</strong> No es obligatorio, pero está disponible y puede ser incentivado.
            </p>
            <p className="mt-1">
              <strong>Planificado:</strong> Existe un plan oficial para implementar la obligatoriedad en una fecha
              futura.
            </p>
            <p className="mt-1 text-gray-500 italic">Datos actualizados a mayo de 2025</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
