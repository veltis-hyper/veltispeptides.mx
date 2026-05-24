'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import AIChatbot from '@/components/AIChatbot'

export default function CalculadoraReconstitucion() {
  // Input States
  const [vialSize, setVialSize] = useState<number>(5) // in mg
  const [vialSizeCustom, setVialSizeCustom] = useState<string>('')
  const [isCustomVial, setIsCustomVial] = useState<boolean>(false)

  const [waterVolume, setWaterVolume] = useState<number>(2) // in ml
  const [desiredDose, setDesiredDose] = useState<number>(250) // in mcg
  const [syringeSize, setSyringeSize] = useState<number>(100) // U-100 (1ml) or U-50 (0.5ml) or U-30 (0.3ml)

  // Output States
  const [volumeMl, setVolumeMl] = useState<number>(0)
  const [syringeUnits, setSyringeUnits] = useState<number>(0)
  const [concentration, setConcentration] = useState<number>(0)

  const [copied, setCopied] = useState<boolean>(false)

  const handleCopyProtocol = () => {
    const actualVialSize = isCustomVial ? parseFloat(vialSizeCustom) || 0 : vialSize
    const text = `🧪 *Protocolo de Dilución Científica Veltis* 🧪
- Compuesto Liofilizado: ${actualVialSize} mg
- Agua Bacteriostática: ${waterVolume} ml
- Dosis de Investigación Deseada: ${desiredDose} mcg
- Volumen Líquido Resultante: ${volumeMl.toFixed(3)} ml
- Concentración: ${(concentration / 1000).toFixed(1)} mg/ml
👉 *CARGAR EN JERINGA:* *${syringeUnits.toFixed(1)} Unidades* (Jeringa U-${syringeSize})

📐 Calcula tu protocolo gratis y con precisión en: https://veltispeptides.mx/calculadora`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Presets
  const vialPresets = [2, 5, 10]

  // Calculate whenever inputs change
  useEffect(() => {
    const actualVialSize = isCustomVial ? parseFloat(vialSizeCustom) || 0 : vialSize
    if (actualVialSize <= 0 || waterVolume <= 0 || desiredDose <= 0) {
      setVolumeMl(0)
      setSyringeUnits(0)
      setConcentration(0)
      return
    }

    const vialSizeMcg = actualVialSize * 1000 // Convert mg to mcg
    const mixConcentration = vialSizeMcg / waterVolume // mcg per ml
    const calculatedVolumeMl = desiredDose / mixConcentration // ml needed for dose
    
    // In insulin syringes, standard scale is U-100 where 1 ml = 100 units.
    // Therefore, 1 unit = 0.01 ml, regardless of the syringe capacity (0.5ml or 0.3ml also use U-100 scale).
    const calculatedUnits = calculatedVolumeMl * 100

    setConcentration(mixConcentration)
    setVolumeMl(calculatedVolumeMl)
    setSyringeUnits(calculatedUnits)
  }, [vialSize, vialSizeCustom, isCustomVial, waterVolume, desiredDose])

  // Cap syringe units for display based on selected syringe size
  const displayUnits = Math.min(syringeUnits, syringeSize)
  const isOverfilled = syringeUnits > syringeSize
  const fillPercentage = Math.min((syringeUnits / syringeSize) * 100, 100)

  return (
    <main className="min-h-screen bg-black text-white relative selection:bg-purple-500/30 selection:text-pink-400 overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-pink-900/10 blur-[180px] pointer-events-none" />

      {/* Navigation Header */}
      <Header />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 relative z-10">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            Herramienta Científica de Precisión
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            Calculadora de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-pink-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              Reconstitución de Péptidos
            </span>
          </h1>
          <p className="text-purple-200/80 text-md leading-relaxed">
            Optimiza tus protocolos de investigación. Determina con total precisión matemática la concentración de tus compuestos liofilizados y el volumen exacto de unidades requerido para tus análisis in vitro.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Interactive Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-gradient-to-b from-purple-950/20 to-black/60 border border-purple-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
                <span className="text-pink-500 text-lg">🧪</span> Parámetros del Protocolo
              </h2>

              <div className="space-y-6">
                {/* 1. Vial Size Input */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-purple-300 font-bold mb-3">
                    1. Cantidad de Péptido en el Vial (Tamaño)
                  </label>
                  <div className="flex flex-wrap gap-3 items-center">
                    {vialPresets.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => {
                          setIsCustomVial(false)
                          setVialSize(preset)
                        }}
                        className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                          !isCustomVial && vialSize === preset
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                            : 'bg-purple-950/20 border-purple-500/20 text-purple-300 hover:border-purple-500/50 hover:text-white'
                        }`}
                      >
                        {preset} mg
                      </button>
                    ))}
                    <button
                      onClick={() => setIsCustomVial(true)}
                      className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                        isCustomVial
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                          : 'bg-purple-950/20 border-purple-500/20 text-purple-300 hover:border-purple-500/50 hover:text-white'
                      }`}
                    >
                      Otro (Personalizado)
                    </button>
                  </div>

                  {isCustomVial && (
                    <div className="mt-4 flex gap-2 animate-fade-in">
                      <div className="relative flex-1">
                        <input
                          type="number"
                          value={vialSizeCustom}
                          onChange={(e) => setVialSizeCustom(e.target.value)}
                          placeholder="Ingresa los miligramos (mg)"
                          className="w-full bg-purple-950/25 border border-purple-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/20"
                          min="0"
                          step="any"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300 text-sm font-bold">
                          mg
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Water Volume Input */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs uppercase tracking-wider text-purple-300 font-bold">
                      2. Agua Bacteriostática Añadida (Volumen)
                    </label>
                    <span className="text-pink-400 font-mono text-sm font-bold">{waterVolume.toFixed(1)} ml</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={waterVolume}
                    onChange={(e) => setWaterVolume(parseFloat(e.target.value))}
                    className="w-full accent-pink-500 h-1.5 bg-purple-950/40 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-purple-400 font-mono mt-2">
                    <span>0.5 ml</span>
                    <span>1.0 ml</span>
                    <span>2.0 ml</span>
                    <span>3.0 ml</span>
                    <span>4.0 ml</span>
                    <span>5.0 ml</span>
                  </div>
                </div>

                {/* 3. Desired Dose Input */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs uppercase tracking-wider text-purple-300 font-bold">
                      3. Dosis de Investigación Deseada
                    </label>
                    <span className="text-purple-300 font-mono text-sm font-bold flex gap-1.5 items-center">
                      <input
                        type="number"
                        value={desiredDose}
                        onChange={(e) => setDesiredDose(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-20 bg-purple-950/20 border border-purple-500/20 focus:border-pink-500/50 rounded px-2 py-0.5 text-center text-pink-400 focus:outline-none"
                      />
                      mcg
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1500"
                    step="50"
                    value={desiredDose}
                    onChange={(e) => setDesiredDose(parseInt(e.target.value))}
                    className="w-full accent-purple-500 h-1.5 bg-purple-950/40 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-purple-400 font-mono mt-2">
                    <span>50 mcg</span>
                    <span>250 mcg</span>
                    <span>500 mcg</span>
                    <span>750 mcg</span>
                    <span>1000 mcg</span>
                    <span>1500 mcg</span>
                  </div>
                </div>

                {/* 4. Syringe Capacity Input */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-purple-300 font-bold mb-3">
                    4. Tipo / Capacidad de la Jeringa
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'U-100 (1.0 ml)', value: 100, desc: '100 Unidades' },
                      { label: 'U-50 (0.5 ml)', value: 50, desc: '50 Unidades' },
                      { label: 'U-30 (0.3 ml)', value: 30, desc: '30 Unidades' },
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => setSyringeSize(item.value)}
                        className={`px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
                          syringeSize === item.value
                            ? 'bg-purple-950/40 border-pink-500/50 text-white shadow-[0_0_15px_rgba(236,72,153,0.1)]'
                            : 'bg-purple-950/20 border-purple-500/20 text-purple-300 hover:border-purple-500/50'
                        }`}
                      >
                        <p className="text-xs font-bold block">{item.label}</p>
                        <p className="text-[10px] text-purple-400 mt-1">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-purple-400/80 mt-3 leading-snug">
                    *Nota: Todas las jeringas de insulina estándar utilizan la misma escala de concentración (U-100), donde 1 Unidad equivale a 0.01 ml de líquido. Variar la capacidad de la jeringa solo modifica el límite máximo de llenado físico.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Calculations & Syringe Graphic (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Numerical Results Card */}
            <div className="bg-gradient-to-b from-purple-950/40 to-black/60 border border-purple-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-pink-500/10 blur-[50px] pointer-events-none" />
              
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="text-purple-400">📊</span> Dosificación Calculada
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {/* Result 1: Units (Big and Bold) */}
                <div className="bg-purple-950/15 border border-purple-500/10 rounded-2xl p-4 text-center relative">
                  <span className="text-xs uppercase tracking-wider text-purple-400 block mb-1">Cargar en la jeringa:</span>
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                    {syringeUnits.toFixed(1)} <span className="text-xl font-bold">Unidades</span>
                  </div>
                  {isOverfilled && (
                    <div className="mt-2 text-[10px] text-pink-500 bg-pink-500/10 border border-pink-500/20 py-1 px-3 rounded-full inline-block animate-pulse">
                      ⚠️ ¡Supera la capacidad de la jeringa ({syringeSize}U)!
                    </div>
                  )}
                </div>

                {/* Grid for volume & concentration */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-950/10 border border-purple-500/10 rounded-xl p-3.5 text-center">
                    <span className="text-[10px] uppercase tracking-wider text-purple-400 block mb-1">Volumen líquido:</span>
                    <span className="text-lg font-bold text-white block font-mono">{volumeMl.toFixed(3)} ml</span>
                  </div>
                  <div className="bg-purple-950/10 border border-purple-500/10 rounded-xl p-3.5 text-center">
                    <span className="text-[10px] uppercase tracking-wider text-purple-400 block mb-1">Concentración:</span>
                    <span className="text-lg font-bold text-white block font-mono">
                      {(concentration / 1000).toFixed(1)} mg/ml
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Protocol Card (Viral Loop) */}
            <div className="bg-gradient-to-b from-purple-950/20 to-black/60 border border-purple-500/20 rounded-3xl p-5 backdrop-blur-xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-purple-500/5 blur-[45px] pointer-events-none" />
              
              <h3 className="text-xs uppercase tracking-wider text-purple-300 font-bold mb-2.5 flex items-center gap-1.5">
                <span>🔗</span> Compartir Protocolo Científico
              </h3>
              <p className="text-[11px] text-purple-200/70 leading-relaxed mb-4">
                Exporta y comparte los resultados exactos de dilución con tu equipo de investigación o foros de análisis.
              </p>
              
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={handleCopyProtocol}
                  className={`w-full py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    copied
                      ? 'bg-green-950/40 border-green-500/40 text-green-400'
                      : 'bg-purple-950/30 border-purple-500/30 text-purple-300 hover:border-purple-500/60 hover:text-white hover:bg-purple-900/20'
                  }`}
                >
                  {copied ? (
                    <>
                      <span>✓</span> ¡Copiado al Portapapeles!
                    </>
                  ) : (
                    <>
                      <span>📋</span> Copiar Protocolo Formateado
                    </>
                  )}
                </button>

                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `🧪 Calculé mi protocolo de dilución con precisión de laboratorio usando Veltis Peptides. Échale un ojo: https://veltispeptides.mx/calculadora`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-950/20 hover:bg-green-900/30 border border-green-500/20 hover:border-green-500/40 text-green-400 font-bold text-[9px] uppercase py-2.5 rounded-xl text-center transition duration-200"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://t.me/share/url?url=https://veltispeptides.mx/calculadora&text=${encodeURIComponent(
                      `🧪 Calculadora interactiva de reconstitución de precisión 3D para viales de investigación.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-sky-950/20 hover:bg-sky-900/30 border border-sky-500/20 hover:border-sky-500/40 text-sky-400 font-bold text-[9px] uppercase py-2.5 rounded-xl text-center transition duration-200"
                  >
                    Telegram
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=https://veltispeptides.mx/calculadora&text=${encodeURIComponent(
                      `Evita errores de dilución en tus viales liofilizados con el simulador matemático interactivo 3D.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-950/10 hover:bg-purple-950/20 border border-purple-500/20 hover:border-purple-500/40 text-purple-300 font-bold text-[9px] uppercase py-2.5 rounded-xl text-center transition duration-200"
                  >
                    Twitter / X
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Visual Syringe */}
            <div className="bg-gradient-to-b from-purple-950/20 to-black/60 border border-purple-500/20 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
              <h3 className="text-xs uppercase tracking-wider text-purple-300 font-bold mb-6 text-center">
                Visualización Tridimensional de Carga ({syringeSize} Unidades)
              </h3>

              {/* Syringe Assembly Grid Layout */}
              <div className="flex flex-col items-center justify-center py-6 relative">
                
                {/* Needle Base (glowing pink metal connection) */}
                <div className="w-1.5 h-10 bg-gradient-to-b from-gray-400 to-purple-500/50 rounded-t relative">
                  {/* Glowing thin needle tip */}
                  <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-[1px] h-[30px] bg-purple-300 shadow-[0_0_8px_purple]" />
                </div>

                {/* Syringe Body Container */}
                <div className="w-20 h-64 border-2 border-purple-500/30 rounded-b-[4px] relative bg-purple-950/5 flex flex-col justify-end overflow-hidden shadow-[inset_0_0_15px_rgba(168,85,247,0.1)]">
                  
                  {/* Liquid Volume fill height */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600/30 via-pink-600/25 to-pink-500/40 border-t border-pink-400/50 shadow-[0_0_10px_rgba(236,72,153,0.15)] transition-all duration-500 ease-out"
                    style={{ height: `${fillPercentage}%` }}
                  />

                  {/* Tick Marks (0 to syringe size) */}
                  <div className="absolute inset-0 flex flex-col justify-between py-2 text-purple-400/40 select-none pointer-events-none font-mono text-[9px]">
                    <div className="flex justify-between px-1.5"><span>0</span><span className="w-2 h-[1px] bg-purple-500/30" /></div>
                    <div className="flex justify-between px-1.5"><span>{syringeSize * 0.2}</span><span className="w-3.5 h-[1px] bg-purple-500/30" /></div>
                    <div className="flex justify-between px-1.5"><span>{syringeSize * 0.4}</span><span className="w-3.5 h-[1px] bg-purple-500/30" /></div>
                    <div className="flex justify-between px-1.5"><span>{syringeSize * 0.6}</span><span className="w-3.5 h-[1px] bg-purple-500/30" /></div>
                    <div className="flex justify-between px-1.5"><span>{syringeSize * 0.8}</span><span className="w-3.5 h-[1px] bg-purple-500/30" /></div>
                    <div className="flex justify-between px-1.5"><span>{syringeSize}</span><span className="w-2 h-[1px] bg-purple-500/30" /></div>
                  </div>

                  {/* Floating Plunger Tip (Black rubber stopper) */}
                  <div 
                    className="absolute w-full h-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-purple-500/20 transition-all duration-500 ease-out flex items-center justify-center"
                    style={{ bottom: `calc(${fillPercentage}% - 8px)` }}
                  >
                    <div className="w-[85%] h-[1px] bg-gray-600" />
                  </div>
                </div>

                {/* Plunger Handle Rod */}
                <div 
                  className="w-4 bg-gradient-to-r from-purple-900/30 via-purple-800/40 to-purple-900/30 border-l border-r border-purple-500/10 transition-all duration-500 ease-out shadow-inner"
                  style={{ height: `calc(150px - (${fillPercentage}% * 1.2))` }}
                />

                {/* Plunger Base Thumb Rest */}
                <div className="w-14 h-2.5 bg-gradient-to-r from-purple-800 via-pink-700 to-purple-800 rounded-full border border-purple-500/20 shadow-md" />
              </div>
            </div>
          </div>
        </div>

        {/* Reconstitution Lab Guide & Protocol (SEO Rich Content) */}
        <section className="bg-gradient-to-b from-purple-950/10 to-black/60 border border-purple-500/15 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-pink-500">📖</span> Protocolo de Reconstitución Científica
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-purple-200/90 text-sm leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-md font-bold text-pink-400 uppercase tracking-wider">Paso 1: Sanitización Rigurosa</h3>
              <p>
                Lava tus manos a fondo y limpia la superficie de trabajo. Utiliza almohadillas impregnadas de **alcohol isopropílico al 70%** para desinfectar la parte superior de plástico de los viales (tanto del péptido liofilizado como del diluyente bacteriostático) antes de perforar las tapas de hule. Deja secar al aire durante 10 segundos.
              </p>
              
              <h3 className="text-md font-bold text-pink-400 uppercase tracking-wider">Paso 2: Extracción con Vacío Controlado</h3>
              <p>
                Extrae el volumen exacto de agua bacteriostática calculado anteriormente utilizando una jeringa estéril estandarizada. Tip científico de laboratorio: Inyecta un volumen equivalente de aire en el vial de agua bacteriostática antes de extraer el líquido; esto iguala las presiones y facilita el llenado sin burbujas.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-md font-bold text-purple-300 uppercase tracking-wider">Paso 3: Transferencia Deslizada (Efecto Pared)</h3>
              <p>
                Inserta la aguja en el vial del péptido con un ángulo de **45 grados**. **No inyectes el agua directamente sobre el polvo de péptido seco**, ya que esto puede romper o dañar las cadenas polipeptídicas sensibles. En su lugar, apunta la aguja hacia la pared de vidrio del vial para que el agua bacteriostática se deslice suave y uniformemente por el costado.
              </p>
              
              <h3 className="text-md font-bold text-purple-300 uppercase tracking-wider">Paso 4: Disolución Natural (Sin Agitación)</h3>
              <p>
                Retira la aguja y permite que el péptido se disuelva de forma natural. **NUNCA agites con fuerza el vial.** La agitación vigorosa desnaturalizará (romperá) de inmediato las delicadas estructuras del péptido, perdiendo su efectividad científica. Si quedan cristales sin disolver, gíralo suave y lentamente entre las palmas de tus manos sin sacudir.
              </p>
            </div>
          </div>

          <div className="border-t border-purple-500/10 mt-8 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center text-xs text-purple-400">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-purple-950/60 border border-purple-500/20 flex items-center justify-center text-xl text-pink-500">
                ❄️
              </div>
              <div>
                <p className="font-bold text-white">Conservación de Cadena de Frío</p>
                <p className="mt-0.5">Una vez reconstituido el péptido, es sumamente propenso a la degradación térmica. Almacénalo en refrigeración inmediata a una temperatura constante entre 2°C y 8°C. Evita vibraciones o impactos mecánicos bruscos.</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-purple-950/60 border border-purple-500/20 flex items-center justify-center text-xl text-pink-500">
                💡
              </div>
              <div>
                <p className="font-bold text-white">Solvente de Calidad de Laboratorio</p>
                <p className="mt-0.5">Utiliza únicamente agua bacteriostática estéril para reconstituir tus péptidos. El agua estéril normal carece de alcohol bencílico al 0.9%, lo que provocaría proliferación bacteriana en pocos días si se guarda para múltiples usos de laboratorio.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Authoritative Disclaimer */}
        <section className="bg-purple-950/10 border border-purple-500/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-500/30 flex items-center justify-center text-2xl text-pink-500 flex-shrink-0 animate-pulse">
            ⚠️
          </div>
          <div>
            <h4 className="text-md font-bold text-white mb-2 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Aviso Regulatorio de Seguridad Química
            </h4>
            <p className="text-purple-300 text-xs leading-relaxed">
              Todos los péptidos y compuestos disponibles en VELTIS Peptides están exclusivamente destinados para su análisis in vitro y protocolos de investigación de laboratorio preclínico. Ningún compuesto está diseñado, aprobado ni comercializado para consumo humano, inyección, diagnóstico clínico, medicina veterinaria, suplementación alimenticia ni ningún otro fin médico. Este simulador matemático es provisto estrictamente como recurso de apoyo educativo para simplificar la planificación de diluciones en laboratorios químicos autorizados.
            </p>
          </div>
        </section>
      </div>

      {/* Footer Layout */}
      <footer className="border-t border-purple-500/10 bg-black/60 backdrop-blur-md py-8 relative z-10">
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

      {/* Premium AI Chatbot Widget */}
      <AIChatbot />
    </main>
  )
}
