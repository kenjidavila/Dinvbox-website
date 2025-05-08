"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, Trash2, Eye, Calendar, FileText, Save } from "lucide-react"
import Image from "next/image"

// Datos de ejemplo para los artículos del blog
const initialBlogPosts = [
  {
    id: "digitalizacion-y-cumplimiento",
    slug: "digitalizacion-y-cumplimiento-la-nueva-era-de-la-facturacion",
    title: "Digitalización Y Cumplimiento: La Nueva Era De La Facturación Electrónica Española",
    excerpt:
      "En un mundo cada vez más interconectado, la digitalización no es solo una herramienta, sino una revolución que redefine las reglas del juego económico.",
    date: "10 ENERO, 2025",
    image: "/images/blog/digitalizacion-facturacion.jpg",
    category: "TECH",
    status: "publicado",
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
    status: "publicado",
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
    status: "publicado",
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
    status: "publicado",
  },
  {
    id: "futuro-facturacion-electronica",
    slug: "el-futuro-de-la-facturacion-electronica-tendencias-para-2026",
    title: "El Futuro De La Facturación Electrónica: Tendencias Para 2026",
    excerpt:
      "En DINVBOX sabemos que para ti lo importante es hacer crecer tu negocio, no perderte entre trámites y normativas. Por eso, te explicamos de forma clara la nueva obligación de facturación electrónica entre empresas (B2B) en España.",
    date: "10 ABRIL, 2025",
    image: "/images/blog/facturacion-electronica-2026.jpeg",
    category: "Innovación",
    status: "publicado",
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
    status: "publicado",
  },
]

// Categorías para el filtrado
const categories = ["Todas", "Tendencias", "Internacional", "Normativa", "Innovación", "Tecnología", "PYMES", "TECH"]

