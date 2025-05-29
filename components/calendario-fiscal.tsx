"use client"

// Componente principal del Calendario Fiscal
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { EventoFiscal } from "@/components/evento-fiscal"
import { IOSCalendar } from "@/components/ios-calendar"
import { obtenerProximosEventos } from "@/lib/utils"
import type { TipoContribuyente } from "@/types"

export default function CalendarioFiscal() {
  const [tipoContribuyente, setTipoContribuyente] = useState<TipoContribuyente>("autonomos")
  const [iosCalendarOpen, setIosCalendarOpen] = useState(false)

  const proximosEventos = obtenerProximosEventos(tipoContribuyente)

  return (
    <>
      {/* Vista previa del calendario */}
      <div className="divide-y divide-gray-100">
        {proximosEventos.length > 0 ? (
          proximosEventos.map((evento) => <EventoFiscal key={evento.id} evento={evento} />)
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No hay próximos eventos fiscales</p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Próximas fechas importantes para {tipoContribuyente === "autonomos" ? "autónomos" : "sociedades"}
        </p>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTipoContribuyente(tipoContribuyente === "autonomos" ? "sociedades" : "autonomos")}
            className="text-xs"
          >
            Cambiar a {tipoContribuyente === "autonomos" ? "sociedades" : "autónomos"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIosCalendarOpen(true)} className="text-xs">
            Ver calendario completo
          </Button>
        </div>
      </div>

      {/* Calendario estilo iOS */}
      <IOSCalendar
        open={iosCalendarOpen}
        onClose={() => setIosCalendarOpen(false)}
        tipoContribuyente={tipoContribuyente}
      />
    </>
  )
}
