import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Edit, Save, Calendar, FileText } from "lucide-react"

export default function BlogAdminGuide() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-navy-900">Panel de Administración del Blog</h2>
        <p className="text-gray-600">
          El panel de administración te permite crear, editar y gestionar todos los artículos del blog de DINVBOX.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Plus className="h-5 w-5 text-orange-500" />
                </div>
                <h3 className="text-lg font-medium text-navy-900">Paso 1: Crear nuevo artículo</h3>
              </div>
              <p className="text-gray-600">
                Haz clic en el botón "Nuevo artículo" ubicado en la parte superior derecha del panel.
              </p>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src="/placeholder.svg?key=il97g"
                  alt="Botón nuevo artículo"
                  width={400}
                  height={200}
                  className="w-full"
                />
              </div>
              <div className="flex justify-center">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo artículo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-navy-100 flex items-center justify-center">
                  <Edit className="h-5 w-5 text-navy-500" />
                </div>
                <h3 className="text-lg font-medium text-navy-900">Paso 2: Completar información</h3>
              </div>
              <p className="text-gray-600">Completa todos los campos del formulario con la información del artículo.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-navy-800">Título del artículo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-navy-800">Fecha de publicación</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h10M7 16h10" />
                  </svg>
                  <span className="text-navy-800">Extracto o resumen</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-navy-800">Imagen destacada</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-navy-800">Contenido completo</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Save className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="text-lg font-medium text-navy-900">Paso 3: Guardar y publicar</h3>
              </div>
              <p className="text-gray-600">
                Selecciona el estado del artículo (borrador o publicado) y guarda los cambios.
              </p>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src="/placeholder.svg?key=dzxie"
                  alt="Opciones de publicación"
                  width={400}
                  height={200}
                  className="w-full"
                />
              </div>
              <div className="flex justify-center gap-3">
                <Button variant="outline" className="border-gray-300">
                  Guardar borrador
                </Button>
                <Button className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white">
                  <Save className="mr-2 h-4 w-4" />
                  Publicar artículo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-navy-900">Paso 4: Gestionar artículos</h3>
              </div>
              <p className="text-gray-600">
                Desde el panel principal puedes ver, editar, eliminar y cambiar el estado de todos tus artículos.
              </p>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src="/placeholder.svg?key=damnr"
                  alt="Lista de artículos"
                  width={400}
                  height={200}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <span className="text-navy-800 font-medium">Digitalización Y Cumplimiento</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 text-navy-700">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-navy-700">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-navy-50 p-4 rounded-lg">
        <h3 className="font-medium text-navy-900 mb-2">Consejos para crear contenido efectivo:</h3>
        <ul className="list-disc pl-5 space-y-1 text-navy-700">
          <li>Utiliza títulos claros y descriptivos que incluyan palabras clave relevantes</li>
          <li>Incluye imágenes de alta calidad para hacer el contenido más atractivo</li>
          <li>Estructura el contenido con subtítulos para facilitar la lectura</li>
          <li>Revisa la ortografía y gramática antes de publicar</li>
          <li>Mantén un calendario editorial para publicar contenido regularmente</li>
        </ul>
      </div>
    </div>
  )
}
