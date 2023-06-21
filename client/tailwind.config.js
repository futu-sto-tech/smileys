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
  plugins: [require('daisyui')],
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
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
    sm: '0.4rem',
    DEFAULT: '1rem',
    md: '1.2rem',
    lg: '1.4rem',
    full: '9999px',
  },
  colors,
  extend: {},
  sm: '5px',
  DEFAULT: '5px',
  md: '10px',
  lg: '1.4rem',
  full: '9999px',
}
