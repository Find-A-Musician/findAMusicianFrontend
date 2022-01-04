module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        asap: ['Asap', 'sans-serif'],
      },
      colors: {
        purple: {
          1000: '#58335E',
        },
      },
    },
  },
  postcssOptions: {},
};
