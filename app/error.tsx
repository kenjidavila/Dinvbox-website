"use client"
import FacturitoGame from "@/components/facturito-game"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-navy-900 mb-2">¡Algo salió mal!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Estamos trabajando para solucionarlo. Mientras tanto, ayuda a Facturito a evitar errores fiscales.
        </p>

        <div className="mb-8">
          <FacturitoGame />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="bg-navy-600 hover:bg-navy-700">
            Intentar de nuevo
          </Button>
          <Button asChild variant="outline" className="border-navy-600 text-navy-600 hover:bg-navy-50">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
