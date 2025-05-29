// Datos de ejemplo para eventos fiscales
// En una implementación real, estos datos se cargarían desde una base de datos
// y se actualizarían desde el panel de administración

// Tipos para los eventos fiscales
export type TipoContribuyente = "autonomos" | "sociedades"
export type TipoModelo =
  | "111"
  | "115"
  | "123"
  | "130"
  | "131"
  | "303"
  | "349"
  | "390"
  | "180"
  | "190"
  | "193"
  | "347"
  | "720"
  | "721"
  | "100"
  | "714"
  | "102"
  | "202"
  | "200"
  | "036"

export interface EventoFiscal {
  id: string
  fecha: Date
  descripcion: string
  modelo: TipoModelo
  tipo: TipoContribuyente
  urgente?: boolean
}

// Función para crear fechas a partir de día/mes/año
const crearFecha = (dia: number, mes: number, año: number): Date => {
  return new Date(año, mes - 1, dia)
}

// Datos de ejemplo para eventos fiscales
// En una implementación real, estos datos se cargarían desde una base de datos
// y se actualizarían desde el panel de administración
export const eventosFiscales: EventoFiscal[] = [
  // AUTÓNOMOS
  // Enero
  {
    id: "a-111-115-4t-2024",
    fecha: crearFecha(20, 1, 2025),
    descripcion: "Modelo 111 y 115 – Retenciones IRPF 4T 2024",
    modelo: "111",
    tipo: "autonomos",
    urgente: true,
  },
  {
    id: "a-130-131-4t-2024",
    fecha: crearFecha(30, 1, 2025),
    descripcion: "Modelo 130 y 131 – Pago fraccionado IRPF 4T 2024",
    modelo: "130",
    tipo: "autonomos",
  },
  {
    id: "a-303-4t-2024",
    fecha: crearFecha(30, 1, 2025),
    descripcion: "Modelo 303 – IVA 4T 2024",
    modelo: "303",
    tipo: "autonomos",
  },
  {
    id: "a-349-4t-2024",
    fecha: crearFecha(30, 1, 2025),
    descripcion: "Modelo 349 – Operaciones intracomunitarias 4T 2024",
    modelo: "349",
    tipo: "autonomos",
  },
  {
    id: "a-390-2024",
    fecha: crearFecha(31, 1, 2025),
    descripcion: "Modelo 390 – Resumen anual IVA 2024",
    modelo: "390",
    tipo: "autonomos",
  },
  {
    id: "a-180-2024",
    fecha: crearFecha(31, 1, 2025),
    descripcion: "Modelo 180 – Resumen anual alquileres",
    modelo: "180",
    tipo: "autonomos",
  },
  {
    id: "a-190-2024",
    fecha: crearFecha(31, 1, 2025),
    descripcion: "Modelo 190 – Resumen anual retenciones trabajo/profesionales",
    modelo: "190",
    tipo: "autonomos",
  },

  // Febrero
  {
    id: "a-347-2024",
    fecha: crearFecha(28, 2, 2025),
    descripcion: "Modelo 347 – Operaciones con terceros año 2024",
    modelo: "347",
    tipo: "autonomos",
  },

  // Marzo
  {
    id: "a-720-2024",
    fecha: crearFecha(31, 3, 2025),
    descripcion: "Modelo 720 – Bienes en el extranjero 2024",
    modelo: "720",
    tipo: "autonomos",
  },
  {
    id: "a-721-2024",
    fecha: crearFecha(31, 3, 2025),
    descripcion: "Modelo 721 – Criptomonedas en el extranjero 2024",
    modelo: "721",
    tipo: "autonomos",
  },

  // Abril
  {
    id: "a-130-131-1t-2025",
    fecha: crearFecha(21, 4, 2025),
    descripcion: "Modelos 130, 131 – Pago fraccionado 1T 2025",
    modelo: "130",
    tipo: "autonomos",
  },
  {
    id: "a-111-115-1t-2025",
    fecha: crearFecha(21, 4, 2025),
    descripcion: "Modelos 111, 115 – Retenciones IRPF 1T 2025",
    modelo: "111",
    tipo: "autonomos",
  },
  {
    id: "a-303-1t-2025",
    fecha: crearFecha(21, 4, 2025),
    descripcion: "Modelo 303 – IVA 1T 2025",
    modelo: "303",
    tipo: "autonomos",
  },
  {
    id: "a-349-1t-2025",
    fecha: crearFecha(21, 4, 2025),
    descripcion: "Modelo 349 – Operaciones intracomunitarias 1T 2025",
    modelo: "349",
    tipo: "autonomos",
  },

  // Junio
  {
    id: "a-domiciliacion-renta",
    fecha: crearFecha(25, 6, 2025),
    descripcion: "Fin de plazo para domiciliación Renta y Patrimonio",
    modelo: "100",
    tipo: "autonomos",
  },
  {
    id: "a-100-2024",
    fecha: crearFecha(30, 6, 2025),
    descripcion: "Modelo 100 – Declaración IRPF 2024",
    modelo: "100",
    tipo: "autonomos",
  },
  {
    id: "a-714-2024",
    fecha: crearFecha(30, 6, 2025),
    descripcion: "Modelo 714 – Declaración Patrimonio 2024",
    modelo: "714",
    tipo: "autonomos",
  },

  // Julio
  {
    id: "a-130-131-2t-2025",
    fecha: crearFecha(21, 7, 2025),
    descripcion: "Modelos 130, 131 – IRPF 2T 2025",
    modelo: "130",
    tipo: "autonomos",
  },
  {
    id: "a-111-115-2t-2025",
    fecha: crearFecha(21, 7, 2025),
    descripcion: "Modelos 111, 115 – Retenciones IRPF 2T 2025",
    modelo: "111",
    tipo: "autonomos",
  },
  {
    id: "a-303-2t-2025",
    fecha: crearFecha(21, 7, 2025),
    descripcion: "Modelo 303 – IVA 2T 2025",
    modelo: "303",
    tipo: "autonomos",
  },
  {
    id: "a-349-2t-2025",
    fecha: crearFecha(21, 7, 2025),
    descripcion: "Modelo 349 – Operaciones intracomunitarias 2T 2025",
    modelo: "349",
    tipo: "autonomos",
  },

  // Octubre
  {
    id: "a-130-131-3t-2025",
    fecha: crearFecha(20, 10, 2025),
    descripcion: "Modelos 130, 131 – IRPF 3T 2025",
    modelo: "130",
    tipo: "autonomos",
  },
  {
    id: "a-111-115-3t-2025",
    fecha: crearFecha(20, 10, 2025),
    descripcion: "Modelos 111, 115 – Retenciones IRPF 3T 2025",
    modelo: "111",
    tipo: "autonomos",
  },
  {
    id: "a-303-3t-2025",
    fecha: crearFecha(20, 10, 2025),
    descripcion: "Modelo 303 – IVA 3T 2025",
    modelo: "303",
    tipo: "autonomos",
  },
  {
    id: "a-349-3t-2025",
    fecha: crearFecha(20, 10, 2025),
    descripcion: "Modelo 349 – Operaciones intracomunitarias 3T 2025",
    modelo: "349",
    tipo: "autonomos",
  },

  // Noviembre
  {
    id: "a-102-2025",
    fecha: crearFecha(5, 11, 2025),
    descripcion: "Modelo 102 – Segundo pago fraccionado IRPF (si fraccionó la Renta)",
    modelo: "102",
    tipo: "autonomos",
  },

  // SOCIEDADES
  // Enero
  {
    id: "s-111-115-123-4t-2024",
    fecha: crearFecha(20, 1, 2025),
    descripcion: "Modelos 111, 115, 123 – Retenciones 4T 2024",
    modelo: "111",
    tipo: "sociedades",
    urgente: true,
  },
  {
    id: "s-303-4t-2024",
    fecha: crearFecha(30, 1, 2025),
    descripcion: "Modelo 303 – IVA 4T 2024",
    modelo: "303",
    tipo: "sociedades",
  },
  {
    id: "s-349-4t-2024",
    fecha: crearFecha(30, 1, 2025),
    descripcion: "Modelo 349 – Operaciones intracomunitarias 4T 2024",
    modelo: "349",
    tipo: "sociedades",
  },
  {
    id: "s-390-2024",
    fecha: crearFecha(31, 1, 2025),
    descripcion: "Modelo 390 – Resumen anual IVA 2024",
    modelo: "390",
    tipo: "sociedades",
  },
  {
    id: "s-180-190-193-2024",
    fecha: crearFecha(31, 1, 2025),
    descripcion: "Modelos 180, 190, 193 – Resúmenes anuales retenciones",
    modelo: "180",
    tipo: "sociedades",
  },

  // Febrero
  {
    id: "s-347-2024",
    fecha: crearFecha(28, 2, 2025),
    descripcion: "Modelo 347 – Operaciones con terceros 2024",
    modelo: "347",
    tipo: "sociedades",
  },
  {
    id: "s-036-2025",
    fecha: crearFecha(28, 2, 2025),
    descripcion: "Modelo 036 – Opción/renuncia cálculo pagos fraccionados IS",
    modelo: "036",
    tipo: "sociedades",
  },

  // Marzo
  {
    id: "s-720-2024",
    fecha: crearFecha(31, 3, 2025),
    descripcion: "Modelo 720 – Bienes en el extranjero 2024",
    modelo: "720",
    tipo: "sociedades",
  },
  {
    id: "s-721-2024",
    fecha: crearFecha(31, 3, 2025),
    descripcion: "Modelo 721 – Criptomonedas en el extranjero 2024",
    modelo: "721",
    tipo: "sociedades",
  },

  // Abril
  {
    id: "s-202-1p-2025",
    fecha: crearFecha(21, 4, 2025),
    descripcion: "Modelo 202 – Pago fraccionado IS (1.º plazo)",
    modelo: "202",
    tipo: "sociedades",
  },
  {
    id: "s-111-115-123-1t-2025",
    fecha: crearFecha(21, 4, 2025),
    descripcion: "Modelos 111, 115, 123 – Retenciones 1T 2025",
    modelo: "111",
    tipo: "sociedades",
  },
  {
    id: "s-303-1t-2025",
    fecha: crearFecha(21, 4, 2025),
    descripcion: "Modelo 303 – IVA 1T 2025",
    modelo: "303",
    tipo: "sociedades",
  },
  {
    id: "s-349-1t-2025",
    fecha: crearFecha(21, 4, 2025),
    descripcion: "Modelo 349 – Operaciones intracomunitarias 1T 2025",
    modelo: "349",
  },

  // Julio
  {
    id: "s-111-115-123-2t-2025",
    fecha: crearFecha(21, 7, 2025),
    descripcion: "Modelos 111, 115, 123 – Retenciones 2T 2025",
    modelo: "111",
    tipo: "sociedades",
  },
  {
    id: "s-303-2t-2025",
    fecha: crearFecha(21, 7, 2025),
    descripcion: "Modelo 303 – IVA 2T 2025",
    modelo: "303",
    tipo: "sociedades",
  },
  {
    id: "s-349-2t-2025",
    fecha: crearFecha(21, 7, 2025),
    descripcion: "Modelo 349 – Operaciones intracomunitarias 2T 2025",
    modelo: "349",
    tipo: "sociedades",
  },
  {
    id: "s-200-2024",
    fecha: crearFecha(25, 7, 2025),
    descripcion: "Modelo 200 – Impuesto sobre Sociedades 2024",
    modelo: "200",
    tipo: "sociedades",
  },

  // Octubre
  {
    id: "s-202-2p-2025",
    fecha: crearFecha(20, 10, 2025),
    descripcion: "Modelo 202 – Pago fraccionado IS (2.º plazo)",
    modelo: "202",
    tipo: "sociedades",
  },
  {
    id: "s-111-115-123-3t-2025",
    fecha: crearFecha(20, 10, 2025),
    descripcion: "Modelos 111, 115, 123 – Retenciones 3T 2025",
    modelo: "111",
    tipo: "sociedades",
  },
  {
    id: "s-303-3t-2025",
    fecha: crearFecha(20, 10, 2025),
    descripcion: "Modelo 303 – IVA 3T 2025",
    modelo: "303",
    tipo: "sociedades",
  },
  {
    id: "s-349-3t-2025",
    fecha: crearFecha(20, 10, 2025),
    descripcion: "Modelo 349 – Operaciones intracomunitarias 3T 2025",
    modelo: "349",
    tipo: "sociedades",
  },

  // Diciembre
  {
    id: "s-202-3p-2025",
    fecha: crearFecha(22, 12, 2025),
    descripcion: "Modelo 202 – Pago fraccionado IS (3.º plazo)",
    modelo: "202",
    tipo: "sociedades",
  },
]
