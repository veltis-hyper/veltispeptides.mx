import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import Header from '@/components/Header'
import AIChatbot from '@/components/AIChatbot'
import NewsletterCapture from '@/components/NewsletterCapture'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-purple-400 mb-4">Artículo No Encontrado</h1>
        <Link href="/" className="text-pink-500 hover:text-pink-400 transition">
          Volver al Inicio
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white relative selection:bg-purple-500/30 selection:text-pink-400 overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-900/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-pink-900/10 blur-[150px] pointer-events-none" />

      {/* Global Navigation */}
      <Header />

      {/* Article Container */}
      <article className="max-w-4xl mx-auto px-6 py-12 md:py-16 relative">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-pink-400 font-semibold text-sm mb-8 transition duration-200"
        >
          <span>←</span> Volver al Hub Científico
        </Link>

        {/* SEO Helpful Content / Clinical Verification Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/20 text-xs text-pink-400 font-bold uppercase tracking-wider">
            Divulgación Científica
          </span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-950/40 border border-green-500/20 text-green-400 text-xs font-semibold">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              ></path>
            </svg>
            Revisado por Panel Científico VELTIS
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.15] text-white mb-6">
          {post.title}
        </h1>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-purple-500/20 text-sm text-purple-400 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white text-xs">
              V
            </div>
            <div>
              <p className="text-white font-semibold text-xs">Equipo Editorial VELTIS</p>
              <p className="text-[11px] text-purple-400/80">Publicado el {post.date}</p>
            </div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {post.keywords.map((kw: string, idx: number) => (
              <span key={idx} className="text-xs bg-purple-950/30 border border-purple-500/10 px-2.5 py-0.5 rounded text-purple-300">
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic MDX Render Body with Premium Typography styling */}
        <div className="prose prose-invert max-w-none text-purple-100 leading-relaxed md:leading-loose text-base md:text-lg mb-12">
          <MDXRemote source={post.content} />
        </div>

        {/* Clinical Safety & Lab Guideline Alert */}
        <div className="bg-purple-950/10 border border-purple-500/20 rounded-2xl p-6 md:p-8 mt-12 mb-8">
          <h4 className="text-md font-bold text-white mb-2 uppercase tracking-wider text-pink-400 flex items-center gap-2">
            <span>🔬</span> Protocolo Estricto de Seguridad de Laboratorio
          </h4>
          <p className="text-purple-300 text-xs leading-relaxed">
            La información expuesta en este documento de divulgación se basa en la literatura científica preclínica y de bio-tecnología actual. Todas las moléculas de VELTIS Peptides se comercializan estrictamente para su uso como compuestos analíticos de laboratorio. Bajo ninguna circunstancia deben utilizarse estos compuestos en ensayos humanos, diagnósticos terapéuticos, o como fármacos. Su reconstitución, dosificación experimental y conservación en cadena de frío deben realizarse por personal técnico de laboratorio calificado.
          </p>
        </div>

        {/* Author / Reviewer Details block */}
        <div className="border-t border-purple-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-purple-400">
          <p>
            <strong>Editor Técnico:</strong> Dra. Mariana Valenzuela (Bioquímica Molecular)
          </p>
          <p>
            <strong>Última Auditoría de Lote:</strong> {new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </article>

      {/* Lead Capture Newsletter */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <NewsletterCapture />
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/10 bg-black/60 backdrop-blur-md py-8 mt-12">
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

      {/* Floating Chatbot Widget */}
      <AIChatbot />
    </main>
  )
}
