import { calculators } from './calculators';
import { guides } from './guides';
import { converters } from './converters';
import { simulations } from './simulations';
import { fitTitle, fitDescription } from './seo';

export type Topic = {
  slug: string;
  name: string;
  /** Exact category string from lib/calculators.ts. */
  category: string;
  /** 150-160 chars, unique across hubs. */
  description: string;
  keyword: string;
  intent: string;
};

export const topics: Topic[] = [
  {
    slug: 'kinematics',
    name: 'Kinematics',
    category: 'Kinematics',
    description:
      'Learn motion with kinematics calculators, guides and simulations: velocity, acceleration, SUVAT, projectile motion and free fall, in SI units, with examples.',
    keyword: 'kinematics calculator',
    intent: 'Calculate motion quantities — velocity, acceleration, displacement and time — and learn the SUVAT equations.',
  },
  {
    slug: 'forces-dynamics',
    name: 'Forces & Dynamics',
    category: 'Forces & Dynamics',
    description:
      "Explore forces and dynamics: Newton's laws, friction, tension, inclined planes, weight, drag and pressure, with calculators and guides showing every equation.",
    keyword: 'force calculator',
    intent: 'Calculate forces and understand Newton’s laws, friction, tension and pressure in everyday situations.',
  },
  {
    slug: 'work-energy-power',
    name: 'Work, Energy & Power',
    category: 'Work, Energy & Power',
    description:
      'Understand work, energy and power: kinetic and potential energy, springs, mechanical energy, efficiency and power, with calculators and worked examples.',
    keyword: 'kinetic energy calculator',
    intent: 'Calculate work, kinetic and potential energy, power and efficiency, and see how energy is transferred.',
  },
  {
    slug: 'momentum-rotation',
    name: 'Momentum & Rotation',
    category: 'Momentum & Rotation',
    description:
      'Master momentum and rotation: impulse, collisions, angular velocity, torque, moment of inertia and rotational energy, with calculators, guides and simulations.',
    keyword: 'momentum calculator',
    intent: 'Calculate momentum, impulse and rotational quantities, and understand collisions and torque.',
  },
  {
    slug: 'gravitation-circular-motion',
    name: 'Gravitation & Circular Motion',
    category: 'Gravitation & Circular Motion',
    description:
      'Study gravitation and circular motion: universal gravitation, planetary gravity, escape and orbital velocity and orbital period, with calculators and guides.',
    keyword: 'gravitational force calculator',
    intent: 'Calculate gravitational force, orbital and escape velocity, and understand circular motion and orbits.',
  },
  {
    slug: 'waves-oscillations',
    name: 'Waves & Oscillations',
    category: 'Waves & Oscillations',
    description:
      'Explore waves and oscillations: wave speed, wavelength, frequency, pendulums, springs and the Doppler effect, with calculators, simulations and clear guides.',
    keyword: 'wave speed calculator',
    intent: 'Calculate wave speed, frequency and period, and explore pendulums, springs and the Doppler effect.',
  },
  {
    slug: 'electricity-magnetism',
    name: 'Electricity & Magnetism',
    category: 'Electricity & Magnetism',
    description:
      "Learn electricity and magnetism: Ohm's law, resistance, circuits, Coulomb's law, electric fields, potential and magnetic force, with calculators and guides.",
    keyword: 'ohms law calculator',
    intent: 'Calculate voltage, current, resistance and power, and understand circuits, fields and magnetism.',
  },
  {
    slug: 'thermodynamics-optics',
    name: 'Thermodynamics & Optics',
    category: 'Thermodynamics & Optics',
    description:
      "Study thermodynamics and optics: specific and latent heat, thermal expansion, the ideal gas law, heat transfer, Snell's law and lenses, with tools and guides.",
    keyword: 'specific heat calculator',
    intent: 'Calculate heat, temperature change and gas-law quantities, and understand lenses and refraction.',
  },
];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function topicTitle(t: Topic): string {
  return fitTitle(`${t.name} Calculators & Guides`);
}

export function topicDescription(t: Topic): string {
  return fitDescription(t.description);
}

/**
 * Every guide belongs to exactly one hub. Guide categories in lib/guides.ts
 * are mechanics / waves / electricity / thermodynamics / optics / modern.
 * Mechanics guides are split by subject across the five mechanics hubs.
 * The two "modern" guides have no dedicated hub: special relativity goes to
 * Gravitation & Circular Motion (relativity reshaped our picture of gravity)
 * and quantum physics to Electricity & Magnetism (quantum behaviour of
 * electrons underpins electricity and atomic structure).
 */