export default function AdminBlog() {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [activeTab, setActiveTab] = useState("todos")
  const [selectedPost, setSelectedPost] = useState(null)
  const [editMode, setEditMode] = useState(false)

  // Filtrar posts por búsqueda, categoría y estado
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todas" || post.category === selectedCategory
    const matchesStatus =
      activeTab === "todos" ||
      (activeTab === "publicados" && post.status === "publicado") ||
      (activeTab === "borradores" && post.status === "borrador")
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Función para crear un nuevo artículo
  const createNewPost = () => {
    const newPost = {
      id: `nuevo-articulo-${Date.now()}`,
      slug: `nuevo-articulo-${Date.now()}`,
      title: "Nuevo Artículo",
      excerpt: "Descripción breve del artículo",
      date: new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "LONG", year: "numeric" }).toUpperCase(),
      image: "/blog-post-concept.png",
      category: "Tendencias",
      status: "borrador",
      content: "Contenido del artículo...",
    }

    setBlogPosts([newPost, ...blogPosts])
    setSelectedPost(newPost.id)
    setEditMode(true)
  }

  // Función para eliminar un artículo
  const deletePost = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
      setBlogPosts(blogPosts.filter((post) => post.id !== id))
      if (selectedPost === id) {
        setSelectedPost(null)
        setEditMode(false)
      }
    }
  }

  // Función para actualizar un artículo
  const updatePost = (id, field, value) => {
    setBlogPosts(blogPosts.map((post) => (post.id === id ? { ...post, [field]: value } : post)))
  }

  // Obtener el post seleccionado
  const currentPost = blogPosts.find((post) => post.id === selectedPost)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-900">Administrar Blog</h1>
          <p className="text-gray-500">Gestiona los artículos y contenidos del blog</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md"
            onClick={createNewPost}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nuevo artículo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de artículos */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg h-full">
            <CardHeader className="flex flex-row items-center justify-between bg-white px-6 py-4 border-b border-gray-100">
              <CardTitle className="text-lg font-medium text-navy-900">Artículos</CardTitle>
              <Badge className="bg-gray-100 text-gray-800">
                {filteredPosts.length} de {blogPosts.length}
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar artículo..."
                    className="pl-10 border-gray-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Tabs defaultValue="todos" onValueChange={setActiveTab} className="mt-4">
                  <TabsList className="bg-white border border-gray-200 p-1 rounded-lg w-full grid grid-cols-3">
                    <TabsTrigger
                      value="todos"
                      className="rounded-md data-[state=active]:bg-navy-50 data-[state=active]:text-navy-900"
                    >
                      Todos
                    </TabsTrigger>
                    <TabsTrigger
                      value="publicados"
                      className="rounded-md data-[state=active]:bg-navy-50 data-[state=active]:text-navy-900"
                    >
                      Publicados
                    </TabsTrigger>
                    <TabsTrigger
                      value="borradores"
                      className="rounded-md data-[state=active]:bg-navy-50 data-[state=active]:text-navy-900"
                    >
                      Borradores
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex flex-wrap gap-2 mt-4">
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
              <div className="overflow-auto max-h-[60vh]">
                <div className="divide-y divide-gray-100">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <div
                        key={post.id}
                        className={`flex items-start p-4 hover:bg-gray-50 cursor-pointer ${selectedPost === post.id ? "bg-navy-50" : ""}`}
                        onClick={() => {
                          setSelectedPost(post.id)
                          setEditMode(false)
                        }}
                      >
                        <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 mr-4">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-navy-800 truncate">{post.title}</p>
                            <Badge
                              className={`ml-2 ${
                                post.status === "publicado"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {post.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{post.excerpt}</p>
                          <div className="flex items-center mt-1">
                            <Badge className="bg-gray-100 text-gray-600">{post.category}</Badge>
                            <span className="text-xs text-gray-500 ml-2 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {post.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No se encontraron artículos</p>
                      <p className="text-sm text-gray-400 mt-1">Intenta con otra búsqueda o categoría</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Editor de artículos */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg h-full">
            <CardHeader className="flex flex-row items-center justify-between bg-white px-6 py-4 border-b border-gray-100">
              <CardTitle className="text-lg font-medium text-navy-900">
                {!selectedPost
                  ? "Detalles del artículo"
                  : editMode
                    ? `Editando: ${currentPost?.title}`
                    : currentPost?.title}
              </CardTitle>
              {selectedPost && !editMode && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-navy-700"
                    onClick={() => window.open(`/blog/${currentPost.slug}`, "_blank")}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 bg-navy-700 hover:bg-navy-800 text-white"
                    onClick={() => setEditMode(true)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-6">
              {!selectedPost ? (
                <div className="flex flex-col items-center justify-center h-[50vh]">
                  <FileText className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-navy-900 mb-2">Selecciona un artículo</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    Selecciona un artículo de la lista para ver sus detalles o crear uno nuevo.
                  </p>
                </div>
              ) : editMode ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <Input
                      value={currentPost.title}
                      onChange={(e) => updatePost(currentPost.id, "title", e.target.value)}
                      className="border-gray-300"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                      <Input
                        value={currentPost.slug}
                        onChange={(e) => updatePost(currentPost.id, "slug", e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                      <select
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={currentPost.category}
                        onChange={(e) => updatePost(currentPost.id, "category", e.target.value)}
                      >
                        {categories
                          .filter((c) => c !== "Todas")
                          .map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Extracto</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-2 min-h-[80px]"
                      value={currentPost.excerpt}
                      onChange={(e) => updatePost(currentPost.id, "excerpt", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagen destacada</label>
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-32 rounded-md overflow-hidden">
                        <Image
                          src={currentPost.image || "/placeholder.svg"}
                          alt={currentPost.title}
                          width={128}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <Input
                        value={currentPost.image}
                        onChange={(e) => updatePost(currentPost.id, "image", e.target.value)}
                        className="border-gray-300 flex-1"
                        placeholder="URL de la imagen"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-2 min-h-[200px]"
                      value={currentPost.content || ""}
                      onChange={(e) => updatePost(currentPost.id, "content", e.target.value)}
                      placeholder="Contenido del artículo en formato HTML o Markdown..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                      <select
                        className="w-full border border-gray-300 rounded-md p-2"
                        value={currentPost.status}
                        onChange={(e) => updatePost(currentPost.id, "status", e.target.value)}
                      >
                        <option value="borrador">Borrador</option>
                        <option value="publicado">Publicado</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                      <Input
                        value={currentPost.date}
                        onChange={(e) => updatePost(currentPost.id, "date", e.target.value)}
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditMode(false)
                        // Revertir cambios si se cancela (en una aplicación real)
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white"
                      onClick={() => {
                        setEditMode(false)
                        // Aquí se implementaría la lógica para guardar los cambios
                        alert(`Artículo "${currentPost.title}" guardado (simulación)`)
                      }}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Guardar artículo
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative rounded-lg overflow-hidden aspect-video">
                    <Image
                      src={currentPost.image || "/placeholder.svg"}
                      alt={currentPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className="bg-gray-100 text-gray-600">{currentPost.category}</Badge>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {currentPost.date}
                    </span>
                    <Badge
                      className={`${
                        currentPost.status === "publicado"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {currentPost.status}
                    </Badge>
                  </div>

                  <h2 className="text-2xl font-bold text-navy-900">{currentPost.title}</h2>
                  <p className="text-gray-600">{currentPost.excerpt}</p>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-medium text-navy-900 mb-2">Contenido</h3>
                    <div className="prose max-w-none">
                      {currentPost.content ? (
                        <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
                      ) : (
                        <p className="text-gray-500 italic">
                          Este artículo no tiene contenido detallado. Haz clic en "Editar" para añadir contenido.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => deletePost(currentPost.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </Button>
                    <Button className="bg-navy-700 hover:bg-navy-800 text-white" onClick={() => setEditMode(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
