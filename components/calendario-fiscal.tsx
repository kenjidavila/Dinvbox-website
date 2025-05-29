"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import IOSCalendar from "@/components/ios-calendar"

// Importamos los tipos y datos del calendario fiscal
import {
  eventosFiscales,
  type EventoFiscal as EventoFiscalType,
  type TipoContribuyente,
} from "@/components/calendario-fiscal-data"

// Función para obtener los próximos eventos
const obtenerProximosEventos = (tipo: TipoContribuyente, limite = 3): EventoFiscalType[] => {
  const hoy = new Date()
  return eventosFiscales
    .filter((evento) => evento.tipo === tipo && evento.fecha >= hoy)
    .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
    .slice(0, limite)
}

// Función para formatear la fecha en español
const formatearFecha = (fecha: Date): string => {
  const opciones: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
  }
  return fecha.toLocaleDateString("es-ES", opciones)
}

// Función para verificar si un evento está vencido
const estaVencido = (fecha: Date): boolean => {
  const hoy = new Date()
  // Establecer las horas, minutos, segundos y milisegundos a 0 para comparar solo fechas
  hoy.setHours(0, 0, 0, 0)
  const fechaEvento = new Date(fecha)
  fechaEvento.setHours(0, 0, 0, 0)
  return fechaEvento < hoy
}

// Componente para un evento fiscal individual
const EventoFiscal = ({ evento }: { evento: EventoFiscalType }) => {
  const vencido = estaVencido(evento.fecha)
  const estaProximo = (): boolean => {
    const hoy = new Date()
    const diferenciaDias = Math.ceil((evento.fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
    return diferenciaDias <= 7 && diferenciaDias >= 0
  }

  return (
    <div
      className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-lg ${vencido ? "bg-gray-50" : ""}`}
    >
      <div className="flex items-center">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 
            ${
              vencido
                ? "bg-gray-100 text-gray-500"
                : evento.urgente || estaProximo()
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
            }`}
        >
          <span className="font-semibold text-sm">{evento.fecha.getDate()}</span>
        </div>
        <div>
          <p className={`font-medium ${vencido ? "text-gray-500" : "text-navy-800"}`}>{evento.descripcion}</p>
          <p className="text-sm text-gray-500">{formatearFecha(evento.fecha)}</p>
        </div>
      </div>
      {vencido ? (
        <Badge className="bg-gray-100 text-gray-600 border-gray-200">Vencido</Badge>
      ) : (
        (evento.urgente || estaProximo()) && (
          <Badge className="bg-red-100 text-red-600 border-red-200">{estaProximo() ? "Próximo" : "Urgente"}</Badge>
        )
      )}
    </div>
  )
}

// Componente principal del Calendario Fiscal
export default function CalendarioFiscal() {
  const [modalAbierto, setModalAbierto] = useState(false)
  const [iosCalendarOpen, setIosCalendarOpen] = useState(false)
  const [tipoContribuyente, setTipoContribuyente] = useState<TipoContribuyente>("autonomos")

  const proximosEventos = obtenerProximosEventos(tipoContribuyente)

  return (
    <>
      {/* Vista previa del calendario */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <h3 className="text-lg font-semibold text-navy-900 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-orange-500" />
            Próximas fechas importantes
          </h3>
          <Button variant="outline" size="sm" className="text-sm" onClick={() => setIosCalendarOpen(true)}>
            Ver calendario completo
          </Button>
        </div>

        <div className="divide-y divide-gray-100">
          {proximosEventos.map((evento) => (
            <EventoFiscal key={evento.id} evento={evento} />
          ))}
        </div>

        <div className="bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-600">
            DINVBOX te enviará recordatorios automáticos para que nunca te pierdas una fecha importante
          </p>
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
