"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import emailjs from "@emailjs/browser"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    empresa: "",
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    ciudad: "",
    mensaje: "",
    recibirInfo: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)

  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init("mcnz3LgQW10svx7f8")
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, recibirInfo: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Preparar los datos para EmailJS
      const templateParams = {
        empresa: formData.empresa,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono,
        ciudad: formData.ciudad,
        mensaje: formData.mensaje,
        recibirInfo: formData.recibirInfo ? "Sí" : "No",
        to_email: "contacto@dinvbox.es, davor.ken@icloud.com", // Ambos destinatarios
      }

      // Enviar el correo usando EmailJS
      // Necesitamos crear una plantilla en EmailJS y obtener su ID
      // Por ahora usaremos un ID de plantilla genérico que deberá ser reemplazado
      const serviceID = "default_service" // Reemplazar con tu Service ID de EmailJS
      const templateID = "template_contact_form" // Reemplazar con tu Template ID de EmailJS

      await emailjs.send(serviceID, templateID, templateParams, "mcnz3LgQW10svx7f8")

      console.log("Correo enviado con éxito a:", templateParams.to_email)

      setSubmitStatus("success")
      setFormData({
        empresa: "",
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        ciudad: "",
        mensaje: "",
        recibirInfo: false,
      })

      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      setSubmitStatus("error")

      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          name="empresa"
          placeholder="Empresa *"
          value={formData.empresa}
          onChange={handleChange}
          required
          className="border-gray-300"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          name="nombre"
          placeholder="Nombre *"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="border-gray-300"
        />

        <Input
          type="text"
          name="apellidos"
          placeholder="Apellidos *"
          value={formData.apellidos}
          onChange={handleChange}
          required
          className="border-gray-300"
        />
      </div>

      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email *"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-gray-300"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="tel"
          name="telefono"
          placeholder="Teléfono *"
          value={formData.telefono}
          onChange={handleChange}
          required
          className="border-gray-300"
        />

        <Input
          type="text"
          name="ciudad"
          placeholder="Ciudad *"
          value={formData.ciudad}
          onChange={handleChange}
          required
          className="border-gray-300"
        />
      </div>

      <div>
        <Textarea
          name="mensaje"
          placeholder="¿Cuéntanos! ¿En qué podemos ayudarte?"
          value={formData.mensaje}
          onChange={handleChange}
          className="min-h-[100px] border-gray-300"
        />
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="recibirInfo"
          checked={formData.recibirInfo}
          onCheckedChange={handleCheckboxChange}
          className="mt-1"
        />
        <label htmlFor="recibirInfo" className="text-sm text-gray-600">
          Deseo recibir información acerca de los servicios de DINVBOX
        </label>
      </div>

      <div className="text-xs text-gray-500 mt-4">
        <p>
          DINVBOX, S.L. tratará los datos para llevar a cabo la gestión de su solicitud de contacto, así como para
          facilitarle la correspondiente respuesta, legitimado en el consentimiento que nos facilita expresamente al
          remitir el presente formulario. Asimismo, le informamos que no están previstas comunicaciones a terceros, si
          bien para la prestación de ciertos servicios, sus datos serán objeto de transferencias internacionales de
          datos.
        </p>
        <p className="mt-2">
          Puede ejercitar sus derechos relativos a protección de datos tal y como se indica en nuestra{" "}
          <Link href="/privacidad" className="text-blue-600 hover:underline">
            Política de privacidad
          </Link>
        </p>
      </div>

      {submitStatus === "success" && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          Mensaje enviado correctamente a contacto@dinvbox.es y davor.ken@icloud.com. Nos pondremos en contacto contigo
          lo antes posible.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo.
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full"
      >
        {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}
