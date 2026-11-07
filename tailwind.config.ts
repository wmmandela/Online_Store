import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.{js,ts,vue}',
    './error.{js,ts,vue}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FAF7EE',
          100: '#F3ECD6',
          200: '#E6D7AD',
          300: '#D7BE7E',
          400: '#C8A655',
          500: '#B88E35', // signature champagne gold
          600: '#9B7428',
          700: '#7A5820',
          800: '#583D17',
          900: '#3A270D',
        },
        obsidian: {
          50: '#F4F4F5',
          100: '#E4E4E7',
          200: '#D4D4D8',
          300: '#A1A1AA',
          400: '#71717A',
          500: '#52525B',
          600: '#3F3F46',
          700: '#27272A',
          800: '#18181B', // deep rich charcoal
          900: '#09090B', // true luxury black
        },
        cream: {
          50: '#FCFBF9',
          100: '#F9F7F2',
          200: '#F3EFE6',
          300: '#EAE4D6',
          400: '#DDD4C0',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.2em',
        widest: '0.15em',
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(0, 0, 0, 0.04)',
        elevated: '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
        glow: '0 0 25px rgba(184, 142, 53, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.35s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
}
