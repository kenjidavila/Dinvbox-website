import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, nombre, empresa } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Por favor, introduce un email válido" }, { status: 400 })
    }

    const apiKey =
      process.env.BREVO_API_KEY ||
      "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"

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          NOMBRE: nombre || "",
          EMPRESA: empresa || "",
        },
        listIds: [3], // ID de la lista en Brevo
        updateEnabled: true,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      // Si el contacto ya existe, Brevo devuelve un error específico
      if (response.status === 400 && data.message && data.message.includes("Contact already exist")) {
        return NextResponse.json(
          { message: "Ya estás suscrito a nuestro newsletter. ¡Gracias por tu interés!" },
          { status: 200 },
        )
      }

      return NextResponse.json({ error: data.message || "Error al suscribirse" }, { status: response.status })
    }

    return NextResponse.json(
      {
        message:
          "¡Gracias por suscribirte al newsletter de DINVBOX! Te mantendremos informado sobre las últimas novedades.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error en la API de newsletter:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}
