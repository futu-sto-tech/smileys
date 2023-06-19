/** @type {import('tailwindcss').Config} */

const colors = {
  'primary-green': 'var(--primary-green)',
  'primary-transparent-green': 'var(--primary-transparent-green)',
  'background-green': 'var(--background-green)',
  white: 'var(--white)',
  black: 'var(--black)',
  'primary-gray': 'var(--primary-gray)',
  'secondary-gray': 'var(--secondary-gray)',
  'primary-red': 'var(--primary-red)',
  'background-beige': 'var(--background-beige)',
  'background-noise': 'var(--background-noise)',
}

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1.6rem',
    },
    borderRadius: {
      none: '0',
      sm: '0.4rem',
      DEFAULT: '1rem',
      md: '1.2rem',
      lg: '1.4rem',
      full: '9999px',
    },
    colors,
    extend: {},
  },
  plugins: [],
}
