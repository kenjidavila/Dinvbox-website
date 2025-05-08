"use client"

import { useEffect } from "react"
import Script from "next/script"

export default function CalendlyWidget() {
  useEffect(() => {
    // Esta función se ejecutará cuando el componente se monte
    // y asegurará que el widget de Calendly se inicialice correctamente
    return () => {
      // Limpieza cuando el componente se desmonte
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]',
      )
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="calendly-container">
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/kenji-davila-i"
        style={{ minWidth: "320px", height: "600px" }}
      ></div>

      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" async />

      <style jsx>{`
        .calendly-container {
          width: 100%;
          overflow: hidden;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
        }
      `}</style>
    </div>
  )
}
