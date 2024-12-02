/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite', // Slow spinning animation
        'fade-in': 'fadeIn 2s ease-in', // Fade-in effect for heading
        pulse: 'pulse 2s infinite', // Slightly custom pulse animation
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 }, // Start fully transparent
          '100%': { opacity: 1 }, // End fully visible
        },
      },
    },
  },
  plugins: [],
};
