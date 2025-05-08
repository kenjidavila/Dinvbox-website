import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contacto | DINVBOX",
  description:
    "Ponte en contacto con nosotros o agenda una llamada para conocer más sobre nuestras soluciones de facturación electrónica.",
}

export default function ContactPage() {
  return <ContactPageClient />
}
