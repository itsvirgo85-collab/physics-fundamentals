'use client';
import { useState } from 'react';

// Generic three-variable multi-solve tool: pick the quantity to solve for,
// enter the other two (with unit selects where they matter), and the tool
// converts to SI, solves, and shows the answer in SI plus the common
// alternative unit. Used by the density and pressure calculators.
export type UnitOption = { label: string; factorToSI: number };
export type MultiVariable = {
  key: string;
  label: string;
  siUnit: string;
  units: UnitOption[];
};
export type MultiConfig = {
  slug: string;
  title: string;
  variables: MultiVariable[]; // exactly 3
  note: string;
};

export const densityConfig: MultiConfig = {
  slug: "density",
  title: "Density",
  variables: [
    { key: "density", label: "Density ρ", siUnit: "kg/m³", units: [{ label: "kg/m³", factorToSI: 1 }, { label: "g/cm³", factorToSI: 1000 }] },
    { key: "mass", label: "Mass m", siUnit: "kg", units: [{ label: "kg", factorToSI: 1 }, { label: "g", factorToSI: 0.001 }] },
    { key: "volume", label: "Volume V", siUnit: "m³", units: [{ label: "m³", factorToSI: 1 }, { label: "cm³", factorToSI: 0.000001 }, { label: "L", factorToSI: 0.001 }] },
  ],
  note: "For an irregular object, find the volume by water displacement: lower the object into a measuring cylinder and read the rise in water level. That rise, in cm³, is the object's volume. Read the meniscus at eye level and tap out air bubbles first — a bubble counts as volume and makes the density come out too low.",
};

export const pressureConfig: MultiConfig = {
  slug: "pressure",
  title: "Pressure",
  variables: [
    { key: "pressure", label: "Pressure P", siUnit: "Pa", units: [{ label: "Pa", factorToSI: 1 }, { label: "kPa", factorToSI: 1000 }] },
    { key: "force", label: "Force F", siUnit: "N", units: [{ label: "N", factorToSI: 1 }] },
    { key: "area", label: "Area A", siUnit: "m²", units: [{ label: "m²", factorToSI: 1 }, { label: "cm²", factorToSI: 0.0001 }] },
  ],
  note: "The classic trap: area in cm² must be converted to m² before dividing. 50 N on 25 cm² is 50 / 0.0025 = 20,000 Pa — not 50 / 25 = 2 Pa. 1 cm² = 0.0001 m².",
};

// The actual solve logic lives here (not in the configs above) so the
// component stays honest about which two values are which.
function solve(config: MultiConfig, solveFor: string, known: Record<string, number>): { result: number; line: string } {
  const byKey = (k: string) => known[k];
  if (config.slug === "density") {
    if (solveFor === "density") {
      const r = byKey("mass") / byKey("volume");
      return { result: r, line: `ρ = m / V = ${byKey("mass")} kg / ${byKey("volume")} m³ = ${r} kg/m³` };
    }
    if (solveFor === "mass") {
      const r = byKey("density") * byKey("volume");
      return { result: r, line: `m = ρV = ${byKey("density")} kg/m³ × ${byKey("volume")} m³ = ${r} kg` };
    }
    const r = byKey("mass") / byKey("density");
    return { result: r, line: `V = m / ρ = ${byKey("mass")} kg / ${byKey("density")} kg/m³ = ${r} m³` };
  }
  // pressure
  if (solveFor === "pressure") {
    const r = byKey("force") / byKey("area");
    return { result: r, line: `P = F / A = ${byKey("force")} N / ${byKey("area")} m² = ${r} Pa` };
  }
  if (solveFor === "force") {
    const r = byKey("pressure") * byKey("area");
    return { result: r, line: `F = PA = ${byKey("pressure")} Pa × ${byKey("area")} m² = ${r} N` };
  }
  const r = byKey("force") / byKey("pressure");
  return { result: r, line: `A = F / P = ${byKey("force")} N / ${byKey("pressure")} Pa = ${r} m²` };
}

function fmt(n: number): string {
  return Number(n.toPrecision(8)).toLocaleString();
}

