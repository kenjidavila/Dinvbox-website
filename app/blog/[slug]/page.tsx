"use client"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Facebook, Twitter, Linkedin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Datos de ejemplo para los artículos del blog
const blogPosts = [
  {
    id: "digitalizacion-y-cumplimiento",
    slug: "digitalizacion-y-cumplimiento-la-nueva-era-de-la-facturacion",
    title: "Digitalización Y Cumplimiento: La Nueva Era De La Facturación Electrónica Española",
    excerpt:
      "En un mundo cada vez más interconectado, la digitalización no es solo una herramienta, sino una revolución que redefine las reglas del juego económico.",
    date: "10 ENERO, 2025",
    readTime: "5 min",
    image: "/images/blog/digitalizacion-facturacion.jpg",
    category: "TECH",
    author: {
      name: "María Rodríguez",
      role: "Especialista en Facturación Electrónica",
      avatar: "/images/team/maria-rodriguez.png",
    },
    content: `
      <p>En un mundo cada vez más interconectado, la digitalización no es solo una herramienta, sino una revolución que redefine las reglas del juego económico.</p>
      
      <p>En América Latina, México se ha convertido en un referente internacional en la implementación de la facturación electrónica. Con la introducción del Comprobante Fiscal Digital por Internet (CFDI) en 2011, el país logró reducir la evasión fiscal en un 48% para 2020, según cifras del Servicio de Administración Tributaria (SAT).</p>
      
      <p>Además, este modelo permitió al gobierno incrementar la recaudación fiscal en más de 300 mil millones de pesos en su primer quinquenio, un retorno que subraya el costo-beneficio de la fiscalización electrónica.</p>
      
      <p>La experiencia mexicana demuestra que la tecnología puede ser un aliado crucial en la lucha contra el fraude fiscal. La obligación de emitir facturas electrónicas, combinada con sistemas de validación en tiempo real, ha permitido a las autoridades tributarias controlar mejor las transacciones económicas y reducir el margen para irregularidades. Este modelo no solo beneficia a las arcas públicas, sino que también genera confianza en el mercado y nivelación de condiciones entre empresas.</p>
      
      <h2>De México a Europa: Un Contexto Global</h2>
      
      <p>Mientras que México lidera en América Latina, en Europa se observa un movimiento similar hacia la digitalización fiscal. Italia, por ejemplo, implementó la facturación electrónica obligatoria en 2019, y en países como Francia y Alemania se están desarrollando sistemas similares. En este contexto global, España no se queda atrás. La adopción de la facturación electrónica es un paso firme hacia la modernización fiscal y el cumplimiento de compromisos internacionales, como los Objetivos de Desarrollo Sostenible (ODS) de la Agenda 2030.</p>
      
      <h2>España: Hacia una Fiscalización Digital</h2>
      
      <p>En España, el SII (Suministro Inmediato de Información) se ha convertido en una herramienta clave para la lucha contra la evasión fiscal. Este sistema, que obliga a las grandes empresas a reportar sus operaciones en tiempo real a la Agencia Tributaria, ha consolidado la facturación electrónica como un pilar de la fiscalización moderna. Según datos del Ministerio de Hacienda, el SII contribuyó a un incremento del 4,1% en la recaudación tributaria durante su primer año de operación. Además, estudios estiman que la digitalización fiscal podría generar ahorros y mejoras en la recaudación de hasta 15 mil millones de euros anuales, optimizando la gestión de recursos públicos.</p>
      
      <p>La transición hacia la facturación electrónica también responde a la necesidad de modernizar los sistemas administrativos y facilitar la integración con plataformas europeas. La obligatoriedad para pymes y autónomos, prevista para 2025, marcará un nuevo hito en el camino hacia la digitalización total del sistema fiscal español.</p>
      
      <h2>Un Pilar para la Transparencia y el Futuro</h2>
      
      <p>La digitalización fiscal es una tendencia irreversible que refuerza la transparencia, la eficiencia y la sostenibilidad. La experiencia de México como pionero y el avance de España en este ámbito reflejan un compromiso global por combatir la evasión fiscal y modernizar los sistemas tributarios. En un mundo que demanda soluciones tecnológicas y sostenibles, la facturación electrónica se consolida como un pilar fundamental de la nueva era de la fiscalización digital.</p>
    `,
  },
  {
    id: "mexico-espana-cercanos",
    slug: "mexico-y-espana-mas-cercanos-que-nunca",
    title: "México y España: Más Cercanos Que Nunca",
    excerpt:
      "En pleno siglo XXI, México y España han afianzado una relación estratégica que va mucho más allá de lo económico, cimentada en una historia común.",
    date: "16 ENERO, 2025",
    readTime: "6 min",
    image: "/images/blog/mexico-espana-cercanos.jpg",
    category: "Internacional",
    author: {
      name: "Carlos Jiménez",
      role: "Consultor Internacional",
      avatar: "/images/team/carlos-jimenez.png",
    },
    content: `
      <p>En pleno siglo XXI, México y España han afianzado una relación estratégica que va mucho más allá de lo económico, cimentada en una historia común, vínculos culturales profundos y una visión compartida de futuro. Con cifras récord en comercio e inversión, ambos países se posicionan como socios estratégicos en un mundo cada vez más interconectado.</p>
      
      <h2>Una alianza comercial en plena expansión</h2>
      
      <p>España es actualmente el segundo mayor inversor en México, con más de 7.000 empresas de capital español registradas y una inversión directa acumulada que supera los 81.243 millones de dólares desde 1999 hasta 2023. En este mismo periodo, el comercio bilateral ha mostrado una evolución destacada: en 2023, las exportaciones españolas a México alcanzaron un récord histórico de 5.605 millones de euros, consolidando a México como el principal destino de exportaciones españolas en América Latina y el séptimo mercado más relevante fuera de Europa.</p>
      
      <p>México, por su parte, exportó bienes a España por un total de 5.623 millones de euros en 2023. Los productos energéticos, especialmente el petróleo crudo, representaron el 60% de estas exportaciones, mientras que los sectores automovilístico y agroalimentario también jugaron un papel destacado. Además, el comercio de servicios entre ambos países sigue creciendo: España exportó servicios a México por valor de 3.537 millones de euros, un 35% más que en 2022, y las importaciones españolas de servicios mexicanos alcanzaron los 1.275 millones de euros, recuperando niveles previos a la pandemia.</p>
      
      <h2>Un puente entre continentes</h2>
      
      <p>La colaboración entre España y México va mucho más allá del comercio. México, por su ubicación estratégica, se ha convertido en la puerta de entrada para empresas españolas que buscan acceder a los mercados de Estados Unidos y Canadá a través del T-MEC, mientras que España ofrece a México una plataforma privilegiada para expandirse por Europa y el Mediterráneo.</p>
      
      <p>El fenómeno del nearshoring ha reforzado esta conexión: en los últimos años, más de 500 empresas internacionales, incluidas Tesla, Apple, BMW y BYD, han trasladado parte de su producción a México, atraídas por su proximidad a Norteamérica y las ventajas arancelarias del T-MEC. Este movimiento ofrece múltiples oportunidades tanto para la inversión como para el comercio bilateral.</p>
      
      <h2>Un pasado compartido y un futuro prometedor</h2>
      
      <p>La relación entre México y España tiene profundas raíces históricas y culturales. A lo largo de los siglos, las oleadas migratorias de españoles a México han contribuido a construir una sólida comunidad y han dado lugar a la creación de empresas emblemáticas como Grupo Bimbo o Soriana, que hoy son referentes internacionales.</p>
      
      <p>Además, la modernización del Acuerdo Global UE-México, actualmente en proceso de ratificación, abrirá nuevas oportunidades en sectores estratégicos. Este acuerdo no solo refuerza la cooperación económica, sino que también incorpora objetivos de sostenibilidad, protección de inversiones y liberalización del comercio agropecuario, lo que promete una mayor integración y desarrollo para ambas partes.</p>
      
      <h2>Retos comunes, soluciones compartidas</h2>
      
      <p>A pesar de los avances, persisten retos importantes. México debe mejorar infraestructuras clave como las de transporte, agua y energía para atender la creciente demanda industrial. Por su parte, ambos países comparten el desafío de avanzar hacia una economía más sostenible, incorporando prácticas responsables en sus cadenas de suministro y reduciendo la huella de carbono.</p>
      
      <h2>Una alianza estratégica para el futuro</h2>
      
      <p>México y España no solo comparten cifras positivas en comercio e inversión; su relación es un ejemplo de cooperación y entendimiento mutuo que trasciende fronteras. En un mundo marcado por la incertidumbre, esta alianza se presenta como un modelo de estabilidad y progreso, donde historia y modernidad se entrelazan para construir un futuro compartido más cercano que nunca.</p>
    `,
  },
  {
    id: "facturacion-electronica-mexico-espana",
    slug: "por-que-la-facturacion-electronica-es-esencial-para-tu-expansion-mexico-espana",
    title: "¿Por Qué La Facturación Electrónica Es Esencial Para Tu Expansión México-España?",
    excerpt:
      "La facturación electrónica ha dejado de ser una tendencia para convertirse en un requisito indispensable para empresas que operan entre México y España.",
    date: "14 FEBRERO, 2025",
    readTime: "7 min",
    image: "/images/blog/facturacion-mexico-espana.jpg",
    category: "Internacional",
    author: {
      name: "Laura Sánchez",
      role: "Asesora Fiscal",
      avatar: "/images/team/laura-sanchez.png",
    },
    content: `
      <p>La globalización y el avance tecnológico han hecho que las economías se digitalicen a pasos agigantados. En este contexto, la facturación electrónica ha dejado de ser una tendencia para convertirse en un requisito indispensable en muchas latitudes. México y España no han sido la excepción. Si tu empresa busca expandirse de España a México o viceversa, entender y cumplir con las normativas de facturación electrónica en ambos países es clave para operar sin contratiempos y garantizar el cumplimiento fiscal.</p>
      
      <h2>México: Pionero en Facturación Electrónica</h2>
      
      <p>México fue uno de los primeros países en adoptar la facturación electrónica como un estándar obligatorio, estableciendo el CFDI (Comprobante Fiscal Digital por Internet) como su modelo en 2011. Este sistema no solo permitió modernizar los procesos fiscales, sino que también combatió la evasión tributaria y ofreció mayor transparencia. Su éxito ha sido un ejemplo para otros países y hoy en día el CFDI se considera uno de los modelos más avanzados a nivel global.</p>
      
      <h2>España: Uniendo Caminos en el Mundo Digital</h2>
      
      <p>España, aunque comenzó un poco más tarde, está avanzando rápidamente hacia la adopción total de la facturación electrónica. La modalidad VERI*FACTU próxima a implementarse en este 2025, basada en archivos XML, está alineada con estándares internacionales y resulta ser muy similar al modelo mexicano. Estas similitudes entre ambos países, como el uso del mismo tipo de archivo XML y las normativas que priorizan la digitalización, hacen que la transición sea más fluida para empresas que operan en ambos mercados.</p>
      
      <h2>La Importancia de un Proveedor de Facturación con Experiencia Binacional</h2>
      
      <p>Tener un proveedor de facturación electrónica con experiencia en México y España es crucial para garantizar que tu negocio cumpla con las normativas en ambos países. Este aliado estratégico te ayudará a comprender las particularidades de cada sistema, evitar errores comunes y, sobre todo, agilizar la integración de tus operaciones financieras.</p>
      
      <h2>Ventajas de la Facturación Electrónica</h2>
      
      <p>Implementar la facturación electrónica en tu empresa no solo es un tema de cumplimiento, sino también de competitividad. Entre los beneficios más destacados se encuentran:</p>
      
      <ol>
        <li>Manejo eficiente de datos: Agiliza el almacenamiento y recuperación de información clave.</li>
        <li>Cumplimiento tributario garantizado: Reduce riesgos de errores y multas al cumplir automáticamente con los estándares fiscales.</li>
        <li>Reducción de costos operativos: Menor uso de papel y optimización de recursos humanos en tareas administrativas.</li>
        <li>Mayor transparencia: Facilita la auditoría interna y externa.</li>
      </ol>
      
      <h2>¿Qué pasa si no cumples?</h2>
      
      <p>No adaptarse a los estándares de facturación electrónica puede tener graves consecuencias para tu negocio:</p>
      
      <ul>
        <li>Multas significativas: En México y España, las sanciones por incumplimiento pueden ser altas, impactando directamente en el patrimonio de tu empresa.</li>
        <li>Pérdida de clientes: Sin facturas válidas, tus operaciones comerciales pueden verse interrumpidas.</li>
        <li>Pérdida de credibilidad: La falta de cumplimiento genera desconfianza entre tus socios y clientes.</li>
      </ul>
      
      <h2>Expande tu negocio sin preocupaciones</h2>
      
      <p>La facturación electrónica no solo es un requisito, sino una oportunidad para optimizar y modernizar tus procesos financieros. Si buscas expandir tu negocio entre México y España, contáctanos. Te ayudaremos a implementar una solución de facturación que cumpla con las normativas y te permita concentrarte en lo que mejor haces: crecer.</p>
      
      <p>¡El futuro es digital, y tu empresa también puede serlo!</p>
    `,
  },
  {
    id: "facturacion-electronica-espana",
    slug: "facturacion-electronica-en-espana-que-debes-saber-para-operar-sin-errores",
    title: "Facturación Electrónica En España: ¿Que Debes Saber Para Operar Sin Errores?",
    excerpt:
      "Guía completa sobre los requisitos legales y mejores prácticas para la facturación electrónica en España.",
    date: "21 MARZO, 2025",
    readTime: "6 min",
    image: "/images/blog/facturacion-espana.jpg",
    category: "Normativa",
    author: {
      name: "Laura Sánchez",
      role: "Asesora Fiscal",
      avatar: "/images/team/laura-sanchez.png",
    },
    content: `
      <p>La facturación electrónica en España está experimentando una transformación significativa, impulsada por nuevas normativas y la digitalización del entorno empresarial. Comprender los requisitos actuales y futuros es esencial para cualquier empresa que opere en el mercado español.</p>
      
      <h2>Marco legal actual</h2>
      
      <p>El ecosistema normativo español en materia de facturación electrónica se basa en varias disposiciones clave:</p>
      
      <ul>
        <li>Ley 25/2013, que establece la obligatoriedad de la factura electrónica en las relaciones con el sector público</li>
        <li>Real Decreto 1619/2012, que regula las obligaciones de facturación</li>
        <li>Ley 11/2021 de medidas de prevención y lucha contra el fraude fiscal</li>
        <li>Directiva 2014/55/UE sobre facturación electrónica en la contratación pública</li>
      </ul>
      
      <h2>Requisitos técnicos esenciales</h2>
      
      <p>Para que una factura electrónica sea válida en España, debe cumplir con los siguientes requisitos:</p>
      
      <ol>
        <li>Formato estructurado (XML) según la especificación Factura-e</li>
        <li>Firma electrónica avanzada basada en certificado reconocido</li>
        <li>Inclusión de todos los elementos obligatorios según la normativa fiscal</li>
        <li>Transmisión y conservación que garantice integridad, autenticidad y legibilidad</li>
        <li>Conservación durante el periodo de prescripción fiscal (4 años)</li>
      </ol>
      
      <h2>El Sistema Inmediato de Información (SII)</h2>
      
      <p>El SII representa uno de los avances más significativos en la digitalización fiscal española. Este sistema obliga a determinados contribuyentes a suministrar los registros de facturación a la AEAT en un plazo de cuatro días hábiles.</p>
      
      <p>Están obligados al SII:</p>
      
      <ul>
        <li>Grandes empresas (facturación superior a 6 millones de euros)</li>
        <li>Grupos de IVA</li>
        <li>Inscritos en el REDEME (Registro de Devolución Mensual del IVA)</li>
        <li>Quienes opten voluntariamente por este sistema</li>
      </ul>
      
      <h2>Cambios normativos en el horizonte</h2>
      
      <p>España está avanzando hacia la generalización de la facturación electrónica en todas las relaciones empresariales. La reciente Ley 18/2022 establece un calendario para la implementación obligatoria de la facturación electrónica en el sector privado:</p>
      
      <ul>
        <li>Empresas con facturación superior a 8 millones de euros: obligatoriedad a partir de 2024</li>
        <li>Resto de empresas y autónomos: obligatoriedad a partir de 2025</li>
      </ul>
      
      <p>Este cambio normativo supondrá una transformación radical en la forma de facturar en España, afectando a más de 3 millones de empresas y autónomos.</p>
      
      <h2>Mejores prácticas para evitar errores</h2>
      
      <p>Para garantizar el cumplimiento normativo y evitar sanciones, recomendamos:</p>
      
      <ol>
        <li>Implementar soluciones tecnológicas homologadas y actualizadas</li>
        <li>Formar adecuadamente al personal involucrado en procesos de facturación</li>
        <li>Establecer controles internos para verificar el cumplimiento</li>
        <li>Realizar auditorías periódicas de los sistemas de facturación</li>
        <li>Mantenerse informado sobre cambios normativos a través de fuentes oficiales</li>
      </ol>
      
      <h2>Beneficios más allá del cumplimiento</h2>
      
      <p>Más allá de evitar sanciones, la correcta implementación de la facturación electrónica ofrece ventajas competitivas:</p>
      
      <ul>
        <li>Reducción de costes administrativos hasta en un 80%</li>
        <li>Aceleración de ciclos de cobro</li>
        <li>Mejora en la trazabilidad de operaciones</li>
        <li>Reducción de errores en la gestión documental</li>
        <li>Contribución a la sostenibilidad medioambiental</li>
      </ul>
      
      <p>La facturación electrónica en España no es solo una obligación legal, sino una oportunidad para modernizar procesos y ganar eficiencia operativa. Las empresas que se adapten proactivamente a este nuevo paradigma estarán mejor posicionadas en un mercado cada vez más digital y competitivo.</p>
    `,
  },
  {
    id: "futuro-facturacion-electronica",
    slug: "el-futuro-de-la-facturacion-electronica-tendencias-para-2026",
    title: "El Futuro De La Facturación Electrónica: Tendencias Para 2026",
    excerpt:
      "En DINVBOX sabemos que para ti lo importante es hacer crecer tu negocio, no perderte entre trámites y normativas. Por eso, te explicamos de forma clara la nueva obligación de facturación electrónica entre empresas (B2B) en España.",
    date: "10 ABRIL, 2025",
    readTime: "6 min",
    image: "/images/blog/facturacion-electronica-2026.jpeg",
    category: "Innovación",
    author: {
      name: "Laura Sánchez",
      role: "Asesora Fiscal",
      avatar: "/images/team/laura-sanchez.png",
    },
    content: `
      <p>En DINVBOX sabemos que para ti lo importante es hacer crecer tu negocio, no perderte entre trámites y normativas. Por eso, te explicamos de forma clara la nueva obligación de facturación electrónica entre empresas (B2B) en España y cómo te ayudaremos a cumplirla fácilmente, sin errores y con el respaldo de nuestra IA Tributaria "Facturito".</p>
      
      <h2>¿Qué está pasando?</h2>
      
      <p>El Ministerio de Asuntos Económicos ha publicado el segundo borrador del Real Decreto que obligará a usar factura electrónica en todas las transacciones B2B. La novedad es que ahora se fija el calendario a partir de la publicación de una Orden Técnica Ministerial con los detalles técnicos, no desde el BOE.</p>
      
      <h2>¿Cuándo será obligatorio?</h2>
      
      <p>Todo depende de cuánto facture tu empresa:</p>
      
      <p><strong>Si facturas más de 8 millones de euros al año:</strong></p>
      
      <ul>
        <li>En 12 meses desde la publicación de la Orden Técnica, deberás emitir facturas electrónicas y reportar su estado.</li>
        <li>Durante el primer año, tendrás que enviar también un PDF con la factura, salvo que tu cliente renuncie a ello.</li>
      </ul>
      
      <p><strong>Si facturas menos de 8 millones de euros:</strong></p>
      
      <ul>
        <li>En 24 meses será obligatoria la factura electrónica.</li>
        <li>En 36 meses, deberás reportar el estado de cada factura (aceptada, rechazada, cobrada, etc.).</li>
      </ul>
      
      <p>Con DINVBOX, tu sistema ya estará preparado desde el primer día. Nuestra plataforma emite, guarda y reporta cada factura automáticamente, cumpliendo con todos los requisitos legales.</p>
      
      <h2>¿Qué más cambia?</h2>
      
      <ul>
        <li>El formato UBL será obligatorio en el repositorio público (también se aceptarán Facturae, EDIFACT y CII).</li>
        <li>Se podrán ampliar los formatos según la innovación del sector o su uso generalizado.</li>
        <li>El plazo de pago se calculará desde la fecha de operación, si está incluida en la factura.</li>
        <li>Se prevé la creación de una herramienta gratuita para emitir e-facturas, aunque sin comparación con la solución completa que te ofrece DINVBOX.</li>
      </ul>
      
      <h2>¿Cómo funcionará el sistema?</h2>
      
      <ol>
        <li>Tú (o tu asesoría) emites la factura desde DINVBOX.</li>
        <li>La plataforma la remite al cliente y al sistema público, en el formato exigido (UBL).</li>
        <li>El cliente tiene 4 días naturales para aceptar, rechazar o confirmar el pago.</li>
        <li>Todo queda trazado y validado.</li>
      </ol>
      
      <h2>Con DINVBOX estás un paso adelante</h2>
      
      <p>Nuestra IA Facturito te alerta si algo falta, genera XML en todos los formatos oficiales (UBL, Facturae, EDIFACT) y te guía paso a paso para no fallar nunca ante Hacienda.</p>
      
      <h2>¿Quieres estar listo para esta nueva era digital?</h2>
      
      <p>Contáctanos y deja que DINVBOX te ayude a cumplir, crecer y avanzar.</p>
    `,
  },
  {
    id: "verifactu-guia",
    slug: "verifactu-se-acerca-lo-que-todo-emprendedor-y-autonomo-debe-saber",
    title: "VeriFactu se acerca: lo que todo emprendedor y autónomo debe saber para adaptarse sin líos",
    excerpt:
      "En DINVBOX sabemos que muchos negocios aún no están listos para la llegada de VeriFactu. Pero también sabemos que esta transformación es una gran oportunidad para automatizar, cumplir sin errores y avanzar con confianza.",
    date: "07 MAYO, 2025",
    readTime: "8 min",
    image: "/images/blog/verifactu-guia.jpeg",
    category: "PYMES",
    author: {
      name: "Laura Sánchez",
      role: "Asesora Fiscal",
      avatar: "/images/team/laura-sanchez.png",
    },
    content: `
      <p>En DINVBOX sabemos que muchos negocios aún no están listos para la llegada de VeriFactu. Pero también sabemos que esta transformación es una gran oportunidad para automatizar, cumplir sin errores y avanzar con confianza en la digitalización fiscal. Por eso, hemos preparado esta guía práctica, directa y pensada para ti.</p>
      
      <h2>¿Qué es VeriFactu y por qué importa?</h2>
      
      <p>VeriFactu es el nuevo sistema de facturación electrónica de la Agencia Tributaria. Su objetivo es claro: combatir el fraude fiscal y modernizar la forma en que las empresas registran sus operaciones. A partir del 1 de julio de 2025, cualquier software de facturación deberá enviar automáticamente los registros de facturas a Hacienda en tiempo real.</p>
      
      <p>A pesar de la cercanía de la fecha, solo el 7% de las pymes conoce esta obligación, y más del 80% no está adaptado a las normativas de la Ley Antifraude y Crea y Crece.</p>
      
      <h2>¿Qué implica esto para tu negocio?</h2>
      
      <p>VeriFactu no es solo una obligación legal. Es una transformación profunda de cómo facturamos y controlamos nuestros ingresos. La buena noticia es que si te preparas con tiempo y eliges las herramientas adecuadas, como DINVBOX, puedes convertir este cambio en una ventaja competitiva.</p>
      
      <h2>Pasos para adaptarte a VeriFactu sin complicaciones</h2>
      
      <h3>Diagnóstico de tu sistema actual</h3>
      <ul>
        <li>¿Cómo generas, guardas y envías tus facturas hoy?</li>
        <li>¿Tu software puede generar XML estructurados?</li>
        <li>¿Soporta el envío en tiempo real?</li>
      </ul>
      
      <h3>Integración con la Agencia Tributaria</h3>
      <ul>
        <li>DINVBOX se conecta directamente vía API, cumpliendo con los requisitos técnicos oficiales.</li>
        <li>También ofrecemos conexión FTP/SFTP o conectores intermedios, según tus necesidades.</li>
      </ul>
      
      <h3>Automatización total del proceso</h3>
      <ul>
        <li>Nuestra IA genera las facturas automáticamente en los formatos exigidos (XML, Facturae, UBL).</li>
        <li>Validamos cada envío y conservamos copia segura con trazabilidad para auditorías.</li>
        <li>Generamos sellos digitales y control de integridad para evitar errores y sanciones.</li>
      </ul>
      
      <h3>Supervisión y contingencia</h3>
      <ul>
        <li>Dashboards con alertas en tiempo real.</li>
        <li>Logs detallados para auditores y despachos.</li>
        <li>Protocolo de emergencia si fallan los servidores de Hacienda.</li>
      </ul>
      
      <h2>Una oportunidad real para modernizar tu negocio</h2>
      
      <p>VeriFactu es mucho más que una nueva obligación. Es la puerta de entrada a una gestión más eficiente, más segura y más digital. En lugar de verlo como una carga, en DINVBOX te ayudamos a convertirlo en una palanca de crecimiento.</p>
      
      <p>Y si eres asesor, gestor o trabajas en un despacho, ahora es el momento de revisar tus procesos y ofrecer nuevos servicios de valor a tus clientes.</p>
      
      <h2>DINVBOX lo hace por ti</h2>
      
      <p>Con nuestro sistema de facturación conectado a VeriFactu y reforzado por IA tributaria, nunca estarás solo frente a la normativa. Nos adelantamos a los cambios, automatizamos lo técnico y te dejamos tiempo para lo esencial: hacer crecer tu negocio.</p>
    `,
  },
]

