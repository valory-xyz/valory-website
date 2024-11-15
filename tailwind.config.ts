import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'valory-green': '#00f422',
      },
      fontFamily: {
        machina: ['Neue Machina 5', 'sans-serif'],
        // Machina font currently not working?
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
