/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable manual dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          gold: '#D4AF37', // Kept for legacy support/logo matching
          carmine: '#BA1054', // Pictorial Carmine
        },
        // User Requested Palette
        gulf: {
          blue: '#81BAD9',
          icy: '#94C4DF',
          dark: '#0060AA',
          lebanese: '#131720',
        },
        charming: {
          green: '#75DB9B',
          como: '#5C7E68',
        },
        desert: {
          coral: '#EBAC8F',
          rose: '#F0D5C4',
        },
        luxury: {
          pink: '#DCA9CA',
        },
        gentle: {
          yellow: '#F3DD89',
          sweet: '#F7E5A4',
        },
        cute: {
          lavender: '#E4DAFB',
        },
        cream: {
          velvet: '#F3F0E8', // Background
        },

        secondary: {
          black: '#111111',
          charcoal: '#222222',
        },
        bg: {
          cream: '#F3F0E8', // Updated to Smooth Velvety Cream
          dark: '#1a1a1a',
        },
        text: {
          dark: '#333333',
          light: '#f5f5f5',
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
