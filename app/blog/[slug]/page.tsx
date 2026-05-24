import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import AIChatbot from '@/components/AIChatbot'

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
      <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold text-purple-400 mb-4">Artículo No Encontrado</h1>
        <Link href="/" className="text-pink-500 hover:text-pink-400 transition">
          Volver al Inicio
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white">
      <header className="sticky top-0 bg-black/80 backdrop-blur z-50 border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90 transition cursor-pointer">
              Veltis Peptides
            </h1>
          </Link>
          <nav className="flex gap-6 items-center">
            <Link href="/" className="text-purple-300 hover:text-pink-500 transition font-medium">
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

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-pink-500 hover:text-pink-400 mb-8 inline-flex items-center gap-1 font-semibold transition">
          ← Volver
        </Link>
        <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">{post.title}</h1>
        <p className="text-purple-300 mb-8 text-sm">Published on {post.date}</p>
        <div className="prose prose-invert max-w-none text-purple-100 leading-relaxed text-base md:text-lg">
          <MDXRemote source={post.content} />
        </div>

        {/* Clinical Safety & Lab Guideline Alert */}
        <div className="bg-purple-950/10 border border-purple-500/20 rounded-lg p-6 mt-12 mb-8">
          <h4 className="text-sm font-bold text-pink-400 mb-2 uppercase tracking-wider flex items-center gap-2">
            🔬 Protocolo Estricto de Seguridad de Laboratorio
          </h4>
          <p className="text-purple-300 text-xs leading-relaxed">
            La información expuesta en este documento de divulgación se basa en la literatura científica preclínica y de bio-tecnología actual. Todas las moléculas de VELTIS Peptides se comercializan estrictamente para su uso como compuestos analíticos de laboratorio. Bajo ninguna circunstancia deben utilizarse estos compuestos en ensayos humanos, diagnósticos terapéuticos, o como fármacos. Su reconstitución, dosificación experimental y conservación en cadena de frío deben realizarse por personal técnico de laboratorio calificado.
          </p>
        </div>
      </article>

      {/* Floating Chatbot Widget */}
      <AIChatbot />
    </main>
  )
}
