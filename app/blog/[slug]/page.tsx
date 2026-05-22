import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-pink-500 hover:text-pink-400 mb-8 inline-block">
          ← Back
        </Link>
        <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
        <p className="text-purple-300 mb-8">Published on {post.date}</p>
        <div className="prose prose-invert max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  )
}
