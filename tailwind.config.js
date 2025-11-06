/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'body': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#2D9CDB',
        secondary: '#27AE60',
        accent: '#F2994A',
        surface: '#FFFFFF',
        background: '#F8FAFB',
        success: '#27AE60',
        warning: '#F2994A',
        error: '#EB5757',
        info: '#2D9CDB',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.12)',
        'fab': '0 4px 12px rgba(0,0,0,0.15)',
        'fab-hover': '0 6px 16px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
}