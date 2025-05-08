import FacturitoGame from "@/components/facturito-game"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GamePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Facturito Jump</h1>
          <p className="text-lg text-gray-600">
            Ayuda a Facturito a evitar errores fiscales. ¡Salta los obstáculos y consigue la mejor puntuación!
          </p>
        </div>

        <div className="mb-8">
          <FacturitoGame />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-navy-900 mb-4">Instrucciones</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              Usa la <strong>barra espaciadora</strong> o <strong>toca la pantalla</strong> para saltar
            </li>
            <li>Evita los obstáculos fiscales: facturas mal emitidas, plazos vencidos y errores contables</li>
            <li>Consigue puntos extra por mantener tus obligaciones fiscales al día</li>
            <li>La velocidad aumenta gradualmente, ¡mantente alerta!</li>
          </ul>
        </div>

        <div className="text-center">
          <Button asChild className="bg-navy-600 hover:bg-navy-700">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
