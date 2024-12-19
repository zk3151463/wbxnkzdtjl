/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 或者 'media'，根据需求选择
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        // 自定义阴影
        'dark': '0 10px 15px rgba(0, 0, 0, 0.2)',  // 夜间模式的阴影
        'light': '0 5px 10px rgba(0, 0, 0, 0.1)', // 白天模式的阴影
      },
    },
  },
  plugins: [],
}