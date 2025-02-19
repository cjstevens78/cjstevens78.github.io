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

export default function BlogSection() {
  const recentPosts = (blogPosts as BlogPostType[])
    ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    ?.slice(0, 3) || [];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12">Recent Blog Posts</h2>

        {recentPosts.length > 0 ? (
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {recentPosts.map((post: BlogPostType) => (
              <div
                key={post.slug}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {post.content.find(isParagraph)?.text?.slice(0, 150) ?? ''}...
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
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No blog posts yet.</p>
        )}

        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Blog Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
