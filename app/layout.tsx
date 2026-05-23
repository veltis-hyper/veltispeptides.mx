import Script from 'next/script'
import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.veltispeptides.mx'),
  title: {
    default: 'VELTIS Peptides | Divulgación Científica y Trazabilidad',
    template: '%s | VELTIS Peptides',
  },
  description: 'Plataforma oficial de literatura, guías de reconstitución de laboratorio y certificados de análisis (COA) HPLC para péptidos de investigación de alta pureza.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'VELTIS Peptides | Divulgación Científica y Trazabilidad',
    description: 'Plataforma oficial de literatura, guías de reconstitución de laboratorio y certificados de análisis (COA) HPLC para péptidos de investigación de alta pureza.',
    url: 'https://www.veltispeptides.mx',
    siteName: 'VELTIS Peptides',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VELTIS Peptides | Literatura Científica',
    description: 'Plataforma oficial de literatura, guías de reconstitución y COAs de alta pureza.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
