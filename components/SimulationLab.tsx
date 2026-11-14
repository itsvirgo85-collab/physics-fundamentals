'use client';
import { useMemo, useState } from 'react';
import type { Simulation } from '@/lib/simulations';

// Real parameter names per simulation (replacing the old "Parameter A/B/C").
// The array length is the number of sliders that simulation actually uses:
// a one-parameter model (free fall, pendulum) shows one slider, not three.
const SLIDERS: Record<string, string[]> = {
  'projectile-lab': ['Launch speed (m/s)', 'Launch angle (°)', 'Launch height (m)'],
  'free-fall-lab': ['Drop height (m)'],
  'motion-graphs': ['Initial velocity (m/s)', 'Acceleration (m/s²)', 'Time (s)'],
  'newtons-second-law': ['Mass (kg)', 'Net force (N)'],
  'friction-lab': ['Coefficient μ', 'Normal force (N)'],
  'energy-skate': ['Mass (kg)', 'Height (m)'],
  'collision-lab': ['Mass 1 (kg)', 'Mass 2 (kg)', 'Velocity 1 (m/s)'],
  'circular-motion': ['Speed (m/s)', 'Radius (m)', 'Mass (kg)'],
  'spring-oscillator': ['Mass (kg)', 'Spring constant (N/m)'],
  'pendulum-lab': ['Length (m)'],
  'wave-lab': ['Frequency (Hz)', 'Wavelength (m)'],
  'sound-beats': ['Tone 1 frequency (Hz)', 'Beat frequency (Hz)'],
  'ohms-law-lab': ['Voltage (V)', 'Resistance (Ω)'],
  'lens-lab': ['Focal length (m)', 'Object distance (× focal length)'],
  'gas-law-lab': ['Amount (mol)', 'Temperature (K)', 'Volume (m³)'],
};

type ArrProps = { x1: number; y1: number; x2: number; y2: number; label?: string; lx?: number; ly?: number; dashed?: boolean };

// Small arrow helper: a line with a filled triangular head.
function Arr({ x1, y1, x2, y2, label, lx, ly, dashed = false }: ArrProps) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hl = 9, hw = 4.5;
  const bx = x2 - hl * Math.cos(ang), by = y2 - hl * Math.sin(ang);
  const p1x = bx + hw * Math.sin(ang), p1y = by - hw * Math.cos(ang);
  const p2x = bx - hw * Math.sin(ang), p2y = by + hw * Math.cos(ang);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" strokeDasharray={dashed ? '4 3' : undefined} />
      <polygon points={`${x2},${y2} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}`} fill="currentColor" />
      {label !== undefined && <text x={lx ?? x2} y={ly ?? y2} fontSize="11" fill="currentColor">{label}</text>}
    </g>
  );
}

// Double-headed arrow (for marking a length such as a wavelength).
function BiArr({ x1, y1, x2, y2, label, lx, ly }: { x1: number; y1: number; x2: number; y2: number; label?: string; lx?: number; ly?: number }) {
  const head = (cx: number, cy: number, a: number) => {
    const hl = 8, hw = 4;
    const bx = cx - hl * Math.cos(a), by = cy - hl * Math.sin(a);
    const p1x = bx + hw * Math.sin(a), p1y = by - hw * Math.cos(a);
    const p2x = bx - hw * Math.sin(a), p2y = by + hw * Math.cos(a);
    return `${cx},${cy} ${p1x.toFixed(1)},${p1y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)}`;
  };
  const ang = Math.atan2(y2 - y1, x2 - x1);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" />
      <polygon points={head(x2, y2, ang)} fill="currentColor" />
      <polygon points={head(x1, y1, ang + Math.PI)} fill="currentColor" />
      {label !== undefined && <text x={lx ?? (x1 + x2) / 2} y={ly ?? y1 - 6} fontSize="11" fill="currentColor" textAnchor="middle">{label}</text>}
    </g>
  );
}

