// components/calendario-fiscal-data.tsx

// Función para crear fechas a partir de día/mes/año
const crearFecha = (dia: number, mes: number, año: number): Date => {
  const fecha = new Date(año, mes - 1, dia)
  // Establecer la hora a las 9:00 AM para evitar problemas con zonas horarias
  fecha.setHours(9, 0, 0, 0)
  return fecha
}

// Declaración de variables y tipos necesarios
const eventosFiscales: EventoFiscal[] = []
type EventoFiscal = {
  fecha: Date
  tipo: TipoModelo
  contribuyente: TipoContribuyente
}

type TipoContribuyente = {
  nombre: string
  tipo: string
}

type TipoModelo = {
  nombre: string
  modelo: string
}

// Asegurar que eventosFiscales se exporta correctamente
export { eventosFiscales }

// También exportar los tipos que faltan
export type { EventoFiscal, TipoContribuyente, TipoModelo }
