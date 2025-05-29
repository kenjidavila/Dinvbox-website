import { Badge } from "@/components/ui/badge"
import { type TipoContribuyente, type EventoFiscalType, eventosFiscales, formatearFecha } from "@/utils/fiscal"

// Función para obtener los próximos eventos
const obtenerProximosEventos = (tipo: TipoContribuyente, limite = 3): EventoFiscalType[] => {
  const hoy = new Date()
  // Establecer la hora a 0 para comparar solo fechas, no horas
  hoy.setHours(0, 0, 0, 0)

  return eventosFiscales
    .filter((evento) => {
      const fechaEvento = new Date(evento.fecha)
      fechaEvento.setHours(0, 0, 0, 0)
      return evento.tipo === tipo && fechaEvento >= hoy
    })
    .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
    .slice(0, limite)
}

// Función para verificar si un evento está próximo (dentro de los próximos 7 días)
const estaProximo = (fecha: Date): boolean => {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  const fechaEvento = new Date(fecha)
  fechaEvento.setHours(0, 0, 0, 0)
  const diferenciaDias = Math.ceil((fechaEvento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
  return diferenciaDias <= 7 && diferenciaDias >= 0
}

// Componente para un evento fiscal individual
const EventoFiscal = ({ evento }: { evento: EventoFiscalType }) => {
  const proximoEvento = estaProximo(evento.fecha)

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-lg">
      <div className="flex items-center">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 
            ${evento.urgente || proximoEvento ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}
        >
          <span className="font-semibold text-sm">{evento.fecha.getDate()}</span>
        </div>
        <div>
          <p className="font-medium text-navy-800">{evento.descripcion}</p>
          <p className="text-sm text-gray-500">{formatearFecha(evento.fecha)}</p>
        </div>
      </div>
      {(evento.urgente || proximoEvento) && (
        <Badge className="bg-red-100 text-red-600 border-red-200">{proximoEvento ? "Próximo" : "Urgente"}</Badge>
      )}
    </div>
  )
}