// Real inline SVG diagrams for the 13 simulations that do not already have
// one (projectile-lab and free-fall-lab keep their existing diagrams below).
// Every diagram is computed from the same model values as the text output.
// viewBox is 0 0 320 180 throughout; width="100%" keeps it inside 360px.
function diagramFor(slug: string, x: number, y: number, z: number) {
  const g = 9.80665;
  switch (slug) {
    case 'motion-graphs': {
      const u = -5 + 15 * x, a = -4 + 8 * y, t = 1 + 5 * z;
      const vf = u + a * t;
      const s = u * t + .5 * a * t * t;
      const left = 42, right = 312, top = 14, bottom = 150;
      const tMax = 6, vMin = -30, vMax = 35;
      const X = (tt: number) => left + (tt / tMax) * (right - left);
      const Y = (vv: number) => bottom - ((vv - vMin) / (vMax - vMin)) * (bottom - top);
      return (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Velocity-time graph" style={{ marginTop: 12 }}>
          <title>Velocity-time graph: the shaded area under the line equals displacement</title>
          <polygon points={`${X(0)},${Y(0)} ${X(0)},${Y(u)} ${X(t)},${Y(vf)} ${X(t)},${Y(0)}`} fill="currentColor" opacity="0.15" />
          <line x1={left} y1={Y(0)} x2={right} y2={Y(0)} stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={left} y1={top} x2={left} y2={bottom} stroke="currentColor" strokeWidth="1" />
          <line x1={left} y1={bottom} x2={right} y2={bottom} stroke="currentColor" strokeWidth="1" />
          <line x1={X(0)} y1={Y(u)} x2={X(t)} y2={Y(vf)} stroke="currentColor" strokeWidth="2" />
          <circle cx={X(0)} cy={Y(u)} r="3.5" fill="currentColor" />
          <circle cx={X(t)} cy={Y(vf)} r="3.5" fill="currentColor" />
          <text x={left + 2} y={top + 10} fontSize="11" fill="currentColor">v (m/s)</text>
          <text x={right - 34} y={bottom + 14} fontSize="11" fill="currentColor">t (s)</text>
          <text x={Math.min(X(t) + 6, 235)} y={Math.max(Y(vf) - 6, 12)} fontSize="11" fill="currentColor">vf = {vf.toFixed(1)} m/s</text>
          <text x={left + 4} y={bottom - 6} fontSize="11" fill="currentColor">shaded area = s = {s.toFixed(1)} m</text>
        </svg>
      );
    }
    case 'newtons-second-law': {
      const m = .5 + 9.5 * x, F = 1 + 99 * y, a = F / m;
      const bw = 40 + ((m - .5) / 9.5) * 60, bx = 80, by = 96;
      const flen = 15 + ((F - 1) / 99) * 85;
      const alen = Math.min(100, 8 + a * .45);
      return (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Block pushed by a force" style={{ marginTop: 12 }}>
          <title>Block on a surface pushed by force F, accelerating at a = F/m</title>
          <line x1="0" y1="140" x2="320" y2="140" stroke="currentColor" strokeWidth="1" />
          <rect x={bx} y={by} width={bw} height="44" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.5" />
          <text x={bx + bw / 2} y={by + 26} fontSize="10" fill="currentColor" textAnchor="middle">m = {m.toFixed(1)} kg</text>
          <Arr x1={bx + bw + 4} y1={118} x2={bx + bw + 4 + flen} y2={118} label={`F = ${F.toFixed(1)} N`} lx={bx + bw + 8} ly={106} />
          <Arr x1={bx} y1={164} x2={bx + alen} y2={164} label={`a = ${a.toFixed(2)} m/s²`} lx={bx + alen + 6} ly={168} />
        </svg>
      );
    }
    case 'friction-lab': {
      const mu = .05 + 1.15 * x, N = 10 + 490 * y, Ff = mu * N;
      const flen = 15 + (Ff / 600) * 85;
      return (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Block sliding with friction opposing motion" style={{ marginTop: 12 }}>
          <title>Block sliding right: friction Ff = μN points left, normal force N points up</title>
          <line x1="0" y1="140" x2="320" y2="140" stroke="currentColor" strokeWidth="1" />
          <rect x="120" y="96" width="80" height="44" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.5" />
          <Arr x1={130} y1={80} x2={195} y2={80} label="motion" lx={148} ly={72} />
          <Arr x1={116} y1={118} x2={116 - flen} y2={118} label={`Ff = ${Ff.toFixed(1)} N`} lx={Math.max(4, 112 - flen)} ly={106} />
          <Arr x1={205} y1={96} x2={205} y2={58} label={`N = ${N.toFixed(0)} N`} lx={211} ly={62} />
        </svg>
      );
    }
    case 'energy-skate': {
      const m = .5 + 4.5 * x, h = 1 + 19 * y;
      const pe = m * g * h, vb = Math.sqrt(2 * g * h);
      const peMax = 5 * g * 20;
      const barH = (pe / peMax) * 100;
      return (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Ball on a slope with energy bars" style={{ marginTop: 12 }}>
          <title>Slope with a ball at height h; bars show PE at the top and KE at the bottom</title>
          <line x1="30" y1="40" x2="170" y2="140" stroke="currentColor" strokeWidth="2" />
          <line x1="30" y1="140" x2="170" y2="140" stroke="currentColor" strokeWidth="1" />
          <line x1="20" y1="40" x2="20" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx="36" cy="33" r="9" fill="currentColor" />
          <text x="24" y="156" fontSize="11" fill="currentColor">h = {h.toFixed(1)} m</text>
          <text x="175" y="20" fontSize="11" fill="currentColor">v = {vb.toFixed(1)} m/s at bottom</text>
          <rect x="215" y={165 - barH} width="28" height={barH} fill="currentColor" opacity="0.35" stroke="currentColor" strokeWidth="1" />
          <rect x="265" y={165 - barH} width="28" height={barH} fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1" />
          <line x1="205" y1="165" x2="303" y2="165" stroke="currentColor" strokeWidth="1" />
          <text x="229" y={161 - barH} fontSize="11" fill="currentColor" textAnchor="middle">{pe.toFixed(0)} J</text>
          <text x="279" y={161 - barH} fontSize="11" fill="currentColor" textAnchor="middle">{pe.toFixed(0)} J</text>
          <text x="229" y="178" fontSize="10" fill="currentColor" textAnchor="middle">PE (top)</text>
          <text x="279" y="178" fontSize="10" fill="currentColor" textAnchor="middle">KE (bottom)</text>
        </svg>
      );
    }
    case 'collision-lab': {
      const m1 = .5 + 2 * x, m2 = .5 + 2 * y, u1 = -5 + 10 * z, u2 = 2;
      const p = m1 * u1 + m2 * u2, vf = p / (m1 + m2);
      const w1 = 25 + ((m1 - .5) / 2) * 45, w2 = 25 + ((m2 - .5) / 2) * 45;
      const cx1 = 40 + w1 / 2, cx2 = 200 + w2 / 2;
      const len1 = 10 + Math.abs(u1) * 6, len2 = 10 + Math.abs(u2) * 6;
      const wAfter = w1 + w2, cxAfter = 110 + wAfter / 2;
      const lenAfter = Math.min(70, 10 + Math.abs(vf) * 6);
      return (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Two blocks before and after a collision" style={{ marginTop: 12 }}>
          <title>Before: two blocks with velocities u1 and u2. After: one merged block moving at v′</title>
          <text x="8" y="60" fontSize="11" fill="currentColor">Before</text>
          <line x1="0" y1="78" x2="320" y2="78" stroke="currentColor" strokeWidth="1" />
          <rect x="40" y="48" width={w1} height="30" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.5" />
          <rect x="200" y="48" width={w2} height="30" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.5" />
          <Arr x1={cx1} y1={38} x2={cx1 + Math.sign(u1 || 1) * len1} y2={38} label={`u₁ = ${u1.toFixed(1)} m/s`} lx={cx1} ly={28} />
          <Arr x1={cx2} y1={38} x2={cx2 + len2} y2={38} label={`u₂ = ${u2.toFixed(1)} m/s`} lx={cx2} ly={28} />
          <text x={cx1} y="92" fontSize="10" fill="currentColor" textAnchor="middle">m₁ = {m1.toFixed(2)} kg</text>
          <text x={cx2} y="92" fontSize="10" fill="currentColor" textAnchor="middle">m₂ = {m2.toFixed(2)} kg</text>
          <text x="8" y="140" fontSize="11" fill="currentColor">After</text>
          <line x1="0" y1="158" x2="320" y2="158" stroke="currentColor" strokeWidth="1" />
          <rect x="110" y="128" width={wAfter} height="30" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
          <Arr x1={cxAfter} y1={118} x2={cxAfter + Math.sign(vf || 1) * lenAfter} y2={118} label={`v′ = ${vf.toFixed(2)} m/s`} lx={cxAfter} ly={108} />
          <text x={cxAfter} y="172" fontSize="10" fill="currentColor" textAnchor="middle">m₁ + m₂ = {(m1 + m2).toFixed(2)} kg</text>
        </svg>
      );
    }
    case 'circular-motion': {
      const v = 1 + 29 * x, r = .2 + 9.8 * y, m = .5 + 4.5 * z;
      const Fc = m * v * v / r;
      const cx = 150, cy = 98, R = 18 + ((r - .2) / 9.8) * 52;
      return (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Ball moving in a circle" style={{ marginTop: 12 }}>
          <title>Ball on a circular path of radius r, with tangential velocity v and inward force Fc</title>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 4" />
          <line x1={cx} y1={cy} x2={cx} y2={cy - R} stroke="currentColor" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="3" fill="currentColor" />
          <circle cx={cx} cy={cy - R} r="8" fill="currentColor" />
          <Arr x1={cx + 10} y1={cy - R} x2={cx + 62} y2={cy - R} label={`v = ${v.toFixed(1)} m/s`} lx={cx + 14} ly={cy - R - 8} />
          <Arr x1={cx} y1={cy - R + 12} x2={cx} y2={cy - 10} label={`Fc = ${Fc.toFixed(1)} N`} lx={cx + 8} ly={cy - R / 2 + 14} />
          <text x={cx - 6} y={cy - R / 2} fontSize="11" fill="currentColor" textAnchor="end">r = {r.toFixed(1)} m</text>
        </svg>
      );
    }
    case 'spring-oscillator': {
      const m = .1 + 4.9 * x, k = 5 + 495 * y, T = 2 * Math.PI * Math.sqrt(m / k);
      const bw = 50 + ((m - .1) / 4.9) * 30;
      const coilTop = 18, coilBottom = 114, turns = 6, disp = 18;
      const eqY = coilBottom - disp;
      const segH = (coilBottom - coilTop) / (turns * 2);
      const pts: string[] = [];
      for (let i = 0; i <= turns * 2; i++) {
        const yy = coilTop + i * segH;
        const xx = i === 0 || i === turns * 2 ? 160 : (i % 2 === 1 ? 148 : 172);
        pts.push(`${xx},${yy.toFixed(1)}`);
      }
      return (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Mass hanging from a spring" style={{ marginTop: 12 }}>
          <title>Mass on a spring, displaced by x below its equilibrium position</title>
          <line x1="120" y1="14" x2="200" y2="14" stroke="currentColor" strokeWidth="2" />
          <polyline points={pts.join(' ')} fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="110" y1={eqY} x2="210" y2={eqY} stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
          <text x="214" y={eqY + 4} fontSize="11" fill="currentColor">equilibrium</text>
          <rect x={160 - bw / 2} y={coilBottom} width={bw} height="26" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.5" />
          <text x="160" y={coilBottom + 17} fontSize="11" fill="currentColor" textAnchor="middle">m = {m.toFixed(2)} kg</text>
          <Arr x1={120} y1={eqY} x2={120} y2={coilBottom} label="x" lx={110} ly={eqY + disp / 2 + 4} />
          <text x="160" y="170" fontSize="11" fill="currentColor" textAnchor="middle">k = {k.toFixed(0)} N/m · T = {T.toFixed(2)} s</text>
        </svg>
      );
    }
    case 'pendulum-lab': {
      const L = .1 + 4.9 * x, T = 2 * Math.PI * Math.sqrt(L / g);
      const theta = 25 * Math.PI / 180;
      const len = 30 + ((L - .1) / 4.9) * 105;
      const px = 160, py = 18;
      const bx = px + len * Math.sin(theta), by = py + len * Math.cos(theta);
      return (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Pendulum at an angle" style={{ marginTop: 12 }}>
          <title>Pendulum of length L swinging at angle θ = 25° from the vertical</title>
          <line x1={px - 14} y1={py} x2={px + 14} y2={py} stroke="currentColor" strokeWidth="2" />
          <line x1={px} y1={py} x2={px} y2={py + len} stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={px} y1={py} x2={bx} y2={by} stroke="currentColor" strokeWidth="1.5" />
          <path d={`M ${px} ${py + 34} A 34 34 0 0 1 ${(px + 34 * Math.sin(theta)).toFixed(1)} ${(py + 34 * Math.cos(theta)).toFixed(1)}`} fill="none" stroke="currentColor" strokeWidth="1" />
          <text x={px + 40} y={py + 26} fontSize="11" fill="currentColor">θ = 25°</text>
          <circle cx={bx} cy={by} r="9" fill="currentColor" />
          <text x={bx - 14} y={by + 4} fontSize="11" fill="currentColor" textAnchor="end">L = {L.toFixed(2)} m</text>
          <text x="160" y="172" fontSize="11" fill="currentColor" textAnchor="middle">T = {T.toFixed(2)} s (small-angle model)</text>
        </svg>
      );
    }
    case 'wave-lab': {
      const f = 1 + 19 * x, lam = .1 + 4.9 * y, v = f * lam;
      const y0 = 95, amp = 38, x0 = 20, x1 = 300;
      const pts: string[] = [];
      for (let i = 0; i <= 120; i++) {
        const px = x0 + ((x1 - x0) * i) / 120;
        const ph = ((px - x0) / (x1 - x0)) * 2 * 2 * Math.PI;
        pts.push(`${px.toFixed(1)},${(y0 - amp * Math.sin(ph)).toFixed(1)}`);
      }
      const crest1 = x0 + (x1 - x0) / 8, crest2 = crest1 + (x1 - x0) / 2;
      return (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Sine wave with wavelength marked" style={{ marginTop: 12 }}>
          <title>Sine wave showing two wavelengths, with one wavelength λ marked between crests</title>
          <line x1={x0} y1={y0} x2={x1} y2={y0} stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={crest1} y1={y0 - amp} x2={crest1} y2={y0} stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={crest2} y1={y0 - amp} x2={crest2} y2={y0} stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <BiArr x1={crest1} y1={30} x2={crest2} y2={30} label={`λ = ${lam.toFixed(2)} m`} lx={125} ly={24} />
          <polyline points={pts.join(' ')} fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="160" y="170" fontSize="11" fill="currentColor" textAnchor="middle">f = {f.toFixed(1)} Hz · λ = {lam.toFixed(2)} m · v = {v.toFixed(2)} m/s</text>
        </svg>
      );
    }
    case 'sound-beats': {
      const f1 = 200 + 600 * x, fb = 1 + 30 * y, f2 = f1 + fb;
      const wave = (cycles: number, y0: number, amp: number) => {
        const pts: string[] = [];
        for (let i = 0; i <= 100; i++) {
          const px = 95 + (215 * i) / 100;
          const ph = ((px - 95) / 215) * cycles * 2 * Math.PI;
          pts.push(`${px.toFixed(1)},${(y0 - amp * Math.sin(ph)).toFixed(1)}`);
        }
        return pts.join(' ');
      };
      // Sum wave over two beat periods: the envelope 2cos(π·fb·t) is exact;
      // the carrier is compressed to 12 cycles so the beats are visible.
      const T = 2 / fb;
      const beats: string[] = [], envTop: string[] = [], envBot: string[] = [];
      for (let i = 0; i <= 160; i++) {
        const px = 95 + (215 * i) / 160;
        const tt = ((px - 95) / 215) * T;
        const env = Math.cos(Math.PI * fb * tt);
        const carrier = Math.sin(2 * Math.PI * 12 * (tt / T));
        beats.push(`${px.toFixed(1)},${(148 - 18 * env * carrier).toFixed(1)}`);
        envTop.push(`${px.toFixed(1)},${(148 - 18 * env).toFixed(1)}`);
        envBot.push(`${px.toFixed(1)},${(148 + 18 * env).toFixed(1)}`);
      }
      return (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Two tones and their beat envelope" style={{ marginTop: 12 }}>
          <title>Two close tones f1 and f2, and their sum with a beat envelope at fb</title>
          <text x="8" y="42" fontSize="11" fill="currentColor">f₁ = {f1.toFixed(1)} Hz</text>
          <polyline points={wave(6, 38, 12)} fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x="8" y="92" fontSize="11" fill="currentColor">f₂ = {f2.toFixed(1)} Hz</text>
          <polyline points={wave(6 * f2 / f1, 88, 12)} fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x="8" y="152" fontSize="11" fill="currentColor">f₁+f₂</text>
          <polyline points={envTop.join(' ')} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <polyline points={envBot.join(' ')} fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <polyline points={beats.join(' ')} fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x="160" y="176" fontSize="11" fill="currentColor" textAnchor="middle">beat frequency = {fb.toFixed(1)} Hz (carrier compressed)</text>
        </svg>
      );
    }
    case 'ohms-law-lab': {
      const V = 1 + 23 * x, R = 1 + 99 * y, I = V / R, P = V * I;
      return (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Simple circuit with battery and resistor" style={{ marginTop: 12 }}>
          <title>Loop circuit: battery V on the left, resistor R on the right, current I clockwise</title>
          <line x1="70" y1="40" x2="250" y2="40" stroke="currentColor" strokeWidth="1.5" />
          <line x1="250" y1="40" x2="250" y2="68" stroke="currentColor" strokeWidth="1.5" />
          <line x1="250" y1="112" x2="250" y2="140" stroke="currentColor" strokeWidth="1.5" />
          <line x1="70" y1="140" x2="250" y2="140" stroke="currentColor" strokeWidth="1.5" />
          <line x1="70" y1="140" x2="70" y2="102" stroke="currentColor" strokeWidth="1.5" />
          <line x1="70" y1="78" x2="70" y2="40" stroke="currentColor" strokeWidth="1.5" />
          <line x1="56" y1="78" x2="84" y2="78" stroke="currentColor" strokeWidth="2.5" />
          <line x1="62" y1="102" x2="78" y2="102" stroke="currentColor" strokeWidth="2.5" />
          <text x="88" y="82" fontSize="12" fill="currentColor">+</text>
          <text x="88" y="106" fontSize="12" fill="currentColor">−</text>
          <polyline points="250,68 238,76 262,84 238,92 262,100 238,108 250,112" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <Arr x1={110} y1={40} x2={190} y2={40} label={`I = ${I.toFixed(3)} A`} lx={150} ly={28} />
          <text x="160" y="62" fontSize="11" fill="currentColor" textAnchor="middle">P = {P.toFixed(2)} W</text>
          <text x="70" y="168" fontSize="11" fill="currentColor" textAnchor="middle">V = {V.toFixed(1)} V</text>
          <text x="230" y="168" fontSize="11" fill="currentColor" textAnchor="middle">R = {R.toFixed(1)} Ω</text>
        </svg>
      );
    }
    case 'lens-lab': {
      const f = .05 + .45 * x, do_ = f * (1.05 + 5 * y), di = 1 / (1 / f - 1 / do_);
      const maxD = Math.max(do_, Math.abs(di), f);
      const scale = 125 / maxD;
      const cx = 160, axis = 100;
      const ox = cx - do_ * scale, ix = cx + di * scale;
      const f1x = cx - f * scale, f2x = cx + f * scale;
      const m = -di / do_;
      const objH = 42, imgH = Math.min(62, Math.abs(m) * objH);
      return (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Thin lens with object and image" style={{ marginTop: 12 }}>
          <title>Thin lens: object arrow on the left, real inverted image on the right, focal points F</title>
          <line x1="0" y1={axis} x2="320" y2={axis} stroke="currentColor" strokeWidth="1" />
          <line x1={cx} y1="50" x2={cx} y2="150" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="160,44 154,54 166,54" fill="currentColor" />
          <polygon points="160,156 154,146 166,146" fill="currentColor" />
          <circle cx={f1x} cy={axis} r="2.5" fill="currentColor" />
          <circle cx={f2x} cy={axis} r="2.5" fill="currentColor" />
          <text x={f1x} y={axis + 14} fontSize="11" fill="currentColor" textAnchor="middle">F</text>
          <text x={f2x} y={axis + 14} fontSize="11" fill="currentColor" textAnchor="middle">F</text>
          <line x1={ox} y1={axis} x2={ox} y2={axis - objH} stroke="currentColor" strokeWidth="1.5" />
          <polygon points={`${ox},${axis - objH - 6} ${ox - 5},${axis - objH + 4} ${ox + 5},${axis - objH + 4}`} fill="currentColor" />
          <line x1={ix} y1={axis} x2={ix} y2={axis + imgH} stroke="currentColor" strokeWidth="1.5" />
          <polygon points={`${ix},${axis + imgH + 6} ${ix - 5},${axis + imgH - 4} ${ix + 5},${axis + imgH - 4}`} fill="currentColor" />
          <line x1={ox} y1={axis - objH} x2={ix} y2={axis + imgH} stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
          <text x={cx} y="34" fontSize="11" fill="currentColor" textAnchor="middle">f = {f.toFixed(2)} m</text>
          <text x={ox} y="170" fontSize="11" fill="currentColor" textAnchor="middle">do = {do_.toFixed(2)} m</text>
          <text x={ix} y="170" fontSize="11" fill="currentColor" textAnchor="middle">di = {di.toFixed(2)} m</text>
        </svg>
      );
    }
    case 'gas-law-lab':
    default: {
      // gas-law-lab (also the model's default case): piston/cylinder.
      const n = .5 + 4.5 * x, T = 200 + 400 * y, V = .01 + .09 * z;
      const P = n * 8.314462618 * T / V;
      const yP = 150 - ((V - .01) / .09) * 100;
      const arrowLen = Math.min(28, Math.max(8, 8 + (Math.log10(P) - 3.9) * 8));
      const gasTop = yP + 7, gh = 160 - gasTop;
      const cyOf = (fy: number) => gh < 10 ? gasTop + gh / 2 : gasTop + 4 + fy * (gh - 8);
      const parts: [number, number][] = [[100, .15], [140, .3], [180, .45], [220, .55], [120, .65], [200, .75], [160, .85], [230, .9]];
      const ySide = yP + gh / 2;
      return (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Gas in a cylinder with a piston" style={{ marginTop: 12 }}>
          <title>Ideal gas in a cylinder: piston height follows volume V, arrows show pressure P</title>
          <line x1="70" y1="30" x2="70" y2="160" stroke="currentColor" strokeWidth="2" />
          <line x1="250" y1="30" x2="250" y2="160" stroke="currentColor" strokeWidth="2" />
          <line x1="70" y1="160" x2="250" y2="160" stroke="currentColor" strokeWidth="2" />
          <rect x="66" y={yP} width="188" height="7" fill="currentColor" />
          {parts.map(([px, fy], i) => <circle key={i} cx={px} cy={cyOf(fy)} r="3" fill="currentColor" />)}
          <Arr x1={110} y1={yP - 2} x2={110} y2={yP - 2 - arrowLen} label={`P = ${(P / 1000).toFixed(1)} kPa`} lx={118} ly={yP - 6 - arrowLen} />
          <Arr x1={160} y1={yP - 2} x2={160} y2={yP - 2 - arrowLen} />
          <Arr x1={210} y1={yP - 2} x2={210} y2={yP - 2 - arrowLen} />
          <Arr x1={68} y1={ySide} x2={68 - arrowLen} y2={ySide} />
          <text x="160" y="174" fontSize="11" fill="currentColor" textAnchor="middle">T = {T.toFixed(0)} K · V = {V.toFixed(3)} m³ · n = {n.toFixed(2)} mol</text>
        </svg>
      );
    }
  }
}

