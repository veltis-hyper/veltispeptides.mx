'use client'

import { useState } from 'react'

export default function NewsletterCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      setErrorMessage('Por favor ingresa un correo electrónico válido de laboratorio.')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      // Post to our central leads API route
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: 'newsletter',
          data: {
            timestamp: new Date().toISOString()
          }
        }),
      })

      if (!response.ok) {
        throw new Error('Server error')
      }
      
      // Save locally to localStorage as a fallback backup
      const existingLeads = JSON.parse(localStorage.getItem('veltis_newsletter_leads') || '[]')
      if (!existingLeads.includes(email)) {
        existingLeads.push(email)
        localStorage.setItem('veltis_newsletter_leads', JSON.stringify(existingLeads))
      }

      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setErrorMessage('Hubo un error de conexión con el servidor analítico. Reintenta.')
    }
  }

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-950/15 via-black/40 to-black/80 p-6 sm:p-10 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.05)]">
      {/* Decorative inner neon blobs */}
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-pink-500/10 blur-[40px] pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-purple-500/10 blur-[40px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-between">
        
        {/* Left side: Scientific copy */}
        <div className="flex-1 space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/40 border border-pink-500/20 text-pink-300 text-[10px] tracking-wider uppercase font-semibold shadow-[0_0_10px_rgba(236,72,153,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            Alertas Analíticas e HPLC
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
            Únete a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-extrabold drop-shadow-[0_0_10px_rgba(168,85,247,0.15)]">
              Veltis Science Digest
            </span>
          </h3>
          <p className="text-purple-200/70 text-xs sm:text-sm leading-relaxed max-w-md">
            Recibe notificaciones exclusivas de nuevos lotes analíticos HPLC, guías prácticas de reconstitución de laboratorio y resúmenes de literatura de péptidos preclínicos del 2026.
          </p>
        </div>

        {/* Right side: Interactive Form */}
        <div className="w-full md:w-auto min-w-[280px] sm:min-w-[340px] flex-shrink-0">
          {status === 'success' ? (
            <div className="p-6 bg-purple-950/30 border border-purple-500/30 rounded-2xl text-center space-y-3 animate-fade-in">
              <span className="text-3xl block">🧪</span>
              <p className="font-bold text-white text-sm uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                ¡Registro Completado!
              </p>
              <p className="text-purple-300 text-xs leading-snug">
                Bienvenido al Digest Científico. Hemos enviado el protocolo y la Guía de Estabilidad a tu correo.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-[11px] text-pink-400 hover:text-pink-300 underline font-medium transition cursor-pointer"
              >
                Registrar otro correo de laboratorio
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="flex flex-col sm:flex-row gap-2 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  placeholder="investigador@laboratorio.com"
                  className="w-full min-w-0 flex-1 bg-purple-950/20 border border-purple-500/30 rounded-full px-5 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/10 placeholder-purple-400/50 transition-all duration-200 disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 sm:py-0 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Verificando...
                    </>
                  ) : (
                    'Unirse al Digest'
                  )}
                </button>
              </div>

              {/* Error Alert */}
              {status === 'error' && (
                <div className="flex gap-2 items-center bg-pink-500/10 border border-pink-500/20 p-2.5 rounded-xl text-[11px] text-pink-400 animate-fade-in">
                  <span>⚠️</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              <p className="text-[10px] text-purple-400/80 text-center leading-normal">
                *Respetamos la privacidad del laboratorio. Cero Spam. Exclusivo para investigadores.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
