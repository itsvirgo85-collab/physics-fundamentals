import { marked } from 'marked';
import { demoteH1 } from '@/lib/seo';

export function MarkdownGuide({ content }: { content: string }) {
  const html = demoteH1(marked.parse(content) as string);
  return <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
}
