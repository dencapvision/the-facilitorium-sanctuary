import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-blue': {
          DEFAULT: 'hsl(221, 100%, 20%)',
          light: 'hsl(221, 100%, 30%)',
          dark: 'hsl(221, 100%, 15%)',
        },
        'gold': {
          DEFAULT: 'hsl(46, 65%, 52%)',
          light: 'hsl(46, 65%, 62%)',
          dark: 'hsl(46, 65%, 42%)',
        },
        'sanctuary': {
           white: '#FFFFFF',
           cream: '#FAF9F6',
           glass: 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
