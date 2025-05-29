"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns"
import { Edit, Trash2, Plus, Search, AlertTriangle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  eventosFiscales,
  type EventoFiscal,
  type TipoContribuyente,
  type TipoModelo,
} from "@/components/calendario-fiscal-data"

// Función para verificar si un evento está vencido
const estaVencido = (fecha: Date): boolean => {
  const hoy = new Date()
  // Establecer las horas, minutos, segundos y milisegundos a 0 para comparar solo fechas
  hoy.setHours(0, 0, 0, 0)
  const fechaEvento = new Date(fecha)
  fechaEvento.setHours(0, 0, 0, 0)
  return fechaEvento < hoy
}

export default function CalendarioFiscalAdmin() {
  // Estado para almacenar los eventos
  const [eventos, setEventos] = useState<EventoFiscal[]>(eventosFiscales)
  const [filteredEventos, setFilteredEventos] = useState<EventoFiscal[]>(eventosFiscales)

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("")
  const [tipoFiltro, setTipoFiltro] = useState<TipoContribuyente | "todos">("todos")
  const [modeloFiltro, setModeloFiltro] = useState<string>("todos")
  const [urgenteFiltro, setUrgenteFiltro] = useState<boolean | null>(null)
  const [vencidoFiltro, setVencidoFiltro] = useState<boolean | null>(null)

  // Estados para el modal de edición/creación
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentEvento, setCurrentEvento] = useState<EventoFiscal | null>(null)
  const [isNewEvento, setIsNewEvento] = useState(false)

  // Estados para el formulario
  const [formData, setFormData] = useState({
    id: "",
    fecha: "",
    descripcion: "",
    modelo: "" as TipoModelo,
    tipo: "autonomos" as TipoContribuyente,
    urgente: false,
  })

  // Modelos disponibles
  const modelos: TipoModelo[] = [
    "036",
    "100",
    "102",
    "111",
    "115",
    "123",
    "130",
    "131",
    "180",
    "190",
    "193",
    "200",
    "202",
    "303",
    "347",
    "349",
    "390",
    "714",
    "720",
    "721",
  ]

  // Efecto para aplicar filtros
  useEffect(() => {
    let filtered = [...eventos]

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (evento) =>
          evento.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
          evento.modelo.toString().includes(searchTerm),
      )
    }

    // Filtrar por tipo de contribuyente
    if (tipoFiltro !== "todos") {
      filtered = filtered.filter((evento) => evento.tipo === tipoFiltro)
    }

    // Filtrar por modelo
    if (modeloFiltro !== "todos") {
      filtered = filtered.filter((evento) => evento.modelo === modeloFiltro)
    }

    // Filtrar por urgencia
    if (urgenteFiltro !== null) {
      filtered = filtered.filter((evento) => evento.urgente === urgenteFiltro)
    }

    // Filtrar por estado de vencimiento
    if (vencidoFiltro !== null) {
      filtered = filtered.filter((evento) => estaVencido(evento.fecha) === vencidoFiltro)
    }

    // Ordenar por fecha
    filtered.sort((a, b) => a.fecha.getTime() - b.fecha.getTime())

    setFilteredEventos(filtered)
  }, [eventos, searchTerm, tipoFiltro, modeloFiltro, urgenteFiltro, vencidoFiltro])

  // Función para abrir el modal de edición
  const handleEdit = (evento: EventoFiscal) => {
    setCurrentEvento(evento)
    setIsNewEvento(false)
    setFormData({
      id: evento.id,
      fecha: format(evento.fecha, "yyyy-MM-dd"),
      descripcion: evento.descripcion,
      modelo: evento.modelo,
      tipo: evento.tipo,
      urgente: evento.urgente || false,
    })
    setIsDialogOpen(true)
  }

  // Función para abrir el modal de creación
  const handleCreate = () => {
    setCurrentEvento(null)
    setIsNewEvento(true)
    setFormData({
      id: `evento-${Date.now()}`,
      fecha: format(new Date(), "yyyy-MM-dd"),
      descripcion: "",
      modelo: "111",
      tipo: "autonomos",
      urgente: false,
    })
    setIsDialogOpen(true)
  }

  // Función para abrir el modal de eliminación
  const handleDeleteConfirm = (evento: EventoFiscal) => {
    setCurrentEvento(evento)
    setIsDeleteDialogOpen(true)
  }

  // Función para eliminar un evento
  const handleDelete = () => {
    if (currentEvento) {
      const updatedEventos = eventos.filter((e) => e.id !== currentEvento.id)
      setEventos(updatedEventos)
      setIsDeleteDialogOpen(false)
      // Aquí se implementaría la lógica para guardar en la base de datos
    }
  }

  // Función para manejar cambios en el formulario
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Función para manejar cambios en el checkbox
  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      urgente: checked,
    })
  }

  // Función para guardar un evento
  const handleSave = () => {
    const newEvento: EventoFiscal = {
      id: formData.id,
      fecha: parseISO(formData.fecha),
      descripcion: formData.descripcion,
      modelo: formData.modelo as TipoModelo,
      tipo: formData.tipo,
      urgente: formData.urgente,
    }

    if (isNewEvento) {
      setEventos([...eventos, newEvento])
    } else {
      const updatedEventos = eventos.map((e) => (e.id === newEvento.id ? newEvento : e))
      setEventos(updatedEventos)
    }

    setIsDialogOpen(false)
    // Aquí se implementaría la lógica para guardar en la base de datos
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-900">Calendario Fiscal</h1>
          <p className="text-gray-500">Gestiona los eventos del calendario fiscal</p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-md rounded-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Evento
        </Button>
      </div>

      {/* Filtros */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Buscar por descripción o modelo"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tipo">Tipo de Contribuyente</Label>
              <Select value={tipoFiltro} onValueChange={(value) => setTipoFiltro(value as TipoContribuyente | "todos")}>
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="autonomos">Autónomos</SelectItem>
                  <SelectItem value="sociedades">Sociedades</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="modelo">Modelo</Label>
              <Select value={modeloFiltro} onValueChange={(value) => setModeloFiltro(value)}>
                <SelectTrigger id="modelo">
                  <SelectValue placeholder="Seleccionar modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  {modelos.map((modelo) => (
                    <SelectItem key={modelo} value={modelo}>
                      {modelo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="urgente">Urgencia</Label>
              <Select
                value={urgenteFiltro === null ? "todos" : urgenteFiltro ? "urgente" : "normal"}
                onValueChange={(value) => {
                  if (value === "todos") setUrgenteFiltro(null)
                  else if (value === "urgente") setUrgenteFiltro(true)
                  else setUrgenteFiltro(false)
                }}
              >
                <SelectTrigger id="urgente">
                  <SelectValue placeholder="Seleccionar urgencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="vencido">Estado</Label>
              <Select
                value={vencidoFiltro === null ? "todos" : vencidoFiltro ? "vencido" : "pendiente"}
                onValueChange={(value) => {
                  if (value === "todos") setVencidoFiltro(null)
                  else if (value === "vencido") setVencidoFiltro(true)
                  else setVencidoFiltro(false)
                }}
              >
                <SelectTrigger id="vencido">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="vencido">Vencido</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de eventos */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Eventos del Calendario ({filteredEventos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Fecha</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Descripción</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Modelo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Tipo</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Estado</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredEventos.map((evento) => {
                  const vencido = estaVencido(evento.fecha)
                  return (
                    <tr key={evento.id} className={`hover:bg-gray-50 ${vencido ? "bg-gray-50" : ""}`}>
                      <td className="py-3 px-4">{format(evento.fecha, "dd/MM/yyyy")}</td>
                      <td className={`py-3 px-4 ${vencido ? "text-gray-500" : ""}`}>{evento.descripcion}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-gray-100">
                          {evento.modelo}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            evento.tipo === "autonomos"
                              ? "bg-blue-100 text-blue-600 border-blue-200"
                              : "bg-green-100 text-green-600 border-green-200"
                          }
                        >
                          {evento.tipo === "autonomos" ? "Autónomos" : "Sociedades"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {vencido ? (
                          <Badge className="bg-gray-100 text-gray-600 border-gray-200">
                            <Clock className="h-3 w-3 mr-1" />
                            Vencido
                          </Badge>
                        ) : evento.urgente ? (
                          <Badge className="bg-red-100 text-red-600 border-red-200">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Urgente
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-600 border-green-200">Pendiente</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(evento)}>
                            <Edit className="h-4 w-4 text-gray-500" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteConfirm(evento)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {filteredEventos.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      No se encontraron eventos con los filtros seleccionados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de edición/creación */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isNewEvento ? "Crear nuevo evento" : "Editar evento"}</DialogTitle>
            <DialogDescription>
              {isNewEvento
                ? "Añade un nuevo evento al calendario fiscal"
                : "Modifica los detalles del evento seleccionado"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fecha" className="text-right">
                Fecha
              </Label>
              <Input
                id="fecha"
                name="fecha"
                type="date"
                value={formData.fecha}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descripcion" className="text-right">
                Descripción
              </Label>
              <Input
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleFormChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modelo-select" className="text-right">
                Modelo
              </Label>
              <Select
                value={formData.modelo}
                onValueChange={(value) => setFormData({ ...formData, modelo: value as TipoModelo })}
              >
                <SelectTrigger id="modelo-select" className="col-span-3">
                  <SelectValue placeholder="Seleccionar modelo" />
                </SelectTrigger>
                <SelectContent>
                  {modelos.map((modelo) => (
                    <SelectItem key={modelo} value={modelo}>
                      {modelo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tipo-select" className="text-right">
                Tipo
              </Label>
              <Select
                value={formData.tipo}
                onValueChange={(value) => setFormData({ ...formData, tipo: value as TipoContribuyente })}
              >
                <SelectTrigger id="tipo-select" className="col-span-3">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="autonomos">Autónomos</SelectItem>
                  <SelectItem value="sociedades">Sociedades</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="urgente-check" className="text-right">
                Urgente
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox id="urgente-check" checked={formData.urgente} onCheckedChange={handleCheckboxChange} />
                <label
                  htmlFor="urgente-check"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Marcar como urgente
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación de eliminación */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este evento del calendario fiscal? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>

          {currentEvento && (
            <div className="py-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="font-medium">{currentEvento.descripcion}</p>
                <p className="text-sm text-gray-500">
                  Fecha: {format(currentEvento.fecha, "dd/MM/yyyy")} | Modelo: {currentEvento.modelo} | Tipo:{" "}
                  {currentEvento.tipo === "autonomos" ? "Autónomos" : "Sociedades"}
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
