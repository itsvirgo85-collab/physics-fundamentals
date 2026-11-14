// Unique page content for all 68 calculators. The 15 launch-cluster entries
// were written first; the remaining 53 were added afterwards. All worked-example
// numbers were checked by hand; see FIX-REPORT.md.
// All worked-example numbers below were checked by hand; see FIX-REPORT.md.
export type CalculatorFaq = { q: string; a: string };
export type CalculatorContent = {
  title?: string;
  description: string;
  workedExample: { title: string; steps: string[] };
  faqs: CalculatorFaq[];
  conversionNote?: string;
  relatedGuide?: { slug: string; title: string };
};

export const calculatorContent: Record<string, CalculatorContent> = {
  "density": {
    title: "Density Calculator — Mass, Volume and Density",
    description: "Calculate density from mass and volume (ρ = m/V), solve for any of the three, and use water displacement for irregular objects — the GCSE required practical.",
    workedExample: {
      title: "Worked example — density of an irregular stone (GCSE required practical)",
      steps: [
        "Measure the mass: the stone is 120 g on the balance.",
        "Fill a measuring cylinder to 80 cm³, lower the stone in on a thread, and read the new level: 130 cm³. The volume is 130 − 80 = 50 cm³.",
        "ρ = m / V = 120 g / 50 cm³ = 2.4 g/cm³.",
        "Convert to SI: 2.4 g/cm³ × 1000 = 2,400 kg/m³.",
        "Check: most rocks are 2,000–3,000 kg/m³, so 2,400 kg/m³ is plausible. Water is 1,000 kg/m³, so the stone sinks — as expected.",
      ],
    },
    faqs: [
      { q: "How do I find the volume of an irregular object?", a: "Use water displacement: record the water level in a measuring cylinder, lower the object in, and subtract. The rise in level is the object's volume. A Eureka can does the same job — the water that runs off equals the object's volume." },
      { q: "Why is my density too low?", a: "Usually air bubbles clinging to the object — they count as volume, so V is too big and ρ = m/V comes out too small. Tap the object gently to release bubbles, and read the meniscus at eye level, at the bottom of the curve." },
      { q: "How do I convert g/cm³ to kg/m³?", a: "Multiply by 1000. 1 g/cm³ = 1000 kg/m³, so water (1 g/cm³) is 1000 kg/m³ and aluminium (2.7 g/cm³) is 2700 kg/m³. The number in g/cm³ is always the smaller one." },
    ],
    conversionNote: "1 g/cm³ = 1000 kg/m³. Enter mass in g and volume in cm³ and the tool converts for you.",
  },
  "specific-heat": {
    title: "Specific Heat Calculator — Energy to Heat a Mass",
    description: "Calculate the energy to heat a material (Q = mcΔT) from mass, specific heat capacity and temperature change, plus latent heat Q = mL and GCSE examples.",
    workedExample: {
      title: "Worked example — heating water",
      steps: [
        "Heat 0.5 kg of water by 40 K. Water's specific heat capacity c = 4200 J/kg·K.",
        "Q = mcΔT = 0.5 × 4200 × 40.",
        "0.5 × 4200 = 2100; 2100 × 40 = 84,000 J.",
        "Answer: 84,000 J (84 kJ). A temperature change of 40 °C is the same as 40 K, so no conversion is needed.",
        "Compare: 2 kg of aluminium (c = 900) heated by 30 K needs Q = 2 × 900 × 30 = 54,000 J — less than the water, because aluminium's c is much smaller.",
      ],
    },
    faqs: [
      { q: "Do I use °C or K for ΔT?", a: "Either — a change of 1 °C is exactly a change of 1 K, so ΔT is the same number in both. Only convert to kelvin when the formula needs an absolute temperature, as in the ideal gas law." },
      { q: "Why does water need so much energy to heat up?", a: "Water's specific heat capacity is 4200 J/kg·K, about four times aluminium's 900. The hydrogen bonds between water molecules absorb a lot of energy before the temperature rises — which is why water is used in central heating and cooling systems." },
      { q: "When do I use Q = mL instead of Q = mcΔT?", a: "Use Q = mL for a phase change at constant temperature — melting ice or boiling water. Use Q = mcΔT when the temperature changes with no phase change. Melting 0.2 kg of ice (L = 334,000 J/kg) takes 0.2 × 334,000 = 66,800 J, and the temperature stays at 0 °C throughout." },
    ],
    conversionNote: "ΔT in °C = ΔT in K. Energy answers are usually given in kJ: divide joules by 1000.",
    relatedGuide: { slug: "specific-heat-capacity", title: "Specific heat capacity guide" },
  },
  "final-velocity": {
    title: "Final Velocity Calculator — v = u + at",
    description: "Calculate final velocity with v = u + at from initial velocity, acceleration and time — with braking examples, the sign convention and when to use SUVAT.",
    workedExample: {
      title: "Worked example — speeding up and braking",
      steps: [
        "A car accelerates from 12 m/s at 3 m/s² for 4 s. v = u + at = 12 + 3 × 4 = 12 + 12 = 24 m/s.",
        "Check: 24 m/s × 3.6 = 86.4 km/h — plausible for a car accelerating for 4 seconds.",
        "Braking: the same car at 20 m/s brakes at −5 m/s² for 3 s. v = 20 + (−5) × 3 = 20 − 15 = 5 m/s.",
        "If the answer comes out negative, the object has stopped and reversed direction under the model — in a braking question, that usually means it stopped before the time was up.",
      ],
    },
    faqs: [
      { q: "What sign should acceleration have?", a: "Take the direction of the initial velocity as positive. Acceleration in the same direction is positive; braking is negative. A negative final velocity means the object is now moving backwards relative to the starting direction." },
      { q: "When can't I use v = u + at?", a: "Only when acceleration is constant. If the acceleration changes during the motion — a rocket burning fuel, or a skydiver reaching terminal velocity — v = u + at does not apply and you need a velocity–time graph or calculus." },
      { q: "How do I find the time to stop?", a: "Set v = 0 in v = u + at, so t = −u/a. A car at 20 m/s braking at −5 m/s² stops in t = −20/−5 = 4 s. Then check the stopping distance with s = (u + v)t/2 = (20 + 0) × 4/2 = 40 m." },
    ],
    conversionNote: "1 m/s = 3.6 km/h. Divide km/h by 3.6 before using v = u + at.",
    relatedGuide: { slug: "constant-acceleration-equations", title: "Constant-acceleration (SUVAT) equations guide" },
  },
  "suvat": {
    title: "SUVAT Calculator — Solve Any Three of s, u, v, a, t",
    description: "The SUVAT solver: enter any three of displacement, initial and final velocity, acceleration and time, and it solves the other two with full working shown.",
    workedExample: {
      title: "Worked example — dropped from rest",
      steps: [
        "An object accelerates from rest at 2 m/s² for 5 s. Enter u = 0, a = 2, t = 5 and leave s and v blank.",
        "Final velocity: v = u + at = 0 + 2 × 5 = 10 m/s.",
        "Displacement: s = ut + ½at² = 0 × 5 + ½ × 2 × 25 = 25 m.",
        "Check with the other equations: v² = u² + 2as gives 100 = 0 + 2 × 2 × 25 = 100. It agrees.",
        "Second example: s = 100 m, u = 10 m/s, v = 30 m/s. Then t = 2s/(u + v) = 200/40 = 5 s, and a = (v − u)/t = 20/5 = 4 m/s².",
      ],
    },
    faqs: [
      { q: "Which SUVAT equation do I use?", a: "Use the one that does not contain the quantity you don't know and don't need. Missing s? Use v = u + at. Missing v? Use s = ut + ½at². Missing t? Use v² = u² + 2as. Missing a? Use s = (u + v)t/2. Missing u? Use s = vt − ½at². This solver picks for you." },
      { q: "Why do I need exactly three values?", a: "SUVAT has five quantities and two independent equations link them, so three knowns determine the other two. With only two knowns the answer is not unique; with four, the values may contradict each other — the solver will tell you if they do." },
      { q: "What if my answer has a negative time?", a: "A negative time is not a physical solution for a motion starting at t = 0. It usually means the three values you entered cannot happen together under constant acceleration — check the signs, especially that deceleration is negative." },
    ],
    conversionNote: "Velocities can be entered in km/h — the tool converts to m/s (divide by 3.6) before solving.",
    relatedGuide: { slug: "constant-acceleration-equations", title: "Constant-acceleration (SUVAT) equations guide" },
  },
  "momentum": {
    title: "Momentum Calculator — p = mv and Impulse",
    description: "Calculate momentum (p = mv) for any mass and velocity, with impulse J = FΔt, recoil, and GCSE worked examples — a 0.5 kg ball, a car and a firing gun.",
    workedExample: {
      title: "Worked example — ball, impulse and recoil",
      steps: [
        "A 0.5 kg ball moves at 12 m/s. p = mv = 0.5 × 12 = 6 kg·m/s.",
        "A 30 N force acts on it for 0.2 s. Impulse J = FΔt = 30 × 0.2 = 6 N·s, so the momentum changes by 6 kg·m/s and Δv = 6 / 0.5 = 12 m/s.",
        "Recoil: a 4 kg gun fires a 0.01 kg bullet at 400 m/s. The bullet's momentum is 0.01 × 400 = 4 kg·m/s, so the gun recoils at 4 / 4 = 1 m/s in the opposite direction.",
      ],
    },
    faqs: [
      { q: "Is momentum a vector?", a: "Yes. Momentum has direction: p = mv is positive in the direction of motion and negative the other way. In collision questions, choose one direction as positive and keep the signs consistent, or the conservation equation will be wrong." },
      { q: "What is the difference between momentum and kinetic energy?", a: "Momentum (mv) is a vector and is always conserved in an isolated system. Kinetic energy (½mv²) is a scalar and is only conserved in elastic collisions. A collision can conserve momentum while losing kinetic energy as heat and sound." },
      { q: "What are the units of momentum?", a: "kg·m/s, which is the same as N·s. Impulse (FΔt) is also measured in N·s, because impulse is the change in momentum: J = Δp." },
    ],
    relatedGuide: { slug: "momentum-impulse", title: "Momentum and impulse guide" },
  },
  "collision-momentum": {
    title: "Collision Momentum Calculator — Before and After",
    description: "Calculate total momentum before a collision (p = m₁u₁ + m₂u₂) and the shared velocity after a perfectly inelastic collision, with energy lost worked out.",
    workedExample: {
      title: "Worked example — two trolleys stick together",
      steps: [
        "A 2 kg trolley at 3 m/s hits a 3 kg trolley at rest. Total momentum before = 2 × 3 + 3 × 0 = 6 kg·m/s.",
        "They stick together, so total mass is 5 kg. Shared velocity v = 6 / 5 = 1.2 m/s.",
        "Kinetic energy before = ½ × 2 × 3² = 9 J. After = ½ × 5 × 1.2² = 3.6 J. So 5.4 J was lost as heat and sound — momentum is conserved, kinetic energy is not.",
        "Elastic case: two equal 2 kg masses, one moving at 4 m/s, one at rest. They swap velocities — the first stops and the second moves off at 4 m/s. Momentum (8 kg·m/s) and kinetic energy (16 J) are both conserved.",
      ],
    },
    faqs: [
      { q: "What is a perfectly inelastic collision?", a: "One where the objects stick together and move off with a single shared velocity. Momentum is conserved, but kinetic energy is at its maximum loss for that collision. Car crashes and coupling train carriages are close to perfectly inelastic." },
      { q: "How do I know if a collision is elastic?", a: "Check kinetic energy: if total KE after equals total KE before, it is elastic. In practice, almost no everyday collision is perfectly elastic — a little energy always becomes heat, sound or deformation. Ideal elastic collisions are a model, useful for gas molecules and some atomic collisions." },
      { q: "What if the objects move towards each other?", a: "Give one of them a negative velocity. A 2 kg mass at +3 m/s hitting a 3 kg mass at −2 m/s has total momentum 2×3 + 3×(−2) = 0 kg·m/s. If they stick, they stop dead — all 9 J + 6 J = 15 J of kinetic energy is lost." },
    ],
    relatedGuide: { slug: "elastic-inelastic-collisions", title: "Elastic and inelastic collisions guide" },
  },
  "pressure": {
    title: "Pressure Calculator — Force Over Area (P = F/A)",
    description: "Calculate pressure (P = F/A), solve for pressure, force or area, and avoid the classic cm² trap — 50 N on 25 cm² is 20,000 Pa, not 2 Pa, plus hydraulics.",
    workedExample: {
      title: "Worked example — the cm² trap",
      steps: [
        "A 50 N force acts on an area of 25 cm². First convert: 25 cm² = 25 × 0.0001 m² = 0.0025 m².",
        "P = F / A = 50 / 0.0025 = 20,000 Pa (20 kPa).",
        "The trap: dividing 50 by 25 gives 2 — wrong by a factor of 10,000, because cm² were never converted to m².",
        "Standing pressure: a 70 kg person weighs 70 × 9.81 = 686.7 N. Standing on two feet with total area 0.04 m², the pressure is 686.7 / 0.04 = 17,168 Pa ≈ 17.2 kPa. On one foot the area halves and the pressure doubles.",
      ],
    },
    faqs: [
      { q: "Why is 50 N on 25 cm² equal to 20,000 Pa and not 2 Pa?", a: "Because pressure needs area in square metres. 1 cm² = 0.0001 m², so 25 cm² = 0.0025 m², and 50 / 0.0025 = 20,000 Pa. Dividing newtons by a number of cm² directly gives a meaningless number — always convert cm² to m² first." },
      { q: "Why do sharp knives and stilettos exert more pressure?", a: "Pressure is force divided by area. The same force on a smaller area gives a bigger pressure. A stiletto heel has an area of about 1 cm², so a 60 kg person (589 N) exerts about 589 / 0.0001 = 5,890,000 Pa — nearly 6 MPa — which is why it dents floors." },
      { q: "What is the difference between Pa and kPa?", a: "1 kPa = 1000 Pa. Atmospheric pressure is about 101 kPa (101,325 Pa). Car tyres are around 200–250 kPa. Use kPa for everyday pressures and Pa when the numbers are small." },
    ],
    conversionNote: "1 cm² = 0.0001 m² and 1 kPa = 1000 Pa. Enter area in cm² and the tool converts it first.",
  },
  "free-fall-time": {
    title: "Free Fall Time Calculator — Drop Height to Time",
    description: "Calculate free-fall time from a drop height (t = √(2h/g)) and impact speed (v = gt), with Earth, Moon and Mars gravity and the height–time table, with examples.",
    workedExample: {
      title: "Worked example — dropped from 20 m",
      steps: [
        "Drop a ball from rest from 20 m on Earth (g = 9.81 m/s²).",
        "Time to fall: t = √(2h/g) = √(40/9.81) = √4.077 = 2.02 s.",
        "Impact speed: v = gt = 9.81 × 2.02 = 19.8 m/s (about 71 km/h).",
        "Check with energy: v = √(2gh) = √(2 × 9.81 × 20) = √392.4 = 19.8 m/s. The two routes agree.",
        "On the Moon (g = 1.62 m/s²) the same drop takes √(40/1.62) = 4.97 s and the impact speed is only 8.05 m/s.",
      ],
    },
    faqs: [
      { q: "Does mass affect how fast something falls?", a: "No — in a vacuum, a feather and a hammer fall together, as the Apollo 15 astronauts showed on the Moon. In air, drag matters: a light, wide object is slowed much more than a dense one. This calculator ignores air resistance." },
      { q: "Why is the time proportional to the square root of height?", a: "Because distance grows with t² (s = ½gt²). Falling four times as far takes only twice as long: from 5 m takes 1.01 s, from 20 m takes 2.02 s. Doubling the height multiplies the time by √2 ≈ 1.41, not by 2." },
      { q: "What if the object is thrown downwards, not dropped?", a: "Then it has an initial velocity u and t = (−u + √(u² + 2gh))/g. A ball thrown down at 5 m/s from 20 m hits the ground in (−5 + √(25 + 392.4))/9.81 = (−5 + 20.43)/9.81 = 1.57 s, faster than the 2.02 s drop." },
    ],
    conversionNote: "g = 9.81 m/s² on Earth, 1.62 on the Moon, 3.71 on Mars. Multiply m/s by 3.6 for km/h.",
    relatedGuide: { slug: "kinematics-basics", title: "Kinematics guide" },
  },
  "free-fall-distance": {
    title: "Free Fall Distance Calculator — How Far It Falls",
    description: "Calculate how far an object falls in a given time (s = ut + ½gt²) — free-fall distance on Earth, the Moon and Mars, with the 1 s / 2 s / 3 s pattern explained.",
    workedExample: {
      title: "Worked example — how far in 3 seconds?",
      steps: [
        "Drop an object from rest (u = 0) and wait 3 s. s = ut + ½gt² = 0 + ½ × 9.81 × 9 = 44.1 m.",
        "After 1 s it has fallen ½ × 9.81 × 1 = 4.9 m; after 2 s, ½ × 9.81 × 4 = 19.6 m; after 3 s, 44.1 m. The distances go 1 : 4 : 9 — the square of the time.",
        "On the Moon (g = 1.62 m/s²) in 3 s it falls only ½ × 1.62 × 9 = 7.29 m, and hits at v = 1.62 × 3 = 4.86 m/s.",
        "Thrown downwards at 5 m/s: in 3 s, s = 5 × 3 + 44.1 = 59.1 m.",
      ],
    },
    faqs: [
      { q: "Why does the distance go 1 : 4 : 9?", a: "Because s = ½gt² with u = 0, distance is proportional to time squared. After 1, 2 and 3 seconds the distances are 4.9 m, 19.6 m and 44.1 m — each is 4.9 × t². This is a favourite exam pattern." },
      { q: "What is g, exactly?", a: "g is the acceleration due to gravity near Earth's surface, 9.81 m/s² (often rounded to 10 m/s² in GCSE questions — check what your paper uses). It varies slightly with latitude and altitude, and is 1.62 m/s² on the Moon and 3.71 m/s² on Mars." },
      { q: "Does air resistance change the answer?", a: "Yes, for light or fast objects. A falling skydiver reaches terminal velocity around 55 m/s and then stops accelerating, so s = ½gt² overestimates the distance. For dense objects falling short distances, air resistance is small enough to ignore." },
    ],
    conversionNote: "g = 9.81 m/s² on Earth, 1.62 on the Moon, 3.71 on Mars.",
    relatedGuide: { slug: "kinematics-basics", title: "Kinematics guide" },
  },
  "projectile-motion": {
    title: "Projectile Motion Calculator — Range and Height",
    description: "Calculate projectile range, maximum height and flight time from launch speed, angle and height, with the trajectory and the 45° maximum-range result explained.",
    workedExample: {
      title: "Worked example — 20 m/s at 30°",
      steps: [
        "Launch a ball at 20 m/s at 30° from level ground. Split the velocity: vx = 20 cos30° = 17.32 m/s, vy = 20 sin30° = 10 m/s.",
        "Flight time: the vertical motion returns to the ground after t = 2vy/g = 20/9.81 = 2.04 s.",
        "Range: R = vx × t = 17.32 × 2.04 = 35.3 m. (Equivalently R = u²sin(2θ)/g = 400 × 0.8660/9.81 = 35.3 m.)",
        "Maximum height: H = vy²/(2g) = 100/19.62 = 5.10 m, reached halfway through the flight at 1.02 s.",
        "At 45° the same launch goes furthest: R = 400 × 1/9.81 = 40.8 m.",
      ],
    },
    faqs: [
      { q: "What angle gives the maximum range?", a: "45° on level ground with no air resistance, because range is proportional to sin(2θ) and sin(90°) = 1. At 30° and 60° the range is the same (sin60° = sin120°). From a height, the best angle is slightly below 45°." },
      { q: "Why is the horizontal motion unaffected by gravity?", a: "Gravity acts vertically, so it changes only the vertical velocity. With no air resistance the horizontal velocity stays constant, which is why range is simply horizontal speed × flight time. This independence of horizontal and vertical motion is the key idea of projectile motion." },
      { q: "Does air resistance matter?", a: "For fast, light objects (a golf ball, a shuttlecock) yes — real ranges are shorter and the trajectory is asymmetric. For slow, dense objects over short distances the no-air-resistance model is a good approximation, and it is the model GCSE and A-Level use." },
    ],
    conversionNote: "Angles are in degrees. Multiply m/s by 3.6 for km/h; 20 m/s = 72 km/h.",
    relatedGuide: { slug: "projectile-motion-guide", title: "Projectile motion guide" },
  },
  "gravitational-potential-energy": {
    title: "Gravitational Potential Energy Calculator — GPE",
    description: "Calculate gravitational potential energy (GPE = mgh) and energy changes when mass is lifted or dropped, with a 2 kg / 5 m example and GPE to KE conversion.",
    workedExample: {
      title: "Worked example — lifting and dropping",
      steps: [
        "Lift a 2 kg mass through 5 m: ΔGPE = mgΔh = 2 × 9.81 × 5 = 98.1 J of work must be done.",
        "Drop it from 5 m: that 98.1 J becomes kinetic energy. Speed at the ground: v = √(2gh) = √98.1 = 9.90 m/s.",
        "A 70 kg person climbing 3 m gains 70 × 9.81 × 3 = 2060 J ≈ 2.06 kJ — about the energy in half a gram of sugar.",
        "GPE is relative: only the change in height matters. Choosing ground level or sea level as zero changes the numbers, not the physics.",
      ],
    },
    faqs: [
      { q: "Is GPE mgh always correct?", a: "Only near Earth's surface, where g is nearly constant. For satellites or the Moon's orbit you need GPE = −GMm/r, measured from infinity. For anything you lift in a classroom or exam, mgh is the right formula." },
      { q: "Can gravitational potential energy be negative?", a: "Yes, if you choose the zero point above the object — a book on the floor has negative GPE relative to a tabletop zero. Only differences in GPE have physical meaning, so pick a convenient zero and be consistent." },
      { q: "Where does the energy go when something falls?", a: "GPE is converted to kinetic energy as it falls (and then to heat and sound on impact). Ignoring air resistance, the kinetic energy on landing exactly equals the GPE lost: ½mv² = mgh." },
    ],
    relatedGuide: { slug: "conservation-energy", title: "Conservation of energy guide" },
  },
  "wave-speed": {
    title: "Wave Speed Calculator — v = fλ for Any Wave",
    description: "Calculate wave speed with v = fλ — frequency times wavelength — for sound, water and light waves, with a 256 Hz tuning-fork example and the spectrum explained.",
    workedExample: {
      title: "Worked example — tuning fork and light",
      steps: [
        "A tuning fork vibrates at 256 Hz and its sound wave has wavelength 1.32 m. v = fλ = 256 × 1.32 = 338 m/s — close to the speed of sound in air (about 340 m/s).",
        "A 440 Hz note in air: λ = v/f = 340/440 = 0.773 m.",
        "Light in a vacuum travels at c = 3 × 10⁸ m/s. Green light at f = 5 × 10¹⁴ Hz has λ = c/f = 3×10⁸ / 5×10¹⁴ = 6 × 10⁻⁷ m = 600 nm.",
        "If frequency doubles and speed stays the same, wavelength halves — v = fλ has to balance.",
      ],
    },
    faqs: [
      { q: "Does wave speed depend on frequency?", a: "In a given medium, no — v is fixed by the medium, so changing f changes λ instead. Sound travels at about 340 m/s in air whatever the note. In a dispersive medium like glass, different colours travel at slightly different speeds, which is how a prism splits light." },
      { q: "What is the difference between wave speed and particle speed?", a: "Wave speed is how fast the disturbance travels (340 m/s for sound). Particle speed is how fast the air molecules themselves jiggle back and forth — much slower, and it changes through the cycle. Confusing the two is a common exam error." },
      { q: "How do I use v = fλ for light?", a: "Use c = 3 × 10⁸ m/s for the speed. Then λ = c/f and f = c/λ. Radio waves (long λ, low f) and gamma rays (short λ, high f) are the same equation with different numbers." },
    ],
    conversionNote: "1 nm = 10⁻⁹ m. Sound in air ≈ 340 m/s; light in vacuum = 3 × 10⁸ m/s.",
    relatedGuide: { slug: "wave-properties", title: "Wave properties guide" },
  },
  "frequency": {
    title: "Frequency Calculator — Cycles, Period and Waves",
    description: "Calculate frequency from wave speed and wavelength (f = v/λ) or from counting cycles (f = N/t), with period T = 1/f and a 240 Hz example, with sound examples.",
    workedExample: {
      title: "Worked example — counting cycles",
      steps: [
        "Count 120 complete cycles in 0.5 s: f = N/t = 120/0.5 = 240 Hz.",
        "The period is T = 1/f = 1/240 = 0.00417 s (4.17 ms) per cycle.",
        "From wavelength: a sound wave at 340 m/s with λ = 0.85 m has f = v/λ = 340/0.85 = 400 Hz.",
        "Human hearing spans about 20 Hz to 20,000 Hz. Below 20 Hz is infrasound; above 20,000 Hz is ultrasound.",
      ],
    },
    faqs: [
      { q: "What is the difference between frequency and period?", a: "Frequency is cycles per second (Hz); period is seconds per cycle. They are reciprocals: f = 1/T and T = 1/f. A 50 Hz mains hum has a period of 1/50 = 0.02 s." },
      { q: "If I double the frequency, what happens to the wavelength?", a: "It halves — if the wave speed stays the same. From v = fλ, doubling f with v fixed forces λ to halve. This is why high notes have short wavelengths." },
      { q: "Can frequency change when a wave enters a new medium?", a: "No — frequency is set by the source and stays the same when a wave refracts. What changes is the wavelength (and speed). A sound wave entering water keeps its frequency but its wavelength grows, because sound is faster in water." },
    ],
    conversionNote: "1 kHz = 1000 Hz. 1 ms = 0.001 s.",
    relatedGuide: { slug: "wave-properties", title: "Wave properties guide" },
  },
  "centripetal-force": {
    title: "Centripetal Force Calculator — Fc = mv²/r",
    description: "Calculate centripetal force (Fc = mv²/r) for cornering cars, spinning masses and orbits, with a 24 N worked example, g-force and maximum cornering speed.",
    workedExample: {
      title: "Worked example — spinning mass and a cornering car",
      steps: [
        "A 0.8 kg mass whirls at 6 m/s on a 1.2 m string. Fc = mv²/r = 0.8 × 36/1.2 = 24 N — that is the tension in the string.",
        "Its centripetal acceleration is a = v²/r = 36/1.2 = 30 m/s², which is 30/9.81 = 3.06 g.",
        "A 1200 kg car corners at 20 m/s on a bend of radius 80 m. Fc = 1200 × 400/80 = 6000 N, supplied by friction between the tyres and the road.",
        "Maximum cornering speed with μ = 0.7 on a 50 m bend: v = √(μgr) = √(0.7 × 9.81 × 50) = √343.35 = 18.5 m/s = 66.7 km/h. Faster than that, friction cannot supply the centripetal force and the car slides.",
      ],
    },
    faqs: [
      { q: "What provides the centripetal force?", a: "Something physical: tension in a string, friction for a cornering car, gravity for an orbiting satellite, or the normal force on a banked track. Centripetal force is not a new kind of force — it is the name for whatever net force points towards the centre." },
      { q: "Is there a centrifugal force?", a: "Not in an inertial frame. In the rotating frame it feels as if something pushes you outwards, but in the laboratory frame the only horizontal force is the inward one (friction, tension). 'Centrifugal force' is a fictitious force that appears when you analyse motion from inside the rotating system." },
      { q: "What happens if the speed doubles?", a: "The centripetal force quadruples, because Fc = mv²/r depends on v². This is why doubling your speed around a bend needs four times the friction — and why bends are so dangerous at speed." },
    ],
    conversionNote: "1 g = 9.81 m/s². Multiply m/s by 3.6 for km/h.",
    relatedGuide: { slug: "circular-motion", title: "Uniform circular motion guide" },
  },
  "kinetic-energy": {
    title: "Kinetic Energy Calculator — KE = ½mv²",
    description: "Calculate kinetic energy (KE = ½mv²) for cars, cricket balls and falling objects, with the speed-doubling rule — four times the energy — and momentum compared.",
    workedExample: {
      title: "Worked example — car, cricket ball and doubling speed",
      steps: [
        "A 2 kg object at 3 m/s: KE = ½ × 2 × 9 = 9 J.",
        "A cricket ball (0.16 kg) bowled at 30 m/s: KE = ½ × 0.16 × 900 = 72 J.",
        "A 1000 kg car at 20 m/s: KE = ½ × 1000 × 400 = 200,000 J (200 kJ).",
        "At 40 m/s the same car has KE = ½ × 1000 × 1600 = 800,000 J — four times as much, because KE depends on v². This is why stopping distances roughly quadruple when speed doubles.",
      ],
    },
    faqs: [
      { q: "Why does kinetic energy depend on v² and not v?", a: "Because work = force × distance, and a faster object travels further while the same force stops it. Stopping a car from 40 m/s takes four times the distance (and four times the energy) of stopping from 20 m/s — which is why speed limits matter so much." },
      { q: "Can kinetic energy be negative?", a: "No. KE = ½mv² is always positive (or zero) because v is squared — direction does not matter. A car moving at −20 m/s has the same kinetic energy as one moving at +20 m/s, but opposite momentum." },
      { q: "How is kinetic energy different from momentum?", a: "Momentum (mv) is a vector and is conserved in all collisions; kinetic energy (½mv²) is a scalar and is only conserved in elastic collisions. If a question asks about a crash, use momentum; if it asks about stopping distance or braking, use energy." },
    ],
    conversionNote: "Convert km/h to m/s first (divide by 3.6): 72 km/h = 20 m/s. 1 kJ = 1000 J.",
    relatedGuide: { slug: "work-energy-theorem", title: "Work-energy theorem guide" },
  },
  "velocity": {
    title: "Velocity Calculator — Displacement Over Time",
    description: "Calculate velocity from displacement and time (v = Δx / t), with the sign that gives direction — the straight-line average velocity of a car or a runner.",
    workedExample: {
      title: "Worked example — a car covers 240 m in 12 s",
      steps: [
        "A car travels 240 m in a straight line in 12 s. Displacement Δx = 240 m and time t = 12 s.",
        "v = Δx / t = 240 / 12 = 20 m/s.",
        "Check: 20 m/s × 3.6 = 72 km/h — a sensible speed for a car on an open road.",
        "This page gives average velocity over the whole interval: it does not tell you the speed at any single instant. For the same formula framed around elapsed time and return journeys, see the average-velocity calculator (average-velocity).",
        "Direction matters: 240 m travelled west in 12 s gives v = −20 m/s if east is positive.",
      ],
    },
    faqs: [
      { q: "What is the difference between velocity and speed?", a: "Velocity is displacement divided by time, so it has a direction and can be negative; speed is distance divided by time and is always positive. A car doing 20 m/s west has velocity −20 m/s (if east is positive) but speed 20 m/s." },
      { q: "Is this the same as instantaneous velocity?", a: "No. This calculator gives the average velocity over the interval — total displacement divided by total time. Instantaneous velocity is the velocity at one moment, read from the gradient of a tangent on a displacement–time graph." },
      { q: "Why is my velocity negative?", a: "Because the displacement is in the negative direction you chose. A negative answer is valid physics, not an error — it means the object ended up on the negative side of its starting point." },
    ],
    conversionNote: "1 m/s = 3.6 km/h. Divide km/h by 3.6 before using v = Δx / t.",
    relatedGuide: { slug: "kinematics-basics", title: "Kinematics: position, velocity and acceleration" },
  },
  "average-velocity": {
    title: "Average Velocity Calculator — Displacement / Time",
    description: "Calculate average velocity from total displacement and elapsed time (v̄ = Δx / Δt) — the quantity that is zero on a return journey even when the speed is not.",
    workedExample: {
      title: "Worked example — a cyclist rides out and back",
      steps: [
        "A cyclist rides 240 m east in 12 s, then turns around and rides 240 m west in 12 s.",
        "Total displacement: 240 − 240 = 0 m, because the cyclist finishes where they started.",
        "Average velocity v̄ = Δx / Δt = 0 / 24 = 0 m/s.",
        "Average speed is different: total distance 480 m divided by 24 s = 20 m/s. Speed uses the path length; velocity uses the displacement.",
        "This page uses the same equation as the velocity calculator (velocity), but it is framed for elapsed time and journeys with a change of direction — use velocity for a single straight leg, and this page when the trip turns back.",
      ],
    },
    faqs: [
      { q: "Why is the average velocity zero if the cyclist was moving all the time?", a: "Because velocity depends on displacement, not distance. The cyclist's position at the end is the same as at the start, so the net displacement is zero and 0 / 24 = 0 m/s — even though the average speed was 20 m/s." },
      { q: "When is average velocity equal to average speed?", a: "Only when the motion is in a straight line in one direction, with no turning back. As soon as the object reverses, the distance keeps growing while the displacement shrinks, and the two answers separate." },
      { q: "Can average velocity be larger than the instantaneous velocity?", a: "Yes, if the object was faster on average than at the instant you pick — for example, a car that speeds up then slows down. Average velocity is a summary of the whole interval, not a snapshot." },
    ],
    conversionNote: "1 m/s = 3.6 km/h. Times in minutes must be multiplied by 60 to give seconds.",
    relatedGuide: { slug: "kinematics-basics", title: "Kinematics: position, velocity and acceleration" },
  },
  "acceleration": {
    title: "Acceleration Calculator — Change in Velocity / Time",
    description: "Calculate acceleration from the change in velocity over time (a = (v − u) / t) — speeding up, braking, and the sign convention that trips up most students.",
    workedExample: {
      title: "Worked example — speeding up and braking",
      steps: [
        "A car goes from 12 m/s to 28 m/s in 4 s. The change in velocity is Δv = 28 − 12 = 16 m/s.",
        "a = Δv / t = 16 / 4 = 4 m/s².",
        "Braking: the same car at 20 m/s stops in 5 s. a = (0 − 20) / 5 = −20 / 5 = −4 m/s².",
        "Check: a negative acceleration with a positive velocity means slowing down. The stopping distance is (20 + 0) × 5 / 2 = 50 m.",
        "This is average acceleration over the interval. If the acceleration itself changes during the motion, use a velocity–time graph instead.",
      ],
    },
    faqs: [
      { q: "Does negative acceleration always mean slowing down?", a: "No — it means acceleration in the negative direction. An object moving at −10 m/s with acceleration −4 m/s² is speeding up in the negative direction. Slowing down happens only when acceleration and velocity have opposite signs." },
      { q: "What are the units of acceleration?", a: "m/s² — metres per second, per second. A car accelerating at 4 m/s² gains 4 m/s of velocity every second. Dividing a velocity in km/h by a time in seconds without converting gives a meaningless number." },
      { q: "When does a = (v − u) / t not apply?", a: "It always gives the average acceleration, but it only equals the acceleration at every instant when the acceleration is constant. For a rocket burning fuel or a skydiver approaching terminal velocity, the acceleration changes and this formula gives only the average." },
    ],
    conversionNote: "Convert km/h to m/s first (divide by 3.6): 72 km/h = 20 m/s.",
    relatedGuide: { slug: "kinematics-basics", title: "Kinematics: position, velocity and acceleration" },
  },
  "initial-velocity": {
    title: "Initial Velocity Calculator — u = v − at",
    description: "Calculate initial velocity from final velocity, acceleration and time (u = v − at) — work backwards from where an object ends up to how fast it started.",
    workedExample: {
      title: "Worked example — working backwards from 24 m/s",
      steps: [
        "A car accelerates at 3 m/s² for 4 s and reaches 24 m/s. What was it doing at the start?",
        "u = v − at = 24 − 3 × 4 = 24 − 12 = 12 m/s.",
        "Check forwards with the sibling page: the final-velocity calculator (final-velocity) gives v = u + at = 12 + 12 = 24 m/s. The two agree.",
        "Braking example: a car stops (v = 0) after braking at −5 m/s² for 4 s. u = 0 − (−5) × 4 = 0 + 20 = 20 m/s.",
        "This page solves for u; the final-velocity page solves for v, and the SUVAT solver (suvat) solves any two unknowns from any three knowns.",
      ],
    },
    faqs: [
      { q: "Why is u sometimes larger than v?", a: "When the object is slowing down. Braking makes acceleration negative, so u = v − at gives a larger number than v — the car was going faster before it braked, which is exactly what you expect." },
      { q: "What if the answer is negative?", a: "It means the object was initially moving in the negative direction. Check your sign convention: if the final velocity is positive and the acceleration is positive, a negative u would mean the object started by moving backwards and then turned around." },
      { q: "Can I use this if acceleration is not constant?", a: "No. u = v − at is a rearrangement of v = u + at, which assumes constant acceleration. If the acceleration changes, the average acceleration gives only an approximate u." },
    ],
    conversionNote: "1 m/s = 3.6 km/h. Divide km/h by 3.6 before using u = v − at.",
    relatedGuide: { slug: "constant-acceleration-equations", title: "Constant-acceleration equations explained" },
  },
  "displacement": {
    title: "Displacement Calculator — (u + v)t / 2",
    description: "Calculate displacement under constant acceleration (Δx = (u + v)t / 2) — the straight-line change in position, rather than the total distance travelled.",
    workedExample: {
      title: "Worked example — a car accelerating from 12 to 28 m/s",
      steps: [
        "A car accelerates steadily from 12 m/s to 28 m/s in 4 s.",
        "Δx = (u + v)t / 2 = (12 + 28) × 4 / 2 = 40 × 4 / 2 = 80 m.",
        "Check with s = ut + ½at²: acceleration a = (28 − 12) / 4 = 4 m/s², so s = 12 × 4 + ½ × 4 × 16 = 48 + 32 = 80 m. The two routes agree.",
        "This page gives displacement — the straight-line change in position. If the car had turned around, the distance travelled would be larger; use the distance-travelled calculator (distance-travelled) for total path length.",
        "For a motion where you know three of s, u, v, a and t and want the other two, use the SUVAT solver (suvat).",
      ],
    },
    faqs: [
      { q: "What is the difference between displacement and distance?", a: "Displacement is the straight-line change in position, with a direction; distance is the total path length, always positive. On a return journey the displacement can be zero while the distance is large." },
      { q: "Why does (u + v) / 2 give the average velocity?", a: "Because with constant acceleration the velocity changes steadily, so its average is exactly halfway between the starting and ending values. Multiply that average velocity by the time and you get the displacement." },
      { q: "Can displacement be negative?", a: "Yes — it means the final position is in the negative direction from the start. That is a valid answer, but if the question describes an object moving forwards and stopping, a negative displacement usually means a sign error, often in the acceleration." },
    ],
    conversionNote: "Velocities in km/h must be divided by 3.6 to give m/s before substituting.",
    relatedGuide: { slug: "constant-acceleration-equations", title: "Constant-acceleration equations explained" },
  },
  "distance-travelled": {
    title: "Distance Travelled Calculator — Speed × Time",
    description: "Calculate distance travelled at constant speed (d = speed × time) — total path length in metres, for a steady run, drive or flight with no turns or stops.",
    workedExample: {
      title: "Worked example — a car at 25 m/s for 40 s",
      steps: [
        "A car travels at a steady 25 m/s for 40 s.",
        "d = speed × time = 25 × 40 = 1000 m = 1 km.",
        "Check: 25 m/s × 3.6 = 90 km/h, and 90 km/h for 40 s is 90,000 / 3600 × 40 = 1000 m. It agrees.",
        "At 72 km/h (20 m/s) for 3 minutes (180 s): d = 20 × 180 = 3600 m.",
        "This page gives total path length, a scalar with no direction. For the straight-line change in position under changing speed, use the displacement calculator (displacement) instead.",
      ],
    },
    faqs: [
      { q: "What is the difference between distance and displacement?", a: "Distance is the total length of the path travelled and is always positive. Displacement is the straight-line change in position and can be zero on a return journey. This page calculates distance only." },
      { q: "What if the speed changes during the journey?", a: "Then d = speed × time does not apply directly — you need the average speed over the whole journey, or the area under a speed–time graph. This calculator assumes one constant speed." },
      { q: "Do I need to convert km/h to m/s?", a: "Yes, if you want the answer in metres. Divide km/h by 3.6 first: 90 km/h = 25 m/s. Or keep km/h and use hours for time, which gives the distance in kilometres." },
    ],
    conversionNote: "1 m/s = 3.6 km/h. 1 minute = 60 s; multiply minutes by 60 before multiplying by speed in m/s.",
    relatedGuide: { slug: "kinematics-basics", title: "Kinematics: position, velocity and acceleration" },
  },
  "newtons-second-law": {
    title: "Newton's Second Law Calculator — F = ma",
    description: "Calculate force from mass and acceleration (F = ma) — the net force needed to accelerate a trolley, a car or a rocket, with the direction built into the answer.",
    workedExample: {
      title: "Worked example — a 5 kg trolley and a 1200 kg car",
      steps: [
        "A 5 kg trolley accelerates at 4 m/s². F = ma = 5 × 4 = 20 N in the direction of the acceleration.",
        "A 1200 kg car needs 6000 N to accelerate at 5 m/s²: F = 1200 × 5 = 6000 N.",
        "Rearranged, a = F / m: a 20 N push on a 5 kg trolley gives a = 20 / 5 = 4 m/s², matching the first line.",
        "F here is the net force — the sum of all forces acting. The net-force calculator (net-force) frames the same equation as the resultant of several forces, for example engine thrust minus drag.",
      ],
    },
    faqs: [
      { q: "Is F in F = ma the applied force or the net force?", a: "The net force — the vector sum of every force on the object. A 3000 N engine push opposed by 1000 N of drag gives a net force of 2000 N, so a 800 kg car accelerates at 2000 / 800 = 2.5 m/s², not 3000 / 800." },
      { q: "What is the difference between mass and weight?", a: "Mass (kg) is how much matter an object has and never changes; weight (N) is the force of gravity on it, W = mg, and changes with g. F = ma uses mass, never weight." },
      { q: "What happens if the net force is zero?", a: "The acceleration is zero, so the velocity stays constant — the object either stays at rest or moves in a straight line at a steady speed. That is Newton's first law, and it is also what F = ma says when F = 0." },
    ],
    conversionNote: "1 N = 1 kg·m/s². Mass must be in kilograms, not grams: divide grams by 1000.",
    relatedGuide: { slug: "newtons-laws", title: "Newton’s three laws of motion" },
  },
  "net-force": {
    title: "Net Force Calculator — Resultant Force F = ma",
    description: "Calculate the net (resultant) force on an object (Fnet = ma) — add up thrust, friction and drag first, then find the acceleration they actually produce.",
    workedExample: {
      title: "Worked example — engine thrust minus drag",
      steps: [
        "A 800 kg car has an engine thrust of 3000 N forwards and 1000 N of drag backwards.",
        "Net force = 3000 − 1000 = 2000 N forwards.",
        "Acceleration a = Fnet / m = 2000 / 800 = 2.5 m/s².",
        "Check with the sibling page: Newton's second law calculator (newtons-second-law) gives F = ma = 800 × 2.5 = 2000 N — the same net force. This page starts from the forces; that page starts from mass and acceleration.",
        "If the drag grew to 3000 N, the net force would be zero and the car would cruise at a constant speed — that is terminal velocity for a car.",
      ],
    },
    faqs: [
      { q: "How do I add forces that point in different directions?", a: "Choose one direction as positive and give forces in the opposite direction a minus sign, then add. Forces at angles need resolving into components first — a free-body diagram keeps the signs straight." },
      { q: "Can the net force be zero while forces are acting?", a: "Yes — whenever the forces balance. A book resting on a table has gravity pulling down and the normal force pushing up; they cancel, the net force is zero, and the book stays put." },
      { q: "What if I get a negative net force?", a: "It means the resultant points in the negative direction you chose. A car braking has a negative net force if forwards is positive — the force is acting backwards, which is correct." },
    ],
    conversionNote: "Forces must all be in newtons. 1 kN = 1000 N.",
    relatedGuide: { slug: "free-body-diagrams", title: "How to draw a free-body diagram" },
  },
  "friction-force": {
    title: "Friction Force Calculator — F = μN",
    description: "Calculate the friction force from the coefficient of friction and the normal force (Ff = μN) — static friction and the kinetic friction opposing sliding.",
    workedExample: {
      title: "Worked example — a crate on a floor",
      steps: [
        "A crate presses on the floor with a normal force N = 500 N. The coefficient of static friction is μ = 0.4.",
        "Maximum static friction Ff = μN = 0.4 × 500 = 200 N. Any push below 200 N will not move the crate at all.",
        "Once sliding, the kinetic coefficient μk = 0.3 applies: Ff = 0.3 × 500 = 150 N opposing the motion.",
        "Check: kinetic friction (150 N) is smaller than maximum static friction (200 N), as it should be — that is why it is harder to start a crate moving than to keep it moving.",
        "Note: this calculator gives the friction limit μN. Actual static friction adjusts to match the push, up to that maximum — a 50 N push on this crate meets only 50 N of static friction.",
      ],
    },
    faqs: [
      { q: "What is the difference between static and kinetic friction?", a: "Static friction acts when surfaces are not sliding and can take any value up to μsN; kinetic friction acts while sliding and is usually smaller, μkN. That is why starting to push a heavy box is the hard part." },
      { q: "Can the coefficient of friction be bigger than 1?", a: "Yes. μ is a ratio of two forces, not a percentage, so it has no units and no upper limit of 1. Rubber on asphalt can reach μ ≈ 0.9, and some racing tyres exceed 1." },
      { q: "Which way does friction act?", a: "Opposite to the relative motion (or the attempted motion). For a car accelerating forwards, friction on the driven wheels acts forwards — it is the force that pushes the car along — while air drag acts backwards." },
    ],
    conversionNote: "μ has no units. N must be in newtons: on a flat surface N = mg, so a 50 kg crate has N = 50 × 9.81 = 490.5 N.",
    relatedGuide: { slug: "friction-static-kinetic", title: "Static and kinetic friction" },
  },
  "normal-force": {
    title: "Normal Force Calculator — N = mg cos θ",
    description: "Calculate the normal force on a flat surface or an incline (N = mg cos θ) — the perpendicular push a surface exerts on an object, which sets its friction limit.",
    workedExample: {
      title: "Worked example — a 10 kg block on a 30° slope",
      steps: [
        "A 10 kg block sits on a slope of 30°. Its weight is mg = 10 × 9.81 = 98.1 N.",
        "N = mg cos θ = 98.1 × cos 30° = 98.1 × 0.8660 = 84.9 N.",
        "On flat ground (θ = 0°), cos 0° = 1, so N = 98.1 N — the full weight.",
        "Check: the component of weight down the slope is mg sin θ = 98.1 × 0.5 = 49.05 N (see the inclined-plane calculator, inclined-plane). The two components satisfy (mg sin θ)² + N² = (mg)²: 49.05² + 84.9² = 2406 + 7208 = 9614 ≈ 98.1² = 9624 (rounding).",
        "Steeper slope, smaller normal force: at 60°, N = 98.1 × 0.5 = 49.05 N, so friction — which depends on N — also drops.",
      ],
    },
    faqs: [
      { q: "Is the normal force always equal to the weight?", a: "Only on a horizontal surface with no other vertical forces. On a slope it is mg cos θ, which is less than mg; if someone pushes down on the object, N grows; if a force lifts it, N shrinks." },
      { q: "Which way does the normal force point?", a: "Perpendicular to the surface, away from it — that is what “normal” means in physics. On a slope it points at right angles to the slope, not straight up." },
      { q: "Why do I need the normal force?", a: "Because friction depends on it: Ff = μN. Getting N wrong means getting friction wrong. On a slope, using mg instead of mg cos θ overestimates the friction." },
    ],
    conversionNote: "Angles are in degrees. 1 N = 1 kg·m/s²; mass must be in kilograms.",
    relatedGuide: { slug: "free-body-diagrams", title: "How to draw a free-body diagram" },
  },
  "tension-force": {
    title: "Tension Force Calculator — T = m(g + a)",
    description: "Calculate the tension in a rope or cable lifting a mass (T = m(g + a)) — heavier when accelerating up, lighter when accelerating down, zero in free fall.",
    workedExample: {
      title: "Worked example — a 5 kg mass on a lift cable",
      steps: [
        "A 5 kg mass hangs from a cable. At rest (a = 0): T = m(g + a) = 5 × (9.81 + 0) = 49.05 N — exactly its weight.",
        "Accelerating upwards at 2 m/s²: T = 5 × (9.81 + 2) = 5 × 11.81 = 59.05 N.",
        "Accelerating downwards at 2 m/s²: a = −2, so T = 5 × (9.81 − 2) = 5 × 7.81 = 39.05 N.",
        "Check: in free fall a = −g = −9.81 m/s², so T = 5 × (9.81 − 9.81) = 0 N — the cable goes slack, which is why you feel weightless.",
        "This page is for a single vertical rope. For a mass on a slope or two masses over a pulley, draw a free-body diagram and apply F = ma to each mass separately.",
      ],
    },
    faqs: [
      { q: "Why is tension bigger when the lift accelerates upwards?", a: "The rope must support the weight and also provide the upward acceleration: T − mg = ma, so T = m(g + a). Accelerating up at 2 m/s² adds 5 × 2 = 10 N to the 49.05 N weight." },
      { q: "What sign does a have when the lift goes down?", a: "Upward is positive in this calculator, so accelerating downwards means a is negative. Slowing down while descending is an upward acceleration, so a is positive — check the motion, not just the direction of travel." },
      { q: "Is the tension the same at both ends of the rope?", a: "For a light (massless) rope, yes — the tension is the same throughout. For a heavy rope or one accelerating sideways, the tension varies along its length." },
    ],
    conversionNote: "g = 9.81 m/s² on Earth. Mass in kilograms; a in m/s², positive upwards.",
    relatedGuide: { slug: "newtons-laws", title: "Newton’s three laws of motion" },
  },
  "inclined-plane": {
    title: "Inclined Plane Calculator — mg sin θ",
    description: "Calculate the component of an object's weight down a slope (F = mg sin θ) — the force that makes things slide, and the acceleration down a frictionless incline.",
    workedExample: {
      title: "Worked example — a 10 kg block on a 30° slope",
      steps: [
        "A 10 kg block sits on a 30° slope. Its weight is mg = 10 × 9.81 = 98.1 N.",
        "Component down the slope: F = mg sin θ = 98.1 × sin 30° = 98.1 × 0.5 = 49.05 N.",
        "On a frictionless slope the acceleration is a = g sin θ = 9.81 × 0.5 = 4.905 m/s² — the mass cancels out, so a 1 kg block slides down at the same rate.",
        "Check against the normal force: N = mg cos θ = 98.1 × 0.8660 = 84.9 N (see the normal-force calculator, normal-force). The components satisfy (mg sin θ)² + N² = (mg)².",
        "At 90° the slope is a vertical wall and sin 90° = 1, so the full weight acts downwards — free fall. At 0° the slope is flat and nothing pulls the block along.",
      ],
    },
    faqs: [
      { q: "Do I use sin or cos for the downhill component?", a: "Sin. The component parallel to the slope is mg sin θ, and the component perpendicular to the slope (the normal force) is mg cos θ. Mixing them up is the most common inclined-plane error — check with θ = 0°: on flat ground the downhill component must be zero, and sin 0° = 0." },
      { q: "Does the mass affect how fast it slides down?", a: "No, on a frictionless slope — a = g sin θ has no mass in it. With friction, the mass still cancels: a = g(sin θ − μ cos θ), so a heavy block and a light block slide together." },
      { q: "What if there is friction on the slope?", a: "Subtract it: net force down the slope = mg sin θ − μN = mg sin θ − μmg cos θ. If μ = 0.3 on this 30° slope, friction is 0.3 × 84.9 = 25.5 N, so the net force is 49.05 − 25.5 = 23.6 N down the slope." },
    ],
    conversionNote: "Angles are in degrees. Check sin vs cos with the flat-ground test: θ = 0° must give zero downhill force.",
    relatedGuide: { slug: "free-body-diagrams", title: "How to draw a free-body diagram" },
  },
  "weight-force": {
    title: "Weight Force Calculator — W = mg",
    description: "Calculate weight from mass and gravitational field strength (W = mg) — the force of gravity in newtons, on Earth, the Moon, Mars or any planet you visit.",
    workedExample: {
      title: "Worked example — a 70 kg person on Earth and the Moon",
      steps: [
        "A 70 kg person on Earth (g = 9.81 m/s²): W = mg = 70 × 9.81 = 686.7 N.",
        "The same person on the Moon (g = 1.62 m/s²): W = 70 × 1.62 = 113.4 N — about one sixth of their Earth weight.",
        "Check: 686.7 / 113.4 = 6.06, and 9.81 / 1.62 = 6.06. The ratio matches, because the mass is the same in both places.",
        "On Mars (g = 3.71 m/s²) the same person weighs 70 × 3.71 = 259.7 N.",
        "Only the weight changes — the mass stays 70 kg everywhere. Bathroom scales measure weight and convert it to a mass reading using Earth's g, which is why they read wrong on the Moon.",
      ],
    },
    faqs: [
      { q: "What is the difference between mass and weight?", a: "Mass (kg) is the amount of matter and never changes. Weight (N) is the force of gravity on that mass, W = mg, and changes with g. A 70 kg person weighs 686.7 N on Earth but 113.4 N on the Moon." },
      { q: "What value of g should I use?", a: "9.81 m/s² on Earth (often rounded to 10 m/s² in GCSE questions — check what your paper uses), 1.62 m/s² on the Moon, 3.71 m/s² on Mars, 24.79 m/s² on Jupiter." },
      { q: "Can weight be zero?", a: "Yes — in free fall or deep space, where there is no supporting force, you feel weightless even though gravity is still acting. Astronauts in orbit are in continuous free fall, not beyond gravity." },
    ],
    conversionNote: "g = 9.81 m/s² on Earth, 1.62 on the Moon, 3.71 on Mars. 1 N = 1 kg·m/s².",
    relatedGuide: { slug: "newtons-laws", title: "Newton’s three laws of motion" },
  },
  "drag-force": {
    title: "Drag Force Calculator — F = ½ρCdAv²",
    description: "Calculate quadratic drag in air or water (Fd = ½ρCdAv²) — the air or water resistance that grows with the square of the speed and sets terminal velocity.",
    workedExample: {
      title: "Worked example — drag on a 2 m² panel at 10 m/s",
      steps: [
        "Take Cd = 0.5, air density ρ = 1.2 kg/m³, area A = 2 m² and speed v = 10 m/s.",
        "Fd = ½ρCdAv² = 0.5 × 0.5 × 1.2 × 2 × 10² = 0.5 × 0.5 × 1.2 × 2 × 100.",
        "Working through: 0.5 × 0.5 = 0.25; 0.25 × 1.2 = 0.3; 0.3 × 2 = 0.6; 0.6 × 100 = 60 N.",
        "At 20 m/s the drag is 0.6 × 400 = 240 N — four times as much, because drag depends on v². Doubling speed quadruples drag.",
        "Check: at walking speed (1.5 m/s) the drag is only 0.6 × 2.25 = 1.35 N, which is why you barely notice air resistance on foot but a cyclist at 10 m/s feels 60 N on a 2 m² panel.",
      ],
    },
    faqs: [
      { q: "Why does drag depend on v²?", a: "Because a faster object hits more air per second and hits it harder — both effects scale with v, so the force scales with v × v. This quadratic law applies at everyday speeds; very slow, small objects in thick fluids follow a linear drag law instead." },
      { q: "What is the drag coefficient Cd?", a: "A shape factor: about 0.5 for a flat plate, 0.47 for a sphere, 0.04 for a streamlined teardrop. A smaller Cd means a sleeker shape. Cd also changes a little with speed and with the flow around the object." },
      { q: "How does drag set terminal velocity?", a: "A falling object accelerates until drag equals its weight; then the net force is zero and it stops speeding up. A skydiver in a spread-eagle position reaches about 55 m/s; tucked head-down, the smaller area gives a higher terminal velocity." },
    ],
    conversionNote: "Air density ρ ≈ 1.2 kg/m³ at sea level (1.225 kg/m³ standard). Water is about 1000 kg/m³.",
  },
  "work": {
    title: "Work Calculator — W = Fd in Joules",
    description: "Calculate the work done by a force acting along the line of displacement (W = Fd) — the energy transferred when a push actually moves something, in joules.",
    workedExample: {
      title: "Worked example — pushing a trolley 6 m",
      steps: [
        "A 50 N force pushes a trolley 6 m along the floor, parallel to the motion.",
        "W = Fd = 50 × 6 = 300 J.",
        "Check with energy: the trolley (5 kg) gains 300 J of kinetic energy, so its speed is v = √(2 × 300 / 5) = √120 = 10.95 m/s.",
        "If the force acted at an angle, only the component along the motion would count — use the work-at-an-angle calculator (work-at-an-angle), which uses W = Fd cos θ.",
        "No movement, no work: the same 50 N push against a wall that does not move does 0 J of work, however hard the pushing feels.",
      ],
    },
    faqs: [
      { q: "Can work be done if nothing moves?", a: "No. Work is force times displacement, so a displacement of zero means zero work — holding a heavy box still does no work on the box in physics, even though your muscles get tired." },
      { q: "What is a joule?", a: "One joule is the work done by a force of one newton moving through one metre: 1 J = 1 N·m. Lifting a 1 kg book 1 m takes about 9.81 J." },
      { q: "Can work be negative?", a: "Yes — when the force opposes the displacement, as friction does. Friction doing −200 J of work removes 200 J of kinetic energy, which is why braking distances depend on energy." },
    ],
    conversionNote: "1 kJ = 1000 J. Force in newtons, displacement in metres; an answer in N·cm is 100 times too big.",
    relatedGuide: { slug: "work-energy-theorem", title: "Work-energy theorem" },
  },
  "work-at-an-angle": {
    title: "Work at an Angle Calculator — W = Fd cos θ",
    description: "Calculate the work done by a force at an angle to the displacement (W = Fd cos θ) — only the component along the motion counts; the rest is wasted energy.",
    workedExample: {
      title: "Worked example — pulling at 60° over 8 m",
      steps: [
        "A 50 N force pulls a trolley 8 m, at 60° to the direction of motion.",
        "W = Fd cos θ = 50 × 8 × cos 60° = 50 × 8 × 0.5 = 200 J.",
        "Check: the component along the motion is 50 × cos 60° = 25 N, and 25 × 8 = 200 J. It agrees.",
        "Compare with a parallel pull: at 0°, cos 0° = 1, so W = 50 × 8 = 400 J — twice as much for the same force and distance.",
        "At 90° the work is zero (cos 90° = 0). This page generalises the work calculator (work), which assumes the force is parallel; use this page whenever the force is at an angle.",
      ],
    },
    faqs: [
      { q: "Why does only part of the force do work?", a: "Work is force times displacement in the direction of the force. The component across the motion moves nothing along the path, so it transfers no energy — only the along-the-motion component, F cos θ, counts." },
      { q: "What angle gives the most work?", a: "0° — force parallel to the displacement, cos θ = 1. At 180° (pushing backwards) cos θ = −1 and the work is negative: the force removes energy, like friction does." },
      { q: "What is the most common mistake here?", a: "Forgetting the cos θ factor and using W = Fd. With a 60° pull that doubles the answer (400 J instead of 200 J). Always check the angle before substituting." },
    ],
    conversionNote: "Angles are in degrees. cos 0° = 1, cos 60° = 0.5, cos 90° = 0, cos 180° = −1.",
    relatedGuide: { slug: "work-energy-theorem", title: "Work-energy theorem" },
  },
  "spring-potential-energy": {
    title: "Spring Potential Energy Calculator — ½kx²",
    description: "Calculate the elastic potential energy stored in a stretched or compressed spring (Us = ½kx²) — the stored energy a spring gives back when it is released.",
    workedExample: {
      title: "Worked example — a spring stretched 10 cm",
      steps: [
        "A spring has spring constant k = 200 N/m and is stretched x = 0.1 m from its natural length.",
        "Us = ½kx² = 0.5 × 200 × 0.1² = 0.5 × 200 × 0.01 = 1 J.",
        "Stretch it twice as far, x = 0.2 m: Us = 0.5 × 200 × 0.04 = 4 J — four times as much, because the energy depends on x².",
        "Check with force: the force at 0.1 m is F = kx = 200 × 0.1 = 20 N, and the average force over the stretch is half that, 10 N, so the work done is 10 × 0.1 = 1 J. It agrees.",
        "Released, that 1 J becomes kinetic energy: a 0.5 kg mass would reach v = √(2 × 1 / 0.5) = √4 = 2 m/s.",
      ],
    },
    faqs: [
      { q: "Does compressing a spring store the same energy as stretching it?", a: "Yes — the energy depends on x², so the sign of x does not matter. Compressing a spring by 0.1 m stores the same 1 J as stretching it by 0.1 m, as long as it stays within its elastic range." },
      { q: "What is x measured from?", a: "From the spring's natural (unstretched) length, not from its length when hanging. A spring already stretched by a hanging weight has x measured from where it would sit with no load." },
      { q: "When does ½kx² stop working?", a: "Beyond the elastic limit, where the spring is permanently deformed and Hooke's law (F = kx) breaks down. Past that point the energy stored is no longer ½kx² and the spring does not return to its original length." },
    ],
    conversionNote: "x must be in metres: 10 cm = 0.1 m. Using centimetres directly makes the answer 10,000 times too big.",
    relatedGuide: { slug: "conservation-energy", title: "Conservation of mechanical energy" },
  },
  "mechanical-energy": {
    title: "Mechanical Energy Calculator — KE + PE",
    description: "Calculate total mechanical energy as kinetic plus potential energy (E = KE + PE) — the quantity that stays constant when only gravity and springs act.",
    workedExample: {
      title: "Worked example — a falling 2 kg mass",
      steps: [
        "A 2 kg mass sits 5 m above the ground. Its kinetic energy is 0 J and its gravitational potential energy is mgh = 2 × 9.81 × 5 = 98.1 J.",
        "Total mechanical energy E = KE + PE = 0 + 98.1 = 98.1 J.",
        "Halfway down (2.5 m up) it has PE = 2 × 9.81 × 2.5 = 49.05 J, so its kinetic energy must be 98.1 − 49.05 = 49.05 J — the total is still 98.1 J.",
        "Just before impact PE = 0 and KE = 98.1 J, so v = √(2 × 98.1 / 2) = √98.1 = 9.90 m/s.",
        "Check: v = √(2gh) = √(2 × 9.81 × 5) = √98.1 = 9.90 m/s. The two routes agree — energy is conserved because only gravity acts.",
      ],
    },
    faqs: [
      { q: "What counts as mechanical energy?", a: "Kinetic energy plus potential energy (gravitational and elastic). Thermal energy, sound and chemical energy are not mechanical energy, so they are not included in this total." },
      { q: "When is mechanical energy not conserved?", a: "When a non-conservative force such as friction or air resistance does work. Friction turns mechanical energy into thermal energy, so the KE + PE total falls — the energy is not lost, it has changed form." },
      { q: "Does the choice of zero for potential energy matter?", a: "No — only changes in PE matter. Measuring height from the floor or from sea level shifts both PE values by the same amount, so the total energy shifts too but every energy change stays the same." },
    ],
    conversionNote: "All energies must be in joules. 1 kJ = 1000 J.",
    relatedGuide: { slug: "conservation-energy", title: "Conservation of mechanical energy" },
  },
  "power": {
    title: "Power Calculator — Work Over Time (P = W/t)",
    description: "Calculate average power from the work done and the time taken (P = W / t) — how fast energy is transferred, in watts, for motors, lifts, kettles and athletes.",
    workedExample: {
      title: "Worked example — a motor lifting a load",
      steps: [
        "A motor does 1000 J of work in 5 s.",
        "P = W / t = 1000 / 5 = 200 W.",
        "The same 1000 J delivered in 20 s is only 1000 / 20 = 50 W — same energy, quarter of the power.",
        "Check with force and speed: lifting a 20 kg mass at 1 m/s needs force mg = 196.2 N, and P = Fv = 196.2 × 1 = 196.2 W ≈ 200 W, matching the motor above (the 1000 J lift is 20 kg through about 5.1 m).",
        "A 100 W bulb left on for 10 hours uses 100 × 10 × 3600 = 3,600,000 J = 1 kWh of energy.",
      ],
    },
    faqs: [
      { q: "What is the difference between power and energy?", a: "Energy (J) is the total amount transferred; power (W) is the rate of transfer. A 2000 W kettle and a 200 W bulb can both deliver the same energy — the kettle just delivers it ten times faster." },
      { q: "What is a watt?", a: "One watt is one joule per second: 1 W = 1 J/s. A 60 W bulb transfers 60 J of energy every second it is on." },
      { q: "Is this average or instantaneous power?", a: "Average power over the interval — total work divided by total time. Instantaneous power at one moment is P = Fv for a force, and it changes if the force or the speed changes." },
    ],
    conversionNote: "1 kW = 1000 W. 1 kWh = 3.6 MJ: energy (kWh) = power (kW) × time (hours).",
    relatedGuide: { slug: "work-energy-theorem", title: "Work-energy theorem" },
  },
  "efficiency": {
    title: "Efficiency Calculator — Useful Output / Input",
    description: "Calculate efficiency as useful output energy divided by input energy (η = useful / input × 100%) — how much of what goes in actually does useful work.",
    workedExample: {
      title: "Worked example — a motor and a light bulb",
      steps: [
        "A motor takes in 500 J of electrical energy and delivers 300 J of useful kinetic energy.",
        "η = (useful / input) × 100% = (300 / 500) × 100% = 60%.",
        "The other 200 J (40%) is wasted, mostly as heat and sound.",
        "A 50 J input giving 45 J of useful light: η = (45 / 50) × 100% = 90% — an efficient LED. An old filament bulb at 10% efficiency turns 45 J of every 50 J into heat.",
        "Check: useful output can never exceed the input, so an answer above 100% means the input and output values are inconsistent — recheck which number is which.",
      ],
    },
    faqs: [
      { q: "Can efficiency be more than 100%?", a: "No — that would mean getting more useful energy out than you put in, which breaks conservation of energy. An answer above 100% means the input and output have been swapped, or the measurements are wrong." },
      { q: "Where does the wasted energy go?", a: "Mostly to heat, plus some sound and vibration. A car engine at 30% efficiency turns 70% of the fuel's energy into hot exhaust and warm metal — the energy is not destroyed, just no longer useful." },
      { q: "Is efficiency the same as a decimal?", a: "Almost — efficiency as a decimal is useful / input (0.6 for the motor above), and as a percentage it is that number times 100 (60%). This calculator gives the percentage; divide by 100 for the decimal." },
    ],
    conversionNote: "Useful output and input must be in the same units (both joules, or both watts for power efficiency).",
    relatedGuide: { slug: "work-energy-theorem", title: "Work-energy theorem" },
  },
  "impulse": {
    title: "Impulse Calculator — J = FΔt",
    description: "Calculate impulse from average force and time (J = FΔt) — the change in momentum, and why airbags, gloves and crumple zones make collisions survivable.",
    workedExample: {
      title: "Worked example — a 30 N push for 0.2 s",
      steps: [
        "A 30 N force acts on a 0.5 kg ball for 0.2 s.",
        "J = FΔt = 30 × 0.2 = 6 N·s.",
        "Impulse equals the change in momentum: Δp = 6 kg·m/s, so the change in velocity is Δv = Δp / m = 6 / 0.5 = 12 m/s.",
        "Check: the acceleration during the push is a = F / m = 30 / 0.5 = 60 m/s², and Δv = aΔt = 60 × 0.2 = 12 m/s. It agrees.",
        "The same 6 N·s delivered over 0.02 s would need a force of 6 / 0.02 = 300 N — ten times larger. That is why catching a ball with a soft, yielding hand (long Δt) hurts less than a stiff catch.",
      ],
    },
    faqs: [
      { q: "What is the difference between impulse and force?", a: "Force is the push at one moment; impulse is force multiplied by how long it acts. A small force acting for a long time can give the same impulse — the same change in momentum — as a large force acting briefly." },
      { q: "What are the units of impulse?", a: "N·s, which is the same as kg·m/s — the units of momentum. That is no coincidence: impulse is defined as the change in momentum, J = Δp." },
      { q: "Why do airbags reduce injuries?", a: "They do not change the impulse — the car still has to lose all its momentum. They stretch the stopping time, so the same impulse is delivered by a much smaller average force: F = J / Δt, and a bigger Δt means a smaller F." },
    ],
    conversionNote: "1 N·s = 1 kg·m/s. Use the average force over the interval, not the peak force.",
    relatedGuide: { slug: "momentum-impulse", title: "Momentum and impulse" },
  },
  "angular-velocity": {
    title: "Angular Velocity Calculator — ω = Δθ / t",
    description: "Calculate angular velocity from angular displacement and time (ω = Δθ / t) — how fast something spins, in radians per second, for wheels, planets and fans.",
    workedExample: {
      title: "Worked example — two revolutions in 2 seconds",
      steps: [
        "A wheel turns through 2 complete revolutions in 2 s.",
        "Angular displacement Δθ = 2 × 2π = 4π ≈ 12.57 rad.",
        "ω = Δθ / t = 12.57 / 2 = 6.28 rad/s (exactly 2π rad/s).",
        "Check: one revolution per second is 2π rad/s ≈ 6.28 rad/s, and two revolutions in two seconds is the same rate — one revolution per second.",
        "A point on the rim at radius 0.5 m moves at v = ωr = 6.28 × 0.5 = 3.14 m/s.",
      ],
    },
    faqs: [
      { q: "What is a radian?", a: "The angle swept out when the arc length equals the radius. A full circle is 2π radians (about 6.28 rad), a half circle is π rad, and 1 rad ≈ 57.3°. Radians are the natural unit for rotation because they make v = ωr work without conversion factors." },
      { q: "How do I convert rev/s to rad/s?", a: "Multiply by 2π. A wheel at 2 rev/s spins at 2 × 2π = 12.57 rad/s. Going the other way, divide rad/s by 2π: 6.28 rad/s is 1 rev/s." },
      { q: "Does angular velocity have a direction?", a: "Yes — along the axis of rotation, by the right-hand rule: curl your fingers in the direction of rotation and your thumb points along ω. For a wheel rolling to the right, ω points out of the page on one side and into it on the other, depending on the convention." },
    ],
    conversionNote: "1 revolution = 2π rad ≈ 6.28 rad. 1 rev/s = 6.28 rad/s; 1 rpm = 0.105 rad/s.",
    relatedGuide: { slug: "rotational-motion", title: "Rotational motion and torque" },
  },
  "angular-acceleration": {
    title: "Angular Acceleration Calculator — α = Δω / t",
    description: "Calculate angular acceleration from the change in angular velocity over time (α = (ω − ω₀) / t) — how fast a spinning object speeds up or slows down over time.",
    workedExample: {
      title: "Worked example — a wheel spinning up and slowing down",
      steps: [
        "A wheel goes from rest to 12 rad/s in 3 s.",
        "α = (ω − ω₀) / t = (12 − 0) / 3 = 4 rad/s².",
        "Check: after 3 s at 4 rad/s² the wheel has turned through Δθ = ½αt² = 0.5 × 4 × 9 = 18 rad — about 2.86 revolutions.",
        "Slowing down: a wheel at 20 rad/s falls to 8 rad/s in 4 s. α = (8 − 20) / 4 = −12 / 4 = −3 rad/s².",
        "A point on the rim at radius 0.5 m has tangential acceleration a = αr = 4 × 0.5 = 2 m/s² during the spin-up.",
      ],
    },
    faqs: [
      { q: "What is the difference between angular and linear acceleration?", a: "Angular acceleration (rad/s²) describes how the spin rate changes; linear (tangential) acceleration (m/s²) is what a point on the rim feels, a = αr. A point further from the axis has a bigger tangential acceleration for the same α." },
      { q: "Can angular acceleration be negative?", a: "Yes — it means the angular velocity is decreasing, or increasing in the negative direction. A wheel slowing from 20 rad/s to 8 rad/s has α = −3 rad/s², which is a deceleration in the direction it is spinning." },
      { q: "When does this formula not apply?", a: "It always gives the average angular acceleration, but it equals the acceleration at every instant only when α is constant. A motor whose torque changes as it spins up has a changing α." },
    ],
    conversionNote: "Angles must be in radians, not degrees: 180° = π rad ≈ 3.14 rad. 1 rev/s² = 6.28 rad/s².",
    relatedGuide: { slug: "rotational-motion", title: "Rotational motion and torque" },
  },
  "torque": {
    title: "Torque Calculator — τ = rF sin θ",
    description: "Calculate torque from force, lever arm length and angle (τ = rF sin θ) — the turning effect of a force, for spanners, doors, see-saws and steering wheels.",
    workedExample: {
      title: "Worked example — a spanner and a door",
      steps: [
        "A 40 N force is applied at the end of a 0.5 m spanner, at right angles to it.",
        "τ = rF sin θ = 0.5 × 40 × sin 90° = 0.5 × 40 × 1 = 20 N·m.",
        "At 30° to the spanner the same force gives τ = 0.5 × 40 × sin 30° = 0.5 × 40 × 0.5 = 10 N·m — half the turning effect.",
        "Check: the perpendicular component of the force is 40 × sin 90° = 40 N, and 40 × 0.5 = 20 N·m. The component along the spanner does nothing to turn it.",
        "A longer spanner doubles the torque for the same push — which is why a stuck nut yields to a longer wrench, not a harder shove.",
      ],
    },
    faqs: [
      { q: "Why is torque largest at 90°?", a: "Because only the component of the force perpendicular to the lever arm can turn it, and that component is F sin θ, which is biggest (equal to F) at 90°. A force pulling straight along the spanner (θ = 0°) gives no torque at all." },
      { q: "What are the units of torque?", a: "Newton-metres (N·m) — the same units as work, but torque is a vector (a turning effect) while work is a scalar (energy transferred). Never call a torque a joule, even though the units match." },
      { q: "Which way does torque act — clockwise or anticlockwise?", a: "Torque is a vector along the rotation axis. By convention, anticlockwise is often taken as positive and clockwise as negative; pick one direction, stay consistent, and the net torque is the signed sum." },
    ],
    conversionNote: "Angles are in degrees. r is the distance from the pivot to where the force acts — not the length of the whole object.",
    relatedGuide: { slug: "rotational-motion", title: "Rotational motion and torque" },
  },
  "moment-of-inertia": {
    title: "Moment of Inertia Calculator — I = mr²",
    description: "Calculate the moment of inertia of a point mass (I = mr²) — rotational mass: how hard it is to start or stop it spinning, and why distance matters squared.",
    workedExample: {
      title: "Worked example — a 2 kg mass on a rod",
      steps: [
        "A 2 kg point mass sits 0.5 m from the axis of rotation.",
        "I = mr² = 2 × 0.5² = 2 × 0.25 = 0.5 kg·m².",
        "Move it to 1 m from the axis: I = 2 × 1² = 2 kg·m² — four times as much, because the distance is squared.",
        "Check with torque: to give this mass an angular acceleration of 4 rad/s² at 0.5 m needs τ = Iα = 0.5 × 4 = 2 N·m. At 1 m, I = 2 kg·m², so the same spin-up needs 8 N·m.",
        "This page is for a single point mass. An extended body — a rod, disc or sphere — needs its own geometry formula; a rod about its centre, for example, has I = (1/12)ML².",
      ],
    },
    faqs: [
      { q: "Why does the distance matter so much?", a: "Because I = mr²: doubling the distance from the axis quadruples the moment of inertia. Mass held far from the axis is much harder to spin — which is why a figure skater pulls their arms in to spin faster." },
      { q: "What are the units of moment of inertia?", a: "kg·m². It is the rotational equivalent of mass: just as F = ma links force and linear acceleration, τ = Iα links torque and angular acceleration." },
      { q: "Can I add moments of inertia together?", a: "Yes — for several point masses about the same axis, add each mr². For a composite body, add the moment of inertia of each part about the same axis (using the parallel-axis theorem if a part's own axis is offset)." },
    ],
    conversionNote: "r is the distance from the axis of rotation, not the size of the mass. 1 kg·m² is the moment of inertia of 1 kg at 1 m.",
    relatedGuide: { slug: "rotational-motion", title: "Rotational motion and torque" },
  },
  "rotational-kinetic-energy": {
    title: "Rotational Kinetic Energy Calculator — ½Iω²",
    description: "Calculate the kinetic energy of a spinning object (Krot = ½Iω²) from its moment of inertia — the energy stored in a flywheel, a spinning top or a rolling wheel.",
    workedExample: {
      title: "Worked example — a flywheel speeds up",
      steps: [
        "A flywheel has moment of inertia I = 0.5 kg·m² and spins at ω = 4 rad/s.",
        "Krot = ½Iω² = 0.5 × 0.5 × 4² = 0.5 × 0.5 × 16 = 4 J.",
        "Double the spin rate to 8 rad/s: Krot = 0.5 × 0.5 × 64 = 16 J — four times as much, because the energy depends on ω².",
        "Check: the energy came from work done by a torque. A constant torque of 2 N·m turning the wheel through 2 rad does W = τθ = 2 × 2 = 4 J, matching the kinetic energy.",
        "A rolling wheel has both kinds of kinetic energy: ½mv² for moving forwards plus ½Iω² for spinning — add them for the total.",
      ],
    },
    faqs: [
      { q: "How is rotational kinetic energy different from ordinary kinetic energy?", a: "Ordinary (translational) kinetic energy is ½mv² for the whole mass moving in a line. Rotational kinetic energy is ½Iω² for spinning about an axis. A rolling ball has both, and you must add them." },
      { q: "Why does ω have to be in rad/s?", a: "Because the formula comes from adding up ½mv² for every part of the spinning body, with v = ωr — and v = ωr only works when ω is in radians per second. Using rev/s without converting gives a wrong answer." },
      { q: "Can rotational kinetic energy be negative?", a: "No — ω is squared, so the energy is always positive (or zero), just like ½mv². Direction of spin does not change the energy." },
    ],
    conversionNote: "ω must be in rad/s: 1 rev/s = 2π rad/s ≈ 6.28 rad/s. 1 J = 1 kg·m²/s².",
    relatedGuide: { slug: "rotational-motion", title: "Rotational motion and torque" },
  },
  "gravitational-force": {
    title: "Gravitational Force Calculator — F = Gm₁m₂/r²",
    description: "Calculate the gravitational attraction between two masses (F = Gm₁m₂ / r²) — Newton's law of universal gravitation, from lab masses to the Earth and Moon.",
    workedExample: {
      title: "Worked example — two 1000 kg masses, and you on Earth",
      steps: [
        "Two 1000 kg masses sit 1 m apart (centre to centre). G = 6.67430 × 10⁻¹¹ N·m²/kg².",
        "F = Gm₁m₂ / r² = 6.67430 × 10⁻¹¹ × 1000 × 1000 / 1² = 6.67430 × 10⁻⁵ N — about 0.000067 N, far too small to feel.",
        "Now you on Earth: m₁ = 5.97 × 10²⁴ kg (Earth), m₂ = 70 kg, r = 6.37 × 10⁶ m.",
        "F = 6.67430 × 10⁻¹¹ × 5.97 × 10²⁴ × 70 / (6.37 × 10⁶)² = 2.789 × 10¹⁶ / 4.058 × 10¹³ = 687 N.",
        "Check: your weight is mg = 70 × 9.81 = 686.7 N. The two routes agree — weight is just this gravitational force with Earth's mass and radius.",
      ],
    },
    faqs: [
      { q: "Why is gravity so weak between everyday objects?", a: "Because G is tiny: 6.67430 × 10⁻¹¹ N·m²/kg². Two 1000 kg masses 1 m apart attract with only 0.000067 N. Gravity only becomes noticeable when at least one mass is planetary in size." },
      { q: "Does the force act on both masses equally?", a: "Yes — Newton's third law. The Earth pulls you down with 687 N and you pull the Earth up with exactly 687 N. The Earth barely moves because its mass is so much larger." },
      { q: "When does F = Gm₁m₂ / r² not apply?", a: "It treats masses as points, which is exact outside a spherical body but only approximate for irregular shapes at close range. It also fails at very small scales (quantum gravity) and near black holes (general relativity)." },
    ],
    conversionNote: "Distances are centre-to-centre, in metres. G = 6.67430 × 10⁻¹¹ N·m²/kg².",
    relatedGuide: { slug: "gravitation-orbits", title: "Newtonian gravitation and orbits" },
  },
  "gravity-on-planets": {
    title: "Gravity on Planets Calculator — g = GM/R²",
    description: "Calculate the surface gravity on any planet, moon or exoplanet (g = GM / R²) — how heavy you would feel standing on Mars, Jupiter, Venus or a distant exoplanet.",
    workedExample: {
      title: "Worked example — Earth and Mars",
      steps: [
        "Earth: M = 5.97 × 10²⁴ kg, R = 6.37 × 10⁶ m, G = 6.67430 × 10⁻¹¹ N·m²/kg².",
        "g = GM / R² = 6.67430 × 10⁻¹¹ × 5.97 × 10²⁴ / (6.37 × 10⁶)² = 3.985 × 10¹⁴ / 4.058 × 10¹³ = 9.82 m/s².",
        "Mars: M = 6.42 × 10²³ kg, R = 3.39 × 10⁶ m. g = 6.67430 × 10⁻¹¹ × 6.42 × 10²³ / (3.39 × 10⁶)² = 4.285 × 10¹³ / 1.149 × 10¹³ = 3.73 m/s².",
        "Check: a 70 kg person weighs 70 × 3.73 = 261 N on Mars, against 70 × 9.81 = 687 N on Earth — Mars gravity is about 38% of Earth's.",
        "A 70 kg person on Jupiter (g = 24.79 m/s²) would weigh 70 × 24.79 = 1735 N — more than twice their Earth weight.",
      ],
    },
    faqs: [
      { q: "Why isn't the biggest planet the one with the strongest gravity?", a: "Because g depends on mass divided by radius squared. A planet can be very massive but also very large, so its surface is far from its centre. Saturn is 95 times Earth's mass but its surface gravity is only 10.44 m/s², barely above Earth's." },
      { q: "Is g the same everywhere on a planet?", a: "No — it varies a little with latitude (the planet bulges at the equator) and with altitude and local rock density. On Earth it ranges from about 9.78 m/s² at the equator to 9.83 m/s² at the poles." },
      { q: "What radius do I use for a planet?", a: "The radius to the surface where you would stand, in metres — 6.37 × 10⁶ m for Earth, 3.39 × 10⁶ m for Mars. Using the diameter instead of the radius makes g four times too small." },
    ],
    conversionNote: "M in kilograms, R in metres. Earth: M = 5.97 × 10²⁴ kg, R = 6.37 × 10⁶ m; Moon: M = 7.35 × 10²² kg, R = 1.74 × 10⁶ m.",
    relatedGuide: { slug: "gravitation-orbits", title: "Newtonian gravitation and orbits" },
  },
  "escape-velocity": {
    title: "Escape Velocity Calculator — v = √(2GM/r)",
    description: "Calculate the speed needed to escape a planet's gravity forever (vesc = √(2GM/r)) — 11.2 km/s from Earth, 2.4 km/s from the Moon, and what it means for rockets.",
    workedExample: {
      title: "Worked example — escaping Earth and the Moon",
      steps: [
        "Earth: M = 5.97 × 10²⁴ kg, r = 6.37 × 10⁶ m, G = 6.67430 × 10⁻¹¹ N·m²/kg².",
        "vesc = √(2GM/r) = √(2 × 6.67430 × 10⁻¹¹ × 5.97 × 10²⁴ / 6.37 × 10⁶) = √(1.251 × 10⁸) = 11,185 m/s ≈ 11.2 km/s.",
        "The Moon: M = 7.35 × 10²² kg, r = 1.74 × 10⁶ m. vesc = √(2 × 6.67430 × 10⁻¹¹ × 7.35 × 10²² / 1.74 × 10⁶) = √(5.639 × 10⁶) = 2375 m/s ≈ 2.38 km/s.",
        "Check: escape velocity is √2 times the circular orbital velocity at the same radius. Earth's orbital velocity at the surface is 7.91 km/s, and 7.91 × 1.414 = 11.2 km/s. It agrees.",
        "A rocket does not actually need to reach 11.2 km/s in one burst — it can climb slowly on continuous thrust. Escape velocity is the speed a single unpowered throw would need.",
      ],
    },
    faqs: [
      { q: "Does escape velocity depend on the mass of the escaping object?", a: "No — the mass cancels out. A feather and a spacecraft need the same 11.2 km/s to escape Earth (ignoring air resistance). What changes with mass is the energy and fuel needed to reach that speed." },
      { q: "What is the difference between escape velocity and orbital velocity?", a: "Orbital velocity (√(GM/r)) keeps you circling; escape velocity (√(2GM/r)) is √2 times larger and lets you leave for good. At Earth's surface they are 7.91 km/s and 11.2 km/s." },
      { q: "Does the direction of launch matter?", a: "In the ideal model, no — only the speed matters, because gravity is conservative. In practice, launching eastwards from the equator adds Earth's rotation (about 0.46 km/s) for free, which is why spaceports sit near the equator." },
    ],
    conversionNote: "1 km/s = 1000 m/s. r is the distance from the body's centre, not its altitude above the surface.",
    relatedGuide: { slug: "gravitation-orbits", title: "Newtonian gravitation and orbits" },
  },
  "orbital-velocity": {
    title: "Orbital Velocity Calculator — v = √(GM/r)",
    description: "Calculate the speed needed for a circular orbit (v = √(GM/r)) — 7.9 km/s skimming just above Earth, 7.7 km/s for the ISS, and slower the higher the orbit.",
    workedExample: {
      title: "Worked example — skimming Earth and the ISS",
      steps: [
        "Just above Earth's surface: M = 5.97 × 10²⁴ kg, r = 6.37 × 10⁶ m.",
        "v = √(GM/r) = √(6.67430 × 10⁻¹¹ × 5.97 × 10²⁴ / 6.37 × 10⁶) = √(6.255 × 10⁷) = 7909 m/s ≈ 7.91 km/s.",
        "The ISS orbits 400 km up, so r = 6.37 × 10⁶ + 0.40 × 10⁶ = 6.77 × 10⁶ m. v = √(3.985 × 10¹⁴ / 6.77 × 10⁶) = √(5.885 × 10⁷) = 7672 m/s ≈ 7.67 km/s.",
        "Check: the ISS is higher, so it moves slower — 7.67 km/s against 7.91 km/s at the surface. Higher orbits are always slower for circular motion.",
        "At the Moon's distance (r = 3.84 × 10⁸ m) the orbital speed is √(3.985 × 10¹⁴ / 3.84 × 10⁸) = √1.038 × 10⁶ = 1019 m/s ≈ 1.02 km/s.",
      ],
    },
    faqs: [
      { q: "Why do higher orbits move more slowly?", a: "Because gravity is weaker further out, so less centripetal force — and less speed — is needed to stay in a circle. The Moon crawls around Earth at 1.02 km/s while the ISS races at 7.67 km/s." },
      { q: "What happens if I go faster than orbital velocity?", a: "You move into a larger, elliptical orbit. Reach √2 times the orbital velocity — the escape velocity — and you leave Earth's gravity altogether on a hyperbolic path." },
      { q: "Is this the same as escape velocity?", a: "No. Orbital velocity is √(GM/r); escape velocity is √(2GM/r), which is 1.414 times larger. Confusing the two is the most common orbital-mechanics error." },
    ],
    conversionNote: "r is measured from the body's centre: add the altitude to the planet's radius. 1 km/s = 1000 m/s.",
    relatedGuide: { slug: "gravitation-orbits", title: "Newtonian gravitation and orbits" },
  },
  "centripetal-acceleration": {
    title: "Centripetal Acceleration Calculator — a = v²/r",
    description: "Calculate the inward acceleration of circular motion (ac = v² / r) — the acceleration that changes direction, not speed, for cars, planets and centrifuges.",
    workedExample: {
      title: "Worked example — a spinning mass and a cornering car",
      steps: [
        "A 0.8 kg mass whirls at 6 m/s on a 1.2 m string.",
        "ac = v² / r = 6² / 1.2 = 36 / 1.2 = 30 m/s² towards the centre — about 3.06 g.",
        "A 1200 kg car corners at 20 m/s on a bend of radius 80 m: ac = 20² / 80 = 400 / 80 = 5 m/s², about half a g.",
        "Check: multiply by the mass to get the force — see the centripetal-force calculator (centripetal-force). For the car, F = 1200 × 5 = 6000 N, supplied by friction. This page gives the acceleration only; that page gives the force.",
        "Double the speed and the acceleration quadruples: at 40 m/s on the same 80 m bend, ac = 1600 / 80 = 20 m/s² — two g, far more than tyres can supply.",
      ],
    },
    faqs: [
      { q: "Which way does centripetal acceleration point?", a: "Towards the centre of the circle, always. It changes the direction of the velocity, not its size — that is why an object can accelerate while its speed stays constant." },
      { q: "What is the difference between centripetal and tangential acceleration?", a: "Centripetal acceleration (v²/r) changes direction and is always present in circular motion. Tangential acceleration (Δv/Δt) changes speed and is zero when the speed is constant — it appears only while the object speeds up or slows down." },
      { q: "Why does doubling the speed quadruple the acceleration?", a: "Because ac = v²/r depends on the square of the speed. This is why a bend taken twice as fast needs four times the grip, and why speed is the dominant factor in cornering." },
    ],
    conversionNote: "1 g = 9.81 m/s². Use the radius, not the diameter — halving the radius doubles the acceleration.",
    relatedGuide: { slug: "circular-motion", title: "Uniform circular motion" },
  },
  "orbital-period": {
    title: "Orbital Period Calculator — T = 2π√(r³/GM)",
    description: "Calculate how long one complete orbit takes (T = 2π√(r³ / GM)) — about 92 minutes for the ISS, 27 days for the Moon, 365 days for Earth around the Sun.",
    workedExample: {
      title: "Worked example — the ISS and the Moon",
      steps: [
        "The ISS orbits at r = 6.77 × 10⁶ m from Earth's centre. Earth's GM = 6.67430 × 10⁻¹¹ × 5.97 × 10²⁴ = 3.985 × 10¹⁴ m³/s².",
        "r³ = (6.77 × 10⁶)³ = 3.103 × 10²⁰ m³. r³ / GM = 3.103 × 10²⁰ / 3.985 × 10¹⁴ = 7.785 × 10⁵ s².",
        "T = 2π√(r³ / GM) = 2π × √778,500 = 2π × 882.3 = 5545 s ≈ 92.4 minutes.",
        "The Moon at r = 3.84 × 10⁸ m: r³ / GM = 5.662 × 10²⁵ / 3.985 × 10¹⁴ = 1.421 × 10¹¹ s². T = 2π × √1.421 × 10¹¹ = 2π × 376,900 = 2,368,000 s ≈ 27.4 days.",
        "Check: 92.4 minutes is the well-known ISS period, and 27.4 days is the Moon's sidereal period — both match the real world.",
      ],
    },
    faqs: [
      { q: "Does the satellite's mass affect its orbital period?", a: "No — the satellite's mass cancels out. A 1 kg cubesat and a 400-tonne space station in the same orbit take exactly the same time to go around. Only the orbital radius and the central body's mass matter." },
      { q: "What is the geostationary orbit?", a: "The orbit where the period is 24 hours, so the satellite stays fixed above one point on the equator. Solving T = 2π√(r³/GM) for T = 86,400 s gives r = 4.22 × 10⁷ m — about 35,800 km above the surface." },
      { q: "Is this Kepler's third law?", a: "Yes — T² is proportional to r³. This calculator is Kepler's third law written with Newton's constant: T² = 4π²r³ / GM. Doubling the radius multiplies the period by 2√2 ≈ 2.83." },
    ],
    conversionNote: "r is from the central body's centre, in metres. 1 day = 86,400 s; divide seconds by 3600 for hours.",
    relatedGuide: { slug: "gravitation-orbits", title: "Newtonian gravitation and orbits" },
  },
  "wavelength": {
    title: "Wavelength Calculator — λ = v / f",
    description: "Calculate the wavelength from wave speed and frequency (λ = v / f) — the distance between two neighbouring crests, for sound, water waves, radio waves or light.",
    workedExample: {
      title: "Worked example — a 400 Hz note and green light",
      steps: [
        "A 400 Hz sound wave travels at 340 m/s in air.",
        "λ = v / f = 340 / 400 = 0.85 m.",
        "Green light: v = c = 3 × 10⁸ m/s and f = 5 × 10¹⁴ Hz. λ = 3 × 10⁸ / 5 × 10¹⁴ = 6 × 10⁻⁷ m = 600 nm.",
        "Check: doubling the frequency halves the wavelength. A 800 Hz note in air has λ = 340 / 800 = 0.425 m — exactly half of 0.85 m.",
        "This page solves for wavelength. The wave-speed calculator (wave-speed) solves for v = fλ, and the frequency calculator (frequency) solves for f — the three pages are the same equation rearranged.",
      ],
    },
    faqs: [
      { q: "What happens to wavelength when a wave enters a new medium?", a: "The frequency stays the same (it is set by the source) but the speed changes, so the wavelength changes with it: λ = v / f. Sound entering water speeds up to about 1500 m/s, so its wavelength grows by more than four times." },
      { q: "Can wavelength be longer than the wave itself?", a: "The wavelength is a property of the wave train, not of one crest. A single pulse has no wavelength — wavelength only makes sense for a repeating, periodic wave with many cycles." },
      { q: "Why are long wavelengths harder to block?", a: "Because an obstacle much smaller than the wavelength barely disturbs the wave — it diffracts around it. That is why you can hear bass through a wall (long wavelengths) but not treble (short wavelengths)." },
    ],
    conversionNote: "1 nm = 10⁻⁹ m. Sound in air ≈ 340 m/s; light in vacuum = 3 × 10⁸ m/s.",
    relatedGuide: { slug: "wave-properties", title: "Wave properties: frequency, wavelength and speed" },
  },
  "wave-period": {
    title: "Wave Period Calculator — T = 1 / f",
    description: "Calculate the time period of a wave from its frequency (T = 1 / f) — the time in seconds for one complete cycle, from 50 Hz mains hum to slow ocean swell.",
    workedExample: {
      title: "Worked example — 50 Hz mains and a 440 Hz note",
      steps: [
        "UK mains electricity hums at f = 50 Hz.",
        "T = 1 / f = 1 / 50 = 0.02 s — each cycle takes 20 milliseconds.",
        "A 440 Hz concert-A note: T = 1 / 440 = 0.00227 s ≈ 2.27 ms per cycle.",
        "Check: 440 cycles per second times 0.00227 s per cycle = 440 × 0.00227 = 1.00 — one second of cycles, as it must be.",
        "This page solves for the period. The frequency calculator (frequency) solves the inverse problem, f = 1 / T or f = N / t — use it when you count cycles instead.",
      ],
    },
    faqs: [
      { q: "What is the difference between period and frequency?", a: "Frequency is cycles per second (Hz); period is seconds per cycle. They are reciprocals: f = 1 / T and T = 1 / f. A 50 Hz wave has a period of 0.02 s; a wave with a period of 2 s has a frequency of 0.5 Hz." },
      { q: "Can a wave have a period longer than a second?", a: "Yes — ocean swell can have a period of 10 s or more, and the tides have periods of about 12 hours. Low frequency always means a long period." },
      { q: "Is the period the same as the time the wave takes to travel?", a: "No. The period is the time for one cycle at one point. The travel time depends on the distance and the wave speed — a sound wave takes about 3 s to cross 1 km, but its period might be 0.002 s." },
    ],
    conversionNote: "1 kHz = 1000 Hz. 1 ms = 0.001 s: a period of 0.02 s is 20 ms.",
    relatedGuide: { slug: "wave-properties", title: "Wave properties: frequency, wavelength and speed" },
  },
  "pendulum-period": {
    title: "Pendulum Period Calculator — T = 2π√(L/g)",
    description: "Calculate the period of a simple pendulum from its length (T = 2π√(L / g)) — how long one complete swing takes, for any length, on Earth, the Moon or Mars.",
    workedExample: {
      title: "Worked example — a 1 m pendulum and a 25 cm one",
      steps: [
        "A pendulum of length L = 1 m on Earth (g = 9.81 m/s²).",
        "T = 2π√(L / g) = 2π × √(1 / 9.81) = 2π × 0.3193 = 2.01 s.",
        "A 0.25 m pendulum: T = 2π × √(0.25 / 9.81) = 2π × 0.1597 = 1.00 s.",
        "Check: quartering the length halves the period — 2.01 s against 1.00 s. The period depends on the square root of the length, so halving the length only shortens the period by a factor of √2 ≈ 1.41.",
        "On the Moon (g = 1.62 m/s²) the 1 m pendulum takes T = 2π × √(1 / 1.62) = 2π × 0.7857 = 4.94 s — a Moon clock would run slow.",
      ],
    },
    faqs: [
      { q: "Does the mass of the bob affect the period?", a: "No — the mass cancels out. A heavy bob and a light bob on the same length of string swing with the same period, just as all masses fall at the same rate. Only the length and g matter." },
      { q: "Why is the small-angle approximation needed?", a: "The formula T = 2π√(L/g) assumes the swing is small (roughly under 10°), where sin θ ≈ θ. At large angles the period grows — a pendulum swung through 60° takes about 7% longer than the formula says." },
      { q: "What is L measured to?", a: "To the centre of mass of the bob, not to the top of it. For a small dense bob on a long string the difference is tiny, but for a short pendulum with a large bob it matters." },
    ],
    conversionNote: "L in metres, measured to the bob's centre of mass. g = 9.81 m/s² on Earth, 1.62 on the Moon.",
    relatedGuide: { slug: "simple-harmonic-motion", title: "Simple harmonic motion" },
  },
  "spring-oscillation-period": {
    title: "Spring Oscillation Period — T = 2π√(m/k)",
    description: "Calculate the oscillation period of a mass on a spring (T = 2π√(m / k)) — how long one complete up-and-down cycle takes, for any mass and spring stiffness.",
    workedExample: {
      title: "Worked example — 1 kg and 4 kg on the same spring",
      steps: [
        "A 1 kg mass hangs on a spring with k = 100 N/m.",
        "T = 2π√(m / k) = 2π × √(1 / 100) = 2π × 0.1 = 0.628 s.",
        "A 4 kg mass on the same spring: T = 2π × √(4 / 100) = 2π × 0.2 = 1.257 s.",
        "Check: quadrupling the mass doubles the period — 1.257 s against 0.628 s. The period depends on the square root of the mass, so doubling the mass only multiplies the period by √2 ≈ 1.41.",
        "A stiffer spring shortens the period: the 1 kg mass on a 400 N/m spring has T = 2π × √(1 / 400) = 2π × 0.05 = 0.314 s.",
      ],
    },
    faqs: [
      { q: "Does the amplitude affect the period?", a: "No — for an ideal spring the period is independent of how far you stretch it. A mass bouncing through 10 cm takes the same time per cycle as one bouncing through 2 cm. Real springs with damping slowly lose amplitude but keep nearly the same period." },
      { q: "What happens if I use a heavier mass?", a: "The period grows with the square root of the mass: four times the mass means twice the period. The frequency falls by the same factor, since f = 1 / T." },
      { q: "When does this formula break down?", a: "When the spring is stretched beyond its elastic limit, when the spring's own mass matters, or when damping is significant. A car suspension has dampers precisely to kill the oscillation this formula describes." },
    ],
    conversionNote: "m in kilograms, k in N/m. The period is in seconds; frequency f = 1 / T.",
    relatedGuide: { slug: "simple-harmonic-motion", title: "Simple harmonic motion" },
  },
  "doppler-effect": {
    title: "Doppler Effect Calculator — Shifted Frequency",
    description: "Calculate the Doppler-shifted frequency of sound (f′ = f(v + vo) / (v − vs)) — the ambulance siren rising as it approaches and falling away as it leaves.",
    workedExample: {
      title: "Worked example — an ambulance at 20 m/s",
      steps: [
        "An ambulance siren sounds at f = 1000 Hz. Sound travels at v = 343 m/s in air at 20 °C. The ambulance approaches a stationary observer at vs = 20 m/s.",
        "f′ = f(v + vo) / (v − vs) = 1000 × (343 + 0) / (343 − 20) = 1000 × 343 / 323 = 1062 Hz.",
        "The pitch rises by 62 Hz — about a semitone — as the ambulance approaches.",
        "After passing, the source recedes, so vs = −20 m/s in the formula: f′ = 1000 × 343 / (343 + 20) = 1000 × 343 / 363 = 945 Hz.",
        "Check: the total drop from 1062 Hz to 945 Hz is 117 Hz, the familiar wail you hear as an ambulance passes. The source frequency never changed — only the wavelength the observer receives did.",
      ],
    },
    faqs: [
      { q: "Which speed is positive when?", a: "Speeds are positive when the source and observer move towards each other. An approaching source makes the denominator (v − vs) smaller and the frequency higher; a receding source makes it larger and the frequency lower." },
      { q: "Does the Doppler effect work for light?", a: "Yes, but light needs the relativistic formula — the sound formula here assumes the wave travels through a medium (air) at 343 m/s. For light, the shift depends only on relative speed, and a receding galaxy's light is redshifted." },
      { q: "What if the source moves faster than sound?", a: "Then v − vs becomes zero or negative and the formula breaks down — the source outruns its own waves, which pile up into a shock wave: the sonic boom. This calculator is for subsonic speeds only." },
    ],
    conversionNote: "Sound speed in air is 343 m/s at 20 °C (331 m/s at 0 °C). Speeds are in m/s, positive towards each other.",
    relatedGuide: { slug: "doppler-effect-guide", title: "The Doppler effect" },
  },
  "ohms-law": {
    title: "Ohm's Law Calculator — Current I = V / R",
    description: "Calculate current from voltage and resistance (I = V / R) — the current through a resistor, a bulb or a phone charger, with the rearrangements explained.",
    workedExample: {
      title: "Worked example — a 12 V battery and a 6 Ω resistor",
      steps: [
        "A 12 V battery is connected across a 6 Ω resistor.",
        "I = V / R = 12 / 6 = 2 A.",
        "Check with the sibling page: the resistance calculator (resistance) gives R = V / I = 12 / 2 = 6 Ω. The two agree — this page solves for current, that page solves for resistance.",
        "A 240 V mains supply across a 60 Ω heater: I = 240 / 60 = 4 A.",
        "The power in the 12 V circuit is P = VI = 12 × 2 = 24 W — see the electric-power calculator (electric-power).",
      ],
    },
    faqs: [
      { q: "What is Ohm's law, exactly?", a: "For an ohmic conductor at constant temperature, current is proportional to voltage: V = IR. Double the voltage and the current doubles, as long as the resistance stays the same." },
      { q: "When does Ohm's law not apply?", a: "For non-ohmic components — filament bulbs, diodes, thermistors — whose resistance changes with temperature or voltage. A filament bulb's resistance rises as it heats up, so doubling the voltage less than doubles the current." },
      { q: "What happens if R is zero?", a: "The current becomes enormous: a short circuit. In practice the battery's own internal resistance limits it, but the current can still be large enough to melt wires — which is why circuits have fuses." },
    ],
    conversionNote: "Voltage in volts, resistance in ohms, current in amps. 1 mA = 0.001 A; 1 kΩ = 1000 Ω.",
    relatedGuide: { slug: "ohms-law-guide", title: "Ohm’s law and resistance" },
  },
  "electric-power": {
    title: "Electric Power Calculator — P = VI in Watts",
    description: "Calculate electrical power from voltage and current (P = VI) in watts — the wattage of light bulbs, heaters and phone chargers, and what each one costs to run.",
    workedExample: {
      title: "Worked example — a 12 V circuit and a 230 V heater",
      steps: [
        "A 12 V battery drives 2 A through a resistor.",
        "P = VI = 12 × 2 = 24 W.",
        "Check with P = I²R: the resistance is R = V / I = 6 Ω, so P = 2² × 6 = 4 × 6 = 24 W. It agrees.",
        "A 230 V heater drawing 5 A: P = 230 × 5 = 1150 W = 1.15 kW. Left on for 2 hours it uses 1.15 × 2 = 2.3 kWh of energy.",
        "This page solves for power from V and I. The Ohm's law calculator (ohms-law) solves for current, and the resistance calculator (resistance) solves for R — the three pages cover the same circuit from three angles.",
      ],
    },
    faqs: [
      { q: "Which power formula should I use — VI, I²R or V²/R?", a: "All three are the same law rearranged: use VI when you know voltage and current, I²R when you know current and resistance, V²/R when you know voltage and resistance. They must all give the same answer for one circuit." },
      { q: "What is the difference between watts and kilowatt-hours?", a: "Watts measure power — the rate of using energy. Kilowatt-hours measure energy — power times time. A 1 kW heater running for 1 hour uses 1 kWh; a 100 W bulb needs 10 hours to use the same 1 kWh." },
      { q: "Does P = VI work for AC mains?", a: "Yes, with RMS values for voltage and current, which is what mains ratings already are (230 V RMS). For a purely resistive load the average power is simply Vrms × Irms." },
    ],
    conversionNote: "1 kW = 1000 W. Energy in kWh = power in kW × time in hours; 1 kWh = 3.6 MJ.",
    relatedGuide: { slug: "electric-power-energy", title: "Electrical power and energy" },
  },
  "resistance": {
    title: "Resistance Calculator — R = V / I in Ohms",
    description: "Calculate resistance from voltage and current (R = V / I) — the resistance of a resistor, a bulb filament or a length of wire, from a voltmeter and ammeter.",
    workedExample: {
      title: "Worked example — a 12 V lamp and a 9 V circuit",
      steps: [
        "A lamp runs on 12 V and draws 2 A.",
        "R = V / I = 12 / 2 = 6 Ω.",
        "A 9 V battery driving 0.5 A through a component: R = 9 / 0.5 = 18 Ω.",
        "Check with the sibling page: the Ohm's law calculator (ohms-law) gives I = V / R = 12 / 6 = 2 A for the lamp. The two agree — this page solves for resistance, that page solves for current.",
        "A resistor with R = 6 Ω across 12 V dissipates P = V² / R = 144 / 6 = 24 W as heat.",
      ],
    },
    faqs: [
      { q: "What is resistance, physically?", a: "The opposition a material offers to the flow of charge. In a metal, electrons collide with the vibrating ions in the lattice; more collisions mean more resistance, and the lost energy appears as heat." },
      { q: "Does resistance change with temperature?", a: "Yes, for most metals it rises as they heat up — a filament bulb's resistance when hot is several times its cold resistance. That is why you cannot measure a bulb's working resistance with a cold ohmmeter reading." },
      { q: "What if the current is zero?", a: "Then R = V / I involves dividing by zero and is undefined. An open circuit (a switch off) has no current, so this calculator cannot give its resistance — it is effectively infinite." },
    ],
    conversionNote: "Voltage in volts, current in amps. 1 mA = 0.001 A; 1 kΩ = 1000 Ω; 1 MΩ = 1,000,000 Ω.",
    relatedGuide: { slug: "ohms-law-guide", title: "Ohm’s law and resistance" },
  },
  "series-and-parallel-resistance": {
    title: "Series and Parallel Resistance Calculator",
    description: "Calculate total resistance for two resistors in series (R1 + R2) or parallel ((R1R2) / (R1 + R2)) — the combination rules every circuit question uses.",
    workedExample: {
      title: "Worked example — 6 Ω and 3 Ω, both ways",
      steps: [
        "Two resistors: R1 = 6 Ω and R2 = 3 Ω.",
        "In series: R = R1 + R2 = 6 + 3 = 9 Ω. The same current flows through both, and the voltages add.",
        "In parallel: R = (R1 × R2) / (R1 + R2) = (6 × 3) / (6 + 3) = 18 / 9 = 2 Ω. The same voltage is across both, and the currents add.",
        "Check: the parallel total (2 Ω) is smaller than the smallest resistor (3 Ω) — as it must be, because parallel paths give the current more ways through.",
        "Two identical 6 Ω resistors in parallel give (6 × 6) / 12 = 3 Ω — exactly half of one resistor, which is the general rule for n identical resistors: R / n.",
      ],
    },
    faqs: [
      { q: "Why is the parallel total smaller than the smallest resistor?", a: "Because adding a parallel branch gives the current an extra path, so the total current rises for the same voltage — and a bigger current for the same voltage means a smaller total resistance, by R = V / I." },
      { q: "Which formula do I use?", a: "Series: add them, R = R1 + R2. Parallel: use (R1 × R2) / (R1 + R2), or equivalently 1 / R = 1 / R1 + 1 / R2. This calculator takes a connection type (1 = series, 2 = parallel) and applies the right one." },
      { q: "What if I have three resistors in parallel?", a: "Use the reciprocal rule: 1 / R = 1 / R1 + 1 / R2 + 1 / R3. This calculator handles two resistors; apply it twice for three — combine two first, then combine the result with the third." },
    ],
    conversionNote: "Resistances must both be in ohms. Series total is always larger than either resistor; parallel total is always smaller.",
    relatedGuide: { slug: "series-parallel-circuits", title: "Series and parallel circuits" },
  },
  "coulombs-law": {
    title: "Coulomb's Law Calculator — F = kq₁q₂/r²",
    description: "Calculate the electrostatic force between two charges (F = k|q₁q₂| / r²) — the electric equivalent of gravity, with attraction and repulsion between charges.",
    workedExample: {
      title: "Worked example — two microcoulomb charges 10 cm apart",
      steps: [
        "Charge 1 is 2 µC (2 × 10⁻⁶ C), charge 2 is 3 µC (3 × 10⁻⁶ C), and they are 0.1 m apart. k = 8.99 × 10⁹ N·m²/C².",
        "F = k|q₁q₂| / r² = 8.99 × 10⁹ × (2 × 10⁻⁶ × 3 × 10⁻⁶) / 0.1².",
        "The product of the charges is 6 × 10⁻¹² C². Multiply by k: 8.99 × 10⁹ × 6 × 10⁻¹² = 0.0539 N·m².",
        "Divide by r² = 0.01 m²: F = 0.0539 / 0.01 = 5.39 N.",
        "Check: doubling the distance to 0.2 m divides the force by four: 5.39 / 4 = 1.35 N. Like charges repel and opposite charges attract — the formula gives the size of the force; the signs of the charges give its direction.",
      ],
    },
    faqs: [
      { q: "How do I know if the force is attractive or repulsive?", a: "From the signs of the charges: like charges repel, opposite charges attract. The formula uses the magnitudes, so it gives the size of the force only — you must add the direction yourself." },
      { q: "Why is the force so large for such small charges?", a: "Because k is enormous (8.99 × 10⁹) and electric forces are far stronger than gravity for everyday charges. A coulomb of charge is huge — a lightning bolt transfers only about 15 C." },
      { q: "What does the inverse square mean here?", a: "Doubling the separation divides the force by four, just as with gravity. Halving the separation multiplies it by four. The same 1/r² shape appears because both forces spread out over the surface of a sphere." },
    ],
    conversionNote: "Charges in coulombs: 1 µC = 10⁻⁶ C, 1 nC = 10⁻⁹ C. k = 8.99 × 10⁹ N·m²/C² in a vacuum.",
    relatedGuide: { slug: "electric-charge-field", title: "Electric charge and electric fields" },
  },
  "electric-field": {
    title: "Electric Field Calculator — E = F / q",
    description: "Calculate electric field strength from the force on a test charge (E = F / q) — the force a charge would feel at a point, measured in newtons per coulomb.",
    workedExample: {
      title: "Worked example — a test charge and a point charge",
      steps: [
        "A test charge of 0.02 C feels a force of 0.6 N.",
        "E = F / q = 0.6 / 0.02 = 30 N/C.",
        "Check: a 0.05 C charge placed at the same point would feel F = Eq = 30 × 0.05 = 1.5 N — the field is a property of the place, not of the test charge.",
        "Field of a point charge: Q = 1 µC (1 × 10⁻⁶ C) at 0.1 m. E = kQ / r² = 8.99 × 10⁹ × 1 × 10⁻⁶ / 0.01 = 8990 / 0.01 = 899,000 N/C.",
        "The field points away from a positive charge and towards a negative one — follow the direction a positive test charge would be pushed.",
      ],
    },
    faqs: [
      { q: "What is an electric field, really?", a: "A region where a charge feels a force. The field exists whether or not a test charge is there to feel it — the test charge is just how you measure it. E = F / q divides the measured force by the test charge to get the field itself." },
      { q: "What are the units of electric field?", a: "N/C — newtons per coulomb. The same quantity can be written in V/m (volts per metre), which is often more useful: 1 N/C = 1 V/m." },
      { q: "Why must the test charge be small?", a: "So it does not disturb the field it is measuring. A large test charge would attract or repel the charges creating the field and change the very thing you are trying to measure." },
    ],
    conversionNote: "q in coulombs; the test charge must not be zero. 1 N/C = 1 V/m.",
    relatedGuide: { slug: "electric-charge-field", title: "Electric charge and electric fields" },
  },
  "electric-potential": {
    title: "Electric Potential Calculator — V = U / q",
    description: "Calculate electric potential from potential energy and charge (V = U / q) — voltage as energy per coulomb, the push that drives current around a circuit.",
    workedExample: {
      title: "Worked example — 12 J on 2 C, and a battery",
      steps: [
        "Moving 2 C of charge through a potential difference takes 12 J of energy.",
        "V = U / q = 12 / 2 = 6 V.",
        "A 9 V battery gives every coulomb passing through it 9 J of energy: moving 4 C through it takes U = Vq = 9 × 4 = 36 J.",
        "Check: 100 J on 4 C gives V = 100 / 4 = 25 V. The same energy on twice the charge is half the potential — potential is energy per unit charge.",
        "Voltage is always a difference between two points. Saying a point is “at 6 V” means 6 V above whatever you chose as zero — usually the earth or the negative terminal.",
      ],
    },
    faqs: [
      { q: "What is the difference between electric potential and potential energy?", a: "Potential energy (U, in joules) is the energy a particular charge has. Potential (V, in volts) is energy per coulomb — divide the energy by the charge. Two different charges at the same point have different potential energies but the same potential." },
      { q: "Why is voltage measured in volts?", a: "One volt is one joule per coulomb: 1 V = 1 J/C. A 12 V battery gives each coulomb 12 J; a 1.5 V cell gives each coulomb 1.5 J." },
      { q: "Can electric potential be negative?", a: "Yes — it depends on where you put zero. Points near a negative charge have negative potential relative to infinity. Only potential differences drive currents, so the choice of zero is a convenience." },
    ],
    conversionNote: "Charge in coulombs; energy in joules. 1 V = 1 J/C. 1 eV = 1.602 × 10⁻¹⁹ J.",
    relatedGuide: { slug: "electric-potential-voltage", title: "Electric potential and voltage" },
  },
  "magnetic-force": {
    title: "Magnetic Force Calculator — F = qvB sin θ",
    description: "Calculate the magnetic force on a moving charge (F = |q|vB sin θ) — the force that bends particle beams, traps auroras and makes electric motors turn.",
    workedExample: {
      title: "Worked example — an electron-speed charge in a 0.5 T field",
      steps: [
        "A charge of 2 µC (2 × 10⁻⁶ C) moves at 1000 m/s through a 0.5 T field, at right angles to it (θ = 90°).",
        "F = |q|vB sin θ = 2 × 10⁻⁶ × 1000 × 0.5 × sin 90° = 2 × 10⁻⁶ × 1000 × 0.5 × 1.",
        "Working through: 2 × 10⁻⁶ × 1000 = 0.002; 0.002 × 0.5 = 0.001 N = 1 mN.",
        "At 30° to the field: sin 30° = 0.5, so F = 0.5 mN — half as much.",
        "Check: moving parallel to the field (θ = 0°) gives sin 0° = 0, so no force at all. The force is always perpendicular to both the velocity and the field, so it changes the charge's direction, not its speed.",
      ],
    },
    faqs: [
      { q: "Why is there no force when the charge moves parallel to the field?", a: "Because the force depends on sin θ, and sin 0° = 0. A charge moving along the field lines feels nothing; the force is largest at 90°, when the motion cuts across the field lines." },
      { q: "Which way does the force point?", a: "Perpendicular to both v and B, by Fleming's left-hand rule (or the right-hand rule for the cross product v × B). For a negative charge, the direction reverses." },
      { q: "Does the magnetic force do work on the charge?", a: "No — the force is always perpendicular to the velocity, so it never has a component along the motion. It bends the path into a circle but the speed (and the kinetic energy) stay the same." },
    ],
    conversionNote: "Charge in coulombs (1 µC = 10⁻⁶ C), speed in m/s, field in tesla. Angles in degrees.",
    relatedGuide: { slug: "magnetic-fields-forces", title: "Magnetic fields and magnetic forces" },
  },
  "magnetic-flux": {
    title: "Magnetic Flux Calculator — Φ = BA cos θ",
    description: "Calculate magnetic flux through a surface (Φ = BA cos θ) — the amount of magnetic field threading a loop, in webers, the starting point for induction.",
    workedExample: {
      title: "Worked example — a 0.5 m² loop in a 0.4 T field",
      steps: [
        "A flat loop of area A = 0.5 m² sits in a uniform field B = 0.4 T, with the field along the loop's normal (θ = 0°).",
        "Φ = BA cos θ = 0.4 × 0.5 × cos 0° = 0.4 × 0.5 × 1 = 0.2 Wb.",
        "Tilt the loop to 60° from the normal: Φ = 0.4 × 0.5 × cos 60° = 0.4 × 0.5 × 0.5 = 0.1 Wb — half the field threads the loop.",
        "Edge-on to the field (θ = 90°): Φ = 0.4 × 0.5 × 0 = 0 Wb. No field lines pass through the loop at all.",
        "Check: flux is largest when the field is perpendicular to the loop's surface (θ = 0° from the normal), which is when the loop catches the most field lines.",
      ],
    },
    faqs: [
      { q: "Is θ measured from the surface or from the normal?", a: "From the normal — the line perpendicular to the surface. That is the most common error in flux questions: an angle given to the surface itself must be converted (θ from normal = 90° − angle to surface) before using cos θ." },
      { q: "What is a weber?", a: "One weber is one tesla times one square metre: 1 Wb = 1 T·m². It is a small unit in practice — the 0.2 Wb in the example is a large flux for a laboratory magnet." },
      { q: "Why does flux matter?", a: "Because a changing flux induces an EMF: Faraday's law says the induced voltage equals the rate of change of flux. Generators, transformers and induction hobs all work by changing the flux through a coil." },
    ],
    conversionNote: "B in tesla, A in m². θ is the angle between B and the normal to the surface — not the angle to the surface itself.",
    relatedGuide: { slug: "electromagnetic-induction", title: "Electromagnetic induction" },
  },
  "latent-heat": {
    title: "Latent Heat Calculator — Q = mL",
    description: "Calculate the energy for a phase change at constant temperature (Q = mL) — melting ice, boiling water, and the energy hidden in every change of state.",
    workedExample: {
      title: "Worked example — melting ice and boiling water",
      steps: [
        "Melt 0.5 kg of ice at 0 °C. The specific latent heat of fusion of ice is L = 334,000 J/kg.",
        "Q = mL = 0.5 × 334,000 = 167,000 J (167 kJ). The temperature stays at 0 °C throughout.",
        "Boil 0.2 kg of water at 100 °C. The latent heat of vaporisation is L = 2,260,000 J/kg.",
        "Q = mL = 0.2 × 2,260,000 = 452,000 J (452 kJ).",
        "Check: boiling takes about 2.7 times the energy of melting the same mass (452 kJ for 0.2 kg against 167 kJ for 0.5 kg — per kilogram, 2,260,000 / 334,000 = 6.77 times more), which is why steam burns are so severe.",
        "This page is for phase changes at constant temperature. For warming a substance up, use the specific-heat calculator (specific-heat) with Q = mcΔT.",
      ],
    },
    faqs: [
      { q: "Why doesn't the temperature rise while ice melts?", a: "Because the energy goes into breaking the bonds between molecules, not into making them move faster. Temperature measures the average kinetic energy of the molecules, and during melting that stays constant while the structure changes." },
      { q: "What is the difference between latent heat of fusion and vaporisation?", a: "Fusion is solid to liquid (334,000 J/kg for ice); vaporisation is liquid to gas (2,260,000 J/kg for water). Vaporisation takes far more energy because the molecules must be pulled completely apart." },
      { q: "Can latent heat be negative?", a: "As a magnitude, no — but condensing steam releases energy, so the energy change of the steam is −452,000 J for 0.2 kg. Freezing water releases 334,000 J/kg into the surroundings, which is why a freezer must remove that heat." },
    ],
    conversionNote: "L in J/kg: fusion of ice 334,000 J/kg; vaporisation of water 2,260,000 J/kg. Energy in joules; divide by 1000 for kJ.",
    relatedGuide: { slug: "phase-changes-latent-heat", title: "Phase changes and latent heat" },
  },
  "thermal-expansion": {
    title: "Thermal Expansion Calculator — ΔL = αL₀ΔT",
    description: "Calculate how much a solid bar or rail lengthens when it is heated (ΔL = αL₀ΔT) — the expansion that leaves gaps in railway tracks, bridges and pipelines.",
    workedExample: {
      title: "Worked example — a 10 m steel rail and a 2 m aluminium rod",
      steps: [
        "A 10 m steel rail heats up by 50 K. Steel's linear expansion coefficient is α = 12 × 10⁻⁶ /K.",
        "ΔL = αL₀ΔT = 12 × 10⁻⁶ × 10 × 50 = 0.006 m = 6 mm.",
        "An aluminium rod, L₀ = 2 m, α = 23 × 10⁻⁶ /K, heated by 40 K: ΔL = 23 × 10⁻⁶ × 2 × 40 = 0.00184 m = 1.84 mm.",
        "Check: steel expands by 12 millionths of its length per kelvin, so 10 m × 50 K × 12 × 10⁻⁶ = 6 mm — a small change per metre, but a 100 m bridge span heated by 40 K grows by 12 × 10⁻⁶ × 100 × 40 = 48 mm, which is why bridges have expansion joints.",
        "Cooling reverses it: the same rail cooled by 50 K contracts by 6 mm.",
      ],
    },
    faqs: [
      { q: "What is α, the expansion coefficient?", a: "The fractional change in length per kelvin: α = (ΔL / L₀) / ΔT. Steel is 12 × 10⁻⁶ /K, aluminium 23 × 10⁻⁶ /K, concrete about 12 × 10⁻⁶ /K — which is why steel and concrete expand together and reinforced concrete does not crack." },
      { q: "Does ΔT use °C or K?", a: "Either — a change of 1 °C is exactly a change of 1 K. A rail warming from 10 °C to 60 °C has ΔT = 50 K, and you never need to convert to kelvin for a temperature change." },
      { q: "When does ΔL = αL₀ΔT not apply?", a: "For large temperature ranges, where α itself changes with temperature, and for liquids and gases, which expand far more and need volume expansion (ΔV = γV₀ΔT, with γ ≈ 3α for solids)." },
    ],
    conversionNote: "α in /K (steel 12 × 10⁻⁶, aluminium 23 × 10⁻⁶, copper 17 × 10⁻⁶). L₀ in metres; ΔT in K or °C.",
    relatedGuide: { slug: "temperature-heat", title: "Temperature, heat and internal energy" },
  },
  "ideal-gas-law": {
    title: "Ideal Gas Law Calculator — Pressure P = nRT/V",
    description: "Calculate gas pressure from moles, volume and temperature (PV = nRT) — the ideal gas law solved for pressure, with the kelvin trap and unit pitfalls explained.",
    workedExample: {
      title: "Worked example — 1 mol in 20 litres at 300 K",
      steps: [
        "A gas has n = 1 mol, volume V = 0.02 m³ (20 litres) and temperature T = 300 K. R = 8.314 J/(mol·K).",
        "P = nRT / V = 1 × 8.314 × 300 / 0.02 = 2494.2 / 0.02 = 124,710 Pa ≈ 125 kPa.",
        "Check at standard conditions: 1 mol at 273 K in 0.0224 m³ gives P = 8.314 × 273 / 0.0224 = 101,300 Pa ≈ 101 kPa — one atmosphere, as it should be.",
        "Double the temperature to 600 K at the same volume and the pressure doubles to about 249 kPa — pressure is proportional to absolute temperature.",
        "Halve the volume to 0.01 m³ at 300 K and the pressure doubles again to about 249 kPa — Boyle's law, P ∝ 1/V.",
      ],
    },
    faqs: [
      { q: "Why must temperature be in kelvin?", a: "Because the gas law uses absolute temperature. 300 K is twice as hot as 150 K in the only sense that matters for pressure, but 27 °C is not twice 13.5 °C. Using °C directly gives a wrong answer — always add 273.15." },
      { q: "When is a real gas not ideal?", a: "At high pressure or low temperature, where molecules are close together and their own volume and attractions matter. At room temperature and pressure, air, nitrogen and oxygen behave very nearly ideally." },
      { q: "What are the units of R?", a: "R = 8.314 J/(mol·K). With V in m³, n in mol and T in kelvin, the pressure comes out in pascals — no conversion needed, as long as every input is in SI units." },
    ],
    conversionNote: "T must be in kelvin (°C + 273.15). V in m³ (1 litre = 0.001 m³). 1 atm = 101,325 Pa; 1 bar = 100,000 Pa.",
    relatedGuide: { slug: "ideal-gas-law-guide", title: "The ideal gas law" },
  },
  "heat-transfer": {
    title: "Heat Transfer Calculator — Conduction Q̇ = kAΔT/L",
    description: "Calculate the rate of steady heat conduction through a slab (Q̇ = kAΔT / L) in watts — how fast heat leaks through a wall, a window, a roof or insulation.",
    workedExample: {
      title: "Worked example — heat leaking through insulation",
      steps: [
        "A wall has insulation with k = 0.04 W/m·K, area A = 10 m², temperature difference ΔT = 20 K and thickness L = 0.1 m.",
        "Q̇ = kAΔT / L = 0.04 × 10 × 20 / 0.1 = 8 / 0.1 = 80 W.",
        "Double the thickness to 0.2 m: Q̇ = 0.04 × 10 × 20 / 0.2 = 40 W — half the heat leak, which is why thicker insulation works.",
        "Check: a single-glazed window (k = 1.0 W/m·K for glass, L = 0.004 m, A = 1 m², ΔT = 20 K) leaks Q̇ = 1.0 × 1 × 20 / 0.004 = 5000 W — more than sixty times the whole insulated wall's 80 W, from a single square metre, which is why double glazing matters.",
        "This page is for steady one-dimensional conduction only. Convection (air movement) and radiation need different models — see the heat-transfer guide.",
      ],
    },
    faqs: [
      { q: "What is thermal conductivity k?", a: "How well a material conducts heat: copper is about 400 W/m·K, glass about 1.0, still air 0.026, and good insulation about 0.04. A low k means a good insulator." },
      { q: "Why does doubling the thickness halve the heat flow?", a: "Because the temperature drops gradually across the slab — a thicker slab has a gentler temperature gradient, and the heat flow is proportional to that gradient. Twice the thickness, half the gradient, half the flow." },
      { q: "Is this the total heat lost, or the rate?", a: "The rate, in watts (joules per second). Multiply by the time to get the total energy: 80 W for 10 hours is 80 × 36,000 = 2,880,000 J = 2.88 MJ." },
    ],
    conversionNote: "k in W/m·K, A in m², L in metres, ΔT in K (or °C — a difference is the same in both).",
    relatedGuide: { slug: "heat-transfer-methods", title: "Conduction, convection and radiation" },
  },
  "snells-law": {
    title: "Snell's Law Calculator — Refraction Angle θ₂",
    description: "Calculate the refracted angle when light crosses into a new material (n₁ sin θ₁ = n₂ sin θ₂) — air to glass, water to air, and total internal reflection.",
    workedExample: {
      title: "Worked example — air to glass, and glass to air",
      steps: [
        "Light enters glass (n₂ = 1.5) from air (n₁ = 1) at 30° to the normal.",
        "θ₂ = asin(n₁ sin θ₁ / n₂) = asin(1 × sin 30° / 1.5) = asin(0.5 / 1.5) = asin(0.3333) = 19.5°.",
        "The ray bends towards the normal, from 30° to 19.5°, because glass is optically denser.",
        "Going the other way — glass to air at 30°: θ₂ = asin(1.5 × 0.5 / 1) = asin(0.75) = 48.6°. The ray bends away from the normal.",
        "Check the critical angle for glass to air: θc = asin(n₂ / n₁) = asin(1 / 1.5) = 41.8°. Beyond 41.8° there is no refracted ray at all — total internal reflection, which is how fibre optics work.",
      ],
    },
    faqs: [
      { q: "Is the angle measured from the surface or the normal?", a: "From the normal — the line perpendicular to the surface. A ray arriving at 60° to the surface is at 30° to the normal, and using 60° in Snell's law gives a completely wrong answer." },
      { q: "Why does light bend when it changes medium?", a: "Because its speed changes. Light travels slower in glass (c / 1.5) than in air, so the part of the wavefront that enters first slows first, and the wavefront swings towards the normal — like a car hitting mud on one side." },
      { q: "What happens past the critical angle?", a: "Total internal reflection: no light escapes, and all of it reflects inside the denser medium. This only happens going from a denser to a less dense medium, never the other way." },
    ],
    conversionNote: "Angles in degrees, measured from the normal. n for air ≈ 1.00, water 1.33, glass 1.5, diamond 2.42.",
    relatedGuide: { slug: "snells-law-guide", title: "Snell’s law and total internal reflection" },
  },
  "thin-lens": {
    title: "Thin Lens Calculator — Image Distance 1/f",
    description: "Calculate image distance for a thin lens (1/f = 1/do + 1/di) — where a converging or diverging lens forms its image, real or virtual, and how big it is.",
    workedExample: {
      title: "Worked example — a converging lens, f = 10 cm",
      steps: [
        "A converging lens has focal length f = 0.1 m. An object stands do = 0.3 m from it.",
        "1/di = 1/f − 1/do = 1/0.1 − 1/0.3 = 10 − 3.333 = 6.667 m⁻¹.",
        "di = 1 / 6.667 = 0.15 m — a real image 15 cm beyond the lens.",
        "Magnification m = −di / do = −0.15 / 0.3 = −0.5: the image is half the size and inverted (see the magnification calculator, magnification).",
        "A diverging lens with f = −0.1 m and the same object: 1/di = 1/(−0.1) − 1/0.3 = −10 − 3.333 = −13.333, so di = −0.075 m — a virtual image 7.5 cm on the same side as the object.",
      ],
    },
    faqs: [
      { q: "What does a negative image distance mean?", a: "A virtual image, on the same side of the lens as the object — the rays only appear to come from there. A magnifying glass forms a virtual, upright, enlarged image, so its di is negative." },
      { q: "What happens when the object is at the focal length?", a: "The formula breaks down: 1/f − 1/do = 0, so di is infinite. The rays leave the lens parallel and meet at infinity — that is how a projector's lamp and a searchlight work." },
      { q: "Which sign convention does this calculator use?", a: "Real-is-positive: distances to real images and real objects are positive, focal length is positive for a converging lens and negative for a diverging lens. Other textbooks use different conventions, so check before mixing formulas." },
    ],
    conversionNote: "f and do in metres (10 cm = 0.1 m). Object distance cannot equal the focal length — the image is at infinity.",
    relatedGuide: { slug: "thin-lenses", title: "Thin lenses and image formation" },
  },
  "magnification": {
    title: "Magnification Calculator — m = hi / ho",
    description: "Calculate lens magnification (m = hi / ho) — how much bigger the image is than the object, and whether it is upright or inverted, for lenses and mirrors.",
    workedExample: {
      title: "Worked example — an image twice as tall, and one half size",
      steps: [
        "An object 0.03 m tall forms an image 0.06 m tall.",
        "m = hi / ho = 0.06 / 0.03 = 2 — the image is twice as tall as the object.",
        "From distances: an image at di = 0.15 m from an object at do = 0.3 m gives m = −di / do = −0.15 / 0.3 = −0.5. The minus sign means inverted, and 0.5 means half size.",
        "Check: the two routes agree in size — the first example's image is enlarged (m = 2) and the second is diminished (m = 0.5). A magnification of 1 means the image is life size.",
        "To find where that image forms, use the thin-lens calculator (thin-lens) with 1/f = 1/do + 1/di.",
      ],
    },
    faqs: [
      { q: "What does a negative magnification mean?", a: "The image is inverted relative to the object. A magnification of −0.5 means the image is upside down and half the size; a magnification of +2 means upright and twice the size, as from a magnifying glass." },
      { q: "Is magnification in any units?", a: "No — it is a ratio of two lengths, so the units cancel. Magnification is dimensionless, which is why you can measure hi and ho in centimetres, millimetres or metres as long as they match." },
      { q: "Can magnification be less than 1?", a: "Yes — that is a diminished image, smaller than the object. A camera forms a much-diminished image on its sensor (m ≈ 0.01), while a microscope forms a greatly magnified one (m ≈ 100 or more)." },
    ],
    conversionNote: "hi and ho must be in the same units — both metres, or both centimetres. m is dimensionless.",
    relatedGuide: { slug: "thin-lenses", title: "Thin lenses and image formation" },
  },
};
