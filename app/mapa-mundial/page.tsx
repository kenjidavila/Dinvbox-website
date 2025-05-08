"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import WorldMap from "@/components/world-map"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MapLegend from "@/components/map-legend"
import CountryDetailModal from "@/components/country-detail-modal"
import CountrySearch from "@/components/country-search"

// Datos actualizados de facturación electrónica por país
const countryData = {
  // América Latina
  MX: {
    name: "México",
    status: "obligatorio",
    details:
      "Obligatoria para todos los contribuyentes desde abril de 2014 (Comprobante Fiscal Digital por Internet, CFDI).",
    year: 2014,
    region: "america",
  },
  CO: {
    name: "Colombia",
    status: "obligatorio",
    details:
      "Obligatoria para todas las empresas desde 2019 (implementación completada en 2020, factura electrónica autorizada por la DIAN).",
    year: 2019,
    region: "america",
  },
  EC: {
    name: "Ecuador",
    status: "obligatorio",
    details: "Obligatoria para todos los contribuyentes desde 2014 (factura electrónica autorizada por el SRI).",
    year: 2014,
    region: "america",
  },
  CL: {
    name: "Chile",
    status: "obligatorio",
    details:
      "Obligatoria para todas las empresas desde febrero de 2018 (Documento Tributario Electrónico validado por el SII).",
    year: 2018,
    region: "america",
  },
  BR: {
    name: "Brasil",
    status: "obligatorio",
    details: "Obligatoria para todas las empresas que emiten facturas (Modelo NF-e, adoptado gradualmente desde 2008).",
    year: 2008,
    region: "america",
  },
  AR: {
    name: "Argentina",
    status: "obligatorio",
    details: "Obligatoria para todos los contribuyentes (incluyendo monotributistas) desde abril de 2019.",
    year: 2019,
    region: "america",
  },
  PE: {
    name: "Perú",
    status: "obligatorio",
    details:
      "Obligatoria para todas las empresas desde 2018 (implementación gradual iniciada en 2014, con formato UBL 2.1).",
    year: 2018,
    region: "america",
  },
  UY: {
    name: "Uruguay",
    status: "obligatorio",
    details: "Obligatoria para las empresas sujetas a IVA desde 2019 (Comprobantes Fiscales Electrónicos, CFE).",
    year: 2019,
    region: "america",
  },
  DO: {
    name: "República Dominicana",
    status: "obligatorio",
    details:
      "Obligatoria para todos los contribuyentes. Implementada completamente tras un proceso gradual iniciado en 2023.",
    year: 2023,
    region: "america",
  },
  CR: {
    name: "Costa Rica",
    status: "obligatorio",
    details: "Obligatoria para todos los contribuyentes desde 2018 (factura electrónica validada por Hacienda).",
    year: 2018,
    region: "america",
  },
  PA: {
    name: "Panamá",
    status: "obligatorio",
    details:
      "Obligatoria para todos los contribuyentes; los proveedores del Estado fueron incorporados obligatoriamente desde el 31 de octubre de 2022 (culminando la adopción).",
    year: 2022,
    region: "america",
  },
  GT: {
    name: "Guatemala",
    status: "obligatorio",
    details: "Obligatoria para todos los contribuyentes desde julio de 2022 (sistema FEL de facturación electrónica).",
    year: 2022,
    region: "america",
  },
  PY: {
    name: "Paraguay",
    status: "obligatorio",
    details:
      "Obligatoria para nuevos contribuyentes desde enero de 2024 y para empresas existentes desde octubre de 2024 (sistema SIFEN).",
    year: 2024,
    region: "america",
  },
  BO: {
    name: "Bolivia",
    status: "obligatorio",
    details:
      "Introducida bajo el Sistema de Facturación Electrónica (SFE) desde diciembre de 2021 (mandato de facturación electrónica con autorización previa).",
    year: 2021,
    region: "america",
  },
  SV: {
    name: "El Salvador",
    status: "parcial",
    details:
      "Introducida en 2023; actualmente es obligatoria para grandes contribuyentes tras una fase voluntaria inicial (marco legal aprobado en 2022).",
    year: 2023,
    region: "america",
  },
  VE: {
    name: "Venezuela",
    status: "parcial",
    details:
      "Obligatoria desde 2018–2019 pero solo para ciertos contribuyentes designados (grandes contribuyentes y sectores específicos).",
    year: 2018,
    region: "america",
  },
  US: {
    name: "Estados Unidos",
    status: "voluntario",
    details: "No obligatoria (adopción voluntaria; no existe mandato federal de factura electrónica).",
    year: null,
    region: "america",
  },
  CA: {
    name: "Canadá",
    status: "voluntario",
    details: "No obligatoria; adopción voluntaria (estándar UBL) desde 2018, principalmente en el sector público.",
    year: null,
    region: "america",
  },

  // Europa
  ES: {
    name: "España",
    status: "parcial",
    details:
      "Obligatoria para facturas a las Administraciones Públicas desde 2015; en el ámbito privado B2B será obligatoria a partir de 2026, comenzando con personas jurídicas.",
    year: 2015,
    region: "europa",
  },
  DE: {
    name: "Alemania",
    status: "parcial",
    details:
      "Obligatoria en sector público (B2G) desde 2020; B2B no obligatoria aún (previsto mandato a partir de 2025).",
    year: 2020,
    region: "europa",
  },
  IT: {
    name: "Italia",
    status: "obligatorio",
    details:
      "Obligatoria para todas las empresas (B2B y B2C) desde enero de 2019, mediante el Sistema di Interscambio (SdI).",
    year: 2019,
    region: "europa",
  },
  FR: {
    name: "Francia",
    status: "parcial",
    details:
      "Obligatoria para facturas al sector público desde 2020; la facturación electrónica B2B será obligatoria a partir del 1 de septiembre de 2026 (reforma Chorus Pro).",
    year: 2020,
    region: "europa",
  },
  PT: {
    name: "Portugal",
    status: "parcial",
    details:
      "Obligatoria en facturación al sector público desde 2021; además, se exige el uso de software de facturación certificado (código ATCUD) desde 2024.",
    year: 2021,
    region: "europa",
  },
  BE: {
    name: "Bélgica",
    status: "parcial",
    details:
      "Obligatoria en contratos públicos (B2G) desde 2019; B2B será obligatoria gradualmente a partir de enero 2026.",
    year: 2019,
    region: "europa",
  },
  NL: {
    name: "Países Bajos",
    status: "parcial",
    details:
      "Obligatoria solo en contratos con el gobierno central desde 2017; B2B sin mandato (uso voluntario de estándares como PEPPOL).",
    year: 2017,
    region: "europa",
  },
  AT: {
    name: "Austria",
    status: "parcial",
    details:
      "Obligatoria solo para facturas a la Administración Pública desde 2014 (pionera en B2G); B2B no obligatoria.",
    year: 2014,
    region: "europa",
  },
  PL: {
    name: "Polonia",
    status: "planificado",
    details:
      "No obligatoria todavía; la facturación electrónica B2B será obligatoria a partir de febrero de 2026 (plataforma KSeF).",
    year: 2026,
    region: "europa",
  },
  RO: {
    name: "Rumanía",
    status: "obligatorio",
    details:
      "Obligatoria para facturas B2G y para ciertos sectores desde 2022 (sistema e-Factura); se extenderá a todas las facturas B2B a partir de julio de 2024.",
    year: 2022,
    region: "europa",
  },
  GR: {
    name: "Grecia",
    status: "parcial",
    details:
      "Obligatoria solo para facturación al sector público (B2G) desde 2023; B2B voluntaria vía plataforma myDATA (sin mandato general aún).",
    year: 2023,
    region: "europa",
  },
  HU: {
    name: "Hungría",
    status: "obligatorio",
    details:
      "Obligatoria la facturación electrónica con reporte fiscal en tiempo real desde julio de 2018 para todas las empresas (sistema RTIR).",
    year: 2018,
    region: "europa",
  },
  CZ: {
    name: "República Checa",
    status: "parcial",
    details:
      "Obligatoria solo para facturas gubernamentales (B2G) desde 2019; B2B voluntaria (sin mandato aún definido).",
    year: 2019,
    region: "europa",
  },
  BG: {
    name: "Bulgaria",
    status: "parcial",
    details:
      "No obligatoria para B2B; solo facturación electrónica obligatoria en sector público (B2G) desde 2019 (consulta pública en curso para extenderla).",
    year: 2019,
    region: "europa",
  },
  DK: {
    name: "Dinamarca",
    status: "parcial",
    details:
      "Obligatoria en el sector público desde 2005; B2B no obligatoria (solo requisitos de registro digital desde 2024).",
    year: 2005,
    region: "europa",
  },
  FI: {
    name: "Finlandia",
    status: "parcial",
    details:
      "Desde abril de 2020 cualquier empresa puede exigir a sus proveedores facturas electrónicas (derecho del cliente B2B).",
    year: 2020,
    region: "europa",
  },
  SE: {
    name: "Suecia",
    status: "parcial",
    details:
      "Obligatoria para facturas a entidades públicas desde abril de 2019 (formato e-factura PEPPOL); B2B voluntaria (ampliamente utilizada pero sin obligación legal).",
    year: 2019,
    region: "europa",
  },
  IE: {
    name: "Irlanda",
    status: "parcial",
    details:
      "Obligatoria solo para facturas a entes gubernamentales (B2G) desde 2019; B2B no obligatoria (consulta pública en proceso).",
    year: 2019,
    region: "europa",
  },
  HR: {
    name: "Croacia",
    status: "parcial",
    details:
      "Obligatoria en el sector público (B2G) desde 2019; la facturación B2B será obligatoria a partir de enero de 2026.",
    year: 2019,
    region: "europa",
  },
  LT: {
    name: "Lituania",
    status: "parcial",
    details:
      "Obligatoria solo para facturas a entidades públicas (B2G) desde 2019; B2B aún en estudio (plataforma nacional en desarrollo).",
    year: 2019,
    region: "europa",
  },
  LV: {
    name: "Letonia",
    status: "parcial",
    details:
      "Obligatoria en el sector público (B2G) desde 2025; B2B obligatoria a partir de enero de 2026 (modelo basado en PEPPOL).",
    year: 2025,
    region: "europa",
  },
  EE: {
    name: "Estonia",
    status: "planificado",
    details:
      "No obligatoria hoy; desde julio de 2025 los clientes podrán exigir recibir facturas electrónicas, y desde 2027 los proveedores estarán obligados a emitirlas.",
    year: 2025,
    region: "europa",
  },
  SK: {
    name: "Eslovaquia",
    status: "parcial",
    details:
      "Obligatoria en sector público (B2G) actualmente; obligatoriedad para todas las facturas B2B/B2C planificada para enero de 2027.",
    year: null,
    region: "europa",
  },
  SI: {
    name: "Eslovenia",
    status: "planificado",
    details: "No obligatoria todavía; se ha propuesto un mandato de factura electrónica B2B a partir de 2027.",
    year: 2027,
    region: "europa",
  },
  CY: {
    name: "Chipre",
    status: "parcial",
    details: "Obligatoria solo en contratación pública (B2G) desde 2019; B2B voluntaria por el momento.",
    year: 2019,
    region: "europa",
  },
  MT: {
    name: "Malta",
    status: "parcial",
    details: "Obligatoria solo para facturas a entes públicos (B2G) desde 2019; B2B no obligatoria.",
    year: 2019,
    region: "europa",
  },
  LU: {
    name: "Luxemburgo",
    status: "parcial",
    details: "Obligatoria para facturas a la Administración Pública desde 2022 aprox.; B2B no obligatoria.",
    year: 2022,
    region: "europa",
  },
  GB: {
    name: "Reino Unido",
    status: "voluntario",
    details:
      "No obligatoria (solo exige llevar registros y reportar IVA digitalmente desde 2019 con MTD; la factura electrónica B2B es voluntaria).",
    year: null,
    region: "europa",
  },
  CH: {
    name: "Suiza",
    status: "voluntario",
    details:
      "No obligatoria (facturación electrónica voluntaria; la administración federal acepta/solicita e-facturas en contratos, pero no hay exigencia legal general).",
    year: null,
    region: "europa",
  },
  NO: {
    name: "Noruega",
    status: "parcial",
    details:
      "Obligatoria para facturas a entidades públicas desde 2012; B2B no obligatoria (se evalúa instaurar mandato hacia 2025).",
    year: 2012,
    region: "europa",
  },
  IS: {
    name: "Islandia",
    status: "voluntario",
    details: "No obligatoria (uso voluntario; sector público acepta e-facturas pero no es un requisito legal general).",
    year: null,
    region: "europa",
  },
  RS: {
    name: "Serbia",
    status: "obligatorio",
    details: "Obligatoria para transacciones B2B y B2G desde enero de 2023 (plataforma nacional e-Faktura).",
    year: 2023,
    region: "europa",
  },
  UA: {
    name: "Ucrania",
    status: "obligatorio",
    details:
      "Obligatoria para empresas con ingresos anuales > 1 millón UAH desde enero de 2024 (facturación electrónica B2B y B2C vía sistema fiscal unificado).",
    year: 2024,
    region: "europa",
  },
  AL: {
    name: "Albania",
    status: "obligatorio",
    details: "Obligatoria desde julio de 2021 para todas las transacciones (B2B y B2C).",
    year: 2021,
    region: "europa",
  },

  // Asia y Oceanía
  IN: {
    name: "India",
    status: "parcial",
    details:
      "Obligatoria para empresas con facturación anual > ₹5 crores (aprox. 600 mil USD) desde agosto de 2023 (sistema de registro de facturas bajo el GST).",
    year: 2023,
    region: "asia",
  },
  CN: {
    name: "China",
    status: "parcial",
    details: "Transición en marcha hacia la factura electrónica (e-fapiao) con un piloto completado en 2023.",
    year: 2023,
    region: "asia",
  },
  KR: {
    name: "Corea del Sur",
    status: "obligatorio",
    details:
      "Obligatoria desde 2011 para empresas con ingresos anuales > 100 millones KRW (umbral reducido a 80 millones en 2024).",
    year: 2011,
    region: "asia",
  },
  JP: {
    name: "Japón",
    status: "voluntario",
    details:
      "No obligatoria legalmente; desde octubre de 2023 rige un sistema de 'factura calificada' para poder deducir el IVA, lo que incentiva fuertemente su uso (pero no existe un mandato B2B general).",
    year: null,
    region: "asia",
  },
  ID: {
    name: "Indonesia",
    status: "obligatorio",
    details: "Obligatoria para todos los inscritos en IVA desde 2015 (sistema e-Faktur Pajak).",
    year: 2015,
    region: "asia",
  },
  MY: {
    name: "Malasia",
    status: "obligatorio",
    details:
      "Obligatoria desde agosto de 2024 para empresas con ventas anuales > 100 millones MYR (aprox. 22 millones USD), con plan de expandirse a compañías más pequeñas posteriormente.",
    year: 2024,
    region: "asia",
  },
  SG: {
    name: "Singapur",
    status: "planificado",
    details:
      "No obligatoria aún; se planea introducir gradualmente un mandato de factura electrónica B2B hacia 2025 (red PEPPOL).",
    year: 2025,
    region: "asia",
  },
  TH: {
    name: "Tailandia",
    status: "voluntario",
    details:
      "No obligatoria; esquema voluntario de facturación/reporte electrónica desde 2018 (uso de e-factura fiscal para quien adopte).",
    year: null,
    region: "asia",
  },
  VN: {
    name: "Vietnam",
    status: "obligatorio",
    details:
      "Obligatoria para todas las empresas desde julio de 2022 (factura electrónica validada con código fiscal).",
    year: 2022,
    region: "asia",
  },
  PH: {
    name: "Filipinas",
    status: "parcial",
    details:
      "Obligatoria para los 100 mayores contribuyentes desde julio de 2022; se extenderá gradualmente a más empresas hasta 2024.",
    year: 2022,
    region: "asia",
  },
  KZ: {
    name: "Kazajistán",
    status: "obligatorio",
    details: "Obligatoria para todos los contribuyentes desde enero de 2017 (sistema nacional de e-facturación ESF).",
    year: 2017,
    region: "asia",
  },
  UZ: {
    name: "Uzbekistán",
    status: "obligatorio",
    details:
      "Obligatoria para todos los contribuyentes desde 2020 (plataforma Soliq va ratificación digital por la autoridad fiscal).",
    year: 2020,
    region: "asia",
  },
  KG: {
    name: "Kirguistán",
    status: "obligatorio",
    details: "Obligatoria (inicialmente para bienes) desde mayo de 2023.",
    year: 2023,
    region: "asia",
  },
  AZ: {
    name: "Azerbaiyán",
    status: "obligatorio",
    details:
      "Obligatoria desde enero de 2018 para todos los contribuyentes (facturas electrónicas a través del portal fiscal).",
    year: 2018,
    region: "asia",
  },
  AM: {
    name: "Armenia",
    status: "obligatorio",
    details: "Obligatoria para todos los contribuyentes (B2B, B2C y B2G) – sistema nacional bajo supervisión fiscal.",
    year: null,
    region: "asia",
  },
  NP: {
    name: "Nepal",
    status: "obligatorio",
    details: "Obligatoria la facturación electrónica (e-billing) desde 2017.",
    year: 2017,
    region: "asia",
  },
  IL: {
    name: "Israel",
    status: "obligatorio",
    details:
      "Obligatoria desde el 5 de mayo de 2024 para facturas mayores a 25 000 ILS, con envío electrónico al fisco para validación.",
    year: 2024,
    region: "asia",
  },
  AU: {
    name: "Australia",
    status: "voluntario",
    details:
      "No obligatoria (adopción voluntaria; el gobierno promueve e-invoicing vía PEPPOL, pero sin mandato legal).",
    year: null,
    region: "asia",
  },
  NZ: {
    name: "Nueva Zelanda",
    status: "voluntario",
    details:
      "No obligatoria en general; la facturación electrónica (PEPPOL) es voluntaria y los organismos públicos pueden requerir e-facturas desde 2022.",
    year: null,
    region: "asia",
  },

  // África y Medio Oriente
  SA: {
    name: "Arabia Saudita",
    status: "obligatorio",
    details: "Obligatoria para todas las empresas registradas en IVA desde diciembre de 2021 (sistema 'Fatoora').",
    year: 2021,
    region: "africa",
  },
  AE: {
    name: "Emiratos Árabes Unidos",
    status: "planificado",
    details:
      "No obligatoria aún; prevista la implementación de un régimen de facturación electrónica a partir de julio de 2026.",
    year: 2026,
    region: "africa",
  },
  EG: {
    name: "Egipto",
    status: "obligatorio",
    details: "Obligatoria para todas las empresas (B2B y B2C) desde septiembre de 2021 (sistema e-invoice del ETA).",
    year: 2021,
    region: "africa",
  },
  ZA: {
    name: "Sudáfrica",
    status: "voluntario",
    details:
      "No obligatoria (en consulta para posibles requisitos de e-facturación y reporte digital, pero sin mandato vigente).",
    year: null,
    region: "africa",
  },
  NG: {
    name: "Nigeria",
    status: "parcial",
    details:
      "Obligatoria desde 2022 para facturas de comercio exterior (sistema electrónico exigido por el banco central); a nivel interno se utiliza un sistema fiscal electrónico (ATAS) para reportar IVA.",
    year: 2022,
    region: "africa",
  },
  KE: {
    name: "Kenia",
    status: "obligatorio",
    details:
      "Obligatoria para todos los registrados en IVA desde agosto de 2021 (uso de equipos TIMS con factura electrónica con código QR).",
    year: 2021,
    region: "africa",
  },
  TZ: {
    name: "Tanzania",
    status: "obligatorio",
    details:
      "Obligatoria para todos los registrados en IVA, con uso de dispositivos de facturación electrónica (TIMS) desde 2022.",
    year: 2022,
    region: "africa",
  },
  UG: {
    name: "Uganda",
    status: "obligatorio",
    details:
      "Obligatoria para todos los registrados en IVA desde 2021 (sistema EFRIS de facturación electrónica en tiempo real).",
    year: 2021,
    region: "africa",
  },
  RW: {
    name: "Ruanda",
    status: "obligatorio",
    details:
      "Obligatoria para todos los contribuyentes registrados en IVA desde 2021 (uso de sistemas electrónicos de facturación en tiempo real).",
    year: 2021,
    region: "africa",
  },
  GH: {
    name: "Ghana",
    status: "obligatorio",
    details: "Obligatoria para todos los contribuyentes registrados en IVA (despliegue gradual completado en 2022).",
    year: 2022,
    region: "africa",
  },
  TN: {
    name: "Túnez",
    status: "parcial",
    details:
      "Obligatoria para grandes contribuyentes en transacciones B2G y B2B desde 2016 (sistema 'e-factura' con control continuo).",
    year: 2016,
    region: "africa",
  },
  MA: {
    name: "Marruecos",
    status: "planificado",
    details: "No obligatoria aún; se ha propuesto un mandato de factura electrónica B2B para 2026.",
    year: 2026,
    region: "africa",
  },
  MU: {
    name: "Mauricio",
    status: "parcial",
    details:
      "Con implementación gradual: desde mayo de 2024 las empresas con facturación > 100 millones MUR deben emitir facturas electrónicas fiscales.",
    year: 2024,
    region: "africa",
  },
  MR: {
    name: "Mauritania",
    status: "obligatorio",
    details:
      "Se lanzó la facturación electrónica en octubre de 2023 como nueva obligación fiscal (primeros contribuyentes ya adheridos).",
    year: 2023,
    region: "africa",
  },
  AO: {
    name: "Angola",
    status: "parcial",
    details:
      "Obligatoria desde 2020 para empresas con ingresos > 50 millones AOA; ampliación total en proceso hacia 2025.",
    year: 2020,
    region: "africa",
  },
  BJ: {
    name: "Benín",
    status: "obligatorio",
    details: "Obligatoria desde 2020 para todos los negocios registrados en IVA.",
    year: 2020,
    region: "africa",
  },
  BI: {
    name: "Burundi",
    status: "obligatorio",
    details:
      "Obligatoria desde enero de 2022 para todas las empresas registradas en IVA (envío en tiempo real al sistema fiscal).",
    year: 2022,
    region: "africa",
  },
  CV: {
    name: "Cabo Verde",
    status: "obligatorio",
    details: "Obligatoria desde 2020 (facturación electrónica implementada a nivel nacional).",
    year: 2020,
    region: "africa",
  },
  CI: {
    name: "Costa de Marfil",
    status: "parcial",
    details:
      "Obligatoria desde 2019 (inicialmente para proveedores de servicios digitales; extendiéndose gradualmente a más sectores).",
    year: 2019,
    region: "africa",
  },
  CG: {
    name: "Rep. del Congo",
    status: "obligatorio",
    details:
      "Obligatoria a partir de 2024 para todos los contribuyentes (uso de factura electrónica con dispositivos fiscales).",
    year: 2024,
    region: "africa",
  },
  CD: {
    name: "Rep. Democrática del Congo",
    status: "obligatorio",
    details:
      "Obligatoria para transacciones B2B y B2C (sistema nacional de e-facturación implementado para mejorar la recaudación).",
    year: null,
    region: "africa",
  },
  NE: {
    name: "Níger",
    status: "obligatorio",
    details: "Obligatoria para todos los contribuyentes sujetos a IVA desde 2021.",
    year: 2021,
    region: "africa",
  },
  ZM: {
    name: "Zambia",
    status: "obligatorio",
    details:
      "Obligatoria para todos los registrados en IVA desde julio de 2024 (sistema 'Smart Invoice' del ente recaudador).",
    year: 2024,
    region: "africa",
  },
  TR: {
    name: "Turquía",
    status: "obligatorio",
    details:
      "Obligatoria desde enero de 2014, inicialmente para grandes empresas; actualmente aplica a contribuyentes con ingresos > ~3 millones TRY (factura electrónica e-Fatura/e-Arşiv).",
    year: 2014,
    region: "africa",
  },
  JO: {
    name: "Jordania",
    status: "planificado",
    details:
      "No obligatoria aún; se implementará un modelo de e-factura con validación previa a partir de abril de 2025.",
    year: 2025,
    region: "africa",
  },
  BW: {
    name: "Botsuana",
    status: "planificado",
    details: "No obligatoria por ahora; se planifica implementar la factura electrónica en 2025-2026.",
    year: 2025,
    region: "africa",
  },
}

