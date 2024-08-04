import { Metadata } from "next";
import { getPageBySlug } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import PageContent from "@/components/PageContent";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("home");
  return generatePageMetadata(page);
}

export default async function Home() {
  const page = await getPageBySlug("home");

  if (!page) {
    return notFound();
  }

  return <PageContent title={page.title} content={page.content} />;
}
