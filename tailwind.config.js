/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#121212',
          light: '#262626',
          muted: '#4a4a4a'
        },
        alabaster: {
          DEFAULT: '#fbfbfb',
          subtle: '#f4f4f2',
          surface: '#ffffff'
        },
        taupe: {
          DEFAULT: '#8b8580',
          light: '#b8b2ac',
          dark: '#5c5753'
        },
        accent: {
          amber: '#c59b27',
          emerald: '#15803d'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif']
      },
      letterSpacing: {
        tightest: '-0.035em',
        widest: '0.15em'
      }
    }
  },
  plugins: []
};
