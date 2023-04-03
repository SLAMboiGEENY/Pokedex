/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.js',
  './components/**/*.js',
  './layouts/**/*.js',
  './lib/**/*.js',
  './data/**/*.mdx',],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

