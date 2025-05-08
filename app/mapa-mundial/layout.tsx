import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mapa Mundial de Facturación Electrónica | DINVBOX",
  description:
    "Descubre el estado de la facturación electrónica en diferentes países del mundo con nuestro mapa interactivo.",
}

export default function MapaMundialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
