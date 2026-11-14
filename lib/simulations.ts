export type Simulation={slug:string;title:string;description:string;whenToUse?:string;concept:string};
export const simulations:Simulation[] = [
  {
    "slug": "projectile-lab",
    "title": "Projectile motion lab",
    "description": "Change launch speed, angle and height to see how a projectile's flight time and range respond, with the full trajectory drawn live from your own values.",
    "whenToUse": "Use it before a projectile problem to build intuition: try 45° first, then see how a higher launch height changes the range.",
    "concept": "Range and flight time"
  },
  {
    "slug": "free-fall-lab",
    "title": "Free-fall laboratory",
    "description": "Drop an object from any height and watch how fall time and impact speed grow, showing gravity's constant acceleration in action as you change the height.",
    "whenToUse": "Use it when checking a drop-time calculation, for example how long a ball takes to fall from a 20 m balcony.",
    "concept": "Distance vs time"
  },
  {
    "slug": "motion-graphs",
    "title": "Motion graph explorer",
    "description": "Set initial velocity, acceleration and time to trace a velocity-time graph, where the shaded area under the line gives the displacement directly from the graph.",
    "whenToUse": "Use it when a velocity-time graph question asks for displacement: set the values and read the shaded area under the line.",
    "concept": "Position, velocity and acceleration"
  },
  {
    "slug": "newtons-second-law",
    "title": "Newton’s second law lab",
    "description": "Vary mass and net force to find the acceleration, seeing Newton's second law F = ma work as a live, adjustable experiment you control with live values.",
    "whenToUse": "Use it when F = ma gives a surprising answer: double the mass and watch the acceleration halve for the same force.",
    "concept": "F = ma"
  },
  {
    "slug": "friction-lab",
    "title": "Friction explorer",
    "description": "Adjust friction coefficient and normal force to find the friction force, and see why a heavier load is harder to slide across a rough surface than a light one.",
    "whenToUse": "Use it when a sliding-block problem asks for the friction force, for example a 50 kg crate pushed across a floor with μ = 0.4.",
    "concept": "Ff = μN"
  },
  {
    "slug": "energy-skate",
    "title": "Energy transformation model",
    "description": "Change mass and height to track gravitational potential energy turning into speed at the bottom of a frictionless slope, with total energy conserved throughout.",
    "whenToUse": "Use it when an energy-conservation problem asks for speed at the bottom of a slope: raise the height and watch the speed grow.",
    "concept": "Mechanical energy conservation"
  },
  {
    "slug": "collision-lab",
    "title": "One-dimensional collision lab",
    "description": "Set two masses and a starting speed to check total momentum before impact and the shared speed if the objects stick together after impact, momentum conserved.",
    "whenToUse": "Use it when a momentum question asks what happens after two trolleys collide and stick, before doing the algebra by hand.",
    "concept": "Momentum conservation"
  },
  {
    "slug": "circular-motion",
    "title": "Circular motion explorer",
    "description": "Change speed, radius and mass to measure centripetal acceleration and the inward force that keeps an object moving in a circle at constant speed, shown live.",
    "whenToUse": "Use it when a cornering-car question asks for the inward force: raise the speed and see the force grow with v².",
    "concept": "ac = v²/r"
  },
  {
    "slug": "spring-oscillator",
    "title": "Mass-spring oscillator",
    "description": "Vary mass and spring stiffness to find the period and frequency of a mass-spring oscillator, and see how a stiffer spring speeds the swing for the same mass.",
    "whenToUse": "Use it when a mass-spring question asks for the period: stiffen the spring and watch the period shrink.",
    "concept": "T = 2π√(m/k)"
  },
  {
    "slug": "pendulum-lab",
    "title": "Simple pendulum lab",
    "description": "Change a pendulum's length to find its small-angle period and frequency, showing why longer pendulums swing more slowly than short ones, for the same gravity.",
    "whenToUse": "Use it when a pendulum-clock question asks how length changes the period, for example doubling the length of a 1 m pendulum.",
    "concept": "T = 2π√(L/g)"
  },
  {
    "slug": "wave-lab",
    "title": "Wave parameter lab",
    "description": "Adjust frequency and wavelength to find wave speed from frequency and wavelength, with a sine wave drawn so a wavelength is marked out for you to measure.",
    "whenToUse": "Use it when a wave question gives frequency and asks for wavelength: adjust the sliders until the speed matches the given value.",
    "concept": "v = fλ"
  },
  {
    "slug": "sound-beats",
    "title": "Sound wave superposition",
    "description": "Combine two close tones to hear the idea of beats: the beat frequency is the difference between the tones, shown as a pulsing envelope on the summed wave.",
    "whenToUse": "Use it when two nearly identical notes sound wobbly together, for example tuning a guitar string against a 440 Hz reference tone.",
    "concept": "Beat frequency"
  },
  {
    "slug": "ohms-law-lab",
    "title": "Ohm’s law circuit",
    "description": "Change voltage and resistance in a simple circuit to find the current and power in a loop, with the current arrow following Ohm's law V = IR around the loop.",
    "whenToUse": "Use it when a circuit question asks for current: raise the resistance and watch the current fall for the same voltage.",
    "concept": "V = IR"
  },
  {
    "slug": "lens-lab",
    "title": "Thin lens explorer",
    "description": "Move an object in front of a thin lens to locate its image, check the magnification, and see focal points, object and image arrows and rays drawn to scale.",
    "whenToUse": "Use it when a lens question asks where the image forms: move the object closer than the focal length and watch the image go virtual.",
    "concept": "1/f = 1/do + 1/di"
  },
  {
    "slug": "gas-law-lab",
    "title": "Ideal gas explorer",
    "description": "Change amount, temperature and volume to find the pressure of an ideal gas, with a piston diagram showing the gas pushing outward on the cylinder walls.",
    "whenToUse": "Use it when an ideal-gas question asks for pressure: compress the volume and watch the pressure rise at fixed temperature.",
    "concept": "PV = nRT"
  }
] as const;