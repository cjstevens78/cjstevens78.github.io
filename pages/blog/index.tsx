import Layout from '../../src/components/Layout';
import { blogPosts } from '@/config/blog';
import Link from 'next/link';

type BlogPostType = {
  title: string;
  slug: string;
  date: string;
  author?: string;
  tags: string[];
  content: ({ type: string; text: string; } | { type: string; items: string[]; })[];
};

function isParagraph(item: { type: string; text?: string; items?: string[] }): item is { type: string; text: string } {
  return item.type === 'paragraph' && typeof item.text === 'string';
}

export default function Blog() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {blogPosts.map((post: BlogPostType) => (
            <div
              key={post.slug}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-gray-500 mb-2">Date posted: {post.date}</p>
                <p className="text-gray-600 mb-4">
                  {post.content.find(isParagraph)?.text?.slice(0, 200) ?? ''}...
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
