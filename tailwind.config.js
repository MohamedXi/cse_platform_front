const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      primary: {
        DEFAULT: 'var(--color-primary)',
        light: 'var(--color-primary-light)',
        ['light-bg']: 'var(--color-primary-light-bg)',
      },
      secondary: 'var(--color-secondary)',
      ['light-grey']: 'var(--color-light-grey)',
      ['dark-grey']: 'var(--color-dark-grey)',
      body: 'var(--color-body)',
      success: 'var(--color-success)',
      error: 'var(--color-error)',
      warning: 'var(--color-warning)',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
