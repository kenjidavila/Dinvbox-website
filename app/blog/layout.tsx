import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | DINVBOX - Facturación Electrónica Inteligente",
  description:
    "Artículos, guías y noticias sobre facturación electrónica, normativas fiscales y optimización de procesos empresariales.",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
