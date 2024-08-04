import { Metadata } from "next";

interface Page {
  title?: string;
  content?: string;
}

export function generatePageMetadata(page: Page | null): Metadata {
  if (!page) {
    return {
      title: "Welcome to Our Website",
      description: "This is the home page of our awesome website.",
    };
  }

  return {
    title: page.title || "Page Title",
    description: page.content ? page.content.substring(0, 160) : "Description",
  };
}
