import { blogPosts } from '@/config/blog';
import { useRouter } from 'next/router';
import Layout from '../../src/components/Layout';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-8">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">{post.date}</p>
        <div>
          {post.content.map((item, index) => {
            switch (item.type) {
              case 'paragraph':
                return <p key={index} className="mb-4">{item.text}</p>;
              case 'list':
                return (
                  <ul key={index} className="list-disc ml-6 mb-4">
                    {item.items.map((listItem, listItemIndex) => (
                      <li key={listItemIndex}>{listItem}</li>
                    ))}
                  </ul>
                );
              // ... handle other content types
              default:
                return null;
            }
          })}
        </div>
      </div>
    </ Layout>
  );
}