import type { Calculator } from "./calculators";
export type CalculatorSpec = { labels: string[]; formula: string; unit: string; expression: string; note: string };
export const calculatorSpecs: Record<string, CalculatorSpec> = {
  "velocity": {
    "labels": [
      "Displacement (m)",
      "Time (s)"
    ],
    "formula": "v = Δx / t",
    "unit": "m/s",
    "expression": "a[0]/a[1]",
    "note": "Average velocity; displacement is signed."
  },
  "average-velocity": {
    "labels": [
      "Displacement (m)",
      "Elapsed time (s)"
    ],
    "formula": "v̄ = Δx / Δt",
    "unit": "m/s",
    "expression": "a[0]/a[1]",
    "note": "Uses displacement, not total path length."
  },
  "acceleration": {
    "labels": [
      "Final velocity (m/s)",
      "Initial velocity (m/s)",
      "Time interval (s)"
    ],
    "formula": "a = (v − u) / t",
    "unit": "m/s²",
    "expression": "(a[0]-a[1])/a[2]",
    "note": "One-dimensional average acceleration."
  },
  "final-velocity": {
    "labels": [
      "Initial velocity (m/s)",
      "Acceleration (m/s²)",
      "Time (s)"
    ],
    "formula": "v = u + at",
    "unit": "m/s",
    "expression": "a[0]+a[1]*a[2]",
    "note": "Constant acceleration."
  },
  "initial-velocity": {
    "labels": [
      "Final velocity (m/s)",
      "Acceleration (m/s²)",
      "Time (s)"
    ],
    "formula": "u = v − at",
    "unit": "m/s",
    "expression": "a[0]-a[1]*a[2]",
    "note": "Constant acceleration."
  },
  "displacement": {
    "labels": [
      "Initial velocity (m/s)",
      "Final velocity (m/s)",
      "Time (s)"
    ],
    "formula": "Δx = (u + v)t / 2",
    "unit": "m",
    "expression": "(a[0]+a[1])*a[2]/2",
    "note": "Constant acceleration in one dimension."
  },
  "distance-travelled": {
    "labels": [
      "Speed (m/s)",
      "Time (s)"
    ],
    "formula": "d = speed × time",
    "unit": "m",
    "expression": "a[0]*a[1]",
    "note": "Assumes constant speed and no direction changes."
  },
  "free-fall-time": {
    "labels": [
      "Vertical drop (m)",
      "Initial vertical velocity (m/s, downward +)"
    ],
    "formula": "t = (−u + √(u² + 2gh)) / g",
    "unit": "s",
    "expression": "(-a[1]+Math.sqrt(a[1]**2+2*9.80665*a[0]))/9.80665",
    "note": "Near Earth, constant g; ignores air resistance."
  },
  "free-fall-distance": {
    "labels": [
      "Initial velocity (m/s, downward +)",
      "Time (s)"
    ],
    "formula": "s = ut + ½gt²",
    "unit": "m",
    "expression": "a[0]*a[1]+0.5*9.80665*a[1]**2",
    "note": "Near Earth; downward is positive; ignores air resistance."
  },
  "projectile-motion": {
    "labels": [
      "Launch speed (m/s)",
      "Launch angle (degrees)",
      "Launch height (m)"
    ],
    "formula": "Range = vx × flight time",
    "unit": "m",
    "expression": "(a[0]*Math.cos(a[1]*Math.PI/180))*((a[0]*Math.sin(a[1]*Math.PI/180)+Math.sqrt((a[0]*Math.sin(a[1]*Math.PI/180))**2+2*9.80665*a[2]))/9.80665)",
    "note": "Level, still-air model; launch height must be ≥ 0."
  },
  "newtons-second-law": {
    "labels": [
      "Mass (kg)",
      "Acceleration (m/s²)"
    ],
    "formula": "F = ma",
    "unit": "N",
    "expression": "a[0]*a[1]",
    "note": "Net force in the acceleration direction."
  },
  "net-force": {
    "labels": [
      "Mass (kg)",
      "Acceleration (m/s²)"
    ],
    "formula": "Fnet = ma",
    "unit": "N",
    "expression": "a[0]*a[1]",
    "note": "One-dimensional net force."
  },
  "friction-force": {
    "labels": [
      "Coefficient of friction μ",
      "Normal force (N)"
    ],
    "formula": "Ff = μN",
    "unit": "N",
    "expression": "a[0]*a[1]",
    "note": "This calculates the friction limit μN; actual static friction adjusts up to this maximum."
  },
  "normal-force": {
    "labels": [
      "Mass (kg)",
      "Incline angle (degrees)"
    ],
    "formula": "N = mg cos θ",
    "unit": "N",
    "expression": "a[0]*9.80665*Math.cos(a[1]*Math.PI/180)",
    "note": "Object on a simple incline with no other perpendicular forces."
  },
  "tension-force": {
    "labels": [
      "Mass (kg)",
      "Upward acceleration (m/s²; downward is negative)"
    ],
    "formula": "T = m(g + a)",
    "unit": "N",
    "expression": "a[0]*(9.80665+a[1])",
    "note": "Single vertical rope; sign convention upward positive."
  },
  "inclined-plane": {
    "labels": [
      "Mass (kg)",
      "Incline angle (degrees)"
    ],
    "formula": "Fparallel = mg sin θ",
    "unit": "N",
    "expression": "a[0]*9.80665*Math.sin(a[1]*Math.PI/180)",
    "note": "Component of weight down a frictionless incline."
  },
  "weight-force": {
    "labels": [
      "Mass (kg)",
      "Gravitational field strength (m/s²)"
    ],
    "formula": "W = mg",
    "unit": "N",
    "expression": "a[0]*a[1]",
    "note": "Weight is a force; default Earth g ≈ 9.80665 m/s²."
  },
  "centripetal-force": {
    "labels": [
      "Mass (kg)",
      "Speed (m/s)",
      "Radius (m)"
    ],
    "formula": "Fc = mv² / r",
    "unit": "N",
    "expression": "a[0]*a[1]**2/a[2]",
    "note": "Magnitude of net inward force for circular motion."
  },
  "drag-force": {
    "labels": [
      "Drag coefficient Cd",
      "Fluid density (kg/m³)",
      "Speed (m/s)",
      "Reference area (m²)"
    ],
    "formula": "Fd = ½ρCdAv²",
    "unit": "N",
    "expression": "0.5*a[0]*a[1]*a[2]**2*a[3]",
    "note": "Quadratic drag approximation; Cd depends on shape and flow."
  },
  "work": {
    "labels": [
      "Force (N)",
      "Displacement (m)"
    ],
    "formula": "W = Fd",
    "unit": "J",
    "expression": "a[0]*a[1]",
    "note": "Force parallel to displacement."
  },
  "work-at-an-angle": {
    "labels": [
      "Force (N)",
      "Displacement (m)",
      "Angle between force and displacement (degrees)"
    ],
    "formula": "W = Fd cos θ",
    "unit": "J",
    "expression": "a[0]*a[1]*Math.cos(a[2]*Math.PI/180)",
    "note": "Constant force over straight displacement."
  },
  "kinetic-energy": {
    "labels": [
      "Mass (kg)",
      "Speed (m/s)"
    ],
    "formula": "KE = ½mv²",
    "unit": "J",
    "expression": "0.5*a[0]*a[1]**2",
    "note": "Classical, non-relativistic speed."
  },
  "gravitational-potential-energy": {
    "labels": [
      "Mass (kg)",
      "Height change (m)",
      "Gravitational field strength (m/s²)"
    ],
    "formula": "ΔUg = mgΔh",
    "unit": "J",
    "expression": "a[0]*a[1]*a[2]",
    "note": "Near-uniform gravitational field."
  },
  "spring-potential-energy": {
    "labels": [
      "Spring constant (N/m)",
      "Extension or compression (m)"
    ],
    "formula": "Us = ½kx²",
    "unit": "J",
    "expression": "0.5*a[0]*a[1]**2",
    "note": "Ideal Hookean spring within its elastic range."
  },
  "mechanical-energy": {
    "labels": [
      "Kinetic energy (J)",
      "Potential energy (J)"
    ],
    "formula": "E = KE + PE",
    "unit": "J",
    "expression": "a[0]+a[1]",
    "note": "Sum of the supplied kinetic and potential energies."
  },
  "power": {
    "labels": [
      "Work (J)",
      "Time (s)"
    ],
    "formula": "P = W / t",
    "unit": "W",
    "expression": "a[0]/a[1]",
    "note": "Average power over the interval."
  },
  "efficiency": {
    "labels": [
      "Useful output energy (J)",
      "Input energy (J)"
    ],
    "formula": "η = (useful / input) × 100%",
    "unit": "%",
    "expression": "100*a[0]/a[1]",
    "note": "Input energy must be positive; result may exceed 100% if values are inconsistent."
  },
  "momentum": {
    "labels": [
      "Mass (kg)",
      "Velocity (m/s)"
    ],
    "formula": "p = mv",
    "unit": "kg·m/s",
    "expression": "a[0]*a[1]",
    "note": "One-dimensional signed momentum."
  },
  "impulse": {
    "labels": [
      "Average net force (N)",
      "Time interval (s)"
    ],
    "formula": "J = FΔt",
    "unit": "N·s",
    "expression": "a[0]*a[1]",
    "note": "Impulse equals change in momentum."
  },
  "collision-momentum": {
    "labels": [
      "Mass 1 (kg)",
      "Velocity 1 before (m/s)",
      "Mass 2 (kg)",
      "Velocity 2 before (m/s)"
    ],
    "formula": "p total = m1u1 + m2u2",
    "unit": "kg·m/s",
    "expression": "a[0]*a[1]+a[2]*a[3]",
    "note": "Total one-dimensional momentum before collision."
  },
  "angular-velocity": {
    "labels": [
      "Angular displacement (radians)",
      "Time (s)"
    ],
    "formula": "ω = Δθ / t",
    "unit": "rad/s",
    "expression": "a[0]/a[1]",
    "note": "Average angular velocity."
  },
  "angular-acceleration": {
    "labels": [
      "Final angular velocity (rad/s)",
      "Initial angular velocity (rad/s)",
      "Time (s)"
    ],
    "formula": "α = (ω − ω₀) / t",
    "unit": "rad/s²",
    "expression": "(a[0]-a[1])/a[2]",
    "note": "Average angular acceleration."
  },
  "torque": {
    "labels": [
      "Force (N)",
      "Lever arm (m)",
      "Angle between r and F (degrees)"
    ],
    "formula": "τ = rF sin θ",
    "unit": "N·m",
    "expression": "a[0]*a[1]*Math.sin(a[2]*Math.PI/180)",
    "note": "Magnitude of torque about the pivot."
  },
  "moment-of-inertia": {
    "labels": [
      "Point mass (kg)",
      "Distance from axis (m)"
    ],
    "formula": "I = mr²",
    "unit": "kg·m²",
    "expression": "a[0]*a[1]**2",
    "note": "Single point mass; extended bodies require geometry-specific formulas."
  },
  "rotational-kinetic-energy": {
    "labels": [
      "Moment of inertia (kg·m²)",
      "Angular speed (rad/s)"
    ],
    "formula": "Krot = ½Iω²",
    "unit": "J",
    "expression": "0.5*a[0]*a[1]**2",
    "note": "Rigid body rotating about a fixed axis."
  },
  "gravitational-force": {
    "labels": [
      "Mass 1 (kg)",
      "Mass 2 (kg)",
      "Center-to-center distance (m)"
    ],
    "formula": "F = Gm₁m₂ / r²",
    "unit": "N",
    "expression": "6.67430e-11*a[0]*a[1]/a[2]**2",
    "note": "Newtonian point-mass approximation; G = 6.67430×10⁻¹¹ N·m²/kg²."
  },
  "gravity-on-planets": {
    "labels": [
      "Planet mass (kg)",
      "Planet radius (m)"
    ],
    "formula": "g = GM / R²",
    "unit": "m/s²",
    "expression": "6.67430e-11*a[0]/a[1]**2",
    "note": "Surface gravity; assumes spherical planet."
  },
  "escape-velocity": {
    "labels": [
      "Central body mass (kg)",
      "Distance from body center (m)"
    ],
    "formula": "vesc = √(2GM/r)",
    "unit": "m/s",
    "expression": "Math.sqrt(2*6.67430e-11*a[0]/a[1])",
    "note": "Ideal two-body result; ignores atmosphere and rotation."
  },
  "orbital-velocity": {
    "labels": [
      "Central body mass (kg)",
      "Orbital radius from center (m)"
    ],
    "formula": "v = √(GM/r)",
    "unit": "m/s",
    "expression": "Math.sqrt(6.67430e-11*a[0]/a[1])",
    "note": "Circular orbit around a spherical central body."
  },
  "centripetal-acceleration": {
    "labels": [
      "Speed (m/s)",
      "Radius (m)"
    ],
    "formula": "ac = v² / r",
    "unit": "m/s²",
    "expression": "a[0]**2/a[1]",
    "note": "Magnitude of inward acceleration."
  },
  "orbital-period": {
    "labels": [
      "Orbital radius (m)",
      "Central body mass (kg)"
    ],
    "formula": "T = 2π√(r³ / GM)",
    "unit": "s",
    "expression": "2*Math.PI*Math.sqrt(a[0]**3/(6.67430e-11*a[1]))",
    "note": "Circular orbit; central body mass dominates."
  },
  "wave-speed": {
    "labels": [
      "Frequency (Hz)",
      "Wavelength (m)"
    ],
    "formula": "v = fλ",
    "unit": "m/s",
    "expression": "a[0]*a[1]",
    "note": "Periodic wave in a uniform medium."
  },
  "wavelength": {
    "labels": [
      "Wave speed (m/s)",
      "Frequency (Hz)"
    ],
    "formula": "λ = v / f",
    "unit": "m",
    "expression": "a[0]/a[1]",
    "note": "Frequency must be positive."
  },
  "frequency": {
    "labels": [
      "Number of cycles",
      "Elapsed time (s)"
    ],
    "formula": "f = N / t",
    "unit": "Hz",
    "expression": "a[0]/a[1]",
    "note": "Count complete cycles over elapsed time."
  },
  "wave-period": {
    "labels": [
      "Frequency (Hz)"
    ],
    "formula": "T = 1 / f",
    "unit": "s",
    "expression": "1/a[0]",
    "note": "Period of a periodic wave."
  },
  "pendulum-period": {
    "labels": [
      "Pendulum length (m)"
    ],
    "formula": "T = 2π√(L / g)",
    "unit": "s",
    "expression": "2*Math.PI*Math.sqrt(a[0]/9.80665)",
    "note": "Simple pendulum, small-angle approximation (typically θ ≲ 10°)."
  },
  "spring-oscillation-period": {
    "labels": [
      "Mass (kg)",
      "Spring constant (N/m)"
    ],
    "formula": "T = 2π√(m / k)",
    "unit": "s",
    "expression": "2*Math.PI*Math.sqrt(a[0]/a[1])",
    "note": "Ideal mass-spring oscillator; negligible damping."
  },
  "doppler-effect": {
    "labels": [
      "Source frequency (Hz)",
      "Observer speed toward source (m/s)",
      "Source speed toward observer (m/s)"
    ],
    "formula": "f′ = f(v + vo)/(v − vs)",
    "unit": "Hz",
    "expression": "a[0]*(343+a[1])/(343-a[2])",
    "note": "Sound in still air at 20°C; speeds positive when moving toward each other."
  },
  "ohms-law": {
    "labels": [
      "Voltage (V)",
      "Resistance (Ω)"
    ],
    "formula": "I = V / R",
    "unit": "A",
    "expression": "a[0]/a[1]",
    "note": "Ohmic component; resistance must be non-zero."
  },
  "electric-power": {
    "labels": [
      "Voltage (V)",
      "Current (A)"
    ],
    "formula": "P = VI",
    "unit": "W",
    "expression": "a[0]*a[1]",
    "note": "DC or compatible RMS quantities for AC."
  },
  "resistance": {
    "labels": [
      "Voltage (V)",
      "Current (A)"
    ],
    "formula": "R = V / I",
    "unit": "Ω",
    "expression": "a[0]/a[1]",
    "note": "Current must be non-zero."
  },
  "series-and-parallel-resistance": {
    "labels": [
      "R1 (Ω)",
      "R2 (Ω)",
      "Connection type (1 = series, 2 = parallel)"
    ],
    "formula": "Series: R1+R2; Parallel: (R1R2)/(R1+R2)",
    "unit": "Ω",
    "expression": "a[2]===1?a[0]+a[1]:(a[0]*a[1])/(a[0]+a[1])",
    "note": "Two positive resistors; choose 1 for series or 2 for parallel."
  },
  "coulombs-law": {
    "labels": [
      "Charge 1 (C)",
      "Charge 2 (C)",
      "Separation (m)"
    ],
    "formula": "F = k|q₁q₂| / r²",
    "unit": "N",
    "expression": "8.9875517923e9*Math.abs(a[0]*a[1])/a[2]**2",
    "note": "Magnitude of electrostatic force in vacuum."
  },
  "electric-field": {
    "labels": [
      "Force on test charge (N)",
      "Test charge (C)"
    ],
    "formula": "E = F / q",
    "unit": "N/C",
    "expression": "a[0]/a[1]",
    "note": "Test charge must be non-zero; direction follows vector signs."
  },
  "electric-potential": {
    "labels": [
      "Electric potential energy (J)",
      "Charge (C)"
    ],
    "formula": "V = U / q",
    "unit": "V",
    "expression": "a[0]/a[1]",
    "note": "Charge must be non-zero."
  },
  "magnetic-force": {
    "labels": [
      "Charge magnitude (C)",
      "Speed (m/s)",
      "Magnetic field (T)",
      "Angle between v and B (degrees)"
    ],
    "formula": "F = |q|vB sin θ",
    "unit": "N",
    "expression": "Math.abs(a[0])*a[1]*a[2]*Math.sin(a[3]*Math.PI/180)",
    "note": "Magnitude of magnetic force on a moving point charge."
  },
  "magnetic-flux": {
    "labels": [
      "Magnetic field (T)",
      "Area (m²)",
      "Angle between B and area normal (degrees)"
    ],
    "formula": "Φ = BA cos θ",
    "unit": "Wb",
    "expression": "a[0]*a[1]*Math.cos(a[2]*Math.PI/180)",
    "note": "Uniform field over a flat surface."
  },
  "specific-heat": {
    "labels": [
      "Mass (kg)",
      "Specific heat capacity (J/kg·K)",
      "Temperature change (K)"
    ],
    "formula": "Q = mcΔT",
    "unit": "J",
    "expression": "a[0]*a[1]*a[2]",
    "note": "No phase change; c treated as constant."
  },
  "latent-heat": {
    "labels": [
      "Mass (kg)",
      "Specific latent heat (J/kg)"
    ],
    "formula": "Q = mL",
    "unit": "J",
    "expression": "a[0]*a[1]",
    "note": "Energy for a phase change at constant temperature."
  },
  "thermal-expansion": {
    "labels": [
      "Original length (m)",
      "Linear expansion coefficient (1/K)",
      "Temperature change (K)"
    ],
    "formula": "ΔL = αL₀ΔT",
    "unit": "m",
    "expression": "a[0]*a[1]*a[2]",
    "note": "Small temperature range; constant α approximation."
  },
  "ideal-gas-law": {
    "labels": [
      "Volume (m³)",
      "Amount (mol)",
      "Temperature (K)"
    ],
    "formula": "PV = nRT; solve for P",
    "unit": "Pa",
    "expression": "a[1]*8.314462618*a[2]/a[0]",
    "note": "Ideal gas; absolute temperature in kelvin; R = 8.314462618 J/(mol·K)."
  },
  "heat-transfer": {
    "labels": [
      "Thermal conductivity (W/m·K)",
      "Area (m²)",
      "Temperature difference (K)",
      "Wall thickness (m)"
    ],
    "formula": "Q̇ = kAΔT / L",
    "unit": "W",
    "expression": "a[0]*a[1]*a[2]/a[3]",
    "note": "Steady one-dimensional conduction through a uniform slab."
  },
  "snells-law": {
    "labels": [
      "Incident angle (degrees)",
      "Incident refractive index n1",
      "Refracted refractive index n2"
    ],
    "formula": "θ₂ = asin(n₁ sin θ₁ / n₂)",
    "unit": "degrees",
    "expression": "Math.asin(a[1]*Math.sin(a[0]*Math.PI/180)/a[2])*180/Math.PI",
    "note": "Angles measured from normal; total internal reflection has no real transmitted angle."
  },
  "thin-lens": {
    "labels": [
      "Focal length (m)",
      "Object distance (m)"
    ],
    "formula": "1/f = 1/do + 1/di; solve di",
    "unit": "m",
    "expression": "1/(1/a[0]-1/a[1])",
    "note": "Real-is-positive Cartesian convention; object distance cannot equal focal length."
  },
  "magnification": {
    "labels": [
      "Image height (m)",
      "Object height (m)"
    ],
    "formula": "m = hi / ho",
    "unit": "dimensionless",
    "expression": "a[0]/a[1]",
    "note": "Signed magnification depends on image orientation."
  },
  "density": {
    "labels": [
      "Mass (kg)",
      "Volume (m³)"
    ],
    "formula": "ρ = m / V",
    "unit": "kg/m³",
    "expression": "a[0]/a[1]",
    "note": "Density of a uniform sample. For an irregular object, find the volume by water displacement: volume = rise in water level, then ρ = m / V. 1 g/cm³ = 1000 kg/m³."
  },
  "pressure": {
    "labels": [
      "Force (N)",
      "Area (m²)"
    ],
    "formula": "P = F / A",
    "unit": "Pa",
    "expression": "a[0]/a[1]",
    "note": "Area must be in square metres: 1 cm² = 0.0001 m², so 25 cm² = 0.0025 m². Forgetting this conversion is the most common pressure mistake."
  },
  "suvat": {
    "labels": [
      "Displacement s (m)",
      "Initial velocity u (m/s)",
      "Final velocity v (m/s)",
      "Acceleration a (m/s²)",
      "Time t (s)"
    ],
    "formula": "v = u + at; s = ut + ½at²; v² = u² + 2as",
    "unit": "mixed",
    "expression": "a[1]+a[3]*a[4]",
    "note": "Multi-solve SUVAT: enter any three of s, u, v, a, t and the tool solves the other two. The expression above is the v = u + at form used for the generic sample check; the page uses the full solver in lib/suvat.ts."
  }
};

