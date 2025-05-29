"use client"

import { useState, useEffect } from "react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
} from "date-fns"
import { es } from "date-fns/locale"
import { ChevronLeft, ChevronRight, CalendarIcon, List, Grid, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Importamos los tipos y datos del calendario fiscal
import { eventosFiscales, type EventoFiscal, type TipoContribuyente } from "@/components/calendario-fiscal-data"

// Función para verificar si un evento está vencido
const estaVencido = (fecha: Date): boolean => {
  const hoy = new Date()
  // Establecer las horas, minutos, segundos y milisegundos a 0 para comparar solo fechas
  hoy.setHours(0, 0, 0, 0)
  const fechaEvento = new Date(fecha)
  fechaEvento.setHours(0, 0, 0, 0)
  return fechaEvento < hoy
}

// Componente para un día del calendario
const CalendarDay = ({
  day,
  currentMonth,
  selectedDate,
  setSelectedDate,
  eventos,
}: {
  day: Date
  currentMonth: Date
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  eventos: EventoFiscal[]
}) => {
  const isCurrentMonth = isSameMonth(day, currentMonth)
  const isSelected = isSameDay(day, selectedDate)
  const isTodayDate = isToday(day)
  const isPastDate = isBefore(day, new Date()) && !isTodayDate

  // Verificar si hay eventos para este día
  const eventosDelDia = eventos.filter((evento) => isSameDay(evento.fecha, day))

  const hasUrgentEvent = eventosDelDia.some((evento) => evento.urgente)
  const hasVencidoEvent = eventosDelDia.some((evento) => estaVencido(evento.fecha))

  return (
    <div
      className={`h-10 w-10 flex items-center justify-center rounded-full mx-auto
        ${!isCurrentMonth ? "text-gray-300" : ""}
        ${isSelected ? "bg-orange-500 text-white" : ""}
        ${isTodayDate && !isSelected ? "border border-orange-500" : ""}
        ${isPastDate && !isSelected ? "text-gray-400" : ""}
        ${isCurrentMonth && !isSelected ? "hover:bg-gray-100 cursor-pointer" : ""}
      `}
      onClick={() => (isCurrentMonth ? setSelectedDate(day) : null)}
    >
      <div className="relative">
        {day.getDate()}
        {eventosDelDia.length > 0 && !isSelected && (
          <div
            className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full 
              ${hasVencidoEvent ? "bg-gray-400" : hasUrgentEvent ? "bg-red-500" : "bg-orange-400"}`}
          ></div>
        )}
      </div>
    </div>
  )
}

// Componente para un evento en la vista de agenda
const EventoItem = ({ evento }: { evento: EventoFiscal }) => {
  const vencido = estaVencido(evento.fecha)

  return (
    <div
      className={`p-3 rounded-lg mb-2 border-l-4 
        ${
          vencido
            ? "border-l-gray-400 bg-gray-50"
            : evento.urgente
              ? "border-l-red-500 bg-red-50"
              : "border-l-orange-400 bg-orange-50"
        }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className={`font-medium ${vencido ? "text-gray-500" : ""}`}>{evento.descripcion}</p>
          <p className="text-sm text-gray-500">Modelo {evento.modelo}</p>
        </div>
        {vencido ? (
          <Badge className="bg-gray-100 text-gray-600 border-gray-200">Vencido</Badge>
        ) : (
          evento.urgente && <Badge className="bg-red-100 text-red-600 border-red-200">Urgente</Badge>
        )}
      </div>
    </div>
  )
}

// Componente principal del calendario estilo iOS
export default function IOSCalendar({
  open,
  onClose,
  tipoContribuyente: initialTipoContribuyente = "autonomos",
}: {
  open: boolean
  onClose: () => void
  tipoContribuyente?: TipoContribuyente
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"calendar" | "agenda">("calendar")
  const [tipoContribuyente, setTipoContribuyente] = useState<TipoContribuyente>(initialTipoContribuyente)
  const [mostrarVencidos, setMostrarVencidos] = useState<boolean>(true)

  // Resetear la fecha seleccionada cuando se abre el modal
  useEffect(() => {
    if (open) {
      setSelectedDate(new Date())
      setCurrentMonth(new Date())
    }
  }, [open])

  // Filtrar eventos por tipo de contribuyente y estado de vencimiento
  const eventosFiltrados = eventosFiscales.filter((evento) => {
    const cumpleTipo = evento.tipo === tipoContribuyente
    const cumpleVencimiento = mostrarVencidos || !estaVencido(evento.fecha)
    return cumpleTipo && cumpleVencimiento
  })

  // Obtener eventos para la fecha seleccionada
  const eventosDelDia = eventosFiltrados.filter((evento) => isSameDay(evento.fecha, selectedDate))

  // Obtener eventos para el mes actual
  const eventosDelMes = eventosFiltrados.filter((evento) => isSameMonth(evento.fecha, currentMonth))

  // Navegar al mes anterior
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Navegar al mes siguiente
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Obtener los días del mes actual
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Obtener el primer día de la semana (lunes = 1, domingo = 0)
  const startDay = monthStart.getDay() === 0 ? 6 : monthStart.getDay() - 1

  // Crear un array con los días de la semana
  const weekDays = ["L", "M", "X", "J", "V", "S", "D"]

  // Crear filas para el calendario
  const rows = []
  let days = []

  // Agregar días vacíos al principio
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>)
  }

  // Agregar los días del mes
  for (let i = 0; i < daysInMonth.length; i++) {
    days.push(
      <CalendarDay
        key={daysInMonth[i].toString()}
        day={daysInMonth[i]}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        eventos={eventosFiltrados}
      />,
    )

    // Si es el final de la semana o el último día del mes
    if ((startDay + i + 1) % 7 === 0 || i === daysInMonth.length - 1) {
      rows.push(
        <div key={`row-${i}`} className="grid grid-cols-7 gap-1 mb-1">
          {days}
        </div>,
      )
      days = []
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Calendario Fiscal 2025
            </h2>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <div className="flex items-center space-x-2">
              <Tabs
                defaultValue={tipoContribuyente}
                onValueChange={(value) => setTipoContribuyente(value as TipoContribuyente)}
              >
                <TabsList className="bg-gray-100">
                  <TabsTrigger
                    value="autonomos"
                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                  >
                    Autónomos
                  </TabsTrigger>
                  <TabsTrigger
                    value="sociedades"
                    className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                  >
                    Sociedades
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center space-x-2">
              <ToggleGroup
                type="single"
                value={mostrarVencidos ? "todos" : "pendientes"}
                onValueChange={(value) => {
                  if (value) setMostrarVencidos(value === "todos")
                }}
              >
                <ToggleGroupItem value="todos" aria-label="Mostrar todos los eventos">
                  Todos
                </ToggleGroupItem>
                <ToggleGroupItem value="pendientes" aria-label="Solo pendientes">
                  Solo pendientes
                </ToggleGroupItem>
              </ToggleGroup>

              <div className="border-l h-6 mx-2 border-gray-200"></div>

              <Button
                variant="ghost"
                size="icon"
                className={viewMode === "calendar" ? "bg-gray-100" : ""}
                onClick={() => setViewMode("calendar")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === "agenda" ? "bg-gray-100" : ""}
                onClick={() => setViewMode("agenda")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {viewMode === "calendar" ? (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <Button variant="ghost" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="font-medium">
                  {format(currentMonth, "MMMM yyyy", { locale: es }).charAt(0).toUpperCase() +
                    format(currentMonth, "MMMM yyyy", { locale: es }).slice(1)}
                </h3>
                <Button variant="ghost" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-4">
                {/* Días de la semana */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Días del mes */}
                {rows}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium mb-4">
                Eventos del mes:{" "}
                {format(currentMonth, "MMMM yyyy", { locale: es }).charAt(0).toUpperCase() +
                  format(currentMonth, "MMMM yyyy", { locale: es }).slice(1)}
              </h3>

              <div className="space-y-4">
                {eventosDelMes.length > 0 ? (
                  eventosDelMes
                    .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
                    .map((evento) => (
                      <div key={evento.id} className="flex items-start">
                        <div className="w-12 text-center mr-4">
                          <div className={`font-bold ${estaVencido(evento.fecha) ? "text-gray-400" : ""}`}>
                            {format(evento.fecha, "d")}
                          </div>
                          <div className="text-xs text-gray-500">{format(evento.fecha, "EEE", { locale: es })}</div>
                        </div>
                        <EventoItem evento={evento} />
                      </div>
                    ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No hay eventos este mes</p>
                )}
              </div>
            </div>
          )}

          {/* Panel lateral con eventos del día seleccionado */}
          <div className="mt-4">
            <h3 className="font-medium mb-2 flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1 text-orange-500" />
              Eventos para {format(selectedDate, "d MMMM yyyy", { locale: es })}
            </h3>

            <div className="bg-white rounded-lg border border-gray-200 p-4 max-h-[200px] overflow-y-auto">
              {eventosDelDia.length > 0 ? (
                eventosDelDia.map((evento) => <EventoItem key={evento.id} evento={evento} />)
              ) : (
                <p className="text-center text-gray-500 py-4">No hay eventos para este día</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <div className="flex items-center mr-4">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
              <span>Urgente</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="h-3 w-3 rounded-full bg-orange-400 mr-1"></div>
              <span>Normal</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-gray-400 mr-1"></div>
              <span>Vencido</span>
            </div>
          </div>
          <Button variant="default" size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
