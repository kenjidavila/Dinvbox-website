"use client"
import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Calendar, Agenda } from "react-native-calendars"
import { isSameMonth } from "date-fns"
import type { Event } from "../types" // Import Event

interface IOSCalendarProps {
  eventos: Event[]
  viewMode: "calendar" | "agenda"
}

function IOSCalendar({
  open,
  onClose,
  tipoContribuyente: initialTipoContribuyente = "autonomos",
  eventos,
  viewMode,
}: IOSCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const eventosFiltrados = eventos.map((evento) => ({
    ...evento,
    fecha: new Date(evento.fecha),
  }))

  // Obtener eventos para el mes actual
  const eventosDelMes = eventosFiltrados.filter(
    (evento) => isSameMonth(evento.fecha, currentMonth) && (viewMode === "calendar" || evento.fecha >= new Date()), // Solo filtrar fechas pasadas en vista agenda
  )

  const markedDates = eventosDelMes.reduce((acc, evento) => {
    const dateString = evento.fecha.toISOString().split("T")[0]
    acc[dateString] = { marked: true }
    return acc
  }, {})

  const renderItem = (item: Event) => {
    return (
      <View style={styles.item}>
        <Text>{item.nombre}</Text>
      </View>
    )
  }

  return (
    <View>
      {viewMode === "calendar" ? (
        <Calendar
          markedDates={markedDates}
          onMonthChange={(month) => {
            setCurrentMonth(new Date(month.year, month.month - 1, month.day))
          }}
        />
      ) : (
        <Agenda
          items={eventosDelMes.reduce((acc, evento) => {
            const dateString = evento.fecha.toISOString().split("T")[0]
            if (!acc[dateString]) {
              acc[dateString] = []
            }
            acc[dateString].push(evento)
            return acc
          }, {})}
          renderItem={renderItem}
          onDayPress={(day) => {
            setCurrentMonth(new Date(day.year, day.month - 1, day.day))
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
})

export { IOSCalendar }
export default IOSCalendar