export const guideHubMap: Record<string, string> = {
  'kinematics-basics': 'kinematics',
  'motion-graphs': 'kinematics',
  'constant-acceleration-equations': 'kinematics',
  'projectile-motion-guide': 'kinematics',
  'newtons-laws': 'forces-dynamics',
  'free-body-diagrams': 'forces-dynamics',
  'friction-static-kinetic': 'forces-dynamics',
  'work-energy-theorem': 'work-energy-power',
  'conservation-energy': 'work-energy-power',
  'momentum-impulse': 'momentum-rotation',
  'elastic-inelastic-collisions': 'momentum-rotation',
  'rotational-motion': 'momentum-rotation',
  'gravitation-orbits': 'gravitation-circular-motion',
  'circular-motion': 'gravitation-circular-motion',
  'special-relativity-intro': 'gravitation-circular-motion',
  'wave-properties': 'waves-oscillations',
  'sound-waves': 'waves-oscillations',
  'doppler-effect-guide': 'waves-oscillations',
  'simple-harmonic-motion': 'waves-oscillations',
  'electric-charge-field': 'electricity-magnetism',
  'electric-potential-voltage': 'electricity-magnetism',
  'ohms-law-guide': 'electricity-magnetism',
  'series-parallel-circuits': 'electricity-magnetism',
  'electric-power-energy': 'electricity-magnetism',
  'magnetic-fields-forces': 'electricity-magnetism',
  'electromagnetic-induction': 'electricity-magnetism',
  'quantum-physics-intro': 'electricity-magnetism',
  'temperature-heat': 'thermodynamics-optics',
  'specific-heat-capacity': 'thermodynamics-optics',
  'phase-changes-latent-heat': 'thermodynamics-optics',
  'ideal-gas-law-guide': 'thermodynamics-optics',
  'heat-transfer-methods': 'thermodynamics-optics',
  'reflection-refraction': 'thermodynamics-optics',
  'snells-law-guide': 'thermodynamics-optics',
  'thin-lenses': 'thermodynamics-optics',
};

/** Converters are grouped by the quantity they convert. */
export const converterHubMap: Record<string, string> = {
  length: 'kinematics',
  time: 'kinematics',
  speed: 'kinematics',
  acceleration: 'kinematics',
  force: 'forces-dynamics',
  pressure: 'forces-dynamics',
  energy: 'work-energy-power',
  power: 'work-energy-power',
  angle: 'momentum-rotation',
  frequency: 'waves-oscillations',
  mass: 'thermodynamics-optics',
  density: 'thermodynamics-optics',
  volume: 'thermodynamics-optics',
  area: 'thermodynamics-optics',
  temperature: 'thermodynamics-optics',
};

/** Simulations are grouped by the concept they model. */
export const simulationHubMap: Record<string, string> = {
  'projectile-lab': 'kinematics',
  'free-fall-lab': 'kinematics',
  'motion-graphs': 'kinematics',
  'newtons-second-law': 'forces-dynamics',
  'friction-lab': 'forces-dynamics',
  'energy-skate': 'work-energy-power',
  'collision-lab': 'momentum-rotation',
  'circular-motion': 'gravitation-circular-motion',
  'spring-oscillator': 'waves-oscillations',
  'pendulum-lab': 'waves-oscillations',
  'wave-lab': 'waves-oscillations',
  'sound-beats': 'waves-oscillations',
  'ohms-law-lab': 'electricity-magnetism',
  'lens-lab': 'thermodynamics-optics',
  'gas-law-lab': 'thermodynamics-optics',
};

export function topicForGuide(guideSlug: string): Topic | undefined {
  const hub = guideHubMap[guideSlug];
  return hub ? getTopic(hub) : undefined;
}

export function topicForCalculator(category: string): Topic | undefined {
  return topics.find((t) => t.category === category);
}

export function calculatorsForTopic(slug: string) {
  const topic = getTopic(slug);
  if (!topic) return [];
  return calculators.filter((c) => c.category === topic.category);
}

export function guidesForTopic(slug: string) {
  return guides.filter((g) => guideHubMap[g.slug] === slug);
}

export function convertersForTopic(slug: string) {
  return converters.filter((c) => converterHubMap[c.slug] === slug);
}

export function simulationsForTopic(slug: string) {
  return simulations.filter((s) => simulationHubMap[s.slug] === slug);
}
