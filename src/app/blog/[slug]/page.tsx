import { blogPosts } from '@/config/blog';
import ReactMarkdown from 'react-markdown';

interface BlogPostType {
  title: string;
  slug: string;
  date: string;
  author?: string;
  tags: string[];
  content: (
    | { type: 'paragraph'; text: string }
    | { type: 'list'; items: string[] }
  )[];
}

interface Props {
  params: {
    slug: string;
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export default function BlogPost({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="w-full md:w-2/3 mx-auto">
        <h1 className="text-3xl font-bold mb-8">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-2">{formatDate(post.date)}</p>
        <p className="text-sm text-gray-500 mb-4">By {post.author}</p>
        <div className="prose col-span-1 lg:col-span-2">
          {post.content.map((item, index) => {
            if (item.type === 'paragraph') {
              return (
                <div key={index} className="mb-4">
                  <ReactMarkdown>{item.text}</ReactMarkdown>
                </div>
              );
            } else if (item.type === 'list') {
              return (
                <ul key={index} className="list-disc ml-6 mb-4">
                  {item.items && item.items.map((listItem, listItemIndex) => (
                    <li key={listItemIndex}>
                      <ReactMarkdown>{listItem}</ReactMarkdown>
                    </li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  return {
    title: post ? `${post.title} - Chris Stevens` : 'Blog Post Not Found',
    description: post?.content?.[0]?.type === 'paragraph' 
      ? post?.content?.[0]?.text?.slice(0, 160) ?? 'Blog post'
      : 'Blog post',
  };
} 