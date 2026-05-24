import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import AIChatbot from '@/components/AIChatbot'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black">
      <header className="sticky top-0 bg-black/80 backdrop-blur z-50 border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90 transition cursor-pointer">
              Veltis Peptides
            </h1>
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="#blog" className="text-purple-300 hover:text-pink-500 transition font-medium">
              Blog
            </Link>
            <Link href="/calculadora" className="text-purple-300 hover:text-pink-500 transition font-medium">
              Calculadora
            </Link>
            <Link href="https://www.veltispeptides.mx/productos" className="text-purple-300 hover:text-pink-500 transition font-medium">
              Shop
            </Link>
          </nav>
        </div>
      </header>

      <section id="blog" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-white mb-12">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-lg p-6 hover:border-pink-500/50 transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                <p className="text-purple-200 mb-4 line-clamp-3 text-sm leading-relaxed">{post.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-purple-400">{post.date}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-pink-500 hover:text-pink-400 font-semibold transition text-sm"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Compliance Disclaimer Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-purple-500/10">
        <div className="bg-purple-950/10 border border-purple-500/20 rounded-lg p-6">
          <h4 className="text-sm font-bold text-pink-400 uppercase tracking-wider mb-2">
            ⚠️ Disclaimer y Regulaciones de Laboratorio
          </h4>
          <p className="text-purple-300 text-xs leading-relaxed">
            Todos los péptidos y productos de investigación de VELTIS Peptides están destinados exclusivamente para fines de investigación de laboratorio in vitro y preclínica. Estos compuestos no son medicamentos, suplementos, alimentos, cosméticos ni dispositivos médicos, y no están aprobados por la COFEPRIS ni la FDA para consumo humano, inyección o diagnóstico clínico. Su manejo debe realizarse por personal calificado bajo estándares de bioseguridad apropiados.
          </p>
        </div>
      </section>

      {/* Floating Chatbot Widget */}
      <AIChatbot />
    </main>
  )
}
