// Tailwind is compiled when the site is built (npm run build), so the site needs no CDN.
// The settings below are the same ones the DigSil Coder preview uses.
const settings = {
        theme: {
          extend: {
            colors: {
              background: '#F3F7F6',
              surface: '#FFFFFF',
              ink: '#0E2A33',
              muted: '#4F6870',
              line: '#D5E3E1',
              brand: '#0F6B7A',
              onbrand: '#FFFFFF',
              accent: '#F2A65A'
            },
            fontFamily: {
              display: ['Fraunces', 'Georgia', 'serif'],
              sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif']
            }
          }
        }
      };

/** @type {import('tailwindcss').Config} */
export default {
  ...settings,
  content: ["./*.{html,js,jsx,ts,tsx}","./components/**/*.{html,js,jsx,ts,tsx}","./lib/**/*.{html,js,jsx,ts,tsx}"],
};
