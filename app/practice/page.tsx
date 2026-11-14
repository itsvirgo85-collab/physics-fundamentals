import PracticeClient from '@/components/PracticeClient';
import { LIST_META, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: LIST_META.practice.title,
  description: LIST_META.practice.description,
  path: '/practice',
});

export default function Page() {
  return (
    <main className="container page">
      <p className="eyebrow">PRACTICE</p>
      <h1>Physics practice questions</h1>
      <p className="lead">
        Try each question, then reveal the answer and explanation. The questions cover motion, forces, energy,
        waves, electricity and more.
      </p>
      <PracticeClient />
    </main>
  );
}
