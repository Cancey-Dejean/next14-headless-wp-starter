import { Metadata } from "next";
import { getPostBySlug, getPosts } from "@/lib/wordpress";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title || "Post Title",
    description: "Description",
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  console.log(post?.title);

  if (!post) {
    return notFound();
  }

  return (
    <article>
      <h1>{post.title} page</h1>
      {post.content && (
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="prose"
        />
      )}
    </article>
  );
}

// export async function generateStaticParams() {
//   const posts = await getPosts();
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }
