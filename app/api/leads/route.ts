import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, type, data } = body

    // Simple backend input validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido o ausente.' },
        { status: 400 }
      )
    }

    if (!type || !['newsletter', 'protocol', 'affiliate'].includes(type)) {
      return NextResponse.json(
        { error: 'Tipo de lead no soportado.' },
        { status: 400 }
      )
    }

    // Server-side logging to terminal / console
    console.log(`[VELTIS LEADS ENGINE] Nuevo lead capturado:`, {
      email,
      type,
      timestamp: new Date().toISOString(),
      data: data || {}
    })

    // NOTE TO DEVELOPER / ADMIN:
    // Para conectar esto con plataformas reales (Brevo, Mailchimp, ActiveCampaign, etc.):
    // 1. Obtén tu API Key de tu CRM.
    // 2. Descomenta el bloque de integración correspondiente en esta sección.
    // 3. Configura tus variables de entorno en Vercel o .env.local (ej: BREVO_API_KEY).
    
    /*
    // EJEMPLO DE INTEGRACIÓN CON BREVO (SÉNDINBLUE):
    if (process.env.BREVO_API_KEY) {
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': process.env.BREVO_API_KEY
        },
        body: JSON.stringify({
          email: email,
          updateEnabled: true,
          listIds: [type === 'newsletter' ? 2 : type === 'protocol' ? 3 : 4], // IDS DE TUS LISTAS EN BREVO
          attributes: {
            TIPO: type.toUpperCase(),
            AREA: data?.area || '',
            PEPTIDO: data?.peptide || '',
            TELEFONO: data?.phone || '',
            RED_SOCIAL: data?.handle || '',
            AUDIENCIA: data?.audienceSize || ''
          }
        })
      })
      if (!response.ok) {
        console.error('Error enviando lead a Brevo:', await response.text())
      }
    }
    */

    return NextResponse.json({
      success: true,
      message: 'Lead procesado y almacenado con éxito.',
      received: { email, type }
    })
  } catch (error) {
    console.error('Error en el gestor de leads de Veltis:', error)
    return NextResponse.json(
      { error: 'Error interno en el servidor analítico.' },
      { status: 500 }
    )
  }
}
