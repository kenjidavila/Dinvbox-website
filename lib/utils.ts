import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { eventosFiscales, type EventoFiscal, type TipoContribuyente } from "@/components/calendario-fiscal-data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Función para obtener los próximos eventos fiscales
export function obtenerProximosEventos(tipoContribuyente: TipoContribuyente = "autonomos", limite = 5): EventoFiscal[] {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0) // Establecer a inicio del día para comparación correcta

  return eventosFiscales
    .filter((evento) => {
      // Solo eventos futuros o de hoy
      const fechaEvento = new Date(evento.fecha)
      fechaEvento.setHours(0, 0, 0, 0)
      return fechaEvento >= hoy && evento.tipo === tipoContribuyente
    })
    .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
    .slice(0, limite)
}

// Función para verificar si un evento es próximo (dentro de los próximos 7 días)
export function esEventoProximo(fecha: Date): boolean {
  const hoy = new Date()
  const fechaLimite = new Date()
  fechaLimite.setDate(hoy.getDate() + 7)

  return fecha >= hoy && fecha <= fechaLimite
}

// Función para obtener el número de días restantes hasta un evento
export function diasHastaEvento(fecha: Date): number {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  const fechaEvento = new Date(fecha)
  fechaEvento.setHours(0, 0, 0, 0)

  const diferencia = fechaEvento.getTime() - hoy.getTime()
  return Math.ceil(diferencia / (1000 * 60 * 60 * 24))
}
