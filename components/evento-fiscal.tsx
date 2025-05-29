// components/evento-fiscal.tsx
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export interface EventoFiscal {
  id: string
  fecha: Date
  descripcion: string
  modelo: string
  tipo: "autonomos" | "sociedades"
  urgente?: boolean
}

interface EventoFiscalProps {
  evento: EventoFiscal
  className?: string
}

export function EventoFiscal({ evento, className = "" }: EventoFiscalProps) {
  const diasRestantes = Math.ceil((evento.fecha.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div
      className={`p-4 rounded-lg border ${evento.urgente ? "border-red-200 bg-red-50" : "border-orange-200 bg-orange-50"} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">
              {format(evento.fecha, "d 'de' MMMM, yyyy", { locale: es })}
            </span>
            {diasRestantes <= 7 && (
              <Badge variant={evento.urgente ? "destructive" : "secondary"} className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {diasRestantes === 0 ? "Hoy" : diasRestantes === 1 ? "Mañana" : `${diasRestantes} días`}
              </Badge>
            )}
          </div>

          <h3 className="font-medium text-gray-900 mb-1">{evento.descripcion}</h3>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Modelo {evento.modelo}
            </Badge>
            <Badge variant="outline" className="text-xs capitalize">
              {evento.tipo}
            </Badge>
          </div>
        </div>

        {evento.urgente && (
          <Badge variant="destructive" className="ml-2">
            Urgente
          </Badge>
        )}
      </div>
    </div>
  )
}

export default EventoFiscal
