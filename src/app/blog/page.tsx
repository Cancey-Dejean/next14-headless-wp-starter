import { getPosts } from "@/lib/wordpress";
import BlogPostList from "@/components/Blog/BlogPostList";

export default async function BlogIndexPage() {
  const { posts, pageInfo } = await getPosts(10);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <BlogPostList initialPosts={posts} initialPageInfo={pageInfo} />
    </div>
  );
}
