/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1.6rem',
    },
    borderRadius: {
      none: '0',
      sm: '5px',
      DEFAULT: '5px',
      md: '10px',
      lg: '1.4rem',
      full: '9999px',
    },
    extend: {
      colors: {
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
      },
    },
  },
  plugins: [],
}
