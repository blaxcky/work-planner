/** @type {import('tailwindcss').Config} */
module.exports = {
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
  // Comprehensive safelist for production builds
  safelist: [
    // Layout & Display
    'block', 'inline-block', 'flex', 'inline-flex', 'grid', 'hidden',
    'absolute', 'relative', 'fixed', 'static',
    
    // Colors - Backgrounds
    'bg-white', 'bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-900',
    'bg-blue-50', 'bg-blue-100', 'bg-blue-600', 'bg-blue-700',
    'bg-yellow-50', 'bg-yellow-100', 'bg-yellow-600',
    'bg-green-50', 'bg-green-100', 'bg-green-600',
    'bg-red-50', 'bg-red-100', 'bg-red-600',
    'bg-orange-100', 'bg-orange-600',
    'bg-slate-50', 'bg-slate-100',
    
    // Colors - Text
    'text-white', 'text-gray-400', 'text-gray-500', 'text-gray-600', 'text-gray-700', 'text-gray-800', 'text-gray-900',
    'text-blue-600', 'text-blue-700', 'text-blue-800',
    'text-yellow-600', 'text-yellow-800',
    'text-green-400', 'text-green-600', 'text-green-800',
    'text-red-600', 'text-red-800',
    'text-orange-800',
    
    // Colors - Borders
    'border-gray-200', 'border-gray-300', 'border-red-300',
    'border-slate-200', 'border-yellow-200', 'border-blue-200', 'border-green-200',
    'border-blue-300', 'border-blue-400',
    
    // Gradients
    'bg-gradient-to-br',
    'from-slate-50', 'to-slate-100',
    'from-yellow-50', 'to-yellow-100', 
    'from-blue-50', 'to-blue-100',
    'from-green-50', 'to-green-100',
    
    // Spacing & Sizing
    'p-1', 'p-2', 'p-3', 'p-4', 'p-6', 'p-8',
    'px-2', 'px-3', 'px-4', 'px-6', 'py-1', 'py-2', 'py-3',
    'm-2', 'mb-2', 'mb-3', 'mb-4', 'mb-6', 'mt-1', 'mt-3', 'mt-8',
    'w-3', 'w-4', 'w-5', 'w-8', 'w-16', 'w-64', 'w-full',
    'h-2', 'h-3', 'h-4', 'h-5', 'h-8', 'h-12',
    'min-h-[500px]', 'min-h-[600px]', 'min-h-screen',
    'max-w-md', 'max-w-lg', 'max-w-2xl', 'max-w-4xl',
    
    // Flexbox & Grid
    'flex-1', 'flex-shrink-0',
    'items-center', 'items-start', 'justify-between', 'justify-center', 'justify-end',
    'space-x-1', 'space-x-2', 'space-x-3', 'space-x-4', 'space-x-6',
    'space-y-1', 'space-y-2', 'space-y-3', 'space-y-6',
    'gap-1', 'gap-2', 'gap-3', 'gap-4', 'gap-6',
    'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-7',
    
    // Borders & Rounded
    'border', 'border-2', 'border-t', 'border-b', 'border-dashed',
    'rounded', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-full',
    
    // Shadows & Effects
    'shadow', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl',
    'backdrop-blur-sm', 'bg-opacity-50', 'bg-opacity-60', 'bg-opacity-80',
    
    // Transforms & Animations
    'transform', 'scale-105', 'scale-110', 'rotate-3', 'rotate-6',
    'translate-x-0', 'translate-y-0', '-translate-y-1/2',
    'transition-all', 'transition-colors', 'transition-opacity', 'transition-transform', 'transition-shadow',
    'duration-200', 'duration-300',
    
    // Hover & Focus States
    'hover:bg-gray-50', 'hover:bg-gray-100', 'hover:bg-gray-200', 'hover:bg-blue-700', 'hover:bg-opacity-100',
    'hover:text-gray-600', 'hover:text-gray-800', 'hover:text-gray-900', 'hover:text-blue-600', 'hover:text-red-600',
    'hover:shadow-md', 'hover:shadow-lg',
    'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500', 'focus:border-blue-500',
    'group-hover:opacity-100', 'group-hover:scale-110',
    
    // Ring & Outline
    'ring-2', 'ring-blue-400', 'ring-blue-500', 'ring-opacity-50',
    'outline-none',
    
    // Typography
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl',
    'font-medium', 'font-semibold', 'font-bold',
    'text-center', 'text-left', 'text-right',
    'leading-tight',
    
    // Opacity & Visibility
    'opacity-0', 'opacity-25', 'opacity-50', 'opacity-75', 'opacity-80',
    'invisible', 'visible',
    
    // Positioning & Z-Index
    'top-1/2', 'left-3', 'right-3', 'inset-0',
    'z-50', 'z-1000',
    
    // Cursor
    'cursor-grab', 'cursor-grabbing', 'cursor-pointer',
    
    // Overflow & Scrolling
    'overflow-hidden', 'overflow-y-auto',
    'line-clamp-1', 'line-clamp-2', 'line-clamp-3',
    'truncate',
    
    // Touch & Interaction
    'touch-none',
    
    // Misc
    'aspect-square',
    'min-w-0',
  ],
}