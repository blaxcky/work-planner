/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
  // Ensure all classes are included in production build
  safelist: [
    'bg-gradient-to-br',
    'from-slate-50',
    'to-slate-100',
    'from-yellow-50',
    'to-yellow-100',
    'from-blue-50',
    'to-blue-100',
    'from-green-50',
    'to-green-100',
    'border-slate-200',
    'border-yellow-200',
    'border-blue-200',
    'border-green-200',
    'backdrop-blur-sm',
    'bg-opacity-60',
    'bg-opacity-80',
    'ring-2',
    'ring-blue-400',
    'ring-opacity-50',
    'scale-105',
    'rotate-6',
    'shadow-2xl',
  ],
}