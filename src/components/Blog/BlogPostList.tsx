"use client";

import { useState, Suspense } from "react";
import { getPosts } from "@/lib/wordpress";
import Link from "next/link";
import { PageInfo, Post } from "@/lib/types";

type BlogPostListProps = {
  initialPosts: Post[];
  initialPageInfo: PageInfo;
};

function PostSkeleton() {
  return (
    <li className="mb-8 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-20 bg-gray-200 rounded w-full"></div>
    </li>
  );
}

function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="mb-8">
          <Link href={`/blog/${post.slug}`}>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          </Link>
          <p className="text-gray-600 mb-2">
            {post.date
              ? new Date(post.date).toLocaleDateString()
              : "Date not available"}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
            className="text-gray-700"
          />
        </li>
      ))}
    </ul>
  );
}

export default function BlogPostList({
  initialPosts,
  initialPageInfo,
}: BlogPostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo);
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePosts = async () => {
    if (!pageInfo.hasNextPage || isLoading) return;

    setIsLoading(true);
    try {
      const { posts: newPosts, pageInfo: newPageInfo } = await getPosts(
        10,
        pageInfo.endCursor,
      );
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPageInfo(newPageInfo);
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Suspense
        fallback={
          <ul>
            {[...Array(6)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </ul>
        }
      >
        <PostList posts={posts} />
      </Suspense>
      {pageInfo.hasNextPage && (
        <div className="text-center mt-8">
          <button
            onClick={loadMorePosts}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            {isLoading ? "Loading..." : "Learn More"}
          </button>
        </div>
      )}
    </div>
  );
}
