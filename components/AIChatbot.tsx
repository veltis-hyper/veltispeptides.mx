'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: `¡Hola! Bienvenido al **Asistente Científico de VELTIS Peptides** 🔬

Estoy aquí para responder preguntas técnicas, de pureza HPLC y de protocolos de manejo de laboratorio de nuestras moléculas de investigación.

*Nota: Nuestras moléculas son estrictamente para uso de investigación de laboratorio in vitro y preclínica. No están aprobadas para consumo humano ni uso médico.*

¿De qué compuesto o protocolo de laboratorio te gustaría conocer hoy?`
        }
      ])
    }
  }, [messages])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input
    if (!text.trim() || isLoading) return

    const newMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages((prev) => [...prev, { role: 'assistant', content: data.message }])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Lo siento, experimenté un error al procesar tu consulta técnica. Por favor, intenta de nuevo.',
          },
        ])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Error de conexión. Verifica tu conexión de red e intenta de nuevo.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const quickQuestions = [
    { label: '🔬 BPC-157', query: '¿Qué es BPC-157 y qué se estudia de él?' },
    { label: '💧 Semaglutide', query: 'Háblame de Semaglutide e investigación metabólica' },
    { label: '🧬 Reconstituir', query: '¿Cuál es el protocolo estricto de reconstitución de laboratorio?' },
    { label: '❄️ Almacenamiento', query: '¿Cómo almacenar y conservar los péptidos?' },
  ]

  // Render inline markdown-like formatting (bold, bullet points)
  const renderMessageContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
      let renderedLine = line

      // Handle main title (### Title)
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="text-lg font-bold text-primary-dark mt-4 mb-2">{line.replace('### ', '')}</h4>
      }
      // Handle sub-title (#### Subtitle)
      if (line.startsWith('#### ')) {
        return <h5 key={idx} className="text-md font-bold text-primary mt-3 mb-1">{line.replace('#### ', '')}</h5>
      }
      // Handle bold texts (**text**)
      const boldRegex = /\*\*(.*?)\*\*/g
      let parts = []
      let lastIndex = 0
      let match
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index))
        }
        parts.push(<strong key={match.index} className="text-primary-dark font-semibold">{match[1]}</strong>)
        lastIndex = boldRegex.lastIndex
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex))
      }

      const hasParts = parts.length > 0

      // Handle bullet points (- item or 1. item)
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-text-primary mb-1">
            {hasParts ? parts : line.replace(/^[-*]\s+/, '')}
          </li>
        )
      }
      if (/^\d+\.\s+/.test(line.trim())) {
        const itemContent = line.replace(/^\d+\.\s+/, '')
        return (
          <li key={idx} className="ml-4 list-decimal text-text-primary mb-1">
            {hasParts ? parts : itemContent}
          </li>
        )
      }

      // Handle italic alerts (*italic*)
      if (line.startsWith('*') && line.endsWith('*')) {
        return (
          <p key={idx} className="text-sm text-text-muted italic mt-3 border-l-2 border-primary pl-3 py-1">
            {line.replace(/\*/g, '')}
          </p>
        )
      }

      return (
        <p key={idx} className="mb-2 leading-relaxed text-text-primary text-sm">
          {hasParts ? parts : renderedLine}
        </p>
      )
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-5 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          id="ai-chatbot-launcher"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-primary-dark border border-white"></span>
          </span>
          {/* Chat Icon SVG */}
          <svg
            className="w-6 h-6 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
          <span className="font-semibold text-sm tracking-wider uppercase hidden sm:inline">
            Asistente IA 🔬
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] sm:w-[420px] h-[580px] bg-white border border-border-primary rounded-2xl shadow-xl flex flex-col overflow-hidden animate-fade-in transition-all duration-300">
          {/* Header */}
          <div className="bg-bg-alt p-4 border-b border-border-primary flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-white shadow-sm">
                  V
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-md tracking-wide">Veltis AI</h3>
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Asistente Científico
                </span>
              </div>
            </div>
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-muted hover:text-text-primary transition duration-200 p-1.5 hover:bg-black/5 rounded-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-bg-alt">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-none border border-primary-dark'
                      : 'bg-bg-alt text-text-primary rounded-bl-none border border-border-primary'
                  }`}
                >
                  {renderMessageContent(msg.content)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-bg-alt border border-border-primary rounded-2xl rounded-bl-none px-5 py-3 text-text-muted flex items-center gap-2 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  <span className="text-xs text-text-muted ml-1">Analizando bases de datos...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Panel */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 py-2 bg-bg-alt border-t border-border-primary">
              <p className="text-[11px] uppercase tracking-widest text-text-muted mb-2 font-medium">Consultas rápidas:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q.query)}
                    className="text-xs bg-white hover:bg-bg-warm border border-border-primary text-text-primary px-3 py-1.5 rounded-lg transition duration-200 text-left active:scale-95 shadow-sm"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border-primary bg-bg-warm">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta de investigación..."
                className="flex-1 bg-white focus:bg-white border border-border-primary focus:border-primary rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary transition duration-200 shadow-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white p-3 rounded-xl transition duration-200 shadow-sm disabled:opacity-50 active:scale-95 flex items-center justify-center"
                disabled={isLoading || !input.trim()}
              >
                <svg
                  className="w-5 h-5 transform rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </button>
            </form>
            {/* Regulatory Disclaimer */}
            <p className="text-[10px] text-text-muted text-center mt-3 leading-snug">
              ⚠️ <strong>Disclaimer:</strong> Moléculas para uso exclusivo de investigación analítica in vitro y preclínica. No aptas para consumo humano ni uso clínico.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