export default function SimulationLab({ simulation }: { simulation: Simulation }) {
  const [x, setX] = useState(0.6); const [y, setY] = useState(0.45); const [z, setZ] = useState(0.35);
  const setters = [setX, setY, setZ];
  const raw = [x, y, z];
  const labels = SLIDERS[simulation.slug] ?? ['Parameter 1', 'Parameter 2', 'Parameter 3'];

  const data = useMemo(() => {
    const g = 9.80665;
    switch (simulation.slug) {
      case 'projectile-lab': { const speed = 5 + 35 * x, angle = 10 + 70 * y, h = 2 * z, r = angle * Math.PI / 180, vx = speed * Math.cos(r), vy = speed * Math.sin(r), t = (vy + Math.sqrt(vy * vy + 2 * g * h)) / g; return { a: `Flight time: ${t.toFixed(2)} s`, b: `Horizontal range: ${(vx * t).toFixed(2)} m`, c: `Launch speed ${speed.toFixed(1)} m/s at ${angle.toFixed(0)}°`, v: Math.min(100, vx * t / 18), params: [`${speed.toFixed(1)} m/s`, `${angle.toFixed(0)}°`, `${h.toFixed(2)} m`] }; }
      case 'free-fall-lab': { const h = 1 + 49 * x, t = Math.sqrt(2 * h / g); return { a: `Fall time: ${t.toFixed(2)} s`, b: `Impact speed: ${(g * t).toFixed(2)} m/s`, c: `Drop height: ${h.toFixed(1)} m`, v: Math.min(100, h / 50 * 100), params: [`${h.toFixed(1)} m`] }; }
      case 'motion-graphs': { const u = -5 + 15 * x, a = -4 + 8 * y, t = 1 + 5 * z; return { a: `Final velocity: ${(u + a * t).toFixed(2)} m/s`, b: `Displacement: ${(u * t + .5 * a * t * t).toFixed(2)} m`, c: `Acceleration: ${a.toFixed(2)} m/s²`, v: Math.min(100, Math.abs(u + a * t) * 4), params: [`${u.toFixed(2)} m/s`, `${a.toFixed(2)} m/s²`, `${t.toFixed(2)} s`] }; }
      case 'newtons-second-law': { const m = .5 + 9.5 * x, F = 1 + 99 * y; return { a: `Acceleration: ${(F / m).toFixed(2)} m/s²`, b: `Net force: ${F.toFixed(1)} N`, c: `Mass: ${m.toFixed(2)} kg`, v: Math.min(100, F / m * 4), params: [`${m.toFixed(2)} kg`, `${F.toFixed(1)} N`] }; }
      case 'friction-lab': { const mu = .05 + 1.15 * x, N = 10 + 490 * y; return { a: `Friction magnitude: ${(mu * N).toFixed(2)} N`, b: `Coefficient μ: ${mu.toFixed(2)}`, c: `Normal force: ${N.toFixed(1)} N`, v: Math.min(100, mu * N / 500 * 100), params: [`${mu.toFixed(2)}`, `${N.toFixed(1)} N`] }; }
      case 'energy-skate': { const m = .5 + 4.5 * x, h = 1 + 19 * y, pe = m * g * h; return { a: `Potential energy: ${pe.toFixed(2)} J`, b: `Speed at bottom (ideal): ${Math.sqrt(2 * g * h).toFixed(2)} m/s`, c: `Total mechanical energy: ${pe.toFixed(2)} J`, v: Math.min(100, h / 20 * 100), params: [`${m.toFixed(2)} kg`, `${h.toFixed(1)} m`] }; }
      case 'collision-lab': { const m1 = .5 + 2 * x, m2 = .5 + 2 * y, u1 = -5 + 10 * z, u2 = 2; return { a: `Initial total momentum: ${(m1 * u1 + m2 * u2).toFixed(2)} kg·m/s`, b: `Shared final speed if they stick: ${((m1 * u1 + m2 * u2) / (m1 + m2)).toFixed(2)} m/s`, c: 'Perfectly inelastic model: objects move together after impact', v: Math.min(100, Math.abs(m1 * u1 + m2 * u2) * 8), params: [`${m1.toFixed(2)} kg`, `${m2.toFixed(2)} kg`, `${u1.toFixed(2)} m/s`] }; }
      case 'circular-motion': { const v = 1 + 29 * x, r = .2 + 9.8 * y, m = .5 + 4.5 * z; return { a: `Centripetal acceleration: ${(v * v / r).toFixed(2)} m/s²`, b: `Inward force: ${(m * v * v / r).toFixed(2)} N`, c: `Speed ${v.toFixed(1)} m/s; radius ${r.toFixed(1)} m`, v: Math.min(100, v * v / r * 2), params: [`${v.toFixed(1)} m/s`, `${r.toFixed(1)} m`, `${m.toFixed(2)} kg`] }; }
      case 'spring-oscillator': { const m = .1 + 4.9 * x, k = 5 + 495 * y, T = 2 * Math.PI * Math.sqrt(m / k); return { a: `Period: ${T.toFixed(3)} s`, b: `Frequency: ${(1 / T).toFixed(3)} Hz`, c: `Mass ${m.toFixed(2)} kg; spring constant ${k.toFixed(0)} N/m`, v: Math.min(100, T * 20), params: [`${m.toFixed(2)} kg`, `${k.toFixed(0)} N/m`] }; }
      case 'pendulum-lab': { const L = .1 + 4.9 * x, T = 2 * Math.PI * Math.sqrt(L / g); return { a: `Period: ${T.toFixed(3)} s`, b: `Frequency: ${(1 / T).toFixed(3)} Hz`, c: `Length: ${L.toFixed(2)} m; small-angle model`, v: Math.min(100, T * 30), params: [`${L.toFixed(2)} m`] }; }
      case 'wave-lab': { const f = 1 + 19 * x, lam = .1 + 4.9 * y; return { a: `Wave speed: ${(f * lam).toFixed(2)} m/s`, b: `Frequency: ${f.toFixed(1)} Hz`, c: `Wavelength: ${lam.toFixed(2)} m`, v: Math.min(100, f * lam * 2), params: [`${f.toFixed(1)} Hz`, `${lam.toFixed(2)} m`] }; }
      case 'sound-beats': { const f1 = 200 + 600 * x, f2 = f1 + (1 + 30 * y); return { a: `Beat frequency: ${(Math.abs(f2 - f1)).toFixed(2)} Hz`, b: `Tone frequencies: ${f1.toFixed(1)} Hz and ${f2.toFixed(1)} Hz`, c: 'Beat frequency is the absolute difference between nearby tones', v: Math.min(100, Math.abs(f2 - f1) * 3), params: [`${f1.toFixed(1)} Hz`, `${Math.abs(f2 - f1).toFixed(2)} Hz`] }; }
      case 'ohms-law-lab': { const V = 1 + 23 * x, R = 1 + 99 * y, I = V / R; return { a: `Current: ${I.toFixed(3)} A`, b: `Power: ${(V * I).toFixed(2)} W`, c: `Voltage ${V.toFixed(1)} V; resistance ${R.toFixed(1)} Ω`, v: Math.min(100, I * 8), params: [`${V.toFixed(1)} V`, `${R.toFixed(1)} Ω`] }; }
      case 'lens-lab': { const f = .05 + .45 * x, do_ = f * (1.05 + 5 * y), di = 1 / (1 / f - 1 / do_); return { a: `Image distance: ${Number.isFinite(di) ? di.toFixed(3) + ' m' : 'At infinity'}`, b: `Magnification: ${(-di / do_).toFixed(2)}`, c: `Focal length ${f.toFixed(2)} m; object distance ${do_.toFixed(2)} m`, v: Math.min(100, Math.abs(di) * 20), params: [`${f.toFixed(2)} m`, `${(1.05 + 5 * y).toFixed(2)} × f`] }; }
      default: { const n = .5 + 4.5 * x, T = 200 + 400 * y, V = .01 + .09 * z, P = n * 8.314462618 * T / V; return { a: `Pressure: ${(P / 1000).toFixed(2)} kPa`, b: `Temperature: ${T.toFixed(1)} K`, c: `Ideal gas model; amount ${n.toFixed(2)} mol`, v: Math.min(100, P / 10000), params: [`${n.toFixed(2)} mol`, `${T.toFixed(1)} K`, `${V.toFixed(3)} m³`] }; }
    }
  }, [simulation.slug, x, y, z]);

  // Inline SVG trajectory for the projectile lab, computed from the same
  // model values as the numbers above (no new dependencies).
  const projectileSvg = useMemo(() => {
    if (simulation.slug !== 'projectile-lab') return null;
    const g = 9.80665;
    const speed = 5 + 35 * x, angle = 10 + 70 * y, h = 2 * z;
    const r = angle * Math.PI / 180, vx = speed * Math.cos(r), vy = speed * Math.sin(r);
    const t = (vy + Math.sqrt(vy * vy + 2 * g * h)) / g;
    const range = vx * t;
    const maxH = h + (vy * vy) / (2 * g);
    const W = 320, H = 180, ground = 165, pad = 12;
    const sx = (W - 2 * pad) / Math.max(range, 1);
    const sy = (ground - pad) / Math.max(maxH, 1);
    const pts: string[] = [];
    for (let i = 0; i <= 24; i++) {
      const tt = (t * i) / 24;
      const px = pad + vx * tt * sx;
      const py = ground - (h + vy * tt - 0.5 * g * tt * tt) * sy;
      pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
    return { pts: pts.join(' '), ground, startX: pad, startY: ground - h * sy, endX: pad + range * sx };
  }, [simulation.slug, x, y, z]);

  // Inline SVG drop diagram for the free-fall lab.
  const freeFallSvg = useMemo(() => {
    if (simulation.slug !== 'free-fall-lab') return null;
    const h = 1 + 49 * x;
    const ground = 165;
    const ballY = ground - 140 * (h / 50);
    return { h, ground, ballY };
  }, [simulation.slug, x]);

  // Real SVG diagram for the remaining 13 simulations (null for the two
  // above, which keep their own diagrams). Falls back to the bar if null.
  const otherDiagram = useMemo(() => diagramFor(simulation.slug, x, y, z), [simulation.slug, x, y, z]);
  const hasDiagram = Boolean(projectileSvg || freeFallSvg || otherDiagram);

  return (
    <div className="card">
      <p className="muted">Move the controls to change the model. Values update instantly; this is a simplified educational simulation, not a laboratory measurement.</p>
      <div className="sim-controls">
        {labels.map((label, i) => (
          <label className="field" key={label}>{label}
            <input type="range" min="0" max="1" step="0.01" value={raw[i]} onChange={(e) => setters[i](Number(e.target.value))} />
            <span>{data.params[i] ?? raw[i].toFixed(2)}</span>
          </label>
        ))}
      </div>
      <div className="result"><small>LIVE MODEL OUTPUT</small><h2>{data.a}</h2><p>{data.b}</p><p>{data.c}</p></div>
      {projectileSvg && (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Projectile trajectory" style={{ marginTop: 12 }}>
          <title>Projectile trajectory drawn from launch speed, angle and height</title>
          <line x1="0" y1={projectileSvg.ground} x2="320" y2={projectileSvg.ground} stroke="currentColor" strokeWidth="1" />
          <polyline points={projectileSvg.pts} fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx={projectileSvg.startX} cy={projectileSvg.startY} r="5" fill="currentColor" />
          <circle cx={projectileSvg.endX} cy={projectileSvg.ground} r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      )}
      {freeFallSvg && (
        <svg viewBox="0 0 320 180" width="100%" role="img" aria-label="Free-fall drop height" style={{ marginTop: 12 }}>
          <title>Free-fall drop from height h to the ground</title>
          <line x1="0" y1={freeFallSvg.ground} x2="320" y2={freeFallSvg.ground} stroke="currentColor" strokeWidth="1" />
          <line x1="160" y1={freeFallSvg.ballY} x2="160" y2={freeFallSvg.ground} stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="160" cy={freeFallSvg.ballY} r="8" fill="currentColor" />
          <text x="172" y={freeFallSvg.ballY + 4} fontSize="12" fill="currentColor">h = {freeFallSvg.h.toFixed(1)} m</text>
        </svg>
      )}
      {otherDiagram}
      {!hasDiagram && (
        <div className="sim-visual" aria-label="Illustrative model indicator"><div className="sim-bar" style={{ width: `${data.v}%` }} /></div>
      )}
      <p className="muted">{hasDiagram ? "The diagram is drawn from the same model values as the numbers above." : "The bar is a normalized visual indicator, not a physical scale."}</p>
      <button className="btn btn-secondary" onClick={() => { setX(.6); setY(.45); setZ(.35); }}>Reset model</button>
    </div>
  );
}
