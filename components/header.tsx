"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Soluciones", href: "/soluciones" },
  { name: "Precios", href: "/precios" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Blog", href: "/blog" },
  { name: "Contacto", href: "/contacto" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/dinvbox-logo.png"
                alt="DINVBOX"
                width={180}
                height={60}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </motion.div>

          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="relative font-medium text-navy-800 hover:text-orange-500 transition-colors px-1 py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex md:items-center md:space-x-4"
          >
            <Button asChild variant="ghost" className="text-navy-800 hover:text-orange-500 hover:bg-orange-50">
              <a href="https://testing.dinvbox.es/login" target="_blank" rel="noopener noreferrer">
                Iniciar Sesión
              </a>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
            >
              <a href="https://testing.dinvbox.es/login" target="_blank" rel="noopener noreferrer">
                Registrarse
              </a>
            </Button>
          </motion.div>

          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-navy-800"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Abrir menú principal</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-white/95 backdrop-blur-lg md:hidden transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-20 items-center justify-between px-4 sm:px-6">
          <div className="flex-shrink-0">
            <Image src="/images/dinvbox-logo.png" alt="DINVBOX" width={180} height={60} className="h-10 w-auto" />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-navy-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Cerrar menú</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-8 space-y-4 px-4 sm:px-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-3 text-lg font-medium text-navy-800 hover:text-orange-500 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/privacidad"
            className="block py-3 text-lg font-medium text-navy-800 hover:text-orange-500 border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Política de Privacidad
          </Link>
          <div className="mt-8 space-y-4 pt-4">
            <Button asChild variant="ghost" className="w-full justify-center text-navy-800">
              <a href="https://testing.dinvbox.es/login" target="_blank" rel="noopener noreferrer">
                Iniciar Sesión
              </a>
            </Button>
            <Button
              asChild
              className="w-full justify-center bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white rounded-full"
            >
              <a href="https://testing.dinvbox.es/login" target="_blank" rel="noopener noreferrer">
                Registrarse
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
