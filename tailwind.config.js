/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vx-orange': '#E5511A',
        'vx-black': '#050505',
        'vx-dark-grey': '#121212',
        'vx-light-grey': '#a0a0a0',
      },
      fontFamily: {
        main: ['Outfit', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
