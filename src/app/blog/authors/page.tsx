import { Metadata } from "next";
import { getAllAuthors } from "@/lib/wordpress";
import Link from "next/link";
import { Author } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "All Authors",
    description: "Browse all authors on the site.",
  };
}

export default async function AllAuthorsPage() {
  const authors: Author[] = await getAllAuthors();

  return (
    <section>
      <h1>All Authors</h1>
      {authors && authors.length > 0 ? (
        <ul>
          {authors.map((author) => (
            <li key={author.id}>
              <Link href={`/authors/?author=${author.id}`}>{author.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No authors found.</p>
      )}
    </section>
  );
}
