'use client';
import { useMemo, useState } from 'react';
import type { Calculator } from '@/lib/calculators';
import { calculatorSpecs, calculatorFunctions } from '@/lib/calculator-specs';
export default function CalculatorTool({calculator}:{calculator:Calculator}) {
 const spec=calculatorSpecs[calculator.slug];
 const [values,setValues]=useState<string[]>(spec?.labels.map(()=> '') ?? []);
 const [submitted,setSubmitted]=useState(false);
 const parsed=values.map(v=>v.trim()===''?NaN:Number(v));
 const error=useMemo(()=>{
  if(!spec)return 'Calculator specification unavailable.';
  if(!submitted)return '';
  if(parsed.some(v=>!Number.isFinite(v)))return 'Enter a valid number in every field.';
  if(spec.labels.some((x,i)=>/time \(s\)|elapsed time|frequency \(hz\)|radius \(m\)|distance \(m\)|separation \(m\)|resistance \(ω\)|current \(a\)|volume \(m³\)|thickness \(m\)|focal length \(m\)|specific heat capacity|spring constant|refractive index n2/i.test(x) && parsed[i]===0))return 'The selected denominator or required physical quantity cannot be zero.';
  if(calculator.slug==='series-and-parallel-resistance' && (![1,2].includes(parsed[2]) || parsed[0]<=0 || parsed[1]<=0))return 'Use positive resistances and enter 1 (series) or 2 (parallel).';
  if(calculator.slug==='projectile-motion' && parsed[2]<0)return 'Launch height must be zero or greater.';
  if(calculator.slug==='snells-law' && Math.abs(parsed[1]*Math.sin(parsed[0]*Math.PI/180)/parsed[2])>1)return 'Total internal reflection: no real refracted angle exists for these inputs.';
  if(calculator.slug==='efficiency' && parsed[1]<=0)return 'Input energy must be greater than zero.';
  if(calculator.slug==='ideal-gas-law' && parsed[2]<=0)return 'Temperature must be above 0 K.';
  if(calculator.slug==='doppler-effect' && parsed[2]>=343)return 'The source speed must be below the assumed sound speed of 343 m/s.';
  if(calculator.slug==='snells-law' && (parsed[0]<0 || parsed[0]>90 || parsed[1]<=0 || parsed[2]<=0))return 'Use an incident angle from 0° to 90° and positive refractive indices.';
  if(calculator.slug==='friction-force' && (parsed[0]<0 || parsed[1]<0))return 'The friction coefficient and normal force cannot be negative.';
  if(calculator.slug==='drag-force' && parsed.some(v=>v<0))return 'Drag coefficient, density, speed and area cannot be negative.';
  if(calculator.slug==='thin-lens' && (parsed[1]<=0 || Math.abs(1/parsed[0]-1/parsed[1])<1e-12))return 'The object is at the focal point; image distance is unbounded.';
  return '';
 },[submitted,values,calculator.slug,spec]);
 const result=useMemo(()=>{if(!spec||!submitted||error)return null;try{return calculatorFunctions[calculator.slug](parsed)}catch{return NaN}},[submitted,error,values,spec]);
 if(!spec)return <div className="card"><h2>Specification unavailable</h2><p>This tool is withheld until its equation and assumptions are reviewed.</p></div>;
 return <div className="card calculator-panel"><h2>Enter your values</h2><p className="muted">Use the units shown. Negative values are allowed only where physically meaningful.</p><div className="field-grid">{spec.labels.map((label,i)=><label className="field" key={label}>{label}<input aria-label={label} type="number" step="any" value={values[i]} onChange={e=>{setValues(old=>old.map((x,j)=>i===j?e.target.value:x));setSubmitted(false)}} placeholder="Enter a value" /></label>)}</div><div className="actions"><button className="btn" onClick={()=>setSubmitted(true)}>Calculate</button><button className="btn btn-secondary" onClick={()=>{setValues(spec.labels.map(()=>''));setSubmitted(false)}}>Reset</button></div>{submitted&&error&&<p className="error" role="alert">{error}</p>}{submitted&&!error&&<div className="result" aria-live="polite"><small>RESULT</small><h2>{result===null||!Number.isFinite(result)?'Result is outside the supported numeric range':`${Number(result.toPrecision(8)).toLocaleString()} ${spec.unit}`}</h2><strong>{spec.formula}</strong></div>}<div className="explanation"><h3>Formula and assumptions</h3><p><b>Equation:</b> {spec.formula}</p><p>{spec.note}</p><p className="muted">This is an educational model. Measurement uncertainty, material variation and non-ideal effects are not automatically included.</p></div></div>
}
