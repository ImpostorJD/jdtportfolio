/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3a0c57", 
        secondary: "#83509f", 
        accent: "#50246c", 
        background: "#a88BBD", 
        foreground: "#1F2937",
        
      },
      fontFamily: {
        'consolas': ['Consolas'],
        'ibm': ["IBM Plex Mono"]
      }
    },
  },
  plugins: [],
}

