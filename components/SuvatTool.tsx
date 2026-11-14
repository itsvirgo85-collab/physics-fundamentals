'use client';
import { useState } from 'react';
import { solveSuvat } from '@/lib/suvat';

const FIELDS = [
  { key: "s", label: "Displacement s (m)" },
  { key: "u", label: "Initial velocity u" },
  { key: "v", label: "Final velocity v" },
  { key: "a", label: "Acceleration a (m/s²)" },
  { key: "t", label: "Time t (s)" },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];

export default function SuvatTool() {
  const [values, setValues] = useState<Record<FieldKey, string>>({ s: "", u: "", v: "", a: "", t: "" });
  const [velUnit, setVelUnit] = useState<"m/s" | "km/h">("m/s");
  const [submitted, setSubmitted] = useState(false);

  const entered = (Object.keys(values) as FieldKey[]).filter((k) => values[k].trim() !== "");
  const parsed: Record<string, number> = {};
  entered.forEach((k) => { parsed[k] = Number(values[k]); });

  let error = "";
  let result: ReturnType<typeof solveSuvat> = null;
  let solvedKeys: FieldKey[] = [];
  if (submitted) {
    if (entered.length !== 3) {
      error = "Enter exactly three values and leave the other two blank — the tool solves for the two you leave out.";
    } else if (entered.some((k) => !Number.isFinite(parsed[k]))) {
      error = "Enter a valid number in every filled field.";
    } else if (parsed.t !== undefined && parsed.t < 0) {
      error = "Time cannot be negative.";
    } else {
      // Convert velocities to SI (m/s) for the solver.
      const input = { ...parsed };
      if (velUnit === "km/h") {
        if (input.u !== undefined) input.u = input.u / 3.6;
        if (input.v !== undefined) input.v = input.v / 3.6;
      }
      result = solveSuvat(input);
      if (!result) error = "Those three values have no real constant-acceleration solution (for example, v² would be negative, or the time would be negative). Check the values and try again.";
      else solvedKeys = (Object.keys(values) as FieldKey[]).filter((k) => !entered.includes(k));
    }
  }

  const display = (key: FieldKey, siValue: number): string => {
    if ((key === "u" || key === "v") && velUnit === "km/h") return `${Number((siValue * 3.6).toPrecision(8)).toLocaleString()} km/h`;
    const unit = key === "s" ? "m" : key === "t" ? "s" : key === "a" ? "m/s²" : "m/s";
    return `${Number(siValue.toPrecision(8)).toLocaleString()} ${unit}`;
  };

  return (
    <div className="card calculator-panel">
      <h2>Enter any three values</h2>
      <p className="muted">Leave the two values you want to find blank. Constant acceleration, one direction, air resistance ignored.</p>
      <div className="field-grid">
        <label className="field">Velocity unit
          <select aria-label="Velocity unit" value={velUnit} onChange={(e) => { setVelUnit(e.target.value as "m/s" | "km/h"); setSubmitted(false); }}>
            <option value="m/s">m/s</option>
            <option value="km/h">km/h</option>
          </select>
        </label>
      </div>
      <div className="field-grid">
        {FIELDS.map((f) => (
          <label className="field" key={f.key}>
            {f.label}{f.key === "u" || f.key === "v" ? ` (${velUnit})` : ""}
            <input aria-label={f.label} type="number" step="any" value={values[f.key]} placeholder="Leave blank to solve"
              onChange={(e) => { setValues((old) => ({ ...old, [f.key]: e.target.value })); setSubmitted(false); }} />
          </label>
        ))}
      </div>
      <div className="actions">
        <button className="btn" onClick={() => setSubmitted(true)}>Solve SUVAT</button>
        <button className="btn btn-secondary" onClick={() => { setValues({ s: "", u: "", v: "", a: "", t: "" }); setSubmitted(false); }}>Reset</button>
      </div>
      {submitted && error && <p className="error" role="alert">{error}</p>}
      {submitted && !error && result && (
        <div className="result" aria-live="polite">
          <small>SOLVED</small>
          {solvedKeys.map((k) => (
            <h2 key={k}>{k} = {display(k, result!.values[k])}</h2>
          ))}
          <strong>v = u + at &nbsp;·&nbsp; s = ut + ½at² &nbsp;·&nbsp; v² = u² + 2as</strong>
        </div>
      )}
      {submitted && !error && result && (
        <div className="explanation">
          <h3>Working</h3>
          {result.steps.map((step, i) => <p key={i}>{i + 1}. {step}</p>)}
          <p className="muted">Tip: 1 m/s = 3.6 km/h. A car at 72 km/h is travelling at 20 m/s — divide km/h by 3.6 to get m/s before using SUVAT.</p>
        </div>
      )}
      <div className="explanation">
        <h3>Which equation do I use?</h3>
        <p><b>Missing s?</b> Use v = u + at. <b>Missing v?</b> Use s = ut + ½at². <b>Missing t?</b> Use v² = u² + 2as. <b>Missing a?</b> Use s = (u + v)t / 2. <b>Missing u?</b> Use s = vt − ½at². The solver above picks the right one for you.</p>
      </div>
    </div>
  );
}
