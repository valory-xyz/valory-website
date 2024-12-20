import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'valory-green': '#00f422',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        machina: ["'Neue Machina'", 'sans-serif'],
        poppins: ["'Poppins Extralight'", 'san-serif'],
        helvetica: ["'Helvetica Light'", 'sans-serif'],
        avenir: ["'Avenir LT'", 'sans-serif'],
      },
      animation: {
        'slide-in-right': 'slideInRight 1.5s ease-out',
        'slide-in-left': 'slideInLeft 1.5s ease-out',
      },
      keyframes: {
        slideInRight: {
          '0%': {
            transform: 'translateX(50%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        slideInLeft: {
          '0%': {
            transform: 'translateX(-50%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
