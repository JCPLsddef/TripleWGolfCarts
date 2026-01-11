/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          900: '#0B1220',
          800: '#111B2E',
          DEFAULT: '#FFFFFF',
          alt: '#F6F8FC',
        },
        border: {
          dark: '#22304F',
          DEFAULT: '#E6EAF2',
        },
        primary: {
          DEFAULT: '#2F5BFF',
          hover: '#2147F2',
          soft: '#E8EEFF',
        },
        text: {
          DEFAULT: '#0B1220',
          muted: '#5B6B86',
        },
        success: {
          DEFAULT: '#16A34A',
          soft: '#DCFCE7',
        },
        warning: {
          DEFAULT: '#F59E0B',
          soft: '#FEF3C7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
