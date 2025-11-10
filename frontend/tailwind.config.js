/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          green: '#1DB954',
          'green-hover': '#1ed760',
          'green-dark': '#169c46',
          'bg-base': '#121212',
          'bg-elevated': '#181818',
          'bg-card': '#282828',
          'bg-card-hover': '#3e3e3e',
          'text-primary': '#FFFFFF',
          'text-secondary': '#B3B3B3',
          'text-subdued': '#6a6a6a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out forwards',
        'slideLeft': 'slideInFromLeft 0.5s ease-out forwards',
        'slideRight': 'slideInFromRight 0.5s ease-out forwards',
        'scaleIn': 'scaleIn 0.4s ease-out forwards',
        'shimmer': 'shimmer 1.5s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        slideInFromLeft: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        slideInFromRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(29, 185, 84, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(29, 185, 84, 0.4)' }
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      }
    },
  },
  plugins: [],
}
