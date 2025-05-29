"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X, Send, Loader2, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { findBestMatch } from "@/data/facturito-knowledge-base"
import { FacturitoSuggestions } from "@/components/facturito-suggestions"

type Message = {
  role: "user" | "assistant"
  content: string
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    content:
      "¡Hola! Soy Facturito, tu asistente virtual especializado en facturación electrónica. ¿En qué puedo ayudarte hoy?",
  },
]

const initialSuggestions = [
  "¿Cumple con VeriFactu?",
  "¿Qué tipos de facturas puedo hacer?",
  "¿Puedo facturar desde el móvil?",
  "¿Qué incluye el timbre?",
  "¿Mis datos están seguros?",
]

export function FacturitoChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [suggestions, setSuggestions] = useState<string[]>(initialSuggestions)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const toggleChat = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
    }

    if (isOpen && isMinimized) {
      setIsMinimized(false)
    } else {
      setIsOpen(!isOpen)
      setIsMinimized(false)
    }
  }

  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(true)
  }

  const maximizeChat = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMinimized(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSendMessage = async () => {
    if (input.trim() === "" || isLoading) return

    // Add user message
    const userMessage: Message = { role: "user", content: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response with a small delay for realism
    setTimeout(() => {
      // Use the knowledge base to find the best response
      const response = findBestMatch(input)

      const assistantMessage: Message = { role: "assistant", content: response }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 800)
  }

  const handleSelectSuggestion = (suggestion: string) => {
    setInput(suggestion)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 shadow-lg transition-all hover:scale-105 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        aria-label="Chat con Facturito"
      >
        {isOpen && !isMinimized ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <span className="text-xl font-bold text-white">IA</span>
        )}

        {!hasInteracted && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            1
          </span>
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={
              isMinimized
                ? { opacity: 1, y: 0, scale: 1, height: "auto", width: "auto" }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed z-50 shadow-xl ${
              isMinimized
                ? "bottom-24 right-6 w-auto rounded-lg bg-white"
                : "bottom-24 right-6 flex h-[450px] w-[320px] flex-col overflow-hidden rounded-xl bg-white sm:w-[350px]"
            }`}
          >
            {isMinimized ? (
              <div
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-white p-3 pr-4 shadow-md"
                onClick={maximizeChat}
              >
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image src="/images/facturito-ai.jpeg" alt="Facturito" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Facturito</p>
                  <p className="text-xs text-gray-500">Asistente virtual</p>
                </div>
                <Maximize2 className="h-5 w-5 text-gray-500" />
              </div>
            ) : (
              <>
                {/* Chat Header - Changed to silver gradient */}
                <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-orange-100 p-3 text-gray-800 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full border border-orange-200">
                      <Image src="/images/facturito-ai.jpeg" alt="Facturito" fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">Facturito</h3>
                      <p className="text-xs text-gray-500">Asistente de facturación</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={minimizeChat}
                      className="rounded p-1 hover:bg-orange-200/50"
                      aria-label="Minimizar chat"
                    >
                      <Minimize2 className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded p-1 hover:bg-orange-200/50"
                      aria-label="Cerrar chat"
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-3">
                  <div className="space-y-3">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[85%] rounded-lg p-2.5 text-sm ${
                            message.role === "user" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[85%] rounded-lg bg-gray-100 p-2.5 text-gray-800">
                          <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                        </div>
                      </div>
                    )}
                    {messages.length === 1 && (
                      <div className="mt-4">
                        <p className="text-xs text-gray-500 mb-2">Algunas preguntas que puedes hacer:</p>
                        <FacturitoSuggestions suggestions={suggestions} onSelectSuggestion={handleSelectSuggestion} />
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Chat Input */}
                <div className="border-t border-gray-200 p-3">
                  <div className="flex gap-2">
                    <Textarea
                      ref={inputRef}
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Escribe tu pregunta aquí..."
                      className="min-h-[40px] resize-none text-sm"
                      maxRows={3}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={input.trim() === "" || isLoading}
                      size="icon"
                      className="h-10 w-10 bg-orange-500 hover:bg-orange-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
