import { Page } from "@/lib/types";

export default function PageContent({ title, content }: Page) {
  return (
    <section>
      <h1>{title} Page</h1>
      {content && (
        <div dangerouslySetInnerHTML={{ __html: content }} className="prose" />
      )}
    </section>
  );
}
