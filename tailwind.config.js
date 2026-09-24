/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      colors: {
        brand: {
          green: '#149a5b',
          'green-hover': '#0c7444',
          'green-light': '#22c46e',
          orange: '#c2410c',
          dark: '#111713',
          cardDark: '#101212',
          bgDark: '#050606',
          bgLight: '#f3f7fa',
        }
      }
    },
  },
  plugins: [],
}
