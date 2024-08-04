import { Metadata } from "next";
import { getPages, getPageBySlug } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import PageContent from "@/components/PageContent";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);
  return generatePageMetadata(page);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    return notFound();
  }

  return <PageContent title={page.title} content={page.content} />;
}

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}
