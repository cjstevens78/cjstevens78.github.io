import Layout from '../../src/components/Layout';
import { blogPosts } from '@/config/blog';
import Link from 'next/link';

export default function Blog() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">
                  <Link href={`/blog/${post.slug}`}> {/* Wrap title with Link */}
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.content.find((item) => item.type === 'paragraph')?.text.slice(0, 200)}...
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
