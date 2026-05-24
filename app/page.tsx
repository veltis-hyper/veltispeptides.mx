import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import Header from '@/components/Header'
import AIChatbot from '@/components/AIChatbot'
import NewsletterCapture from '@/components/NewsletterCapture'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-black text-white relative selection:bg-purple-500/30 selection:text-pink-400 overflow-x-hidden">
      {/* Background Neon Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-pink-900/10 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none" />

      {/* Global Header Navigation */}
      <Header />

      {/* Hero Section / Scientific Statement */}
      <section className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs tracking-wider uppercase mb-8 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          Hub Científico y de Trazabilidad
        </div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
          Investigación de Péptidos de{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-pink-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            Alta Pureza
          </span>
        </h2>
        <p className="max-w-2xl mx-auto text-purple-200/80 text-lg leading-relaxed mb-8">
          Explora nuestros recursos educativos, guías de reconstitución de laboratorio y artículos de divulgación científica para optimizar tus protocolos experimentales con total trazabilidad.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="https://www.veltispeptides.mx/productos"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] transition duration-300 transform hover:scale-105"
          >
            Ver Catálogo HPLC
          </Link>
          <a
            href="#articles"
            className="bg-purple-950/40 hover:bg-purple-900/40 border border-purple-500/30 text-purple-200 hover:text-white font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full transition duration-300 transform hover:scale-105"
          >
            Artículos Recientes
          </a>
        </div>
      </section>

      {/* Main Content: Blog Articles Feed */}
      <section id="articles" className="max-w-6xl mx-auto px-6 py-16 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white mb-3">
              Divulgación y Literatura de Péptidos
            </h2>
            <p className="text-purple-300 text-sm max-w-xl">
              Análisis profundo de los mecanismos de acción, guías de manejo y estabilidad de moléculas en el laboratorio.
            </p>
          </div>
          <div className="text-sm text-purple-400 border-b border-purple-500/20 pb-1">
            Mostrando {posts.length} artículos publicados
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative bg-gradient-to-b from-purple-950/20 to-black border border-purple-500/20 hover:border-pink-500/50 rounded-2xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle glass hover background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Meta details */}
                <div className="flex justify-between items-center mb-4 text-xs text-purple-400">
                  <span>{post.date}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/20 uppercase tracking-widest text-[9px] font-bold text-pink-400">
                    Artículos
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-purple-200/70 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
              </div>

              {/* Action and Keywords */}
              <div className="pt-4 border-t border-purple-500/10 flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {post.keywords.slice(0, 3).map((keyword: string, kIdx: number) => (
                    <span key={kIdx} className="text-[10px] text-purple-300 bg-purple-950/30 px-2 py-0.5 rounded">
                      #{keyword}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-purple-400 font-medium">Lectura: 5 min</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-pink-500 hover:text-pink-400 font-bold text-sm transition-all duration-200 group-hover:translate-x-1"
                  >
                    Leer Artículo <span className="text-md">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Lead Capture Newsletter Section */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <NewsletterCapture />
      </section>

      {/* Compliance / Laboratory Disclaimer Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-purple-500/10">
        <div className="bg-purple-950/10 border border-purple-500/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-500/30 flex items-center justify-center text-2xl text-pink-500 flex-shrink-0 animate-pulse">
            ⚠️
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Disclaimer y Regulaciones de Laboratorio
            </h4>
            <p className="text-purple-300 text-xs leading-relaxed">
              Todos los péptidos y productos de investigación de VELTIS Peptides están destinados exclusivamente para fines de investigación de laboratorio in vitro y preclínica. Estos compuestos no son medicamentos, suplementos, alimentos, cosméticos ni dispositivos médicos, y no están aprobados por la COFEPRIS ni la FDA para consumo humano, inyección o diagnóstico clínico. Su manejo debe realizarse por personal calificado bajo estándares de bioseguridad apropiados.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/10 bg-black/60 backdrop-blur-md py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-purple-400">
          <div>
            © {new Date().getFullYear()} VELTIS Peptides. Todos los derechos reservados.
          </div>
          <div className="flex gap-6">
            <Link href="https://www.veltispeptides.mx/terminos" className="hover:text-white transition">Términos de Servicio</Link>
            <Link href="https://www.veltispeptides.mx/privacidad" className="hover:text-white transition">Política de Privacidad</Link>
          </div>
        </div>
      </footer>

      {/* Premium AI Chatbot Floating Widget */}
      <AIChatbot />
    </main>
  )
}
