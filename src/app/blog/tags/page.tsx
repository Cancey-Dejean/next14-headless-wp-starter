import { Metadata } from "next";
import { getAllTags } from "@/lib/wordpress";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Tags",
  description: "Browse all tags on the site.",
};

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Tags</h1>
      {tags && tags.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="border border-white shadow-md rounded-lg p-6"
            >
              <Link
                href={`/blog/?tag=${tag.slug}`}
                className="text-xl font-semibold hover:text-blue-600"
              >
                {tag.name}
              </Link>

              <p className="text-gray-600 mt-2">Posts: {tag.count || 0}</p>
              {/*<p className="text-gray-600 mt-2">Posts: {tag.count}</p>*/}
              {tag.description && (
                <p className="text-gray-700 mt-2 text-sm">{tag.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No tags found.</p>
      )}
    </section>
  );
}
