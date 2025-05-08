"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Save, Plus, Trash2, Globe } from "lucide-react"
import WorldMap from "@/components/world-map"

// Datos actualizados de facturación electrónica por país
const countryData = {
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

  // América
  MX: {
    name: "México",
    status: "obligatorio",
    details:
      "Obligatoria para todos los contribuyentes desde abril de 2014 (Comprobante Fiscal Digital por Internet, CFDI).",
    year: 2014,
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
  CL: {
    name: "Chile",
    status: "obligatorio",
    details:
      "Obligatoria para todas las empresas desde febrero de 2018 (Documento Tributario Electrónico validado por el SII).",
    year: 2018,
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
  PE: {
    name: "Perú",
    status: "obligatorio",
    details:
      "Obligatoria para todas las empresas desde 2018 (implementación gradual iniciada en 2014, con formato UBL 2.1).",
    year: 2018,
    region: "america",
  },
  EC: {
    name: "Ecuador",
    status: "obligatorio",
    details: "Obligatoria para todos los contribuyentes desde 2014 (factura electrónica autorizada por el SRI).",
    year: 2014,
    region: "america",
  },
  UY: {
    name: "Uruguay",
    status: "obligatorio",
    details: "Obligatoria para las empresas sujetas a IVA desde 2019 (Comprobantes Fiscales Electrónicos, CFE).",
    year: 2019,
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
  DO: {
    name: "República Dominicana",
    status: "obligatorio",
    details:
      "Obligatoria para todos los contribuyentes. Implementada completamente tras un proceso gradual iniciado en 2023.",
    year: 2023,
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

const getCountryColor = (countryCode, countryData) => {
  if (!countryData[countryCode]) return "#1e3a5f" // Color por defecto (azul oscuro)

  const status = countryData[countryCode].status
  switch (status) {
    case "obligatorio":
      return "#f97316" // orange-500
    case "parcial":
      return "#f59e0b" // amber-500
    case "voluntario":
      return "#3b82f6" // blue-500
    case "planificado":
      return "#8b5cf6" // violet-500
    default:
      return "#1e3a5f" // navy-800
  }
}

export default function AdminMapaMundial() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeRegion, setActiveRegion] = useState("todas")
  const [editableCountryData, setEditableCountryData] = useState({ ...countryData })
  const [selectedCountry, setSelectedCountry] = useState(null)

  // Filtrar países por búsqueda y región
  const filteredCountries = Object.entries(editableCountryData).filter(([code, country]) => {
    const matchesSearch =
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = activeRegion === "todas" || country.region === activeRegion
    return matchesSearch && matchesRegion
  })

  // Función para manejar cambios en los datos de un país
  const handleCountryChange = (code, field, value) => {
    setEditableCountryData((prev) => ({
      ...prev,
      [code]: {
        ...prev[code],
        [field]: value,
      },
    }))
  }

  // Función para guardar los cambios
  const saveChanges = () => {
    // Aquí se implementaría la lógica para guardar los datos en una base de datos o API
    console.log("Datos actualizados:", editableCountryData)
    alert("Los cambios han sido guardados (simulación)")
  }

  // Función para exportar los datos
  const exportData = () => {
    const dataStr = JSON.stringify(editableCountryData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `facturacion-electronica-mundial-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  // Función para añadir un nuevo país
  const addNewCountry = () => {
    // Implementación simplificada - en una aplicación real, esto abriría un formulario
    const code = prompt("Introduce el código ISO del país (2 letras):")
    if (!code) return

    const upperCode = code.toUpperCase()
    if (editableCountryData[upperCode]) {
      alert("Este país ya existe. Edítalo en la lista.")
      return
    }

    setEditableCountryData((prev) => ({
      ...prev,
      [upperCode]: {
        name: prompt("Nombre del país:") || "Nuevo país",
        status: "voluntario",
        details: "",
        year: null,
        region: activeRegion === "todas" ? "europa" : activeRegion,
      },
    }))
  }

  // Función para eliminar un país
  const deleteCountry = (code) => {
    if (confirm(`¿Estás seguro de que deseas eliminar ${editableCountryData[code].name}?`)) {
      const newData = { ...editableCountryData }
      delete newData[code]
      setEditableCountryData(newData)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-900">Administrar Mapa Mundial</h1>
          <p className="text-gray-500">Gestiona los datos de facturación electrónica por país</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={exportData} className="border-navy-300 text-navy-800 hover:bg-navy-50">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button
            className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md"
            onClick={saveChanges}
          >
            <Save className="mr-2 h-4 w-4" />
            Guardar cambios
          </Button>
        </div>
      </div>

      {/* Vista previa del mapa */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between bg-white px-6 py-4 border-b border-gray-100">
          <CardTitle className="text-lg font-medium text-navy-900">Vista previa del mapa</CardTitle>
          <Button variant="outline" size="sm" className="h-8 text-navy-700">
            Ver en sitio público
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative aspect-[21/9] h-[40vh] max-h-[400px]">
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <WorldMap
                onCountryClick={(code) => setSelectedCountry(code)}
                countryData={editableCountryData}
                getCountryColor={(code) => getCountryColor(code, editableCountryData)}
                disablePanning={false}
                showZoomControls={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor de países */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de países */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg h-full">
            <CardHeader className="flex flex-row items-center justify-between bg-white px-6 py-4 border-b border-gray-100">
              <CardTitle className="text-lg font-medium text-navy-900">Países</CardTitle>
              <Button
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white"
                onClick={addNewCountry}
              >
                <Plus className="h-4 w-4 mr-1" />
                Añadir
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar país..."
                    className="pl-10 border-gray-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Tabs defaultValue="todas" onValueChange={setActiveRegion} className="mt-4">
                  <TabsList className="bg-white border border-gray-200 p-1 rounded-lg w-full grid grid-cols-3">
                    <TabsTrigger
                      value="todas"
                      className="rounded-md data-[state=active]:bg-navy-50 data-[state=active]:text-navy-900"
                    >
                      Todas
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
                  </TabsList>
                </Tabs>
              </div>
              <div className="overflow-auto max-h-[60vh]">
                <div className="divide-y divide-gray-100">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map(([code, country]) => (
                      <div
                        key={code}
                        className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${selectedCountry === code ? "bg-navy-50" : ""}`}
                        onClick={() => setSelectedCountry(code)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center">
                            <p className="font-medium text-navy-800">{country.name}</p>
                            <Badge className="ml-2 text-xs">{code}</Badge>
                          </div>
                          <div className="flex items-center mt-1">
                            <Badge
                              className={`text-xs ${
                                country.status === "obligatorio"
                                  ? "bg-green-100 text-green-800"
                                  : country.status === "parcial"
                                    ? "bg-amber-100 text-amber-800"
                                    : country.status === "voluntario"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-violet-100 text-violet-800"
                              }`}
                            >
                              {country.status}
                            </Badge>
                            {country.year && <span className="text-xs text-gray-500 ml-2">Desde {country.year}</span>}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteCountry(code)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <Globe className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No se encontraron países</p>
                      <p className="text-sm text-gray-400 mt-1">Intenta con otra búsqueda o región</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Editor de detalles */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg h-full">
            <CardHeader className="flex flex-row items-center justify-between bg-white px-6 py-4 border-b border-gray-100">
              <CardTitle className="text-lg font-medium text-navy-900">
                {selectedCountry
                  ? `Editar: ${editableCountryData[selectedCountry]?.name || selectedCountry}`
                  : "Detalles del país"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {selectedCountry ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del país</label>
                      <Input
                        value={editableCountryData[selectedCountry].name}
                        onChange={(e) => handleCountryChange(selectedCountry, "name", e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Código ISO</label>
                      <Input value={selectedCountry} disabled className="border-gray-300 bg-gray-50" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estado de facturación</label>
                      <select
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={editableCountryData[selectedCountry].status}
                        onChange={(e) => handleCountryChange(selectedCountry, "status", e.target.value)}
                      >
                        <option value="obligatorio">Obligatorio</option>
                        <option value="parcial">Parcialmente obligatorio</option>
                        <option value="voluntario">Voluntario</option>
                        <option value="planificado">Planificado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Año de implementación</label>
                      <Input
                        type="number"
                        value={editableCountryData[selectedCountry].year || ""}
                        onChange={(e) =>
                          handleCountryChange(
                            selectedCountry,
                            "year",
                            e.target.value ? Number.parseInt(e.target.value) : null,
                          )
                        }
                        className="border-gray-300"
                        placeholder="Año (opcional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Región</label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={editableCountryData[selectedCountry].region}
                      onChange={(e) => handleCountryChange(selectedCountry, "region", e.target.value)}
                    >
                      <option value="america">América</option>
                      <option value="europa">Europa</option>
                      <option value="asia">Asia y Oceanía</option>
                      <option value="africa">África y Medio Oriente</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Detalles</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-2 min-h-[150px]"
                      value={editableCountryData[selectedCountry].details || ""}
                      onChange={(e) => handleCountryChange(selectedCountry, "details", e.target.value)}
                      placeholder="Describe la situación de facturación electrónica en este país..."
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setSelectedCountry(null)}>
                      Cancelar
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white"
                      onClick={() => {
                        // Aquí se implementaría la lógica para guardar los cambios específicos de este país
                        alert(`Cambios en ${editableCountryData[selectedCountry].name} guardados (simulación)`)
                      }}
                    >
                      Guardar país
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[50vh]">
                  <Globe className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-navy-900 mb-2">Selecciona un país</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    Selecciona un país de la lista para editar sus detalles de facturación electrónica o añade uno
                    nuevo.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
