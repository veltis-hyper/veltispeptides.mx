'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import AIChatbot from '@/components/AIChatbot'

export default function AfiliadosPage() {
  // Calculator States
  const [referrals, setReferrals] = useState<number>(10)
  const [avgTicket, setAvgTicket] = useState<number>(2500) // MXN average ticket
  const [estSales, setEstSales] = useState<number>(0)
  const [commission, setCommission] = useState<number>(0)
  const [vialsAwarded, setVialsAwarded] = useState<number>(1)

  // Form States
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [handle, setHandle] = useState('')
  const [audienceSize, setAudienceSize] = useState('1000-5000')
  const [niche, setNiche] = useState('longevity')
  
  const [step, setStep] = useState<number>(1) // 1: Info/Calc, 2: Form, 3: Success
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Calculate commissions whenever calculator inputs change
  useEffect(() => {
    const sales = referrals * avgTicket
    const comm = sales * 0.15 // 15% commission
    setEstSales(sales)
    setCommission(comm)

    // Calculate free starter vials based on referrals
    if (referrals >= 40) {
      setVialsAwarded(4)
    } else if (referrals >= 20) {
      setVialsAwarded(2)
    } else {
      setVialsAwarded(1)
    }
  }, [referrals, avgTicket])

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMessage('Ingresa un correo electrónico válido.')
      setStatus('error')
      return
    }

    if (!name || !handle || !phone) {
      setErrorMessage('Por favor completa todos los campos del formulario.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: 'affiliate',
          data: {
            name,
            phone,
            handle,
            audienceSize,
            niche,
            estimatedReferrals: referrals,
            averageTicket: avgTicket
          }
        }),
      })

      if (!response.ok) {
        throw new Error('Server error')
      }

      // Save locally to localStorage as backup
      const existingLeads = JSON.parse(localStorage.getItem('veltis_affiliate_leads') || '[]')
      if (!existingLeads.some((l: any) => l.email === email)) {
        existingLeads.push({ name, email, phone, handle, date: new Date().toISOString() })
        localStorage.setItem('veltis_affiliate_leads', JSON.stringify(existingLeads))
      }

      setStatus('success')
      setStep(3)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMessage('Ocurrió un error en el servidor analítico. Reintenta.')
    }
  }

  // Generate simulated promo code
  const generatedCode = name ? `${name.split(' ')[0].toUpperCase()}${Math.floor(10 + Math.random() * 90)}` : 'VELTIS10'

  return (
    <main className="min-h-screen bg-black text-white relative selection:bg-purple-500/30 selection:text-pink-400 overflow-x-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-pink-900/10 blur-[150px] pointer-events-none" />

      <Header />

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 relative z-10">
        
        {/* Hero Banner Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(168,85,247,0.1)] animate-pulse">
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            Programa de Embajadores Veltis
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-4">
            Monetiza tu Divulgación{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-pink-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              Científica y Biohacking
            </span>
          </h1>
          <p className="text-purple-200/80 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Únete a la red de afiliados de péptidos de mayor crecimiento en México. Comparte guías de reconstitución de alta precisión, gana el 15% de comisión en efectivo por cada orden y recibe viales de cortesía para tus ensayos de laboratorio.
          </p>
        </div>

        {/* Benefits Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: '💰',
              title: '15% de Comisión Directa',
              desc: 'Gana comisiones estables pagadas quincenalmente en efectivo, transferencia directa o stablecoins (USDT/USDC) por cada compra realizada con tu código.'
            },
            {
              icon: '🧪',
              title: 'Research Starter Kits Gratis',
              desc: 'Recibe viales liofilizados de BPC-157, MOTS-c o GHK-Cu mensualmente junto con agua bacteriostática para realizar unboxings, reviews y demostraciones visuales.'
            },
            {
              icon: '🧬',
              title: 'Cero Riesgo de Baneo en Meta',
              desc: 'No anuncies venta de sustancias. Promueve nuestra calculadora molecular gratuita y tu código de descuento en Instagram/TikTok. Meta aprueba 100% el contenido educativo.'
            }
          ].map((benefit, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-b from-purple-950/10 to-black/40 border border-purple-500/15 rounded-2xl p-6 backdrop-blur-md shadow-lg hover:border-purple-500/40 transition duration-300"
            >
              <span className="text-3xl block mb-4">{benefit.icon}</span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">{benefit.title}</h3>
              <p className="text-purple-300 text-xs leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Grid: Interactive Calculator + Application Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Interactive Payout Calculator (7 cols) */}
          <div className="lg:col-span-7 bg-gradient-to-b from-purple-950/20 to-black/60 border border-purple-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-pink-500/5 blur-[50px] pointer-events-none" />
            
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2.5">
              <span className="text-pink-500 text-lg">🧮</span> Calculadora de Comisiones
            </h2>
            <p className="text-purple-300 text-xs leading-relaxed mb-8">
              Calcula tus ganancias estimadas de afiliado en base a tu audiencia y recomendaciones mensuales.
            </p>

            <div className="space-y-8">
              {/* Referrals Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs uppercase tracking-wider text-purple-300 font-bold">
                    Recomendaciones Exitosas por Mes (Ordenes)
                  </label>
                  <span className="text-pink-400 font-mono text-base font-bold">{referrals} referidos</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  step="1"
                  value={referrals}
                  onChange={(e) => setReferrals(parseInt(e.target.value))}
                  className="w-full accent-pink-500 h-1.5 bg-purple-950/40 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-purple-400 font-mono mt-2">
                  <span>2 referidos</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100 referidos</span>
                </div>
              </div>

              {/* Average Ticket Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs uppercase tracking-wider text-purple-300 font-bold">
                    Valor Promedio de Compra (Ticket Promedio)
                  </label>
                  <span className="text-purple-300 font-mono text-base font-bold">${avgTicket.toLocaleString()} MXN</span>
                </div>
                <input
                  type="range"
                  min="1200"
                  max="6000"
                  step="100"
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(parseInt(e.target.value))}
                  className="w-full accent-purple-500 h-1.5 bg-purple-950/40 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-purple-400 font-mono mt-2">
                  <span>$1,200 MXN</span>
                  <span>$2,500 MXN</span>
                  <span>$4,000 MXN</span>
                  <span>$6,000 MXN</span>
                </div>
              </div>

              {/* Commission Outputs Block */}
              <div className="bg-purple-950/15 border border-purple-500/10 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-purple-400 block mb-1">Ventas Mensuales:</span>
                  <span className="text-md sm:text-lg font-bold text-white block font-mono">
                    ${estSales.toLocaleString()} MXN
                  </span>
                </div>
                <div className="border-y sm:border-y-0 sm:border-x border-purple-500/10 py-3 sm:py-0 sm:px-4">
                  <span className="text-[10px] uppercase tracking-wider text-pink-400 block mb-1">Tus Comisiones (15%):</span>
                  <span className="text-xl sm:text-2xl font-black text-pink-400 block font-mono filter drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                    ${commission.toLocaleString()} MXN
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-purple-400 block mb-1">Viales Gratis de Regalo:</span>
                  <span className="text-md sm:text-lg font-bold text-white block font-mono">
                    {vialsAwarded} {vialsAwarded === 1 ? 'Vial' : 'Viales'} / mes
                  </span>
                </div>
              </div>

              {/* Operational flow graph */}
              <div className="border-t border-purple-500/10 pt-6">
                <h4 className="text-[11px] uppercase tracking-wider text-purple-300 font-bold mb-4">Proceso Operativo del Embajador</h4>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="p-3 bg-purple-950/5 border border-purple-500/5 rounded-xl">
                    <span className="text-lg block mb-1">📱</span>
                    <p className="font-bold text-white mb-1">1. Divulga</p>
                    <p className="text-purple-400/80 leading-normal">Publicas contenido científico con tu código personalizado de 10% de descuento.</p>
                  </div>
                  <div className="p-3 bg-purple-950/5 border border-purple-500/5 rounded-xl">
                    <span className="text-lg block mb-1">🛒</span>
                    <p className="font-bold text-white mb-1">2. Compra</p>
                    <p className="text-purple-400/80 leading-normal">Tus seguidores adquieren moléculas HPLC utilizando tu código para ahorrar.</p>
                  </div>
                  <div className="p-3 bg-purple-950/5 border border-purple-500/5 rounded-xl">
                    <span className="text-lg block mb-1">💳</span>
                    <p className="font-bold text-white mb-1">3. Cobra</p>
                    <p className="text-purple-400/80 leading-normal">Recibes 15% quincenal directo a tu cuenta y viales para tus estudios de laboratorio.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Block: Application Form or Success Page (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-purple-950/30 to-black/60 border border-purple-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-purple-500/5 blur-[45px] pointer-events-none" />

            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center space-y-2">
                  <span className="text-4xl block mb-2">📋</span>
                  <h3 className="text-lg font-black text-white uppercase tracking-wider">Aplica Hoy Mismo</h3>
                  <p className="text-purple-300 text-xs leading-relaxed">
                    Forma parte del equipo de Veltis Peptides. Nuestro equipo evaluará tu perfil y te asignará un código personalizado en menos de 24 horas.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)] transition duration-300 transform hover:scale-[1.02] cursor-pointer text-center"
                  >
                    Iniciar Aplicación de Embajador
                  </button>
                  <p className="text-[10px] text-purple-400/80 text-center leading-normal">
                    *Cupos mensuales limitados a 15 nuevos embajadores para garantizar starter kits personalizados.
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleApply} className="space-y-4 animate-fade-in">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-center border-b border-purple-500/10 pb-3">
                  Registro de Datos del Embajador
                </h3>

                <div className="space-y-3 text-xs text-left">
                  {/* Full Name */}
                  <div>
                    <label className="block text-purple-300 font-bold mb-1 uppercase tracking-wider text-[10px]">Nombre Completo</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Carlos Mendoza"
                      className="w-full bg-purple-950/20 border border-purple-500/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500/40"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-purple-300 font-bold mb-1 uppercase tracking-wider text-[10px]">Correo Electrónico</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="carlos.mendoza@laboratorio.com"
                      className="w-full bg-purple-950/20 border border-purple-500/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500/40"
                      required
                    />
                  </div>

                  {/* Phone / Whatsapp */}
                  <div>
                    <label className="block text-purple-300 font-bold mb-1 uppercase tracking-wider text-[10px]">Teléfono / WhatsApp</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+52 55 1234 5678"
                      className="w-full bg-purple-950/20 border border-purple-500/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500/40"
                      required
                    />
                  </div>

                  {/* Social Handle */}
                  <div>
                    <label className="block text-purple-300 font-bold mb-1 uppercase tracking-wider text-[10px]">Red Social Principal y Usuario</label>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="Instagram @carlos_biohacking"
                      className="w-full bg-purple-950/20 border border-purple-500/20 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-pink-500/40"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Audience Size */}
                    <div>
                      <label className="block text-purple-300 font-bold mb-1 uppercase tracking-wider text-[10px]">Audiencia Estimada</label>
                      <select
                        value={audienceSize}
                        onChange={(e) => setAudienceSize(e.target.value)}
                        className="w-full bg-purple-950/20 border border-purple-500/20 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-pink-500/40 cursor-pointer"
                      >
                        <option value="1000-5000">1K - 5K seguidores</option>
                        <option value="5000-20000">5K - 20K seguidores</option>
                        <option value="20000-50000">20K - 50K seguidores</option>
                        <option value="50000+">Más de 50K seguidores</option>
                      </select>
                    </div>

                    {/* Niche */}
                    <div>
                      <label className="block text-purple-300 font-bold mb-1 uppercase tracking-wider text-[10px]">Sub-Nicho de Divulgación</label>
                      <select
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                        className="w-full bg-purple-950/20 border border-purple-500/20 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-pink-500/40 cursor-pointer"
                      >
                        <option value="longevity">Longevidad y Biohacking</option>
                        <option value="performance">Alto Rendimiento / Gym</option>
                        <option value="academia">Divulgación Médica / Académica</option>
                        <option value="dermatologia">Remodelación Dérmica</option>
                      </select>
                    </div>
                  </div>
                </div>

                {status === 'error' && (
                  <div className="bg-pink-500/10 border border-pink-500/20 text-pink-400 p-2.5 rounded-xl text-[10px] animate-fade-in">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] transition duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'loading' ? 'Procesando Registro...' : 'Enviar Solicitud'}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[10px] text-purple-400 hover:text-white underline transition block mx-auto pt-2"
                >
                  ← Volver a información
                </button>
              </form>
            )}

            {step === 3 && (
              <div className="text-center space-y-5 py-6 animate-fade-in">
                <span className="text-5xl block animate-bounce">🔬</span>
                <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 uppercase tracking-wider">
                  ¡Solicitud Enviada!
                </h3>
                <p className="text-purple-300 text-xs leading-relaxed max-w-sm mx-auto">
                  Excelente, **{name}**. Hemos recibido tu postulación al programa de embajadores. Un analista de Veltis revisará tu canal **{handle}** en las próximas 24 horas.
                </p>

                <div className="bg-purple-950/20 border border-purple-500/15 p-4 rounded-xl text-left space-y-2 text-xs">
                  <span className="font-bold text-purple-300 uppercase tracking-wider text-[9px] block">Código Promo Asignado Provisionalmente:</span>
                  <div className="flex justify-between items-center bg-black/40 px-3 py-2.5 rounded border border-purple-500/10">
                    <span className="font-mono font-bold text-pink-400 tracking-wider">{generatedCode}</span>
                    <span className="text-[10px] text-green-400 font-bold">✓ 10% Descuento</span>
                  </div>
                  <p className="text-[10px] text-purple-400 leading-normal pt-1">
                    *Al ser aprobado, tu código se activará en nuestro sistema de órdenes y recibirás un correo con tus accesos al portal de comisiones.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setStep(1)
                    setStatus('idle')
                    setName('')
                    setEmail('')
                    setPhone('')
                    setHandle('')
                  }}
                  className="text-xs text-pink-400 hover:text-pink-300 underline font-semibold transition cursor-pointer"
                >
                  Enviar otra aplicación
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Content Regulatory Safety Area */}
        <section className="bg-purple-950/10 border border-purple-500/20 rounded-2xl p-6 mt-12 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-500/30 flex items-center justify-center text-2xl text-pink-500 flex-shrink-0 animate-pulse">
            ⚠️
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Lineamiento Ético de Divulgación Científica
            </h4>
            <p className="text-purple-300 text-xs leading-relaxed">
              Todos los embajadores de VELTIS Peptides se comprometen a divulgar de forma ética e informar estrictamente sobre literatura preclínica, estudios celulares de laboratorio in vitro y guías operativas de reconstitución de péptidos. Queda estrictamente prohibido realizar cualquier contenido que sugiera consumo humano, protocolos terapéuticos personales, dosificación inyectable humana o que promocione la adquisición de péptidos como suplementos o medicamentos de consumo directo, bajo pena de cancelación inmediata del código de afiliado y retención de comisiones acumuladas.
            </p>
          </div>
        </section>

      </div>

      <footer className="border-t border-purple-500/10 bg-black/60 backdrop-blur-md py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-purple-400">
          <div>
            © {new Date().getFullYear()} VELTIS Peptides. Todos los derechos reservados.
          </div>
          <div className="flex gap-6">
            <a href="https://www.veltispeptides.mx/terminos" className="hover:text-white transition">Términos de Servicio</a>
            <a href="https://www.veltispeptides.mx/privacidad" className="hover:text-white transition">Política de Privacidad</a>
          </div>
        </div>
      </footer>

      <AIChatbot />
    </main>
  )
}