// Artículos relacionados (simplificados para el ejemplo)
const relatedPosts = [
  {
    id: "futuro-facturacion-electronica",
    slug: "el-futuro-de-la-facturacion-electronica-tendencias-para-2026",
    title: "El Futuro De La Facturación Electrónica: Tendencias Para 2026",
    date: "10 ABRIL, 2025",
    image: "/images/blog/facturacion-electronica-2026.jpeg",
    category: "Innovación",
  },
  {
    id: "verifactu-guia",
    slug: "verifactu-se-acerca-lo-que-todo-emprendedor-y-autonomo-debe-saber",
    title: "VeriFactu se acerca: lo que todo emprendedor y autónomo debe saber",
    date: "07 MAYO, 2025",
    image: "/images/blog/verifactu-guia.jpeg",
    category: "PYMES",
  },
]

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulamos la carga del artículo desde una API
    setIsLoading(true)
    setTimeout(() => {
      const foundPost = blogPosts.find((p) => p.slug === slug)
      setPost(foundPost)
      setIsLoading(false)

      if (foundPost) {
        // Actualizar el título de la página
        document.title = `${foundPost.title} | DINVBOX Blog`
      }
    }, 500)
  }, [slug])

  // Si no se encuentra el artículo, redirigir a 404
  if (!isLoading && !post) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      {isLoading ? (
        // Skeleton loader
        <div className="pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="h-8 w-3/4 bg-gray-200 rounded-md mb-6 animate-pulse"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded-md mb-12 animate-pulse"></div>
            <div className="h-64 w-full bg-gray-200 rounded-lg mb-8 animate-pulse"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-full bg-gray-200 rounded-md animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-navy-50 to-white -z-10"></div>

            {/* Decorative elements */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-orange-300 rounded-full filter blur-3xl opacity-20 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-300 rounded-full filter blur-3xl opacity-10 -z-10"></div>

            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Link href="/blog" className="inline-flex items-center text-navy-700 hover:text-orange-500 mb-6">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al blog
                </Link>

                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    {post.date}
                  </span>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {post.readTime} de lectura
                  </span>
                </div>

                <h1 className="font-heading text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-5xl mb-6">
                  {post.title}
                </h1>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-navy-900">{post.author.name}</p>
                      <p className="text-sm text-gray-500">{post.author.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <Share2 className="h-5 w-5 text-gray-600" />
                          <span className="sr-only">Compartir</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Facebook className="h-4 w-4 mr-2" />
                          <span>Facebook</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Twitter className="h-4 w-4 mr-2" />
                          <span>Twitter</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Linkedin className="h-4 w-4 mr-2" />
                          <span>LinkedIn</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Bookmark className="h-5 w-5 text-gray-600" />
                      <span className="sr-only">Guardar</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Featured Image */}
          <section className="py-8 bg-white">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="rounded-xl overflow-hidden aspect-[16/9] relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Article Content */}
          <section className="py-12 bg-white">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy-900 prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </section>

          {/* Related Articles */}
          <section className="py-16 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-8">Artículos relacionados</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group"
                  >
                    <Link href={`/blog/${relatedPost.slug}`} className="flex items-center gap-4">
                      <div className="overflow-hidden rounded-lg w-24 h-24 flex-shrink-0">
                        <Image
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-orange-500">{relatedPost.category}</span>
                        <h3 className="text-base font-bold text-navy-900 group-hover:text-orange-500 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{relatedPost.date}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
