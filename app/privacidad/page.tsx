"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
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
              Política de Privacidad
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Información sobre cómo recopilamos, utilizamos y protegemos sus datos personales
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

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-navy-700 hover:text-orange-500">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy-900 prose-a:text-orange-500">
            <p>
              Dinvbox España (DINVBOX S.L.) se compromete a proteger la privacidad de los usuarios y garantizar la
              seguridad de sus datos personales. La presente Política de Privacidad describe cómo recopilamos,
              utilizamos y protegemos la información personal de los usuarios del sitio web{" "}
              <a href="http://www.dinvbox.es" target="_blank" rel="noopener noreferrer">
                www.dinvbox.es
              </a>{" "}
              y de las plataformas internas de Dinvbox España. Esta política cumple con el{" "}
              <strong>Reglamento (UE) 2016/679 General de Protección de Datos (RGPD)</strong>, la{" "}
              <strong>
                Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD)
              </strong>
              , y demás normativa aplicable en España.
            </p>

            <p>
              Al facilitarnos sus datos personales a través de nuestros sitios o canales, usted acepta que sean tratados
              conforme a esta Política de Privacidad. Le recomendamos leer atentamente este documento para conocer cómo
              manejamos su información y los derechos que le asisten en materia de protección de datos.
            </p>

            <h2>Responsable del Tratamiento</h2>
            <p>
              El <strong>Responsable del Tratamiento</strong> de sus datos personales es <strong>DINVBOX S.L.</strong>,
              con N.I.F. <strong>B10756765</strong>, domicilio en{" "}
              <strong>Calle Marqués del Riscal 11, 3º-5, 28010 Madrid (España)</strong>, y correo electrónico de
              contacto: <a href="mailto:protecciondatos@dinvbox.es">protecciondatos@dinvbox.es</a> (en adelante,{" "}
              <strong>"Dinvbox España"</strong>).
            </p>

            <h2>Delegado de Protección de Datos (DPO)</h2>
            <p>
              Actualmente, Dinvbox España <strong>no</strong> está obligada a designar un Delegado de Protección de
              Datos, conforme al artículo 37 del RGPD, por lo que <strong>no cuenta con un DPO</strong> nombrado. No
              obstante, para cualquier consulta, duda o solicitud relacionada con la protección de sus datos personales,
              puede dirigirse al correo electrónico{" "}
              <a href="mailto:protecciondatos@dinvbox.es">protecciondatos@dinvbox.es</a>, y nuestro equipo atenderá su
              petición.
            </p>

            <h2>Datos Personales que Recabamos</h2>
            <p>
              Dinvbox España puede recopilar información personal de los usuarios <strong>por diversas vías</strong>,
              incluyendo:
            </p>

            <ul>
              <li>
                <strong>Datos de navegación:</strong> Al visitar nuestro sitio web, recopilamos datos técnicos como la
                dirección IP, el tipo de navegador, el sistema operativo, la fecha y hora de acceso, páginas visitadas u
                otros datos de <em>log</em>. Esto se realiza principalmente mediante cookies u otras tecnologías de
                seguimiento con el objetivo de mejorar la experiencia de navegación y gestionar correctamente la web.
                (Para más información, consulte nuestra Política de Cookies).
              </li>
              <li>
                <strong>Datos que usted proporciona:</strong> Al completar formularios en el sitio o contactarnos a
                través de los canales habilitados, podemos solicitarle datos personales como nombre, apellidos, correo
                electrónico, número de teléfono, empresa a la que representa, posición/cargo, etc. Por ejemplo,
                recopilamos estos datos cuando usted solicita información, se suscribe a boletines, o nos envía
                consultas. Si nos envía su currículum vítae (CV) u otros datos para procesos de{" "}
                <strong>selección de personal</strong>, trataremos también la información laboral y académica incluida
                en dicha candidatura (titulación, experiencia profesional, aptitudes, etc.).
              </li>
              <li>
                <strong>Datos derivados del uso de nuestros servicios:</strong> En caso de que se registre y utilice
                nuestras plataformas o software de facturación electrónica, tratamos los datos necesarios para
                administrar su cuenta y prestar el servicio. Esto puede incluir información de facturación (por ejemplo,
                nombre o razón social, NIF/CIF, domicilio fiscal), datos de contacto de usuarios autorizados, y aquellos
                datos que se generen a través del uso del servicio (como historiales de facturas, transacciones o
                comunicaciones realizadas a través de la plataforma).
              </li>
              <li>
                <strong>
                  Datos del <em>Canal Ético</em> (denuncias internas):
                </strong>{" "}
                Si utiliza nuestro canal de denuncias interno para reportar incumplimientos o conductas irregulares en
                Dinvbox España, trataremos los datos personales que incluya en su comunicación. Esto podría abarcar su
                identidad y datos de contacto (si decide proporcionarlos, ya que puede realizar denuncias anónimas), así
                como la información que aporte sobre los hechos (incluyendo eventualmente datos de terceros involucrados
                en la denuncia).
              </li>
            </ul>

            <p>
              <strong>Carácter obligatorio de los datos:</strong> En nuestros formularios, los campos marcados con un
              asterisco (*) se consideran obligatorios. La negativa a facilitar los datos marcados como obligatorios, o
              el suministro de información incorrecta o incompleta, podrá impedir que podamos atender su solicitud o
              prestarle el servicio correspondiente en las debidas condiciones.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
