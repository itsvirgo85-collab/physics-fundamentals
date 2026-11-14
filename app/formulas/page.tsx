import { formulas } from '@/lib/formulas';
import { LIST_META, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: LIST_META.formulas.title,
  description: LIST_META.formulas.description,
  path: '/formulas',
});

export default function Page() {
  const groups = [...new Set(formulas.map((f) => f.category))];
  return (
    <main className="container page">
      <p className="eyebrow">REFERENCE</p>
      <h1>Physics formula library</h1>
      <p className="lead">
        A searchable reference of equations, units and topic groupings. Always check the assumptions and
        definitions before applying a formula — and use the site search to find a formula by name or symbol.
      </p>
      <p className="muted">Tip: use your browser’s Find in page command to locate a formula by name or symbol.</p>
      {groups.map((g) => (
        <section className="formula-group" key={g}>
          <h2>{g}</h2>
          <div className="formula-grid">
            {formulas
              .filter((f) => f.category === g)
              .map((f) => (
                <article className="formula-card" key={f.name}>
                  <b>{f.name}</b>
                  <code>{f.equation}</code>
                  <small>{f.unit}</small>
                </article>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
