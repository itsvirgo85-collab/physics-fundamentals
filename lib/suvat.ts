// SUVAT multi-solve: given any three of s, u, v, a, t (constant acceleration,
// one dimension), solve for the other two by repeatedly applying the five
// SUVAT equations until all five quantities are known.
//   v = u + at
//   s = ut + 1/2 a t^2
//   s = vt - 1/2 a t^2
//   v^2 = u^2 + 2 a s
//   s = (u + v) t / 2
// Where a quadratic has two roots, the physically meaningful (non-negative
// time / forward) root is used. Returns null when the three known values do
// not determine a real solution (e.g. v^2 < u^2 + 2as, or a negative time).
export type SuvatInput = { s?: number; u?: number; v?: number; a?: number; t?: number };
export type SuvatValues = { s: number; u: number; v: number; a: number; t: number };
export type SuvatResult = { values: SuvatValues; steps: string[] };

const KEYS = ["s", "u", "v", "a", "t"] as const;
type Key = (typeof KEYS)[number];

function isKnown(v: number | undefined): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

export function solveSuvat(input: SuvatInput): SuvatResult | null {
  const knownCount = KEYS.filter((k) => isKnown(input[k])).length;
  if (knownCount !== 3) return null;
  const val: Record<Key, number | undefined> = { s: input.s, u: input.u, v: input.v, a: input.a, t: input.t };
  const steps: string[] = [];

  const set = (key: Key, value: number, step: string): boolean => {
    if (isKnown(val[key])) return false;
    if (!Number.isFinite(value)) return false;
    val[key] = value;
    steps.push(step);
    return true;
  };

  // Repeatedly apply the equations until nothing new can be found.
  for (let round = 0; round < 10; round++) {
    let progress = false;
    const { s, u, v, a, t } = val;

    // v = u + at
    if (isKnown(u) && isKnown(a) && isKnown(t)) progress = set("v", u + a * t, `v = u + at = ${u} + ${a} × ${t} = ${u + a * t} m/s`) || progress;
    // u = v - at
    if (isKnown(v) && isKnown(a) && isKnown(t)) progress = set("u", v - a * t, `u = v − at = ${v} − ${a} × ${t} = ${v - a * t} m/s`) || progress;
    // a = (v - u) / t
    if (isKnown(v) && isKnown(u) && isKnown(t) && t !== 0) progress = set("a", (v - u) / t, `a = (v − u) / t = (${v} − ${u}) / ${t} = ${(v - u) / t} m/s²`) || progress;
    // t = (v - u) / a
    if (isKnown(v) && isKnown(u) && isKnown(a) && a !== 0) progress = set("t", (v - u) / a, `t = (v − u) / a = (${v} − ${u}) / ${a} = ${(v - u) / a} s`) || progress;
    // s = ut + 1/2 a t^2
    if (isKnown(u) && isKnown(t) && isKnown(a)) progress = set("s", u * t + 0.5 * a * t * t, `s = ut + ½at² = ${u} × ${t} + ½ × ${a} × ${t}² = ${u * t + 0.5 * a * t * t} m`) || progress;
    // s = vt - 1/2 a t^2
    if (isKnown(v) && isKnown(t) && isKnown(a)) progress = set("s", v * t - 0.5 * a * t * t, `s = vt − ½at² = ${v} × ${t} − ½ × ${a} × ${t}² = ${v * t - 0.5 * a * t * t} m`) || progress;
    // s = (u + v) t / 2
    if (isKnown(u) && isKnown(v) && isKnown(t)) progress = set("s", ((u + v) * t) / 2, `s = (u + v)t / 2 = (${u} + ${v}) × ${t} / 2 = ${((u + v) * t) / 2} m`) || progress;
    // a = 2(s - ut) / t^2
    if (isKnown(s) && isKnown(u) && isKnown(t) && t !== 0) progress = set("a", (2 * (s - u * t)) / (t * t), `a = 2(s − ut) / t² = 2 × (${s} − ${u} × ${t}) / ${t}² = ${(2 * (s - u * t)) / (t * t)} m/s²`) || progress;
    // s = (v^2 - u^2) / (2a)
    if (isKnown(v) && isKnown(u) && isKnown(a) && a !== 0) progress = set("s", (v * v - u * u) / (2 * a), `s = (v² − u²) / 2a = (${v}² − ${u}²) / (2 × ${a}) = ${(v * v - u * u) / (2 * a)} m`) || progress;
    // v^2 = u^2 + 2as  ->  v = +sqrt(...) (forward direction)
    if (isKnown(u) && isKnown(a) && isKnown(s)) {
      const disc = u * u + 2 * a * s;
      if (disc < 0) return null;
      progress = set("v", Math.sqrt(disc), `v² = u² + 2as = ${u}² + 2 × ${a} × ${s} = ${disc}, so v = √${disc} = ${Math.sqrt(disc)} m/s`) || progress;
    }
    // v^2 = u^2 + 2as  ->  u = +sqrt(v^2 - 2as)
    if (isKnown(v) && isKnown(a) && isKnown(s)) {
      const disc = v * v - 2 * a * s;
      if (disc < 0) return null;
      progress = set("u", Math.sqrt(disc), `u² = v² − 2as = ${v}² − 2 × ${a} × ${s} = ${disc}, so u = √${disc} = ${Math.sqrt(disc)} m/s`) || progress;
    }
    // a = (v^2 - u^2) / (2s)
    if (isKnown(v) && isKnown(u) && isKnown(s) && s !== 0) progress = set("a", (v * v - u * u) / (2 * s), `a = (v² − u²) / 2s = (${v}² − ${u}²) / (2 × ${s}) = ${(v * v - u * u) / (2 * s)} m/s²`) || progress;
    // t from s = ut + 1/2 a t^2  (quadratic; take the non-negative root)
    if (isKnown(s) && isKnown(u) && isKnown(a) && !isKnown(t)) {
      let tv: number | null = null;
      if (a === 0) {
        if (u !== 0) tv = s / u;
      } else {
        const disc = u * u + 2 * a * s;
        if (disc < 0) return null;
        const root = Math.sqrt(disc);
        const t1 = (-u + root) / a;
        const t2 = (-u - root) / a;
        tv = t1 >= 0 ? t1 : t2 >= 0 ? t2 : null;
      }
      if (tv === null || tv < 0) return null;
      progress = set("t", tv, `s = ut + ½at² gives t = ${tv} s (the non-negative root)`) || progress;
    }
    // t from s = (u + v) t / 2
    if (isKnown(s) && isKnown(u) && isKnown(v) && u + v !== 0) progress = set("t", (2 * s) / (u + v), `t = 2s / (u + v) = 2 × ${s} / (${u} + ${v}) = ${(2 * s) / (u + v)} s`) || progress;

    if (KEYS.every((k) => isKnown(val[k]))) {
      return { values: val as unknown as SuvatValues, steps };
    }
    if (!progress) return null;
  }
  return KEYS.every((k) => isKnown(val[k])) ? { values: val as unknown as SuvatValues, steps } : null;
}
