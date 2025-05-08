"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, ArrowRight } from "lucide-react"

// Datos de ejemplo para los artículos del blog
const blogPosts = [
  {
    id: "digitalizacion-y-cumplimiento",
    slug: "digitalizacion-y-cumplimiento-la-nueva-era-de-la-facturacion",
    title: "Digitalización Y Cumplimiento: La Nueva Era De La Facturación Electrónica Española",
    excerpt:
      "En un mundo cada vez más interconectado, la digitalización no es solo una herramienta, sino una revolución que redefine las reglas del juego económico.",
    date: "10 ENERO, 2025",
    image: "/images/blog/digitalizacion-facturacion.jpg",
    category: "TECH",
  },
  {
    id: "mexico-espana-cercanos",
    slug: "mexico-y-espana-mas-cercanos-que-nunca",
    title: "México y España: Más Cercanos Que Nunca",
    excerpt:
      "En pleno siglo XXI, México y España han afianzado una relación estratégica que va mucho más allá de lo económico, cimentada en una historia común.",
    date: "16 ENERO, 2025",
    image: "/images/blog/mexico-espana-cercanos.jpg",
    category: "Internacional",
  },
  {
    id: "facturacion-electronica-mexico-espana",
    slug: "por-que-la-facturacion-electronica-es-esencial-para-tu-expansion-mexico-espana",
    title: "¿Por Qué La Facturación Electrónica Es Esencial Para Tu Expansión México-España?",
    excerpt:
      "La facturación electrónica ha dejado de ser una tendencia para convertirse en un requisito indispensable para empresas que operan entre México y España.",
    date: "14 FEBRERO, 2025",
    image: "/images/blog/facturacion-mexico-espana.jpg",
    category: "Internacional",
  },
  {
    id: "facturacion-electronica-espana",
    slug: "facturacion-electronica-en-espana-que-debes-saber-para-operar-sin-errores",
    title: "Facturación Electrónica En España: ¿Que Debes Saber Para Operar Sin Errores?",
    excerpt:
      "Guía completa sobre los requisitos legales y mejores prácticas para la facturación electrónica en España.",
    date: "21 MARZO, 2025",
    image: "/images/blog/facturacion-espana.jpg",
    category: "Normativa",
  },
  {
    id: "futuro-facturacion-electronica",
    slug: "el-futuro-de-la-facturacion-electronica-tendencias-para-2026",
    title: "El Futuro De La Facturación Electrónica: Tendencias Para 2026",
    excerpt:
      "Análisis de las próximas tendencias y tecnologías que transformarán la facturación electrónica en los próximos años.",
    date: "10 ABRIL, 2025",
    image: "/images/blog/facturacion-electronica-2026.jpeg",
    category: "Innovación",
  },
  {
    id: "verifactu-guia",
    slug: "verifactu-se-acerca-lo-que-todo-emprendedor-y-autonomo-debe-saber",
    title: "VeriFactu se acerca: lo que todo emprendedor y autónomo debe saber para adaptarse sin líos",
    excerpt:
      "En DINVBOX sabemos que muchos negocios aún no están listos para la llegada de VeriFactu. Pero también sabemos que esta transformación es una gran oportunidad para automatizar, cumplir sin errores y avanzar con confianza.",
    date: "07 MAYO, 2025",
    image: "/images/blog/verifactu-guia.jpeg",
    category: "PYMES",
  },
]

// Categorías para el filtrado
const categories = ["Todas", "Tendencias", "Internacional", "Normativa", "Innovación", "Tecnología", "PYMES"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")

  // Filtrar posts por búsqueda y categoría
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todas" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
              Blog DINVBOX
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Mantente al día con las últimas noticias, tendencias y consejos sobre facturación electrónica, normativas
              fiscales y optimización de procesos empresariales.
            </p>
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

      {/* Blog Content */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar artículos..."
                className="pl-10 border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "border-gray-200 text-gray-700"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="overflow-hidden rounded-xl mb-4 aspect-[4/3] relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full h-1/2"></div>
                    <div className="absolute bottom-4 left-4 flex items-center text-white text-sm font-medium">
                      <Calendar className="h-4 w-4 mr-2" />
                      {post.date}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-orange-500">{post.category}</span>
                    <h3 className="text-xl font-bold text-navy-900 mt-2 group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-gray-600 line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 inline-flex items-center text-orange-500 font-medium">
                      Leer más <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No se encontraron artículos que coincidan con tu búsqueda.</p>
              <Button
                variant="outline"
                className="mt-4 border-orange-500 text-orange-500 hover:bg-orange-50"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("Todas")
                }}
              >
                Mostrar todos los artículos
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
