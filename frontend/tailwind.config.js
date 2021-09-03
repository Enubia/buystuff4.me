// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#80A5D8',
          200: '#618ECE',
          300: '#4178C5',
          400: '#3464A8',
          500: '#2A528A',
          600: '#254777',
          700: '#1F3D66',
          800: '#1A3355',
          900: '#152944',
        },
        secondary: {
          100: '#ADB6E3',
          200: '#99A4DC',
          300: '#8492D5',
          400: '#7080CE',
          500: '#5D6EC7',
          600: '#4156BE',
          700: '#3849A2',
          800: '#2E3D87',
          900: '#25316C',
        },
        accent: {
          100: '#CFB8ED',
          200: '#C3A6E9',
          300: '#B794E4',
          400: '#AB82E0',
          500: '#9F71DB',
          600: '#884FD3',
          700: '#7232C7',
          800: '#5F29A6',
          900: '#4C2185',
        },
        highlight: {
          100: '#F4E9CA',
          200: '#F1E3BD',
          300: '#EEDEB0',
          400: '#EBD8A3',
          500: '#E9D498',
          600: '#E0C26E',
          700: '#D8B147',
          800: '#C59C2A',
          900: '#9E7D21',
        },
      },
      fontFamily: {
        sans: ['Raleway', ...defaultTheme.fontFamily.sans],
        serif: ['Raleway', ...defaultTheme.fontFamily.serif],
        mono: [...defaultTheme.fontFamily.mono],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('@tailwindcss/forms'),
  ],
};
