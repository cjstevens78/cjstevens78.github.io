import { blogPosts } from '@/config/blog';
import { useRouter } from 'next/router';
import Layout from '../../src/components/Layout';
import { useEffect, useState } from 'react';

export default function BlogPost() {
  const router = useRouter();
  const [post, setPost] = useState<null | BlogPostType>(null); // Type the state

  // Define the BlogPostType (replace with your actual type)
  type BlogPostType = {
    title: string;
    slug: string;
    date: string;
    author?: string;
    tags: string[];
    content: ({ type: string; text: string; items?: undefined; } | { type: string; items: string[]; text?: undefined; })[];
  };


  useEffect(() => {
    if (router.isReady) {
      const { slug } = router.query;
      const foundPost = blogPosts.find((p) => p.slug === slug);
      setPost(foundPost || null); // Handle the undefined case
    }
  }, [router.isReady, router.query]);

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

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
                    {item.items?.map((listItem, listItemIndex) => (
                      <li key={listItemIndex}>{listItem}</li>
                    )) ?? null}
                  </ul>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </Layout>
  );
}
