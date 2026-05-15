/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        brand: {
          50: '#eef6ff',
          100: '#d9ebff',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          900: '#172554',
        },
      },
      boxShadow: {
        soft: '0 18px 60px -28px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
};
