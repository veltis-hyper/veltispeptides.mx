import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black">
      <header className="sticky top-0 bg-black/80 backdrop-blur z-50 border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Veltis Peptides
          </h1>
          <nav className="flex gap-6">
            <Link href="#blog" className="text-purple-300 hover:text-pink-500 transition">
              Blog
            </Link>
            <Link href="#" className="text-purple-300 hover:text-pink-500 transition">
              Shop
            </Link>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-white mb-12">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-lg p-6 hover:border-pink-500/50 transition"
            >
              <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
              <p className="text-purple-200 mb-4 line-clamp-3">{post.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-400">{post.date}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-pink-500 hover:text-pink-400 font-semibold transition"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