export default function MultiSolveTool({ config }: { config: MultiConfig }) {
  const [solveFor, setSolveFor] = useState(config.variables[0].key);
  const [vals, setVals] = useState<Record<string, string>>({});
  const [units, setUnits] = useState<Record<string, string>>(() => {
    const u: Record<string, string> = {};
    config.variables.forEach((v) => { u[v.key] = v.units[0].label; });
    return u;
  });
  const [submitted, setSubmitted] = useState(false);

  const inputs = config.variables.filter((v) => v.key !== solveFor);
  let error = "";
  let solved: { result: number; line: string } | null = null;
  let knownSI: Record<string, number> = {};
  if (submitted) {
    const bad = inputs.some((v) => vals[v.key] === undefined || vals[v.key].trim() === "" || !Number.isFinite(Number(vals[v.key])));
    if (bad) {
      error = "Enter a valid number in both fields.";
    } else {
      knownSI = {};
      inputs.forEach((v) => {
        const opt = v.units.find((o) => o.label === units[v.key]) ?? v.units[0];
        knownSI[v.key] = Number(vals[v.key]) * opt.factorToSI;
      });
      if (Object.values(knownSI).some((n) => n === 0)) error = "The denominator cannot be zero — use a non-zero value.";
      else if (Object.values(knownSI).some((n) => n < 0)) error = "Mass, volume, force, area and pressure cannot be negative here.";
      else {
        solved = solve(config, solveFor, knownSI);
        if (!Number.isFinite(solved.result)) error = "Result is outside the supported numeric range.";
      }
    }
  }

  const solvedVar = config.variables.find((v) => v.key === solveFor)!;
  const altUnit = solvedVar.units.find((o) => o.label !== solvedVar.units[0].label);

  return (
    <div className="card calculator-panel">
      <h2>Choose what to solve for</h2>
      <p className="muted">Enter the other two values. Units convert automatically — for example, enter an area in cm² and the tool converts it to m² first.</p>
      <div className="field-grid">
        <label className="field">Solve for
          <select aria-label="Solve for" value={solveFor} onChange={(e) => { setSolveFor(e.target.value); setSubmitted(false); }}>
            {config.variables.map((v) => <option key={v.key} value={v.key}>{v.label} ({v.siUnit})</option>)}
          </select>
        </label>
      </div>
      <div className="field-grid">
        {inputs.map((v) => (
          <label className="field" key={v.key}>{v.label}
            <input aria-label={v.label} type="number" step="any" value={vals[v.key] ?? ""} placeholder="Enter a value"
              onChange={(e) => { setVals((old) => ({ ...old, [v.key]: e.target.value })); setSubmitted(false); }} />
            {v.units.length > 1 && (
              <select aria-label={`${v.label} unit`} value={units[v.key]} onChange={(e) => { setUnits((old) => ({ ...old, [v.key]: e.target.value })); setSubmitted(false); }}>
                {v.units.map((o) => <option key={o.label} value={o.label}>{o.label}</option>)}
              </select>
            )}
          </label>
        ))}
      </div>
      <div className="actions">
        <button className="btn" onClick={() => setSubmitted(true)}>Calculate</button>
        <button className="btn btn-secondary" onClick={() => { setVals({}); setSubmitted(false); }}>Reset</button>
      </div>
      {submitted && error && <p className="error" role="alert">{error}</p>}
      {submitted && !error && solved && (
        <div className="result" aria-live="polite">
          <small>RESULT</small>
          <h2>{solvedVar.label} = {fmt(solved.result)} {solvedVar.siUnit}</h2>
          {altUnit && <p>{fmt(solved.result / altUnit.factorToSI)} {altUnit.label}</p>}
          <strong>{solved.line}</strong>
        </div>
      )}
      <div className="explanation">
        <h3>How it works</h3>
        <p>{config.note}</p>
        <p className="muted">Density: ρ = m / V. Pressure: P = F / A. This is an educational model; measurement uncertainty is not included.</p>
      </div>
    </div>
  );
}
