/** @type {import('tailwindcss').Config} */

// clamps-{min}-{percentage}-{max}
const Clamps = {
  "clamp-0.75-1-1": "clamp(0.75rem, 1vw, 1rem)",
  "clamp-0.75-1.5-1": "clamp(0.75rem, 1.5vw, 1rem)",
  "clamp-0.75-2-1.5": "clamp(0.75rem, 2vw, 1.5rem)",
  "clamp-1-2-1.5": "clamp(1rem, 2vw, 1.5rem)",
  "clamp-1-2-2": "clamp(1rem, 2vw, 2rem)",
  "clamp-1-2.5-2": "clamp(1rem, 2.5vw, 2rem)",
  "clamp-2-3-3": "clamp(2rem, 3vw, 3rem)",
  "clamp-2-4-4": "clamp(2rem, 4vw, 4rem)",
  "clamp-2.5-4-3.5": "clamp(2.5rem, 4vw, 3.5rem)",
  "clamp-2.5-4-4": "clamp(2.5rem, 4vw, 4rem)",
  "clamp-3.75-8-5": "clamp(3.75rem, 8vw, 5rem)",
  "clamp-3.75-8-7": "clamp(3.75rem, 8vw, 7rem)",
  "clamp-10-15-16": "clamp(10rem, 15vwvw, 16rem)",
};

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '-sm': { max: '640px' },
        // => @media (max-width: 640px) { ... }

        '-md': { max: '768px' },
        // => @media (max-width: 768px) { ... }

        '-lg': { max: '1024px' },
        // => @media (max-width: 1024px) { ... }

        '-xl': { max: '1280px' },
        // => @media (max-width: 1280px) { ... }

        '-2xl': { max: '1536px' },
        // => @media (max-width: 1536px) { ... }
      },
      fontSize: {
        ...Clamps,
      },
      colors: {
        'bg-black': '#020711',
        'bg-white': '#FFFFFF',
        'bg-blue': '#000C25',
        'button-primary': '#FF7E79',
        'text-primary': '#ffffff',
        'text-secondary': '#292929',
        'text-white-60': '#ffffff99',
      },
      fontWeight: {
        bold: 700,
        extrabold: 800,
      },
    },
    fontFamily: {
      Manrope: ['Manrope'],
      inter: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require('tailwindcss-animate')],
}
