import { Metadata } from "next";
import { getAllCategories } from "@/lib/wordpress";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Categories",
  description: "Browse all categories on the site.",
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <section className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">All Categories</h1>
      {categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="border border-white shadow-md rounded-lg p-6"
            >
              <Link
                href={`/blog/?category=${category.slug}`}
                className="text-xl font-semibold hover:text-blue-600"
              >
                {category.name}
              </Link>
              <p className="text-gray-600 mt-2">Posts: {category.count}</p>
              {category.description && (
                <p className="text-gray-700 mt-2">{category.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No categories found.</p>
      )}
    </section>
  );
}
