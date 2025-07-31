// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // --- Custom Colors ---
      colors: {
        sienna: '#A0522D',    // Primary (Earth)
        wheat: '#F5DEB3',     // Secondary (Grain)
        peru: '#CD853F',      // Accent (Clay)
        gold: '#FFD700',      // Highlight (Sun)
        charcoal: '#333333',  // Text
        cream: '#FAF3E0',     // Page Background
        // You might want to define lighter/darker shades of these if needed,
        // e.g., 'sienna-light': '#B26A45', 'sienna-dark': '#8A4425'
      },
      // --- Keyframes & Animations (keep existing) ---
      keyframes: {
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGrow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        slideInDown: 'slideInDown 0.4s ease-out forwards',
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        popIn: 'popIn 0.5s ease-out forwards',
        'spin-slow': 'spin 2s linear infinite',
        pulseGrow: 'pulseGrow 1.5s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}