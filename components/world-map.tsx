"use client"

import { useRef, useEffect, useState } from "react"
import * as d3 from "d3"
import { feature } from "topojson-client"

const WorldMap = ({ onCountryClick, countryData, disablePanning = true, showZoomControls = true }) => {
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Función para actualizar las dimensiones del contenedor
  const updateDimensions = () => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect()
      // Usamos una relación de aspecto de 21:9 para un mapa más alargado/rectangular
      setDimensions({
        width,
        height: width * 0.42, // Relación de aspecto 21:9 (más alargada)
      })
    }
  }

  useEffect(() => {
    // Actualizar dimensiones iniciales
    updateDimensions()

    // Configurar el listener para redimensionar
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const fetchAndRenderMap = async () => {
      try {
        // Cargar datos del mapa mundial (TopoJSON)
        const response = await fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
        const worldData = await response.json()

        // Convertir TopoJSON a GeoJSON
        const countries = feature(worldData, worldData.objects.countries)

        renderMap(countries)
      } catch (error) {
        console.error("Error loading map data:", error)
      }
    }

    const renderMap = (countries) => {
      if (!svgRef.current || dimensions.width === 0) return

      // Limpiar SVG existente
      d3.select(svgRef.current).selectAll("*").remove()

      // Crear proyección del mapa - Usamos Equirectangular para un aspecto más rectangular
      const projection = d3
        .geoEquirectangular()
        .fitSize([dimensions.width, dimensions.height], countries)
        .precision(0.1)

      // Crear generador de paths
      const pathGenerator = d3.geoPath().projection(projection)

      // Crear SVG
      const svg = d3
        .select(svgRef.current)
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .attr("viewBox", [0, 0, dimensions.width, dimensions.height])
        .attr("style", "max-width: 100%; height: auto;")

      // Función para determinar el color del país
      const getCountryColor = (d) => {
        const countryCode = getCountryCode(d)
        if (!countryData[countryCode]) return "#1e3a5f" // Color por defecto (azul oscuro)

        const status = countryData[countryCode].status
        switch (status) {
          case "obligatorio":
            return "#f97316" // orange-500
          case "parcial":
            return "#f59e0b" // amber-500
          case "voluntario":
            return "#3b82f6" // blue-500
          case "planificado":
            return "#8b5cf6" // violet-500
          default:
            return "#1e3a5f" // navy-800
        }
      }

      // Función para obtener el código ISO del país
      const getCountryCode = (d) => {
        // Mapeo de IDs de países a códigos ISO
        const countryMapping = {
          // América Latina
          484: "MX", // México
          170: "CO", // Colombia
          218: "EC", // Ecuador
          152: "CL", // Chile
          76: "BR", // Brasil
          32: "AR", // Argentina
          604: "PE", // Perú
          858: "UY", // Uruguay

          // Europa
          724: "ES", // España
          276: "DE", // Alemania
          250: "FR", // Francia
          380: "IT", // Italia
          56: "BE", // Bélgica
          233: "EE", // Estonia
          428: "LV", // Letonia

          // Asia y Oceanía
          356: "IN", // India
          156: "CN", // China
          36: "AU", // Australia
          458: "MY", // Malasia

          // África y Medio Oriente
          818: "EG", // Egipto
          682: "SA", // Arabia Saudita
          784: "AE", // Emiratos Árabes Unidos
          72: "BW", // Botsuana

          // Otros países comunes
          840: "US", // Estados Unidos
          826: "GB", // Reino Unido
          124: "CA", // Canadá
          392: "JP", // Japón
          410: "KR", // Corea del Sur
          756: "CH", // Suiza
          578: "NO", // Noruega
          752: "SE", // Suecia
          208: "DK", // Dinamarca
          246: "FI", // Finlandia
          528: "NL", // Países Bajos
          620: "PT", // Portugal
          300: "GR", // Grecia
          372: "IE", // Irlanda
          40: "AT", // Austria
          616: "PL", // Polonia
          203: "CZ", // República Checa
          348: "HU", // Hungría
          642: "RO", // Rumania
          100: "BG", // Bulgaria
          705: "SI", // Eslovenia
          703: "SK", // Eslovaquia
          191: "HR", // Croacia
          440: "LT", // Lituania
          196: "CY", // Chipre
          470: "MT", // Malta
          352: "IS", // Islandia
          438: "LI", // Liechtenstein
          442: "LU", // Luxemburgo
        }

        return countryMapping[d.id] || null
      }

      // Añadir un fondo oceánico
      svg.append("rect").attr("width", dimensions.width).attr("height", dimensions.height).attr("fill", "#f5f5f5") // Color gris más suave para el océano

      // Dibujar países
      const countriesGroup = svg.append("g")

      countriesGroup
        .selectAll("path")
        .data(countries.features)
        .join("path")
        .attr("fill", getCountryColor)
        .attr("d", pathGenerator)
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 0.5)
        .attr("class", "country")
        .style("cursor", (d) => (getCountryCode(d) && countryData[getCountryCode(d)] ? "pointer" : "default"))
        .on("mouseover", function () {
          d3.select(this).transition().duration(200).attr("stroke", "#000").attr("stroke-width", 1)
        })
        .on("mouseout", function () {
          d3.select(this).transition().duration(200).attr("stroke", "#ffffff").attr("stroke-width", 0.5)
        })
        .on("click", (event, d) => {
          const countryCode = getCountryCode(d)
          if (countryCode && countryData[countryCode]) {
            onCountryClick(countryCode)
          }
        })
        .append("title")
        .text((d) => {
          const countryCode = getCountryCode(d)
          return countryData[countryCode]?.name || d.properties.name
        })

      // Añadir zoom y pan
      const zoom = d3
        .zoom()
        .scaleExtent([1, 8])
        .on("zoom", (event) => {
          // Solo aplicar la transformación si es un evento de zoom (no de pan) o si el panning no está deshabilitado
          if (!disablePanning || (event.sourceEvent && event.sourceEvent.type === "wheel")) {
            countriesGroup.attr("transform", event.transform)
          }
        })

      // Deshabilitar el panning con el mouse si disablePanning es true
      if (disablePanning) {
        svg
          .call(zoom)
          .on("mousedown.zoom", null) // Deshabilitar el inicio del pan
          .on("touchstart.zoom", null) // Deshabilitar el inicio del pan en dispositivos táctiles
          .on("touchmove.zoom", null) // Deshabilitar el movimiento del pan en dispositivos táctiles
          .on("touchend.zoom", null) // Deshabilitar el fin del pan en dispositivos táctiles
      } else {
        svg.call(zoom)
      }

      // Añadir controles de zoom estilizados si showZoomControls es true
      if (showZoomControls) {
        const zoomControls = svg
          .append("g")
          .attr("class", "zoom-controls")
          .attr("transform", `translate(${dimensions.width - 50}, 20)`)

        // Función para crear tooltip
        const appendTooltip = (button, text) => {
          button
            .on("mouseover", (event) => {
              const [x, y] = d3.pointer(event, svg.node())

              svg
                .append("rect")
                .attr("class", "tooltip-bg")
                .attr("x", x - 40)
                .attr("y", y - 30)
                .attr("width", 80)
                .attr("height", 20)
                .attr("rx", 4)
                .attr("fill", "rgba(0,0,0,0.7)")

              svg
                .append("text")
                .attr("class", "tooltip-text")
                .attr("x", x)
                .attr("y", y - 16)
                .attr("text-anchor", "middle")
                .attr("font-size", 12)
                .attr("fill", "white")
                .text(text)
            })
            .on("mouseout", () => {
              svg.selectAll(".tooltip-bg, .tooltip-text").remove()
            })
        }

        // Estilo común para los botones
        const createZoomButton = (y, symbol, tooltip, action) => {
          // Grupo para el botón
          const buttonGroup = zoomControls.append("g").attr("transform", `translate(0, ${y})`)

          // Sombra del botón
          buttonGroup
            .append("rect")
            .attr("x", 2)
            .attr("y", 2)
            .attr("width", 36)
            .attr("height", 36)
            .attr("rx", 8)
            .attr("fill", "rgba(0,0,0,0.1)")

          // Fondo del botón
          const button = buttonGroup
            .append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 36)
            .attr("height", 36)
            .attr("rx", 8)
            .attr("fill", "white")
            .attr("stroke", "#e2e8f0")
            .attr("stroke-width", 1)
            .attr("cursor", "pointer")
            .on("mouseover", function () {
              d3.select(this).attr("fill", "#f8fafc").attr("stroke", "#cbd5e1")
            })
            .on("mouseout", function () {
              d3.select(this).attr("fill", "white").attr("stroke", "#e2e8f0")
            })
            .on("mousedown", function () {
              d3.select(this).attr("fill", "#f1f5f9")
            })
            .on("mouseup", function () {
              d3.select(this).attr("fill", "#f8fafc")
            })
            .on("click", action)

          // Texto del botón
          buttonGroup
            .append("text")
            .attr("x", 18)
            .attr("y", 18)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("font-size", symbol === "R" ? 14 : 18)
            .attr("font-weight", "bold")
            .attr("fill", "#475569")
            .attr("pointer-events", "none")
            .text(symbol)

          appendTooltip(button, tooltip)

          return buttonGroup
        }

        // Botón de zoom in
        createZoomButton(0, "+", "Acercar", () => {
          svg.transition().duration(300).call(zoom.scaleBy, 1.5)
        })

        // Botón de zoom out
        createZoomButton(46, "−", "Alejar", () => {
          svg.transition().duration(300).call(zoom.scaleBy, 0.75)
        })

        // Botón de reset zoom
        createZoomButton(92, "R", "Restablecer", () => {
          svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity)
        })
      }
    }

    if (dimensions.width > 0) {
      fetchAndRenderMap()
    }
  }, [dimensions, countryData, onCountryClick, disablePanning, showZoomControls])

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-[#f5f5f5]"
      style={{ minHeight: "400px" }}
    >
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  )
}

export default WorldMap
