import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ok: '#16a34a',
        warning: '#ca8a04',
        critical: '#dc2626'
      }
    }
  },
  plugins: []
};

export default config;
