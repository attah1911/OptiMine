/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#667761',
          light: '#8a9a7f',
          dark: '#4a5545',
        },
        sage: {
          50: '#f6f7f5',
          100: '#e3e6e0',
          200: '#c7cdc1',
          300: '#a6ae9d',
          400: '#8a9a7f',
          500: '#667761',
          600: '#4f5d4b',
          700: '#3f4a3d',
          800: '#343c33',
          900: '#2c322b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

