/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // === CHEERFUL COLORFUL THEME ===
        
        // Backgrounds - Soft Beige
        cream: {
          warm: '#F5F5DC',      // Classic beige (main bg)
          soft: '#FAF8F2',      // Softer warm beige
          pure: '#FFFEF9',      // Nearly white warm
        },
        
        // Dark mode backgrounds
        navy: {
          deep: '#1A1A2E',
          soft: '#252540',
          muted: '#353555',
        },
        
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        
        // Primary - Coral Pink (Warm & Cheerful)
        primary: {
          DEFAULT: '#FF6B6B',   // Coral pink
          light: '#FF8E8E',     // Lighter coral
          dark: '#E85555',      // Deeper coral
          50: '#FFF0F0',
          100: '#FFE0E0',
          500: '#FF6B6B',
          600: '#E85555',
        },
        
        // Secondary - Teal/Turquoise (Fresh & Fun)
        secondary: {
          DEFAULT: '#4ECDC4',   // Bright teal
          light: '#7EDDDA',     // Light teal
          dark: '#3BB8B0',      // Deep teal
          50: '#E8FFFE',
        },
        
        // Tertiary - Sunny Yellow (Happy & Bright)
        tertiary: {
          DEFAULT: '#FFE66D',   // Sunny yellow
          light: '#FFF0A0',     // Light yellow
          dark: '#F5D45A',      // Deeper yellow
          50: '#FFFEF0',
        },
        
        // Accent - Warm Orange
        orange: {
          DEFAULT: '#FF9F43',   // Warm orange
          light: '#FFB86C',     // Light orange
          dark: '#E88A30',      // Deep orange
        },
        
        // Accent - Soft Purple
        purple: {
          DEFAULT: '#A855F7',   // Soft purple
          light: '#C084FC',     // Light purple
          dark: '#9333EA',      // Deep purple
        },
        
        // Text Colors
        text: {
          primary: '#2D3748',   // Warm dark gray
          secondary: '#4A5568',
          muted: '#718096',
          'dark-primary': '#F7FAFC',
          'dark-secondary': '#E2E8F0',
          'dark-muted': '#A0AEC0',
        },
        
        // Surface Colors
        surface: {
          light: '#F5F5DC',
          'light-alt': '#FAF8F2',
          dark: '#1A1A2E',
          'dark-alt': '#252540',
        },
      },
      
      fontFamily: {
        // Kid-Friendly Typography System
        display: ['Nunito', 'system-ui', 'sans-serif'],       // Rounded, playful headings
        heading: ['Nunito', 'system-ui', 'sans-serif'],       // Clean headings
        body: ['Nunito', 'system-ui', 'sans-serif'],          // Readable body
        accent: ['Poppins', 'system-ui', 'sans-serif'],       // Modern accent
      },
      
      fontSize: {
        // Refined type scale
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
      },
      
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        'full': '9999px',
      },
      
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'DEFAULT': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.04), 0 10px 20px -2px rgba(0, 0, 0, 0.02)',
        'elevated': '0 10px 40px -10px rgba(0, 0, 0, 0.08), 0 20px 50px -20px rgba(0, 0, 0, 0.06)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
      
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-up': 'fade-up 0.6s ease-out',
        'fade-down': 'fade-down 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
      
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
      
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
}
