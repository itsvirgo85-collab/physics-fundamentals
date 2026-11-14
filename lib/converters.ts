export type Unit={name:string;symbol:string;factor:number};
export type Converter={slug:string;name:string;description:string;whenToUse?:string;units:Unit[]};
export const converters:Converter[] = [
  {
    "slug": "length",
    "name": "Length",
    "description": "Convert lengths between metres, kilometres, miles, feet, inches and more, so distances from lab benches to road trips all use one consistent unit in seconds.",
    "whenToUse": "Use it when a problem mixes units, for example converting a 5 km run into metres before finding a speed in m/s.",
    "units": [
      {
        "name": "Metre",
        "symbol": "m",
        "factor": 1
      },
      {
        "name": "Kilometre",
        "symbol": "km",
        "factor": 1000
      },
      {
        "name": "Centimetre",
        "symbol": "cm",
        "factor": 0.01
      },
      {
        "name": "Millimetre",
        "symbol": "mm",
        "factor": 0.001
      },
      {
        "name": "Mile",
        "symbol": "mi",
        "factor": 1609.344
      },
      {
        "name": "Yard",
        "symbol": "yd",
        "factor": 0.9144
      },
      {
        "name": "Foot",
        "symbol": "ft",
        "factor": 0.3048
      },
      {
        "name": "Inch",
        "symbol": "in",
        "factor": 0.0254
      }
    ]
  },
  {
    "slug": "mass",
    "name": "Mass",
    "description": "Convert masses between kilograms, grams, pounds, ounces and stone, making it easy to compare lab measurements with everyday weights and kitchen recipes.",
    "whenToUse": "Use it when a recipe in ounces must become grams, or when a lab mass in kilograms needs pounds for a real-world comparison.",
    "units": [
      {
        "name": "Kilogram",
        "symbol": "kg",
        "factor": 1
      },
      {
        "name": "Gram",
        "symbol": "g",
        "factor": 0.001
      },
      {
        "name": "Milligram",
        "symbol": "mg",
        "factor": 1e-06
      },
      {
        "name": "Metric tonne",
        "symbol": "t",
        "factor": 1000
      },
      {
        "name": "Pound",
        "symbol": "lb",
        "factor": 0.45359237
      },
      {
        "name": "Ounce",
        "symbol": "oz",
        "factor": 0.028349523125
      },
      {
        "name": "Stone",
        "symbol": "st",
        "factor": 6.35029318
      }
    ]
  },
  {
    "slug": "time",
    "name": "Time",
    "description": "Convert time between seconds, minutes, hours, days and weeks, so periods, durations and schedules can all be compared on a single scale, whatever the units.",
    "whenToUse": "Use it when a period in milliseconds must become seconds before using T = 1/f, or when comparing race times given in different units.",
    "units": [
      {
        "name": "Second",
        "symbol": "s",
        "factor": 1
      },
      {
        "name": "Millisecond",
        "symbol": "ms",
        "factor": 0.001
      },
      {
        "name": "Minute",
        "symbol": "min",
        "factor": 60
      },
      {
        "name": "Hour",
        "symbol": "h",
        "factor": 3600
      },
      {
        "name": "Day",
        "symbol": "d",
        "factor": 86400
      },
      {
        "name": "Week",
        "symbol": "wk",
        "factor": 604800
      }
    ]
  },
  {
    "slug": "speed",
    "name": "Speed",
    "description": "Convert speeds between metres per second, kilometres per hour, miles per hour and knots, for comparing vehicles, winds, aircraft and other moving objects.",
    "whenToUse": "Use it when a car's 100 km/h must become m/s for a stopping-distance calculation, or when comparing wind speeds in knots and mph.",
    "units": [
      {
        "name": "Metres per second",
        "symbol": "m/s",
        "factor": 1
      },
      {
        "name": "Kilometres per hour",
        "symbol": "km/h",
        "factor": 0.2777777777777778
      },
      {
        "name": "Miles per hour",
        "symbol": "mph",
        "factor": 0.44704
      },
      {
        "name": "Foot per second",
        "symbol": "ft/s",
        "factor": 0.3048
      },
      {
        "name": "Knot",
        "symbol": "kn",
        "factor": 0.514444444
      }
    ]
  },
  {
    "slug": "acceleration",
    "name": "Acceleration",
    "description": "Convert acceleration between metres per second squared, g-force, gal and feet per second squared, for motion, vehicle, rocket and free-fall drop problems.",
    "whenToUse": "Use it when a roller-coaster acceleration given in g must become m/s², or when a textbook answer needs gal instead of m/s².",
    "units": [
      {
        "name": "Metres per second squared",
        "symbol": "m/s²",
        "factor": 1
      },
      {
        "name": "Gal",
        "symbol": "Gal",
        "factor": 0.01
      },
      {
        "name": "Standard gravity",
        "symbol": "g₀",
        "factor": 9.80665
      },
      {
        "name": "Foot per second squared",
        "symbol": "ft/s²",
        "factor": 0.3048
      }
    ]
  },
  {
    "slug": "force",
    "name": "Force",
    "description": "Convert forces between newtons, kilonewtons, pound-force and dynes, so pushes, pulls and weights can be compared in the unit that a given problem needs.",
    "whenToUse": "Use it when a force in pound-force from a US source must become newtons, or when comparing engine thrusts in kilonewtons.",
    "units": [
      {
        "name": "Newton",
        "symbol": "N",
        "factor": 1
      },
      {
        "name": "Kilonewton",
        "symbol": "kN",
        "factor": 1000
      },
      {
        "name": "Millinewton",
        "symbol": "mN",
        "factor": 0.001
      },
      {
        "name": "Pound-force",
        "symbol": "lbf",
        "factor": 4.4482216152605
      },
      {
        "name": "Dyne",
        "symbol": "dyn",
        "factor": 1e-05
      }
    ]
  },
  {
    "slug": "energy",
    "name": "Energy",
    "description": "Convert energy between joules, calories, kilowatt-hours and electronvolts, linking food energy, electricity bills, fuels, batteries and particle physics.",
    "whenToUse": "Use it when a food label's 250 kcal must become joules, or when an electricity bill in kWh must become joules for a physics problem.",
    "units": [
      {
        "name": "Joule",
        "symbol": "J",
        "factor": 1
      },
      {
        "name": "Kilojoule",
        "symbol": "kJ",
        "factor": 1000
      },
      {
        "name": "Calorie (thermochemical)",
        "symbol": "cal",
        "factor": 4.184
      },
      {
        "name": "Kilocalorie",
        "symbol": "kcal",
        "factor": 4184
      },
      {
        "name": "Kilowatt-hour",
        "symbol": "kWh",
        "factor": 3600000
      },
      {
        "name": "Electronvolt",
        "symbol": "eV",
        "factor": 1.602176634e-19
      },
      {
        "name": "Foot-pound",
        "symbol": "ft·lbf",
        "factor": 1.355817948
      }
    ]
  },
  {
    "slug": "power",
    "name": "Power",
    "description": "Convert power between watts, kilowatts, megawatts and horsepower, for comparing light bulbs, engines, motors and electrical appliances and power plants fairly.",
    "whenToUse": "Use it when comparing a 2 hp motor with a 1500 W heater, or when a power-station output in megawatts must become watts.",
    "units": [
      {
        "name": "Watt",
        "symbol": "W",
        "factor": 1
      },
      {
        "name": "Kilowatt",
        "symbol": "kW",
        "factor": 1000
      },
      {
        "name": "Megawatt",
        "symbol": "MW",
        "factor": 1000000.0
      },
      {
        "name": "Mechanical horsepower",
        "symbol": "hp",
        "factor": 745.6998716
      },
      {
        "name": "Metric horsepower",
        "symbol": "PS",
        "factor": 735.49875
      }
    ]
  },
  {
    "slug": "pressure",
    "name": "Pressure",
    "description": "Convert pressure between pascals, bar, atmospheres, psi and torr, so tyre, weather, diving, scuba-tank and laboratory pressures share one common scale.",
    "whenToUse": "Use it when a tyre pressure of 32 psi must become pascals, or when a weather report in millibar must become hectopascals.",
    "units": [
      {
        "name": "Pascal",
        "symbol": "Pa",
        "factor": 1
      },
      {
        "name": "Kilopascal",
        "symbol": "kPa",
        "factor": 1000
      },
      {
        "name": "Bar",
        "symbol": "bar",
        "factor": 100000
      },
      {
        "name": "Standard atmosphere",
        "symbol": "atm",
        "factor": 101325
      },
      {
        "name": "Pounds per square inch",
        "symbol": "psi",
        "factor": 6894.757293
      },
      {
        "name": "Torr",
        "symbol": "Torr",
        "factor": 133.32236842105263
      },
      {
        "name": "Millibar",
        "symbol": "mbar",
        "factor": 100
      }
    ]
  },
  {
    "slug": "area",
    "name": "Area",
    "description": "Convert areas between square metres, square feet, acres and hectares, for comparing rooms, fields and plots of land in the unit that fits each job best.",
    "whenToUse": "Use it when a 2-acre field must become square metres for a fencing calculation, or when comparing flat sizes in square feet.",
    "units": [
      {
        "name": "Square metre",
        "symbol": "m²",
        "factor": 1
      },
      {
        "name": "Square kilometre",
        "symbol": "km²",
        "factor": 1000000.0
      },
      {
        "name": "Square centimetre",
        "symbol": "cm²",
        "factor": 0.0001
      },
      {
        "name": "Square foot",
        "symbol": "ft²",
        "factor": 0.09290304
      },
      {
        "name": "Square inch",
        "symbol": "in²",
        "factor": 0.00064516
      },
      {
        "name": "Acre",
        "symbol": "acre",
        "factor": 4046.8564224
      },
      {
        "name": "Hectare",
        "symbol": "ha",
        "factor": 10000
      }
    ]
  },
  {
    "slug": "volume",
    "name": "Volume",
    "description": "Convert volumes between cubic metres, litres, millilitres and US gallons, for recipes, tanks, containers, beakers, flasks and laboratory measurements.",
    "whenToUse": "Use it when a recipe needs 500 mL in litres, or when a 10 US gallon tank must become litres before a density calculation.",
    "units": [
      {
        "name": "Cubic metre",
        "symbol": "m³",
        "factor": 1
      },
      {
        "name": "Litre",
        "symbol": "L",
        "factor": 0.001
      },
      {
        "name": "Millilitre",
        "symbol": "mL",
        "factor": 1e-06
      },
      {
        "name": "US gallon",
        "symbol": "US gal",
        "factor": 0.003785411784
      },
      {
        "name": "US fluid ounce",
        "symbol": "US fl oz",
        "factor": 2.95735295625e-05
      },
      {
        "name": "Cubic foot",
        "symbol": "ft³",
        "factor": 0.028316846592
      }
    ]
  },
  {
    "slug": "density",
    "name": "Density",
    "description": "Convert density between kilograms per cubic metre, grams per cubic centimetre and pounds per cubic foot, for materials, mixtures, floating and buoyancy work.",
    "whenToUse": "Use it when a material's density of 2.7 g/cm³ must become kg/m³, or when checking whether an object floats in water.",
    "units": [
      {
        "name": "Kilogram per cubic metre",
        "symbol": "kg/m³",
        "factor": 1
      },
      {
        "name": "Gram per cubic centimetre",
        "symbol": "g/cm³",
        "factor": 1000
      },
      {
        "name": "Gram per litre",
        "symbol": "g/L",
        "factor": 1
      },
      {
        "name": "Pound per cubic foot",
        "symbol": "lb/ft³",
        "factor": 16.01846337
      }
    ]
  },
  {
    "slug": "frequency",
    "name": "Frequency",
    "description": "Convert frequency between hertz, kilohertz, megahertz, gigahertz and rpm, for waves, sound, radio signals, audio tones, turntables and rotating machinery.",
    "whenToUse": "Use it when a radio station at 98 MHz must become hertz, or when a motor's 3000 rpm must become hertz for a period calculation.",
    "units": [
      {
        "name": "Hertz",
        "symbol": "Hz",
        "factor": 1
      },
      {
        "name": "Kilohertz",
        "symbol": "kHz",
        "factor": 1000
      },
      {
        "name": "Megahertz",
        "symbol": "MHz",
        "factor": 1000000.0
      },
      {
        "name": "Gigahertz",
        "symbol": "GHz",
        "factor": 1000000000.0
      },
      {
        "name": "Revolutions per minute",
        "symbol": "rpm",
        "factor": 0.016666666666666666
      }
    ]
  },
  {
    "slug": "angle",
    "name": "Angle",
    "description": "Convert angles between radians, degrees, revolutions and arcminutes, so trigonometry, rotation, astronomy and navigation problems always use matching units.",
    "whenToUse": "Use it when a 30° angle must become radians before using it in a formula, or when a full revolution must become degrees.",
    "units": [
      {
        "name": "Radian",
        "symbol": "rad",
        "factor": 1
      },
      {
        "name": "Degree",
        "symbol": "°",
        "factor": 0.017453292519943295
      },
      {
        "name": "Revolution",
        "symbol": "rev",
        "factor": 6.283185307179586
      },
      {
        "name": "Arcminute",
        "symbol": "arcmin",
        "factor": 0.0002908882086657216
      }
    ]
  },
  {
    "slug": "temperature",
    "name": "Temperature",
    "description": "Convert temperatures between Celsius, Fahrenheit, kelvin and Rankine, with absolute-zero checks, for weather, cooking, laboratory experiments and gas-law work.",
    "whenToUse": "Use it when a gas-law problem gives 25°C but needs kelvin, or when converting a weather forecast from Fahrenheit to Celsius.",
    "units": [
      {
        "name": "Celsius",
        "symbol": "°C",
        "factor": 1
      },
      {
        "name": "Fahrenheit",
        "symbol": "°F",
        "factor": 1
      },
      {
        "name": "Kelvin",
        "symbol": "K",
        "factor": 1
      },
      {
        "name": "Rankine",
        "symbol": "°R",
        "factor": 1
      }
    ]
  }
];
export function convertValue(value:number,from:string,to:string,category:string):number {
 if(!Number.isFinite(value)) throw new Error("Enter a finite number.");
 if(category==='temperature'){const c=from==='°F'?(value-32)*5/9:from==='K'?value-273.15:from==='°R'?(value*5/9)-273.15:value; if(c < -273.15) throw new Error('Temperature cannot be below absolute zero.'); return to==='°F'?c*9/5+32:to==='K'?c+273.15:to==='°R'?(c+273.15)*9/5:c;}
 const spec=converters.find(x=>x.slug===category); const a=spec?.units.find(x=>x.symbol===from), b=spec?.units.find(x=>x.symbol===to); if(!a||!b) throw new Error('Unsupported unit selection.'); return value*a.factor/b.factor;
}
