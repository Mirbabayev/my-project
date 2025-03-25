/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#9C5835',
        'primary-dark': '#7C4221',
        'primary-light': '#B46D4A',
        secondary: '#737373',
        'secondary-dark': '#595959',
        'secondary-light': '#8c8c8c',
        background: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },
        text: {
          light: '#6b7280',
          dark: '#374151',
        },
        border: '#e5e7eb',
        accent: '#FEF3C7',
        dark: '#1a1a1a',
        light: '#f8f9fa',
      },
      fontFamily: {
        sans: [
          'Inter',
          'Montserrat',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        serif: [
          'Playfair Display',
          'Cormorant Garamond',
          'ui-serif',
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif',
        ],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        fadeInOut: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '10%': { opacity: '1', transform: 'translateY(0)' },
          '90%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
        heartBeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        fadeInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        },
        bounceSlow: {
          '0%, 100%': {
            transform: 'translateY(-2%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-5px)'
          }
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-40rem 0',
          },
          '100%': {
            backgroundPosition: '40rem 0',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        zoomOut: {
          '0%': { transform: 'scale(1.05)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        spinOnce: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scaleIn: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out',
        fadeInOut: 'fadeInOut 2.5s ease-in-out',
        heartBeat: 'heartBeat 1s ease-in-out',
        fadeInUp: 'fadeInUp 0.6s ease-out',
        fadeInDown: 'fadeInDown 0.6s ease-out',
        fadeInLeft: 'fadeInLeft 0.6s ease-out',
        fadeInRight: 'fadeInRight 0.6s ease-out',
        pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        bounceSlow: 'bounceSlow 3s infinite',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite linear',
        wiggle: 'wiggle 1s ease-in-out infinite',
        gradientShift: 'gradientShift 3s ease infinite',
        zoomIn: 'zoomIn 0.3s ease-out',
        zoomOut: 'zoomOut 0.3s ease-out',
        'spin-once': 'spinOnce 0.5s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-from-top': 'slideInFromTop 0.5s ease-out',
        'slide-in-from-bottom': 'slideInFromBottom 0.5s ease-out',
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '200%': '200%',
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(0, 0, 0, 0.05)',
        'subtle-lg': '0 4px 15px rgba(0, 0, 0, 0.08)',
        'inner-sm': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'inner-md': 'inset 0 4px 6px 0 rgba(0, 0, 0, 0.1)',
        'soft': '0 0 15px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 15px rgba(66, 153, 225, 0.5)',
        'glow-lg': '0 0 25px rgba(66, 153, 225, 0.4)',
      },
      transitionDuration: {
        '0': '0ms',
        '2000': '2000ms',
        '3000': '3000ms',
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.12)',
        'lg': '0 4px 6px rgba(0, 0, 0, 0.14)',
        'xl': '0 8px 12px rgba(0, 0, 0, 0.16)',
      },
      perspective: {
        'none': 'none',
        '500': '500px',
        '1000': '1000px',
        '2000': '2000px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      // Text shadow utilities
      addUtilities({
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
        },
        '.text-shadow-lg': {
          textShadow: '0 8px 16px rgba(0, 0, 0, 0.12)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      });
      
      // Gradient text utilities
      addUtilities({
        '.text-gradient-primary': {
          background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
        },
        '.text-gradient-secondary': {
          background: 'linear-gradient(to right, #ec4899, #f43f5e)',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
        },
        '.text-gradient-success': {
          background: 'linear-gradient(to right, #10b981, #34d399)',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
        },
      });
      
      // Perspective utilities
      addUtilities({
        '.perspective-none': {
          perspective: 'none',
        },
        '.perspective-500': {
          perspective: '500px',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-2000': {
          perspective: '2000px',
        },
      });
    },
  ],
};