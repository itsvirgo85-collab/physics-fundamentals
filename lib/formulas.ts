export type Formula={name:string;equation:string;unit:string;category:string};
export const formulas:Formula[] = [
  {
    "name": "Average speed",
    "equation": "speed = distance / time",
    "unit": "m/s",
    "category": "Kinematics"
  },
  {
    "name": "Average velocity",
    "equation": "v̄ = Δx / Δt",
    "unit": "m/s",
    "category": "Kinematics"
  },
  {
    "name": "Acceleration",
    "equation": "a = Δv / Δt",
    "unit": "m/s²",
    "category": "Kinematics"
  },
  {
    "name": "Constant-acceleration velocity",
    "equation": "v = u + at",
    "unit": "m/s",
    "category": "Kinematics"
  },
  {
    "name": "Displacement from initial velocity",
    "equation": "s = ut + ½at²",
    "unit": "m",
    "category": "Kinematics"
  },
  {
    "name": "Velocity-displacement relation",
    "equation": "v² = u² + 2as",
    "unit": "m²/s²",
    "category": "Kinematics"
  },
  {
    "name": "Average velocity under constant acceleration",
    "equation": "v̄ = (u + v) / 2",
    "unit": "m/s",
    "category": "Kinematics"
  },
  {
    "name": "Horizontal projectile position",
    "equation": "x = (u cos θ)t",
    "unit": "m",
    "category": "Kinematics"
  },
  {
    "name": "Vertical projectile position",
    "equation": "y = h + (u sin θ)t − ½gt²",
    "unit": "m",
    "category": "Kinematics"
  },
  {
    "name": "Projectile range at equal heights",
    "equation": "R = u² sin(2θ) / g",
    "unit": "m",
    "category": "Kinematics"
  },
  {
    "name": "Free-fall speed from rest",
    "equation": "v = √(2gh)",
    "unit": "m/s",
    "category": "Kinematics"
  },
  {
    "name": "Free-fall time from rest",
    "equation": "t = √(2h/g)",
    "unit": "s",
    "category": "Kinematics"
  },
  {
    "name": "Newton second law",
    "equation": "ΣF = ma",
    "unit": "N",
    "category": "Forces"
  },
  {
    "name": "Weight",
    "equation": "W = mg",
    "unit": "N",
    "category": "Forces"
  },
  {
    "name": "Friction magnitude",
    "equation": "Ff = μN",
    "unit": "N",
    "category": "Forces"
  },
  {
    "name": "Incline parallel weight",
    "equation": "F∥ = mg sin θ",
    "unit": "N",
    "category": "Forces"
  },
  {
    "name": "Incline normal weight component",
    "equation": "F⊥ = mg cos θ",
    "unit": "N",
    "category": "Forces"
  },
  {
    "name": "Centripetal acceleration",
    "equation": "ac = v²/r",
    "unit": "m/s²",
    "category": "Circular motion"
  },
  {
    "name": "Centripetal acceleration angular",
    "equation": "ac = ω²r",
    "unit": "m/s²",
    "category": "Circular motion"
  },
  {
    "name": "Centripetal force",
    "equation": "Fc = mv²/r",
    "unit": "N",
    "category": "Circular motion"
  },
  {
    "name": "Torque",
    "equation": "τ = rF sin θ",
    "unit": "N·m",
    "category": "Rotation"
  },
  {
    "name": "Angular velocity",
    "equation": "ω = Δθ/Δt",
    "unit": "rad/s",
    "category": "Rotation"
  },
  {
    "name": "Angular acceleration",
    "equation": "α = Δω/Δt",
    "unit": "rad/s²",
    "category": "Rotation"
  },
  {
    "name": "Tangential speed",
    "equation": "v = rω",
    "unit": "m/s",
    "category": "Rotation"
  },
  {
    "name": "Tangential acceleration",
    "equation": "at = rα",
    "unit": "m/s²",
    "category": "Rotation"
  },
  {
    "name": "Rotational kinetic energy",
    "equation": "K = ½Iω²",
    "unit": "J",
    "category": "Rotation"
  },
  {
    "name": "Moment of inertia point mass",
    "equation": "I = mr²",
    "unit": "kg·m²",
    "category": "Rotation"
  },
  {
    "name": "Angular momentum rigid body",
    "equation": "L = Iω",
    "unit": "kg·m²/s",
    "category": "Rotation"
  },
  {
    "name": "Work constant force",
    "equation": "W = Fd cos θ",
    "unit": "J",
    "category": "Energy"
  },
  {
    "name": "Kinetic energy",
    "equation": "K = ½mv²",
    "unit": "J",
    "category": "Energy"
  },
  {
    "name": "Gravitational potential energy",
    "equation": "Ug = mgh",
    "unit": "J",
    "category": "Energy"
  },
  {
    "name": "Spring potential energy",
    "equation": "Us = ½kx²",
    "unit": "J",
    "category": "Energy"
  },
  {
    "name": "Power",
    "equation": "P = W/t",
    "unit": "W",
    "category": "Energy"
  },
  {
    "name": "Power force velocity",
    "equation": "P = Fv",
    "unit": "W",
    "category": "Energy"
  },
  {
    "name": "Efficiency",
    "equation": "η = Eout/Ein × 100%",
    "unit": "%",
    "category": "Energy"
  },
  {
    "name": "Work-energy theorem",
    "equation": "Wnet = ΔK",
    "unit": "J",
    "category": "Energy"
  },
  {
    "name": "Mechanical energy",
    "equation": "E = K + U",
    "unit": "J",
    "category": "Energy"
  },
  {
    "name": "Momentum",
    "equation": "p = mv",
    "unit": "kg·m/s",
    "category": "Momentum"
  },
  {
    "name": "Impulse",
    "equation": "J = FΔt",
    "unit": "N·s",
    "category": "Momentum"
  },
  {
    "name": "Impulse momentum theorem",
    "equation": "J = Δp",
    "unit": "N·s",
    "category": "Momentum"
  },
  {
    "name": "Momentum conservation",
    "equation": "Σpbefore = Σpafter",
    "unit": "kg·m/s",
    "category": "Momentum"
  },
  {
    "name": "Elastic collision kinetic energy",
    "equation": "Kbefore = Kafter",
    "unit": "J",
    "category": "Momentum"
  },
  {
    "name": "Gravitational force",
    "equation": "F = Gm₁m₂/r²",
    "unit": "N",
    "category": "Gravitation"
  },
  {
    "name": "Gravitational field strength",
    "equation": "g = GM/r²",
    "unit": "m/s²",
    "category": "Gravitation"
  },
  {
    "name": "Gravitational potential",
    "equation": "φ = −GM/r",
    "unit": "J/kg",
    "category": "Gravitation"
  },
  {
    "name": "Escape velocity",
    "equation": "ve = √(2GM/r)",
    "unit": "m/s",
    "category": "Gravitation"
  },
  {
    "name": "Circular orbital velocity",
    "equation": "v = √(GM/r)",
    "unit": "m/s",
    "category": "Gravitation"
  },
  {
    "name": "Orbital period",
    "equation": "T = 2π√(r³/GM)",
    "unit": "s",
    "category": "Gravitation"
  },
  {
    "name": "Kepler third law",
    "equation": "T² ∝ r³",
    "unit": "—",
    "category": "Gravitation"
  },
  {
    "name": "Wave speed",
    "equation": "v = fλ",
    "unit": "m/s",
    "category": "Waves"
  },
  {
    "name": "Wave period",
    "equation": "T = 1/f",
    "unit": "s",
    "category": "Waves"
  },
  {
    "name": "Angular frequency",
    "equation": "ω = 2πf",
    "unit": "rad/s",
    "category": "Waves"
  },
  {
    "name": "Wave number",
    "equation": "k = 2π/λ",
    "unit": "rad/m",
    "category": "Waves"
  },
  {
    "name": "String wave speed",
    "equation": "v = √(T/μ)",
    "unit": "m/s",
    "category": "Waves"
  },
  {
    "name": "Sound intensity",
    "equation": "I = P/A",
    "unit": "W/m²",
    "category": "Sound"
  },
  {
    "name": "Sound level",
    "equation": "β = 10 log₁₀(I/I₀)",
    "unit": "dB",
    "category": "Sound"
  },
  {
    "name": "Beat frequency",
    "equation": "fb = |f₁ − f₂|",
    "unit": "Hz",
    "category": "Sound"
  },
  {
    "name": "Doppler effect",
    "equation": "f′ = f(v ± vo)/(v ∓ vs)",
    "unit": "Hz",
    "category": "Sound"
  },
  {
    "name": "Simple pendulum period",
    "equation": "T = 2π√(L/g)",
    "unit": "s",
    "category": "Oscillations"
  },
  {
    "name": "Mass spring period",
    "equation": "T = 2π√(m/k)",
    "unit": "s",
    "category": "Oscillations"
  },
  {
    "name": "Simple harmonic acceleration",
    "equation": "a = −ω²x",
    "unit": "m/s²",
    "category": "Oscillations"
  },
  {
    "name": "SHM displacement",
    "equation": "x = A cos(ωt + φ)",
    "unit": "m",
    "category": "Oscillations"
  },
  {
    "name": "SHM total energy",
    "equation": "E = ½kA²",
    "unit": "J",
    "category": "Oscillations"
  },
  {
    "name": "Hooke law",
    "equation": "F = −kx",
    "unit": "N",
    "category": "Oscillations"
  },
  {
    "name": "Electric charge quantization",
    "equation": "q = ne",
    "unit": "C",
    "category": "Electricity"
  },
  {
    "name": "Coulomb law",
    "equation": "F = k|q₁q₂|/r²",
    "unit": "N",
    "category": "Electricity"
  },
  {
    "name": "Electric field force",
    "equation": "E = F/q",
    "unit": "N/C",
    "category": "Electricity"
  },
  {
    "name": "Point charge electric field",
    "equation": "E = k|q|/r²",
    "unit": "N/C",
    "category": "Electricity"
  },
  {
    "name": "Electric potential",
    "equation": "V = U/q",
    "unit": "V",
    "category": "Electricity"
  },
  {
    "name": "Point charge potential",
    "equation": "V = kq/r",
    "unit": "V",
    "category": "Electricity"
  },
  {
    "name": "Electric potential energy",
    "equation": "U = qV",
    "unit": "J",
    "category": "Electricity"
  },
  {
    "name": "Capacitance",
    "equation": "C = Q/V",
    "unit": "F",
    "category": "Electricity"
  },
  {
    "name": "Parallel plate capacitance",
    "equation": "C = ε₀A/d",
    "unit": "F",
    "category": "Electricity"
  },
  {
    "name": "Capacitor stored energy",
    "equation": "U = ½CV²",
    "unit": "J",
    "category": "Electricity"
  },
  {
    "name": "Ohm law",
    "equation": "V = IR",
    "unit": "V",
    "category": "Circuits"
  },
  {
    "name": "Current definition",
    "equation": "I = ΔQ/Δt",
    "unit": "A",
    "category": "Circuits"
  },
  {
    "name": "Resistance resistivity",
    "equation": "R = ρL/A",
    "unit": "Ω",
    "category": "Circuits"
  },
  {
    "name": "Series resistance",
    "equation": "Req = ΣRi",
    "unit": "Ω",
    "category": "Circuits"
  },
  {
    "name": "Two parallel resistors",
    "equation": "1/Req = 1/R₁ + 1/R₂",
    "unit": "Ω",
    "category": "Circuits"
  },
  {
    "name": "Electric power",
    "equation": "P = VI",
    "unit": "W",
    "category": "Circuits"
  },
  {
    "name": "Joule heating",
    "equation": "Q = I²Rt",
    "unit": "J",
    "category": "Circuits"
  },
  {
    "name": "Electric energy",
    "equation": "E = Pt",
    "unit": "J",
    "category": "Circuits"
  },
  {
    "name": "Magnetic force charge",
    "equation": "F = |q|vB sin θ",
    "unit": "N",
    "category": "Magnetism"
  },
  {
    "name": "Magnetic force wire",
    "equation": "F = BIL sin θ",
    "unit": "N",
    "category": "Magnetism"
  },
  {
    "name": "Magnetic flux",
    "equation": "ΦB = BA cos θ",
    "unit": "Wb",
    "category": "Magnetism"
  },
  {
    "name": "Faraday induction",
    "equation": "ε = −N ΔΦB/Δt",
    "unit": "V",
    "category": "Magnetism"
  },
  {
    "name": "Magnetic field long wire",
    "equation": "B = μ₀I/(2πr)",
    "unit": "T",
    "category": "Magnetism"
  },
  {
    "name": "Magnetic field solenoid",
    "equation": "B = μ₀nI",
    "unit": "T",
    "category": "Magnetism"
  },
  {
    "name": "Thermal energy sensible heat",
    "equation": "Q = mcΔT",
    "unit": "J",
    "category": "Thermodynamics"
  },
  {
    "name": "Latent heat",
    "equation": "Q = mL",
    "unit": "J",
    "category": "Thermodynamics"
  },
  {
    "name": "Linear thermal expansion",
    "equation": "ΔL = αL₀ΔT",
    "unit": "m",
    "category": "Thermodynamics"
  },
  {
    "name": "Volume thermal expansion",
    "equation": "ΔV = βV₀ΔT",
    "unit": "m³",
    "category": "Thermodynamics"
  },
  {
    "name": "Ideal gas law",
    "equation": "PV = nRT",
    "unit": "Pa·m³",
    "category": "Thermodynamics"
  },
  {
    "name": "Combined gas law",
    "equation": "P₁V₁/T₁ = P₂V₂/T₂",
    "unit": "—",
    "category": "Thermodynamics"
  },
  {
    "name": "First law thermodynamics",
    "equation": "ΔU = Q − W",
    "unit": "J",
    "category": "Thermodynamics"
  },
  {
    "name": "Conduction rate",
    "equation": "Q/t = kAΔT/L",
    "unit": "W",
    "category": "Thermodynamics"
  },
  {
    "name": "Stefan Boltzmann law",
    "equation": "P = εσAT⁴",
    "unit": "W",
    "category": "Thermodynamics"
  },
  {
    "name": "Carnot efficiency",
    "equation": "η = 1 − Tc/Th",
    "unit": "—",
    "category": "Thermodynamics"
  },
  {
    "name": "Density",
    "equation": "ρ = m/V",
    "unit": "kg/m³",
    "category": "Fluids"
  },
  {
    "name": "Pressure",
    "equation": "P = F/A",
    "unit": "Pa",
    "category": "Fluids"
  },
  {
    "name": "Hydrostatic pressure",
    "equation": "P = P₀ + ρgh",
    "unit": "Pa",
    "category": "Fluids"
  },
  {
    "name": "Buoyant force",
    "equation": "Fb = ρfluid g Vdisplaced",
    "unit": "N",
    "category": "Fluids"
  },
  {
    "name": "Continuity equation",
    "equation": "A₁v₁ = A₂v₂",
    "unit": "m³/s",
    "category": "Fluids"
  },
  {
    "name": "Bernoulli equation",
    "equation": "P + ½ρv² + ρgh = constant",
    "unit": "Pa",
    "category": "Fluids"
  },
  {
    "name": "Snell law",
    "equation": "n₁sinθ₁ = n₂sinθ₂",
    "unit": "—",
    "category": "Optics"
  },
  {
    "name": "Refractive index",
    "equation": "n = c/v",
    "unit": "—",
    "category": "Optics"
  },
  {
    "name": "Critical angle",
    "equation": "sin θc = n₂/n₁",
    "unit": "—",
    "category": "Optics"
  },
  {
    "name": "Mirror equation",
    "equation": "1/f = 1/do + 1/di",
    "unit": "m⁻¹",
    "category": "Optics"
  },
  {
    "name": "Lens equation",
    "equation": "1/f = 1/do + 1/di",
    "unit": "m⁻¹",
    "category": "Optics"
  },
  {
    "name": "Magnification lens",
    "equation": "m = hi/ho = −di/do",
    "unit": "—",
    "category": "Optics"
  },
  {
    "name": "Thin lens power",
    "equation": "P = 1/f",
    "unit": "dioptre",
    "category": "Optics"
  },
  {
    "name": "Young double slit fringe spacing",
    "equation": "Δy = λL/d",
    "unit": "m",
    "category": "Optics"
  },
  {
    "name": "Single slit minima",
    "equation": "a sin θ = mλ",
    "unit": "—",
    "category": "Optics"
  },
  {
    "name": "Photon energy",
    "equation": "E = hf",
    "unit": "J",
    "category": "Modern physics"
  },
  {
    "name": "Photon momentum",
    "equation": "p = h/λ",
    "unit": "kg·m/s",
    "category": "Modern physics"
  },
  {
    "name": "Photoelectric equation",
    "equation": "Kmax = hf − φ",
    "unit": "J",
    "category": "Modern physics"
  },
  {
    "name": "Mass energy equivalence",
    "equation": "E = mc²",
    "unit": "J",
    "category": "Relativity"
  },
  {
    "name": "Lorentz factor",
    "equation": "γ = 1/√(1 − v²/c²)",
    "unit": "—",
    "category": "Relativity"
  },
  {
    "name": "Time dilation",
    "equation": "Δt = γΔt₀",
    "unit": "s",
    "category": "Relativity"
  },
  {
    "name": "Length contraction",
    "equation": "L = L₀/γ",
    "unit": "m",
    "category": "Relativity"
  },
  {
    "name": "de Broglie wavelength",
    "equation": "λ = h/p",
    "unit": "m",
    "category": "Quantum"
  },
  {
    "name": "Heisenberg uncertainty",
    "equation": "ΔxΔp ≥ ħ/2",
    "unit": "J·s",
    "category": "Quantum"
  },
  {
    "name": "Radioactive decay",
    "equation": "N = N₀e^(−λt)",
    "unit": "nuclei",
    "category": "Nuclear"
  },
  {
    "name": "Half-life",
    "equation": "t½ = ln 2 / λ",
    "unit": "s",
    "category": "Nuclear"
  },
  {
    "name": "Activity",
    "equation": "A = λN",
    "unit": "Bq",
    "category": "Nuclear"
  },
  {
    "name": "Nuclear binding energy",
    "equation": "Ebind = Δmc²",
    "unit": "J",
    "category": "Nuclear"
  },
  {
    "name": "Compton wavelength shift",
    "equation": "Δλ = h/(mec)(1 − cos θ)",
    "unit": "m",
    "category": "Quantum"
  },
  {
    "name": "RMS speed ideal gas",
    "equation": "vrms = √(3RT/M)",
    "unit": "m/s",
    "category": "Thermodynamics"
  },
  {
    "name": "Mean free path",
    "equation": "λ = kBT/(√2πd²P)",
    "unit": "m",
    "category": "Kinetic theory"
  },
  {
    "name": "Thermal efficiency",
    "equation": "η = Wout/Qin",
    "unit": "—",
    "category": "Thermodynamics"
  },
  {
    "name": "Reynolds number",
    "equation": "Re = ρvL/μ",
    "unit": "—",
    "category": "Fluids"
  },
  {
    "name": "Terminal speed Stokes sphere",
    "equation": "vt = 2r²(ρs−ρf)g/(9μ)",
    "unit": "m/s",
    "category": "Fluids"
  },
  {
    "name": "Capillary pressure",
    "equation": "ΔP = 2γ/r",
    "unit": "Pa",
    "category": "Fluids"
  },
  {
    "name": "Surface tension",
    "equation": "γ = F/L",
    "unit": "N/m",
    "category": "Fluids"
  },
  {
    "name": "Elastic stress",
    "equation": "σ = F/A",
    "unit": "Pa",
    "category": "Materials"
  },
  {
    "name": "Strain",
    "equation": "ε = ΔL/L₀",
    "unit": "—",
    "category": "Materials"
  },
  {
    "name": "Young modulus",
    "equation": "Y = stress/strain",
    "unit": "Pa",
    "category": "Materials"
  },
  {
    "name": "Hooke material relation",
    "equation": "σ = Yε",
    "unit": "Pa",
    "category": "Materials"
  },
  {
    "name": "Thermal diffusivity",
    "equation": "α = k/(ρcp)",
    "unit": "m²/s",
    "category": "Thermodynamics"
  },
  {
    "name": "Angular momentum",
    "equation": "L = r × p",
    "unit": "kg·m²/s",
    "category": "Rotation"
  },
  {
    "name": "Rotational Newton law",
    "equation": "τ = Iα",
    "unit": "N·m",
    "category": "Rotation"
  },
  {
    "name": "Rolling kinetic energy",
    "equation": "K = ½mv² + ½Iω²",
    "unit": "J",
    "category": "Rotation"
  },
  {
    "name": "Center of mass",
    "equation": "xcm = Σmixi/Σmi",
    "unit": "m",
    "category": "Mechanics"
  },
  {
    "name": "Impulse from variable force",
    "equation": "J = ∫F dt",
    "unit": "N·s",
    "category": "Momentum"
  },
  {
    "name": "Average acceleration vector",
    "equation": "ā = Δv/Δt",
    "unit": "m/s²",
    "category": "Kinematics"
  },
  {
    "name": "Gravitational potential energy general",
    "equation": "ΔU = GMm(1/r₁ − 1/r₂)",
    "unit": "J",
    "category": "Gravitation"
  },
  {
    "name": "Magnetic flux linkage",
    "equation": "NΦB",
    "unit": "Wb-turn",
    "category": "Magnetism"
  },
  {
    "name": "RC time constant",
    "equation": "τ = RC",
    "unit": "s",
    "category": "Circuits"
  },
  {
    "name": "Capacitor discharge",
    "equation": "Q = Q₀e^(−t/RC)",
    "unit": "C",
    "category": "Circuits"
  },
  {
    "name": "Inductor energy",
    "equation": "U = ½LI²",
    "unit": "J",
    "category": "Circuits"
  },
  {
    "name": "Inductive reactance",
    "equation": "XL = 2πfL",
    "unit": "Ω",
    "category": "AC circuits"
  },
  {
    "name": "Capacitive reactance",
    "equation": "XC = 1/(2πfC)",
    "unit": "Ω",
    "category": "AC circuits"
  },
  {
    "name": "RMS voltage sinusoid",
    "equation": "Vrms = Vpeak/√2",
    "unit": "V",
    "category": "AC circuits"
  },
  {
    "name": "RMS current sinusoid",
    "equation": "Irms = Ipeak/√2",
    "unit": "A",
    "category": "AC circuits"
  },
  {
    "name": "AC impedance series RLC",
    "equation": "Z = √(R² + (XL−XC)²)",
    "unit": "Ω",
    "category": "AC circuits"
  },
  {
    "name": "Resonant frequency RLC",
    "equation": "f₀ = 1/(2π√LC)",
    "unit": "Hz",
    "category": "AC circuits"
  },
  {
    "name": "Electric field potential relation",
    "equation": "E = −dV/dx",
    "unit": "V/m",
    "category": "Electricity"
  },
  {
    "name": "Gauss law",
    "equation": "∮E·dA = Qenc/ε₀",
    "unit": "N·m²/C",
    "category": "Electricity"
  },
  {
    "name": "Magnetic dipole torque",
    "equation": "τ = μB sin θ",
    "unit": "N·m",
    "category": "Magnetism"
  },
  {
    "name": "Magnetic dipole energy",
    "equation": "U = −μ·B",
    "unit": "J",
    "category": "Magnetism"
  },
  {
    "name": "Radiation pressure absorbing",
    "equation": "P = I/c",
    "unit": "Pa",
    "category": "Optics"
  },
  {
    "name": "Radiation pressure reflecting",
    "equation": "P = 2I/c",
    "unit": "Pa",
    "category": "Optics"
  },
  {
    "name": "Diffraction grating",
    "equation": "d sin θ = mλ",
    "unit": "m",
    "category": "Optics"
  },
  {
    "name": "Optical path length",
    "equation": "OPL = nL",
    "unit": "m",
    "category": "Optics"
  },
  {
    "name": "Thermal radiation peak wavelength",
    "equation": "λmax = b/T",
    "unit": "m",
    "category": "Thermodynamics"
  },
  {
    "name": "Entropy change reversible",
    "equation": "ΔS = Qrev/T",
    "unit": "J/K",
    "category": "Thermodynamics"
  },
  {
    "name": "Heat engine work",
    "equation": "W = Qin − Qout",
    "unit": "J",
    "category": "Thermodynamics"
  },
  {
    "name": "Boyle law",
    "equation": "P₁V₁ = P₂V₂",
    "unit": "Pa·m³",
    "category": "Thermodynamics"
  },
  {
    "name": "Charles law",
    "equation": "V₁/T₁ = V₂/T₂",
    "unit": "m³/K",
    "category": "Thermodynamics"
  },
  {
    "name": "Gay-Lussac law",
    "equation": "P₁/T₁ = P₂/T₂",
    "unit": "Pa/K",
    "category": "Thermodynamics"
  },
  {
    "name": "Fluid flow rate",
    "equation": "Q = Av",
    "unit": "m³/s",
    "category": "Fluids"
  },
  {
    "name": "Torricelli law",
    "equation": "v = √(2gh)",
    "unit": "m/s",
    "category": "Fluids"
  },
  {
    "name": "Archimedes principle",
    "equation": "Fb = weight of displaced fluid",
    "unit": "N",
    "category": "Fluids"
  },
  {
    "name": "Elastic potential energy",
    "equation": "U = ½kx²",
    "unit": "J",
    "category": "Mechanics"
  },
  {
    "name": "Gravitational acceleration from weight",
    "equation": "g = W/m",
    "unit": "m/s²",
    "category": "Forces"
  },
  {
    "name": "Centripetal period relation",
    "equation": "v = 2πr/T",
    "unit": "m/s",
    "category": "Circular motion"
  },
  {
    "name": "Angular frequency period",
    "equation": "ω = 2π/T",
    "unit": "rad/s",
    "category": "Oscillations"
  },
  {
    "name": "Wave intensity inverse square",
    "equation": "I ∝ 1/r²",
    "unit": "W/m²",
    "category": "Waves"
  },
  {
    "name": "Sound speed ideal gas",
    "equation": "v = √(γRT/M)",
    "unit": "m/s",
    "category": "Sound"
  },
  {
    "name": "Electric field parallel plates",
    "equation": "E = V/d",
    "unit": "V/m",
    "category": "Electricity"
  },
  {
    "name": "Capacitor parallel equivalent",
    "equation": "Ceq = ΣCi",
    "unit": "F",
    "category": "Circuits"
  },
  {
    "name": "Capacitor series equivalent",
    "equation": "1/Ceq = Σ(1/Ci)",
    "unit": "F",
    "category": "Circuits"
  },
  {
    "name": "Resistance temperature dependence",
    "equation": "R = R₀[1 + α(T−T₀)]",
    "unit": "Ω",
    "category": "Circuits"
  },
  {
    "name": "Magnetic field circular loop center",
    "equation": "B = μ₀I/(2R)",
    "unit": "T",
    "category": "Magnetism"
  },
  {
    "name": "Solenoid inductance",
    "equation": "L = μ₀N²A/l",
    "unit": "H",
    "category": "Magnetism"
  },
  {
    "name": "Lensmaker equation",
    "equation": "1/f = (n−1)(1/R₁−1/R₂)",
    "unit": "m⁻¹",
    "category": "Optics"
  },
  {
    "name": "Thin film optical path",
    "equation": "2nt cos θ",
    "unit": "m",
    "category": "Optics"
  },
  {
    "name": "Bohr energy levels",
    "equation": "En = −13.6 eV/n²",
    "unit": "eV",
    "category": "Atomic physics"
  },
  {
    "name": "Rydberg formula",
    "equation": "1/λ = R(1/n₁²−1/n₂²)",
    "unit": "m⁻¹",
    "category": "Atomic physics"
  },
  {
    "name": "Mass defect",
    "equation": "Δm = Zmp + Nmn − Mnucleus",
    "unit": "kg",
    "category": "Nuclear"
  },
  {
    "name": "Nuclear decay activity time",
    "equation": "A = A₀e^(−λt)",
    "unit": "Bq",
    "category": "Nuclear"
  },
  {
    "name": "Binding energy per nucleon",
    "equation": "Ebind/A",
    "unit": "J",
    "category": "Nuclear"
  },
  {
    "name": "Relativistic momentum",
    "equation": "p = γmv",
    "unit": "kg·m/s",
    "category": "Relativity"
  },
  {
    "name": "Relativistic energy",
    "equation": "E = γmc²",
    "unit": "J",
    "category": "Relativity"
  },
  {
    "name": "Relativistic kinetic energy",
    "equation": "K = (γ−1)mc²",
    "unit": "J",
    "category": "Relativity"
  },
  {
    "name": "Photon frequency wavelength",
    "equation": "c = fλ",
    "unit": "m/s",
    "category": "Waves"
  }
];
