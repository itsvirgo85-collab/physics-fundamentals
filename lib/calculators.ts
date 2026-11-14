export type Calculator = {slug:string;name:string;category:string;description:string;formula:string;variables:string[];kind:string};
const groups: [string,string[]][] = [
['Kinematics',['Velocity','Average velocity','Acceleration','Final velocity','Initial velocity','Displacement','Distance travelled','Free fall time','Free fall distance','Projectile motion','SUVAT']],
['Forces & Dynamics',['Newton’s second law','Net force','Friction force','Normal force','Tension force','Inclined plane','Weight force','Centripetal force','Drag force','Pressure']],
['Work, Energy & Power',['Work','Work at an angle','Kinetic energy','Gravitational potential energy','Spring potential energy','Mechanical energy','Power','Efficiency']],
['Momentum & Rotation',['Momentum','Impulse','Collision momentum','Angular velocity','Angular acceleration','Torque','Moment of inertia','Rotational kinetic energy']],
['Gravitation & Circular Motion',['Gravitational force','Gravity on planets','Escape velocity','Orbital velocity','Centripetal acceleration','Orbital period']],
['Waves & Oscillations',['Wave speed','Wavelength','Frequency','Wave period','Pendulum period','Spring oscillation period','Doppler effect']],
['Electricity & Magnetism',['Ohm’s law','Electric power','Resistance','Series and parallel resistance','Coulomb’s law','Electric field','Electric potential','Magnetic force','Magnetic flux']],
['Thermodynamics & Optics',['Specific heat','Latent heat','Thermal expansion','Ideal gas law','Heat transfer','Snell’s law','Thin lens','Magnification','Density']]
];
const slugify=(s:string)=>s.toLowerCase().replace(/[’']/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const calculators:Calculator[]=groups.flatMap(([category,names])=>names.map(name=>({slug:slugify(name),name,category,description:`Calculate ${name.toLowerCase()} using a stated physics equation, SI inputs and model assumptions.`,formula:'See calculator inputs and working',variables:[],kind:slugify(name)})));
export const categories=groups.map(([name])=>name);
export function getCalculator(slug:string){return calculators.find(c=>c.slug===slug)}
