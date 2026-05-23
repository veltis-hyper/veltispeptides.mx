import { NextResponse } from 'next/server'

// Highly-curated, clinical-grade scientific responses for lab peptide research
const KNOWLEDGE_BASE: Record<string, string> = {
  welcome: `¡Hola! Bienvenido al **Asistente Científico de VELTIS Peptides**. 🔬

Estoy aquí para proveer información técnica, datos de espectrometría y guías de manejo de laboratorio sobre nuestras moléculas de grado de investigación.

*Por favor, ten en cuenta que todas nuestras moléculas están destinadas estrictamente para uso de investigación de laboratorio in vitro o preclínico. No están aprobadas para consumo humano, uso médico, diagnóstico ni tratamiento.*

¿En qué compuesto o protocolo de laboratorio te gustaría profundizar hoy?`,

  "bpc-157": `### BPC-157 (Body Protection Compound 157) - Grado de Investigación

El **BPC-157** es un pentadecapéptido sintético de 15 aminoácidos derivado de una secuencia parcial de la proteína protectora del jugo gástrico humano.

#### Parámetros Técnicos y de Pureza:
- **Pureza Mínima (HPLC):** >98% (Trazable por lote con código QR).
- **Peso Molecular:** 1419.7 g/mol.
- **Fórmula Química:** C₆₂H9₈N₁₆O₂₂.
- **Estructura de Almacenamiento:** Liofilizado al vacío para máxima estabilidad.

#### Áreas Clave de Estudio Clínico/Preclínico:
1. **Regeneración de Tejidos:** Se estudia su capacidad para promover la angiogénesis (formación de nuevos vasos sanguíneos) a través de la vía del factor de crecimiento endotelial (VEGF).
2. **Cicatrización de Tendones y Ligamentos:** Investigaciones in vitro sugieren que estimula la proliferación y migración de fibroblastos.
3. **Integridad de la Barrera de Mucosa:** Se investiga su efecto protector sobre el epitelio gastrointestinal y la reducción de procesos inflamatorios sistémicos.

*Aviso: Este compuesto es exclusivo para investigación de laboratorio.*`,

  semaglutide: `### Semaglutide - Agonista del Receptor GLP-1 para Investigación

El **Semaglutide** es un análogo de cadena larga del péptido similar al glucagón tipo 1 (GLP-1) humano, modificado químicamente para prolongar su vida media plasmática mediante la adición de un diácido graso C18 y una sustitución de aminoácidos en la posición 8 (Aib).

#### Parámetros de Laboratorio:
- **Pureza Mínima (HPLC):** >98%.
- **Peso Molecular:** 4113.6 g/mol.
- **Fórmula Química:** C₁₈₇H₂₉₁N₄₅O₅₉.
- **Método de Ensayo:** Espectrometría de masas por cromatografía líquida (LC-MS) y HPLC de fase reversa.

#### Mecanismos Científicos Estudiados:
1. **Señalización de Insulina:** Regulación de la secreción de insulina dependiente de glucosa por interacción directa con el receptor GLP-1.
2. **Vaciamiento Gástrico:** Cinética de vaciamiento y supresión preclínica del glucagón.
3. **Mecanismos Centrales de Saciedad:** Unión a receptores específicos en el núcleo arcuato del hipotálamo en modelos animales.

*Aviso: Producto restringido únicamente para pruebas de laboratorio y modelos de investigación celular o preclínica.*`,

  tirzepatide: `### Tirzepatide - Co-Agonista Dual GIP/GLP-1 para Investigación

El **Tirzepatide** es un péptido de 39 aminoácidos sintético diseñado para actuar como un agonista dual de los receptores del polipéptido insulinotrópico dependiente de glucosa (GIP) y del péptido similar al glucagón-1 (GLP-1).

#### Propiedades Fisicoquímicas:
- **Pureza HPLC:** >98.5%.
- **Peso Molecular:** 4813.5 g/mol.
- **Fórmula Química:** C₂₂₅H₃₄₈N₄₈O₆₈.
- **Estabilidad de Lote:** Altamente estable a temperatura ambiente en su estado liofilizado protegido de luz UV.

#### Enfoques de Investigación Actual:
1. **Sinergia Metabólica:** Evaluación de la co-estimulación de receptores GIP y GLP-1 en adipocitos y células beta pancreáticas en cultivos in vitro.
2. **Sensibilidad a la Insulina:** Impacto en el aclaramiento de glucosa periférica y el gasto de energía mitocondrial en modelos de investigación metabólica.

*Aviso: No apto para uso terapéutico o diagnóstico humano.*`,

  "tb-500": `### TB-500 (Thymosin Beta-4 / Timosina Beta-4) - Frado de Investigación

El **TB-500** es una fracción sintética del péptido natural Timosina Beta-4 de 43 aminoácidos, implicado directamente en la regulación de la polimerización de la actina celular.

#### Características Técnicas:
- **Pureza (HPLC):** >98%.
- **Fórmula Química:** C₂₁₂H₃₅₀N₅₆O₆₈S.
- **Peso Molecular:** 4963.5 g/mol.

#### Mecanismos de Acción en Investigación:
1. **Regulación de Actina G:** Actúa como una proteína secuestradora de actina monomérica, facilitando la motilidad celular y la reparación de fibras musculares y dérmicas.
2. **Neovascularización:** Estimulación del factor de crecimiento de fibroblastos y migración de células endoteliales.
3. **Reparación Tisular:** Disminución del depósito de colágeno fibrótico en tejidos lesionados en modelos animales de trauma.

*Aviso: Este producto es estrictamente de uso analítico y científico.*`,

  "ghk-cu": `### GHK-Cu (Copper Peptide / Péptido de Cobre) - Grado de Investigación

El **GHK-Cu** es un complejo tripéptido de glicil-L-histidil-L-lisina quelado con un ion cobre (II). Se encuentra de forma natural en el plasma humano pero declina progresivamente con la senescencia celular.

#### Especificaciones del Producto:
- **Pureza (HPLC):** >98% (Polvo liofilizado de color azul profundo característico debido a la quelación de cobre).
- **Fórmula Química:** C₁₄H₂₂CuN₆O₄.
- **Peso Molecular:** 401.9 g/mol.

#### Líneas de Estudio Clínico/Científico:
1. **Remodelación Dérmica:** Inducción de la síntesis de colágeno, elastina y glicosaminoglicanos en fibroblastos aislados.
2. **Propiedades Antioxidantes:** Activación de la superóxido dismutasa (SOD-1) celular para mitigar el daño por estrés oxidativo.
3. **Trazabilidad Biológica:** Reparación de células epidérmicas y soporte en estudios de envejecimiento celular in vitro.

*Aviso: Uso exclusivo en investigación de laboratorio.*`,

  reconstitution: `### Protocolo de Reconstitución de Laboratorio

La reconstitución correcta es fundamental para preservar la estructura tridimensional de los péptidos liofilizados y evitar la desnaturalización o degradación de la cadena polipeptídica.

#### Directrices Técnicas Generales:
1. **Sustancia Solvente:** Se recomienda utilizar **Agua Bacteriostática para Inyección** (contiene 0.9% de alcohol bencílico) para inhibir el crecimiento bacteriano y permitir múltiples extracciones analíticas durante el periodo de estudio.
2. **Procedimiento de Adición:**
   - Permite que el vial liofilizado alcance la temperatura del laboratorio (18-22°C) antes de reconstituir.
   - Introduce la aguja del solvente en un ángulo de 45 grados y dirige el chorro **suavemente por la pared de vidrio interna** del vial, nunca directamente sobre el polvo liofilizado.
   - Permite que el solvente disuelva el polvo por capilaridad estática. **No agites vigorosamente el vial** (la agitación mecánica rompe los puentes de hidrógeno y desnaturaliza el péptido). Realiza movimientos circulares suaves si es necesario.
3. **Cálculo de Concentración (Ejemplo):**
   - Vial de **BPC-157 de 10 mg** reconstituido con **2 ml de solvente**:
     - Concentración resultante = 10 mg / 2 ml = 5 mg/ml (o 5,000 mcg/ml).
     - Una micro-extracción de 0.1 ml (10 unidades en jeringa estándar) contendrá 500 mcg del compuesto activo.

*Aviso: Directrices operativas estrictamente con fines informativos para diseño experimental.*`,

  storage: `### Guía de Almacenamiento y Conservación de Péptidos

Para asegurar que las moléculas mantengan su pureza HPLC superior al 98% a largo plazo, sigue estas normas estrictas de cadena de frío y protección ambiental:

#### Estado Liofilizado (Antes de la Reconstitución):
- **Almacenamiento de Corto Plazo (1-3 meses):** Mantener en refrigeración constante a **2°C a 8°C**, protegido de la exposición a la luz solar directa e indirecta.
- **Almacenamiento de Largo Plazo (hasta 2 años):** Conservar en congelador a **-20°C**. Evita ciclos constantes de congelación/descongelación. Se recomienda utilizar desecantes en los contenedores de almacenamiento.

#### Estado Reconstituido (Disuelto en Solvente):
- **Temperatura de Almacenamiento:** Mantener estrictamente entre **2°C y 8°C**. **No congelar** un péptido ya reconstituido, ya que la formación de micro-cristales de hielo destruirá los enlaces estructurales.
- **Vida Útil Útil:** La estabilidad hidrolítica en solución varía según el compuesto, pero generalmente se sitúa entre **14 y 28 días** para mantener una integridad de enlace >95%. Compuestos delicados como el Semax o la Tirzepatide deben usarse dentro de los primeros 14-21 días después de su disolución.`,

  purity: `### El Estándar de Pureza VELTIS Peptides (HPLC/MS)

En VELTIS Peptides, la confianza científica no es una declaración, es una prueba verificable por lote.

#### 1. Cromatografía Líquida de Alta Resolución (HPLC)
Cada lote de producción es sometido a un análisis de HPLC para determinar la pureza exacta del compuesto. Rechazamos cualquier lote que no supere el **98.0% de pureza real**.

#### 2. Espectrometría de Masas (LC-MS)
Validamos la identidad estructural exacta de la molécula para asegurar que no existan isómeros incorrectos o subproductos de síntesis que afecten los resultados de tu investigación.

#### 3. Certificados de Análisis (COA) Activos
Ofrecemos acceso abierto a nuestra biblioteca de COAs por número de lote. Cada vial de VELTIS cuenta con un código QR único que dirige al reporte de laboratorio verificado por analistas de **CRAFA**.`,
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1]?.content || ''
    const query = lastMessage.toLowerCase().trim()

    // 1. Direct environment check for Google Gemini API
    if (process.env.GEMINI_API_KEY) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `Eres el Asistente Científico de VELTIS Peptides (https://veltispeptides.mx). Responde de manera profesional, clínica, clara y rigurosamente científica. 
                      
                      REGLAS DE CUMPLIMIENTO REGULATORIO (ESTRICTO):
                      1. NUNCA sugieras, recomiendes ni hables de dosis, beneficios, protocolos de uso o efectos secundarios para CONSUMO HUMANO, pérdida de peso, rendimiento deportivo personal o tratamientos de salud en personas o animales.
                      2. Habla SIEMPRE de "modelos de investigación", "estudios in vitro o preclínicos", "mecanismos de investigación", "literatura científica", y recalca que son compuestos de "uso exclusivo en investigación de laboratorio".
                      3. Utiliza términos como "se estudia su estabilidad", "mecanismo propuesto", "concentraciones de laboratorio", "almacenamiento" y "manipulación".
                      4. Si el usuario pregunta cosas como "¿cómo me lo inyecto?" o "¿cuánto debo tomar para bajar de peso?", responde de forma muy educada pero firme recordando que los compuestos son de grado de investigación, que no deben consumirse y que solo puedes aportar guías de reconstitución de laboratorio y datos de los mecanismos de acción científica.
                      
                      Si te preguntan por BPC-157, Semaglutide, Tirzepatide, TB-500 o GHK-Cu, utiliza la información científica de que VELTIS cuenta con pureza HPLC >98%, trazabilidad absoluta por lote, y análisis realizados por el laboratorio CRAFA.
                      
                      Historial de conversación:
                      ${JSON.stringify(messages.slice(-5))}
                      
                      Pregunta del investigador:
                      ${lastMessage}`,
                    },
                  ],
                },
              ],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 800,
              },
            }),
          }
        )

        if (response.ok) {
          const data = await response.json()
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text
          if (text) {
            return NextResponse.json({ message: text })
          }
        } else {
          console.warn('Gemini API call failed, falling back to rule-based engine.')
        }
      } catch (geminiError) {
        console.error('Error invoking Gemini:', geminiError)
      }
    }

    // 2. Intelligent, clinical-grade rule-based fallback system
    let responseText = ''

    if (query.includes('hola') || query.includes('buenos dias') || query.includes('buenas tardes') || query.includes('iniciar')) {
      responseText = KNOWLEDGE_BASE.welcome
    } else if (query.includes('bpc') || query.includes('bpc157') || query.includes('bpc-157')) {
      responseText = KNOWLEDGE_BASE['bpc-157']
    } else if (query.includes('semaglutida') || query.includes('semaglutide') || query.includes('glp-1') || query.includes('glp1')) {
      responseText = KNOWLEDGE_BASE.semaglutide
    } else if (query.includes('tirzepatide') || query.includes('tirzepatida') || query.includes('mounjaro')) {
      responseText = KNOWLEDGE_BASE.tirzepatide
    } else if (query.includes('tb-500') || query.includes('tb500') || query.includes('timosina') || query.includes('thymosin')) {
      responseText = KNOWLEDGE_BASE['tb-500']
    } else if (query.includes('ghk') || query.includes('ghk-cu') || query.includes('cobre') || query.includes('copper')) {
      responseText = KNOWLEDGE_BASE['ghk-cu']
    } else if (query.includes('reconstitu') || query.includes('preparar') || query.includes('reconstituir') || query.includes('agua') || query.includes('bacteriostatica')) {
      responseText = KNOWLEDGE_BASE.reconstitution
    } else if (query.includes('almacen') || query.includes('guardar') || query.includes('conservar') || query.includes('frio') || query.includes('refrigerar') || query.includes('cadena de frió')) {
      responseText = KNOWLEDGE_BASE.storage
    } else if (query.includes('pureza') || query.includes('hplc') || query.includes('laboratorio') || query.includes('coa') || query.includes('certificado') || query.includes('crafa')) {
      responseText = KNOWLEDGE_BASE.purity
    } else {
      // General response complying with clinical tone and disclaimer
      responseText = `### Consulta Científica Analizada - Soporte Técnico VELTIS

Gracias por tu pregunta técnica. El compuesto o concepto consultado se asocia con estudios bioquímicos en curso.

Para mantener una precisión científica adecuada, te recordamos que:
1. **Grado Científico:** Todas nuestras moléculas mantienen una pureza certificada por HPLC superior al 98%, respaldada por lotes auditados y QRs verificables.
2. **Orientación de Manejo:** Brindamos soporte completo en guías de reconstitución de laboratorio, cálculo de unidades de disolución y almacenamiento en cadena de frío (2-8°C para reconstituidos).
3. **Limitación de Uso:** Al estar destinadas exclusivamente a investigación in vitro y modelos preclínicos, no nos es posible proveer esquemas de dosificación humana, pautas terapéuticas, ni especificaciones sobre resultados o efectos secundarios en personas.

¿Te gustaría consultar el protocolo estándar de **reconstitución de laboratorio**, guías de **almacenamiento y refrigeración**, o detalles específicos de pureza de compuestos como **BPC-157**, **Semaglutide** o **GHK-Cu**?`
    }

    return NextResponse.json({ message: responseText })
  } catch (error) {
    console.error('Error in chat API route:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
