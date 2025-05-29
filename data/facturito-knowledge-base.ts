// Base de conocimiento para Facturito
export type KnowledgeEntry = {
  question: string
  answer: string
  keywords: string[]
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    question: "¿Esto cumple con lo que pide Hacienda o me meteré en líos?",
    answer:
      "Tranquilo, DINVBOX está 100% preparado para VeriFactu. Facturas legales, con QR y enviadas directo a Hacienda. Sin líos.",
    keywords: ["hacienda", "verifactu", "legal", "cumplimiento", "normativa", "líos", "facturas legales", "QR", "AEAT"],
  },
  {
    question: "¿La IA de DINVBOX de verdad me ayuda o es puro adorno?",
    answer:
      "¡Te ayuda de verdad! Le preguntas lo que sea de IVA, IRPF, recargo, y te lo explica fácil. Como tener un asesor contable al lado.",
    keywords: [
      "IA",
      "inteligencia artificial",
      "asistente",
      "ayuda",
      "asesor contable",
      "IVA",
      "IRPF",
      "recargo",
      "consultas fiscales",
    ],
  },
  {
    question: "¿Puedo hacer cualquier tipo de factura?",
    answer:
      "Sí: completas, simplificadas, rectificativas, recapitulativas… Lo que necesites para cumplir sin complicarte.",
    keywords: [
      "tipos de factura",
      "factura completa",
      "factura simplificada",
      "factura rectificativa",
      "factura recapitulativa",
    ],
  },
  {
    question: "¿Y si me equivoco en una factura? ¿Pierdo el envío VERI*FACTU?",
    answer:
      "El envío VERI*FACTU ya usado no se recupera, pero puedes corregirlo con una rectificativa. Y la IA te avisa antes de cometer errores.",
    keywords: [
      "error",
      "equivocación",
      "factura incorrecta",
      "rectificativa",
      "envío VERI*FACTU",
      "corrección",
      "prevención de errores",
    ],
  },
  {
    question: "¿Qué me incluye el envío VERI*FACTU que compro?",
    answer:
      "Cada envío VERI*FACTU te permite emitir una factura que cumple con VeriFactu y se envía directamente a la AEAT. También se guarda todo en la nube.",
    keywords: [
      "envío VERI*FACTU",
      "compra de envíos VERI*FACTU",
      "verifactu",
      "AEAT",
      "envío",
      "almacenamiento",
      "nube",
    ],
  },
  {
    question: "¿Esto me sirve si facturo desde el móvil?",
    answer: "¡Claro! Puedes usar DINVBOX desde el móvil o el ordenador. Factura donde quieras, cuando quieras.",
    keywords: ["móvil", "dispositivo", "facturación móvil", "ordenador", "multiplataforma", "accesibilidad"],
  },
  {
    question: "¿Mis datos están seguros o van a parar por ahí?",
    answer: "Tus datos están en servidores seguros y cifrados. Nadie mete mano, solo tú.",
    keywords: ["seguridad", "datos", "privacidad", "servidores", "cifrado", "protección de datos", "confidencialidad"],
  },
  {
    question: "¿Puedo guardar mis clientes y productos?",
    answer: "Sí, y además los tienes listos para no repetir datos cada vez. Ahorra tiempo y factura más rápido.",
    keywords: ["clientes", "productos", "almacenamiento", "base de datos", "ahorro de tiempo", "eficiencia"],
  },
  {
    question: "¿Y si mañana me quiero cambiar de plataforma? ¿Pierdo todo?",
    answer: "No, puedes exportar todas tus facturas en PDF o XML cuando quieras. Tú mandas.",
    keywords: ["cambio de plataforma", "exportación", "PDF", "XML", "portabilidad", "migración", "control de datos"],
  },
]

// Función para encontrar la respuesta más relevante
export function findBestMatch(query: string): string {
  query = query.toLowerCase()

  // Respuesta por defecto si no hay coincidencias
  const defaultResponse =
    "Lo siento, no entiendo completamente tu pregunta. ¿Podrías reformularla o preguntar sobre facturación electrónica, VeriFactu, o servicios de DINVBOX?"

  // Verificar saludos
  if (query.match(/hola|buenos días|buenas|saludos|hey/i)) {
    return "¡Hola! Soy Facturito, tu asistente virtual. ¿En qué puedo ayudarte hoy con temas de facturación electrónica o servicios de DINVBOX?"
  }

  // Buscar coincidencias en la base de conocimiento
  let bestMatch: KnowledgeEntry | null = null
  let highestScore = 0

  for (const entry of knowledgeBase) {
    let score = 0

    // Verificar coincidencias con palabras clave
    for (const keyword of entry.keywords) {
      if (query.includes(keyword.toLowerCase())) {
        score += 2 // Dar más peso a las palabras clave
      }
    }

    // Verificar coincidencias con la pregunta
    const questionWords = entry.question.toLowerCase().split(/\s+/)
    for (const word of questionWords) {
      if (word.length > 3 && query.includes(word.toLowerCase())) {
        score += 1
      }
    }

    if (score > highestScore) {
      highestScore = score
      bestMatch = entry
    }
  }

  // Verificar si hay una coincidencia suficientemente buena
  if (bestMatch && highestScore > 2) {
    return bestMatch.answer
  }

  // Respuestas genéricas basadas en temas comunes
  if (query.includes("precio") || query.includes("costo") || query.includes("tarifa") || query.includes("plan")) {
    return "Ofrecemos diferentes planes según las necesidades de tu empresa. Puedes consultar todos los detalles en nuestra sección de Precios o contactar con nuestro equipo para una cotización personalizada."
  }

  if (
    query.includes("registro") ||
    query.includes("cuenta") ||
    query.includes("empezar") ||
    query.includes("comenzar")
  ) {
    return "Puedes crear una cuenta gratuita en https://testing.dinvbox.es/login y comenzar a utilizar nuestros servicios inmediatamente."
  }

  if (
    query.includes("contacto") ||
    query.includes("ayuda") ||
    query.includes("soporte") ||
    query.includes("asistencia")
  ) {
    return "Nuestro equipo de soporte está disponible en contacto@dinvbox.es o al teléfono +34 644 783 622. También puedes visitar nuestra página de contacto para agendar una llamada."
  }

  return defaultResponse
}
