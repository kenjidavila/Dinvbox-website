"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    empresa: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.email.includes("@")) {
      setMessage({
        type: "error",
        text: "Por favor, introduce un email válido",
      })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al suscribirse")
      }

      setMessage({
        type: "success",
        text: data.message || "¡Gracias por suscribirte a nuestro newsletter!",
      })

      setFormData({ email: "", nombre: "", empresa: "" })
    } catch (error) {
      console.error("Error al suscribirse:", error)
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Error al suscribirse. Por favor, inténtalo de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="relative mb-16 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 p-8 shadow-xl lg:p-12">
          <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4">
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-20"
            >
              <circle cx="200" cy="200" r="200" fill="white" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4">
            <svg
              width="400"
              height="400"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-20"
            >
              <circle cx="200" cy="200" r="200" fill="white" />
            </svg>
          </div>
          <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white md:text-3xl">Mantente al día con las novedades</h3>
              <p className="mt-4 text-white/90">
                Suscríbete a nuestro newsletter y recibe las últimas actualizaciones sobre facturación electrónica y
                novedades de DINVBOX.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-white"
                  value={formData.nombre}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <Input
                  type="text"
                  name="empresa"
                  placeholder="Tu empresa"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-white"
                  value={formData.empresa}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  name="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-white"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                />
                <Button type="submit" className="bg-white text-orange-500 hover:bg-white/90" disabled={isSubmitting}>
                  {isSubmitting ? "Suscribiendo..." : "Suscribirse"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              {message && (
                <div className={`text-sm font-medium ${message.type === "success" ? "text-white" : "text-red-200"}`}>
                  {message.text}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          <div className="space-y-6">
            <Image src="/images/dinvbox-logo-white.png" alt="DINVBOX" width={180} height={60} className="h-10 w-auto" />
            <p className="text-gray-300 max-w-xs">
              Transformamos la facturación electrónica en una experiencia simple, segura e inteligente para empresas de
              todos los tamaños.
            </p>
            <div className="flex space-x-5">
              <Link href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-6">Soluciones</h3>
            <ul className="space-y-4">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 h-1 w-0 bg-orange-400 transition-all duration-300 group-hover:w-3"></span>
                  Facturación Electrónica
                </Link>
              </li>
              <li>
                <Link
                  href="https://files.dinvbox.mx"
                  className="text-gray-300 hover:text-white transition-colors flex items-center group"
                >
                  <span className="mr-2 h-1 w-0 bg-orange-400 transition-all duration-300 group-hover:w-3"></span>
                  Gestión Documental
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 h-1 w-0 bg-orange-400 transition-all duration-300 group-hover:w-3"></span>
                  Integración API
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-6">Empresa</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/nosotros"
                  className="text-gray-300 hover:text-white transition-colors flex items-center group"
                >
                  <span className="mr-2 h-1 w-0 bg-orange-400 transition-all duration-300 group-hover:w-3"></span>
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 h-1 w-0 bg-orange-400 transition-all duration-300 group-hover:w-3"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 h-1 w-0 bg-orange-400 transition-all duration-300 group-hover:w-3"></span>
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-gray-300 hover:text-white transition-colors flex items-center group"
                >
                  <span className="mr-2 h-1 w-0 bg-orange-400 transition-all duration-300 group-hover:w-3"></span>
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">C/ Marqués de Riscal #11, 3º Ptta. 5 28010 Madrid</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-orange-400 mr-3" />
                <a href="mailto:contacto@dinvbox.es" className="text-gray-300 hover:text-white transition-colors">
                  contacto@dinvbox.es
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-orange-400 mr-3" />
                <a href="tel:+34644783622" className="text-gray-300 hover:text-white transition-colors">
                  +34 644 783 622
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} DINVBOX. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-gray-300 text-sm">
                Términos y Condiciones
              </Link>
              <Link href="/privacidad" className="text-gray-400 hover:text-gray-300 text-sm">
                Privacidad
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-300 text-sm">
                Cookies
              </Link>
              <Link href="/juego" className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                Facturito Jump
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