export default function MapaMundialPage() {
  const [activeRegion, setActiveRegion] = useState("todas")
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("todos")

  const handleCountryClick = (countryCode) => {
    if (countryData[countryCode]) {
      setSelectedCountry({ ...countryData[countryCode], code: countryCode })
      setIsDialogOpen(true)
    }
  }

  // Filtrar países por región y estado
  const filteredCountryData = Object.fromEntries(
    Object.entries(countryData).filter(([_, country]) => {
      const matchesRegion = activeRegion === "todas" || country.region === activeRegion
      const matchesStatus = statusFilter === "todos" || country.status === statusFilter
      return matchesRegion && matchesStatus
    }),
  )

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-50 to-white -z-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-orange-300 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-300 rounded-full filter blur-3xl opacity-10 -z-10"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl lg:text-6xl mb-6">
              ¿Cómo Factura el Mundo?
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre el estado de la facturación electrónica en diferentes países. Haz clic en cualquier país del mapa
              para obtener información detallada sobre su normativa.
            </p>
            <div className="mt-8 flex justify-center">
              <CountrySearch countries={countryData} onSelectCountry={(country) => setSelectedCountry(country)} />
            </div>
          </motion.div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full text-white"
            viewBox="0 0 1440 120"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 120L48 105C96 90 192 60 288 55C384 50 480 70 576 75C672 80 768 70 864 65C960 60 1056 60 1152 65C1248 70 1344 80 1392 85L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" />
          </svg>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <Tabs defaultValue="todas" onValueChange={setActiveRegion}>
              <TabsList className="bg-white border border-gray-200 p-1 rounded-lg">
                <TabsTrigger
                  value="todas"
                  className="rounded-md data-[state=active]:bg-navy-50 data-[state=active]:text-navy-900"
                >
                  Todas las regiones
                </TabsTrigger>
                <TabsTrigger
                  value="america"
                  className="rounded-md data-[state=active]:bg-navy-50 data-[state=active]:text-navy-900"
                >
                  América
                </TabsTrigger>
                <TabsTrigger
                  value="europa"
                  className="rounded-md data-[state=active]:bg-navy-50 data-[state=active]:text-navy-900"
                >
                  Europa
                </TabsTrigger>
                <TabsTrigger
                  value="asia"
                  className="rounded-md data-[state=active]:bg-navy-50 data-[state=active]:text-navy-900"
                >
                  Asia y Oceanía
                </TabsTrigger>
                <TabsTrigger
                  value="africa"
                  className="rounded-md data-[state=active]:bg-navy-50 data-[state=active]:text-navy-900"
                >
                  África y Medio Oriente
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs defaultValue="todos" onValueChange={setStatusFilter}>
              <TabsList className="bg-white border border-gray-200 p-1 rounded-lg">
                <TabsTrigger
                  value="todos"
                  className="rounded-md data-[state=active]:bg-navy-50 data-[state=active]:text-navy-900"
                >
                  Todos los estados
                </TabsTrigger>
                <TabsTrigger
                  value="obligatorio"
                  className="rounded-md data-[state=active]:bg-orange-50 data-[state=active]:text-orange-900"
                >
                  Obligatorio
                </TabsTrigger>
                <TabsTrigger
                  value="parcial"
                  className="rounded-md data-[state=active]:bg-amber-50 data-[state=active]:text-amber-900"
                >
                  Parcial
                </TabsTrigger>
                <TabsTrigger
                  value="voluntario"
                  className="rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
                >
                  Voluntario
                </TabsTrigger>
                <TabsTrigger
                  value="planificado"
                  className="rounded-md data-[state=active]:bg-violet-50 data-[state=active]:text-violet-900"
                >
                  Planificado
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative max-w-full mx-auto overflow-hidden"
            style={{
              aspectRatio: "21/9",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              borderRadius: "0.75rem",
            }}
          >
            <div className="relative">
              <WorldMap
                onCountryClick={handleCountryClick}
                countryData={filteredCountryData}
                disablePanning={true}
                showZoomControls={true}
              />
              <MapLegend />
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Haz clic en cualquier país para ver información detallada sobre su estado de facturación electrónica.
              <br />
              Datos actualizados a mayo de 2025.
            </p>
          </div>
        </div>
      </section>

      {selectedCountry && <CountryDetailModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />}
    </div>
  )
}
