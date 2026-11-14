'use client';

export default function SearchBox({ compact = false }: { compact?: boolean }) {
  return (
    <form className="search-box" role="search" action="/search" method="get">
      <label className="sr-only" htmlFor={compact ? 'site-search-compact' : 'site-search'}>
        Search physics calculators, guides and formulas
      </label>
      <input
        id={compact ? 'site-search-compact' : 'site-search'}
        className="search-input"
        type="search"
        name="q"
        placeholder="Search calculators, guides…"
        autoComplete="off"
      />
      <button className="btn btn-search" type="submit" aria-label="Search">
        Search
      </button>
    </form>
  );
}
