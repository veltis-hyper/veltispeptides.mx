'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import AIChatbot from '@/components/AIChatbot'

interface PeptideProtocol {
  name: string
  area: string
  mechanism: string
  references: string
  vialPreset: number // in mg
  waterPreset: number // in ml
  dosePreset: number // in mcg
  supplies: string[]
  details: string
}

const protocolsDb: Record<string, PeptideProtocol> = {
  'bpc-157': {
    name: 'BPC-157 (Body Protection Compound)',
    area: 'tissue',
    mechanism: 'Modulación del receptor de óxido nítrico, angiogénesis acelerada y up-regulation de receptores de hormona de crecimiento en fibroblastos.',
    references: 'Journal of Orthopaedic Research (2025), preclínicos in vitro de regeneración tisular.',
    vialPreset: 5,
    waterPreset: 2,
    dosePreset: 250,
    supplies: [
      'Vial liofilizado de BPC-157 (5mg)',
      'Agua Bacteriostática Estéril (2ml)',
      'Jeringas de insulina estériles U-100 (0.5ml o 1ml)',
      'Almohadillas con alcohol isopropílico al 70%'
    ],
    details: 'Ampliamente estudiado por su alta estabilidad biológica gástrica. Requiere reconstitución de transferencia deslizada (efecto pared) y refrigeración constante de 2°C a 8°C tras la mezcla.'
  },
  'mots-c': {
    name: 'MOTS-c (Péptido Derivado de Mitocondria)',
    area: 'longevity',
    mechanism: 'Activación de la proteína quinasa AMPK mediante incremento transitorio de AMP intracelular, estimulando la biogénesis mitocondrial y captación celular de glucosa.',
    references: 'Autophagy (Mayo 2026), Redox Biology (Mayo 2026), preservación lisosomal in vitro.',
    vialPreset: 10,
    waterPreset: 2,
    dosePreset: 1000,
    supplies: [
      'Vial liofilizado de MOTS-c (10mg)',
      'Agua Bacteriostática Estéril (2ml)',
      'Jeringas de insulina estériles U-100 (1ml)',
      'Almohadillas con alcohol isopropílico al 70%'
    ],
    details: 'Cadena delicada de 16 aminoácidos. Es sumamente susceptible a la agitación mecánica. Debe permitirse disolver por sí mismo durante 5 minutos y almacenarse protegido de la luz solar.'
  },
  'ghk-cu': {
    name: 'GHK-Cu (Péptido de Cobre)',
    area: 'tissue',
    mechanism: 'Complejo metal-péptido que regula al alza la expresión de genes de colágeno, elastina y activa la Superóxido Dismutasa (SOD-1) contra estrés oxidativo.',
    references: 'Pickart L. et al. (1973 - 2025), estudios de remodelación celular de la matriz extracelular.',
    vialPreset: 50, // 50mg standard
    waterPreset: 2,
    dosePreset: 1500,
    supplies: [
      'Vial liofilizado de GHK-Cu (50mg)',
      'Agua Bacteriostática Estéril (2ml)',
      'Jeringas de insulina estériles U-100',
      'Almohadillas desinfectantes'
    ],
    details: 'Tripéptido con afinidad ultra-alta al cobre divalente. Se debe evitar el uso de agujas o recipientes con trazas de metales competitivos como níquel o hierro para no perder la bio-afinidad del cobre.'
  },
  'tb-500': {
    name: 'TB-500 (Thymosin Beta 4)',
    area: 'tissue',
    mechanism: 'Regulación al alza de la actina celular, promoviendo la migración celular, curación de tejidos blandos y angiogénesis local acelerada.',
    references: 'Biochemistry Journal (2024), protocolos de regeneración de fibras musculares y ligamentos.',
    vialPreset: 5,
    waterPreset: 2,
    dosePreset: 500,
    supplies: [
      'Vial liofilizado de TB-500 (5mg)',
      'Agua Bacteriostática Estéril (2ml)',
      'Jeringas U-100 de precisión',
      'Alcohol sanitizante'
    ],
    details: 'Péptido sintético idéntico a la secuencia de timosina beta-4 activa. Conservar en cadena de frío estricta y evitar ciclos térmicos bruscos.'
  }
}

