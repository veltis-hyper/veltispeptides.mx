import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'
import AIChatbot from '@/components/AIChatbot'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-bg-warm">
      {/* Promo Banner */}
      <div className="bg-primary-dark text-white text-center py-2 text-xs font-semibold tracking-wider">
        Envíos en 2-5 días hábiles a toda la República Mexicana • Solo para investigación • Uso exclusivo de laboratorio
      </div>

      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-border-primary">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 flex items-center justify-center">
              <Image src="/veltis-icon-no-text.svg" alt="Veltis Icon" width={32} height={32} className="text-primary-dark" />
            </span>
            <span className="text-xl font-neuton font-bold tracking-wider text-text-primary group-hover:text-primary-dark transition">
              VELTIS
            </span>
          </Link>
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="#blog" className="text-text-muted hover:text-primary-dark transition text-xs font-bold uppercase tracking-widest">
              Blog
            </Link>
            <Link href="/calculadora" className="text-text-muted hover:text-primary-dark transition text-xs font-bold uppercase tracking-widest">
              Calculadora
            </Link>
            <Link href="https://www.veltispeptides.mx/productos" className="text-text-muted hover:text-primary-dark transition text-xs font-bold uppercase tracking-widest">
              Productos
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-bg-warm py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl md:text-[8rem] font-neuton text-primary-dark tracking-tight leading-none mb-6">
            VELTIS
          </h1>
          <p className="text-xl md:text-2xl text-text-primary font-neuton max-w-2xl mx-auto mb-10">
            No vendemos promesas; vendemos moléculas trazables
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://www.veltispeptides.mx/productos" className="bg-primary hover:bg-primary-dark text-white px-8 py-3 text-sm font-bold uppercase tracking-widest transition">
              Ver Catálogo
            </Link>
            <Link href="https://www.veltispeptides.mx/contacto" className="border border-border-primary bg-white hover:bg-bg-alt text-text-primary px-8 py-3 text-sm font-bold uppercase tracking-widest transition">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border-primary bg-bg-alt py-6 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex justify-center flex-wrap gap-8 text-xs font-bold uppercase tracking-widest text-text-muted">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-dark"></span>
            Pureza HPLC &gt;98%
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-dark"></span>
            COA por Lote
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-dark"></span>
            Trazabilidad QR
          </span>
        </div>
      </section>

      {/* Calculator Promo */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-white border border-border-primary p-10 flex flex-col md:flex-row items-center gap-10 shadow-sm">
          <div className="flex-1">
            <h2 className="text-3xl font-neuton text-primary-dark mb-4">Calculadora de Reconstitución</h2>
            <p className="text-text-muted mb-6 leading-relaxed">
              Herramienta matemática precisa para dosificación de péptidos en investigación. Elimina el error humano con cálculos exactos de concentración y volumen.
            </p>
            <Link href="/calculadora" className="text-primary-dark font-bold uppercase text-sm tracking-widest hover:text-primary transition flex items-center gap-2">
              Abrir Calculadora →
            </Link>
          </div>
          <div className="w-full md:w-1/3 flex justify-center opacity-80">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-32 h-32 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.5L18 7M5.5 19.5L7 18M15 4v3h3M4 15v3h3" />
              <rect x="5" y="5" width="14" height="14" rx="2" />
              <path d="M12 9v6M9 12h6" />
            </svg>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="bg-bg-alt py-20 border-t border-border-primary">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-neuton text-text-primary mb-12 text-center">Literatura Científica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-border-primary p-6 hover:shadow-md hover:border-primary-light transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-neuton font-bold text-primary-dark mb-3">{post.title}</h3>
                  <p className="text-text-muted mb-6 line-clamp-3 text-sm leading-relaxed">{post.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border-primary">
                  <span className="text-xs text-text-muted font-mono">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary-dark hover:text-primary font-bold uppercase text-xs tracking-widest transition"
                  >
                    Leer →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Disclaimer Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-bg-alt border-l-4 border-primary-dark p-6">
          <h4 className="text-xs font-bold text-primary-dark uppercase tracking-widest mb-3">
            ⚠️ Disclaimer y Regulaciones de Laboratorio
          </h4>
          <p className="text-text-muted text-xs leading-relaxed max-w-4xl">
            Todos los péptidos y productos de investigación de VELTIS Peptides están destinados exclusivamente para fines de investigación de laboratorio in vitro y preclínica. Estos compuestos no son medicamentos, suplementos, alimentos, cosméticos ni dispositivos médicos, y no están aprobados por la COFEPRIS ni la FDA para consumo humano, inyección o diagnóstico clínico. Su manejo debe realizarse por personal calificado bajo estándares de bioseguridad apropiados.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border-primary py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-xs text-text-muted font-mono">
          © {new Date().getFullYear()} VELTIS Peptides. Todos los derechos reservados.
        </div>
      </footer>

      {/* Floating Chatbot Widget */}
      <AIChatbot />
    </main>
  )
}
