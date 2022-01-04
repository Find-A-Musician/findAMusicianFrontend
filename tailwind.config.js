module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    colors: {
      red: '#af1026',
      'red-gradient': '#CE0412',
      'middle-gradient': '#8E2D3A',
      'purple-gradient': '#58335E',
      purple: '#58335e',
      error: '#e53935',
      success: '#388e3c',
      blue: '#26c6da',
      yellow: '#c0ca33',
      pink: '#d81b60',
      orange: '#fb8c00',
      white: '#FFFFFF',
      black: '#00000',
    },

    extend: {
      fontFamily: {
        asap: ['Asap', 'sans-serif'],
      },
    },
  },
  postcssOptions: {},
};