export default function ProtocolosPage() {
  const [area, setArea] = useState<string>('')
  const [peptide, setPeptide] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [step, setStep] = useState<number>(1) // 1: Setup, 2: Lead Gen, 3: Results
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleNextToLead = () => {
    if (!area || !peptide) return
    setStep(2)
  }

  const handleGenerateProtocol = async (e: React.FormEvent) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Ingresa un correo de laboratorio válido.')
      return
    }

    setStatus('loading')
    try {
      // Post to our central leads API route
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: 'protocol',
          data: {
            area,
            peptide,
            timestamp: new Date().toISOString()
          }
        }),
      })

      if (!response.ok) {
        throw new Error('Server error')
      }
      
      // Save lead locally as backup
      const existingLeads = JSON.parse(localStorage.getItem('veltis_protocol_leads') || '[]')
      if (!existingLeads.includes(email)) {
        existingLeads.push(email)
        localStorage.setItem('veltis_protocol_leads', JSON.stringify(existingLeads))
      }

      setStatus('success')
      setStep(3)
    } catch (err) {
      setStatus('error')
    }
  }

  const activeProtocol = protocolsDb[peptide]

  return (
    <main className="min-h-screen bg-black text-white relative selection:bg-purple-500/30 selection:text-pink-400 overflow-x-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-pink-900/10 blur-[150px] pointer-events-none" />

      <Header />

      <div className="max-w-4xl mx-auto px-6 pt-16 pb-24 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            Simulador de Protocolos Preclínicos
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            Configurador de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-pink-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              Análisis Molecular
            </span>
          </h1>
          <p className="text-purple-200/80 text-sm leading-relaxed">
            Estructura los parámetros ideales para tus ensayos de laboratorio in vitro. Obtén listas de suministros estandarizadas, referencias indexadas y guías de dilución recomendadas al instante.
          </p>
        </div>

        {/* Multi-Step Card */}
        <div className="bg-gradient-to-b from-purple-950/20 to-black/60 border border-purple-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-pink-500/5 blur-[50px] pointer-events-none" />
          
          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= 1 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'bg-purple-950/20 text-purple-400 border border-purple-500/20'}`}>1</div>
            <div className="w-10 h-[1px] bg-purple-500/20" />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= 2 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'bg-purple-950/20 text-purple-400 border border-purple-500/20'}`}>2</div>
            <div className="w-10 h-[1px] bg-purple-500/20" />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= 3 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'bg-purple-950/20 text-purple-400 border border-purple-500/20'}`}>3</div>
          </div>

          {/* STEP 1: PARAMETER SETUP */}
          {step === 1 && (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <label className="block text-xs uppercase tracking-wider text-purple-300 font-bold">1. Selecciona el Área de Investigación Biológica</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'tissue', title: 'Regeneración Tisular', desc: 'Estudios de cicatrización, angiogénesis y remodelación celular' },
                    { id: 'longevity', title: 'Energía Celular y Longevidad', desc: 'Homeostasis celular, AMPK, biogénesis mitocondrial y autofagia' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setArea(item.id)
                        setPeptide('') // reset peptide
                      }}
                      className={`px-5 py-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        area === item.id
                          ? 'bg-purple-950/30 border-pink-500/50 text-white shadow-[0_0_20px_rgba(236,72,153,0.1)]'
                          : 'bg-purple-950/10 border-purple-500/15 text-purple-300 hover:border-purple-500/40 hover:text-white'
                      }`}
                    >
                      <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                      <p className="text-[11px] opacity-70 leading-normal">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {area && (
                <div className="space-y-4 animate-fade-in">
                  <label className="block text-xs uppercase tracking-wider text-purple-300 font-bold">2. Selecciona el Péptido en Estudio</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.keys(protocolsDb)
                      .filter(key => protocolsDb[key].area === area)
                      .map((key) => (
                        <button
                          key={key}
                          onClick={() => setPeptide(key)}
                          className={`px-5 py-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                            peptide === key
                              ? 'bg-purple-950/30 border-pink-500/50 text-white shadow-[0_0_20px_rgba(236,72,153,0.1)]'
                              : 'bg-purple-950/10 border-purple-500/15 text-purple-300 hover:border-purple-500/40 hover:text-white'
                          }`}
                        >
                          <span className="font-bold text-xs">{protocolsDb[key].name}</span>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              <div className="pt-6 text-right">
                <button
                  onClick={handleNextToLead}
                  disabled={!area || !peptide}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)] transition duration-300 transform hover:scale-105 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  Continuar al Protocolo →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: EMAIL LEAD CAPTURE */}
          {step === 2 && (
            <form onSubmit={handleGenerateProtocol} className="space-y-6 max-w-md mx-auto text-center animate-fade-in">
              <span className="text-4xl block mb-2">📥</span>
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">Generar Protocolo Digital</h2>
              <p className="text-purple-300 text-xs leading-relaxed">
                Ingresa el correo electrónico institucional de tu laboratorio o tu correo personal de investigación para compilar el protocolo interactivo de **{protocolsDb[peptide].name}**.
              </p>

              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  placeholder="investigador@laboratorio.com"
                  className="w-full bg-purple-950/20 border border-purple-500/30 rounded-full px-5 py-3 text-sm text-center text-white focus:outline-none focus:border-pink-500/50 placeholder-purple-400/50 transition"
                  required
                />
                
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)] transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'loading' ? 'Generando Protocolo...' : 'Compilar Guía Científica'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-purple-400 hover:text-white underline transition block mx-auto"
              >
                ← Volver a cambiar parámetros
              </button>
            </form>
          )}

          {/* STEP 3: RESULTS DISPLAY & SCIENTIFIC WORK SHEET */}
          {step === 3 && activeProtocol && (
            <div className="space-y-8 animate-fade-in text-left">
              <div className="border-b border-purple-500/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-pink-400 font-bold block mb-1">Ensayo de Laboratorio</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">{activeProtocol.name}</h2>
                </div>
                <a
                  href={`/calculadora?vial=${activeProtocol.vialPreset}&water=${activeProtocol.waterPreset}&dose=${activeProtocol.dosePreset}`}
                  className="inline-flex items-center justify-center gap-2 bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/30 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-purple-300 hover:text-white transition cursor-pointer"
                >
                  🔌 Abrir en Calculadora 3D
                </a>
              </div>

              {/* Grid block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                
                {/* Left col: Supplies & guidelines */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-purple-300 font-bold mb-3 flex items-center gap-1.5">
                      <span>🎒</span> Suministros Requeridos
                    </h3>
                    <ul className="space-y-2 text-purple-200/80 text-xs">
                      {activeProtocol.supplies.map((sup, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-pink-500 text-[10px]">🧪</span>
                          <span>{sup}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-purple-300 font-bold mb-2 flex items-center gap-1.5">
                      <span>💡</span> Recomendación de dilución sugerida
                    </h3>
                    <p className="text-purple-200/70 text-xs leading-relaxed">
                      Para este modelo, se sugiere reconstituir el vial de **{activeProtocol.vialPreset}mg** con **{activeProtocol.waterPreset}ml** de agua bacteriostática estéril para alcanzar una concentración de **{( (activeProtocol.vialPreset * 1000) / activeProtocol.waterPreset / 1000 ).toFixed(1)}mg/ml**, extrayendo una dosis analítica de **{activeProtocol.dosePreset}mcg** en jeringas estándar.
                    </p>
                  </div>
                </div>

                {/* Right col: scientific references */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-purple-300 font-bold mb-2 flex items-center gap-1.5">
                      <span>🧬</span> Mecanismo de Acción Evaluado
                    </h3>
                    <p className="text-purple-200/80 text-xs leading-relaxed font-mono bg-purple-950/10 border border-purple-500/10 p-3.5 rounded-xl">
                      {activeProtocol.mechanism}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-wider text-purple-300 font-bold mb-1.5 flex items-center gap-1.5">
                      <span>📖</span> Literatura de Respaldo e Indexación
                    </h3>
                    <p className="text-purple-200/70 text-xs font-sans leading-relaxed italic">
                      Citas bibliográficas: {activeProtocol.references}
                    </p>
                  </div>
                </div>

              </div>

              {/* Handling details block */}
              <div className="bg-purple-950/10 border border-purple-500/15 rounded-2xl p-5 text-xs text-purple-300 leading-relaxed">
                <strong>Pautas Críticas de Manejo en Laboratorio:</strong> {activeProtocol.details}
              </div>

              {/* Botón para reiniciar */}
              <div className="pt-4 border-t border-purple-500/10 flex justify-between items-center text-xs text-purple-400">
                <button
                  onClick={() => {
                    setStep(1)
                    setEmail('')
                    setPeptide('')
                    setStatus('idle')
                  }}
                  className="text-pink-400 hover:text-pink-300 underline font-semibold transition cursor-pointer"
                >
                  ← Configurar otro protocolo de análisis
                </button>
                <span>Trazabilidad HPLC Mayor al 98%</span>
              </div>
            </div>
          )}

        </div>

        {/* Informative Safety Alert */}
        <section className="bg-purple-950/10 border border-purple-500/20 rounded-2xl p-6 mt-12 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-500/30 flex items-center justify-center text-2xl text-pink-500 flex-shrink-0 animate-pulse">
            ⚠️
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Disclaimer y Regulaciones Químicas de Seguridad
            </h4>
            <p className="text-purple-300 text-xs leading-relaxed">
              Todos los péptidos y compuestos disponibles en VELTIS Peptides están exclusivamente destinados para su análisis in vitro y protocolos de investigación de laboratorio preclínico. Ningún compuesto está diseñado, aprobado ni comercializado para consumo humano, inyección, diagnóstico clínico, medicina veterinaria, suplementación alimenticia ni ningún otro fin médico. Este simulador interactivo es provisto estrictamente como recurso de apoyo educativo para la planificación preclínica de diluciones.
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
