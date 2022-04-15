module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js"
],
  corePlugins: {
    preflight: false,
  },
   purge: {
      enabled: true,
      content: ['./src/**/*.{html,ts}']
},
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}