export const calculatorFunctions: Record<string,(a:number[])=>number> = {
  "velocity": (a) => a[0]/a[1],
  "average-velocity": (a) => a[0]/a[1],
  "acceleration": (a) => (a[0]-a[1])/a[2],
  "final-velocity": (a) => a[0]+a[1]*a[2],
  "initial-velocity": (a) => a[0]-a[1]*a[2],
  "displacement": (a) => (a[0]+a[1])*a[2]/2,
  "distance-travelled": (a) => a[0]*a[1],
  "free-fall-time": (a) => (-a[1]+Math.sqrt(a[1]**2+2*9.80665*a[0]))/9.80665,
  "free-fall-distance": (a) => a[0]*a[1]+0.5*9.80665*a[1]**2,
  "projectile-motion": (a) => (a[0]*Math.cos(a[1]*Math.PI/180))*((a[0]*Math.sin(a[1]*Math.PI/180)+Math.sqrt((a[0]*Math.sin(a[1]*Math.PI/180))**2+2*9.80665*a[2]))/9.80665),
  "newtons-second-law": (a) => a[0]*a[1],
  "net-force": (a) => a[0]*a[1],
  "friction-force": (a) => a[0]*a[1],
  "normal-force": (a) => a[0]*9.80665*Math.cos(a[1]*Math.PI/180),
  "tension-force": (a) => a[0]*(9.80665+a[1]),
  "inclined-plane": (a) => a[0]*9.80665*Math.sin(a[1]*Math.PI/180),
  "weight-force": (a) => a[0]*a[1],
  "centripetal-force": (a) => a[0]*a[1]**2/a[2],
  "drag-force": (a) => 0.5*a[0]*a[1]*a[2]**2*a[3],
  "work": (a) => a[0]*a[1],
  "work-at-an-angle": (a) => a[0]*a[1]*Math.cos(a[2]*Math.PI/180),
  "kinetic-energy": (a) => 0.5*a[0]*a[1]**2,
  "gravitational-potential-energy": (a) => a[0]*a[1]*a[2],
  "spring-potential-energy": (a) => 0.5*a[0]*a[1]**2,
  "mechanical-energy": (a) => a[0]+a[1],
  "power": (a) => a[0]/a[1],
  "efficiency": (a) => 100*a[0]/a[1],
  "momentum": (a) => a[0]*a[1],
  "impulse": (a) => a[0]*a[1],
  "collision-momentum": (a) => a[0]*a[1]+a[2]*a[3],
  "angular-velocity": (a) => a[0]/a[1],
  "angular-acceleration": (a) => (a[0]-a[1])/a[2],
  "torque": (a) => a[0]*a[1]*Math.sin(a[2]*Math.PI/180),
  "moment-of-inertia": (a) => a[0]*a[1]**2,
  "rotational-kinetic-energy": (a) => 0.5*a[0]*a[1]**2,
  "gravitational-force": (a) => 6.67430e-11*a[0]*a[1]/a[2]**2,
  "gravity-on-planets": (a) => 6.67430e-11*a[0]/a[1]**2,
  "escape-velocity": (a) => Math.sqrt(2*6.67430e-11*a[0]/a[1]),
  "orbital-velocity": (a) => Math.sqrt(6.67430e-11*a[0]/a[1]),
  "centripetal-acceleration": (a) => a[0]**2/a[1],
  "orbital-period": (a) => 2*Math.PI*Math.sqrt(a[0]**3/(6.67430e-11*a[1])),
  "wave-speed": (a) => a[0]*a[1],
  "wavelength": (a) => a[0]/a[1],
  "frequency": (a) => a[0]/a[1],
  "wave-period": (a) => 1/a[0],
  "pendulum-period": (a) => 2*Math.PI*Math.sqrt(a[0]/9.80665),
  "spring-oscillation-period": (a) => 2*Math.PI*Math.sqrt(a[0]/a[1]),
  "doppler-effect": (a) => a[0]*(343+a[1])/(343-a[2]),
  "ohms-law": (a) => a[0]/a[1],
  "electric-power": (a) => a[0]*a[1],
  "resistance": (a) => a[0]/a[1],
  "series-and-parallel-resistance": (a) => a[2]===1?a[0]+a[1]:(a[0]*a[1])/(a[0]+a[1]),
  "coulombs-law": (a) => 8.9875517923e9*Math.abs(a[0]*a[1])/a[2]**2,
  "electric-field": (a) => a[0]/a[1],
  "electric-potential": (a) => a[0]/a[1],
  "magnetic-force": (a) => Math.abs(a[0])*a[1]*a[2]*Math.sin(a[3]*Math.PI/180),
  "magnetic-flux": (a) => a[0]*a[1]*Math.cos(a[2]*Math.PI/180),
  "specific-heat": (a) => a[0]*a[1]*a[2],
  "latent-heat": (a) => a[0]*a[1],
  "thermal-expansion": (a) => a[0]*a[1]*a[2],
  "ideal-gas-law": (a) => a[1]*8.314462618*a[2]/a[0],
  "heat-transfer": (a) => a[0]*a[1]*a[2]/a[3],
  "snells-law": (a) => Math.asin(a[1]*Math.sin(a[0]*Math.PI/180)/a[2])*180/Math.PI,
  "thin-lens": (a) => 1/(1/a[0]-1/a[1]),
  "magnification": (a) => a[0]/a[1],
  "density": (a) => a[0]/a[1],
  "pressure": (a) => a[0]/a[1],
  "suvat": (a) => a[1]+a[3]*a[4],
};
