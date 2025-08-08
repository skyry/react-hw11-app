/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
    animation: {
      'none': 'none',
      'spin': 'spin 1s linear infinite',
      'bounce': 'bounce 1s infinite',
      'fade-in-up': 'fadeInUp 0.6s ease-out',
    },
  },
  plugins: [],
}
