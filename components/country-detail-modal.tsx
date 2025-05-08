"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CountryDetailModalProps {
  country: {
    name: string
    status: string
    details: string
    year: number | null
  } | null
  onClose: () => void
}

export default function CountryDetailModal({ country, onClose }: CountryDetailModalProps) {
  if (!country) return null

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "obligatorio":
        return "Obligatorio"
      case "parcial":
        return "Parcialmente obligatorio"
      case "voluntario":
        return "Voluntario"
      case "planificado":
        return "Planificado"
      default:
        return "Desconocido"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "obligatorio":
        return (
          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
        )
      case "parcial":
        return (
          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 12h8" />
            </svg>
          </div>
        )
      case "voluntario":
        return (
          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
            </svg>
          </div>
        )
      case "planificado":
        return (
          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-navy-900">Facturación electrónica en {country.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 mr-2">Estado:</span>
              <div className="flex items-center">
                {getStatusIcon(country.status)}
                <span className="ml-2 font-medium">{getStatusLabel(country.status)}</span>
              </div>
            </div>

            {country.year && (
              <div>
                <span className="text-sm font-medium text-gray-500">Año de implementación:</span>{" "}
                <span className="font-medium">{country.year}</span>
              </div>
            )}

            <div>
              <span className="text-sm font-medium text-gray-500 block mb-1">Detalles:</span>
              <p className="text-gray-700">{country.details}</p>
            </div>
          </div>

          <Button onClick={onClose} className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  )
}
