const path = require('path');

module.exports = {
  stories: ['../components/*.stories.tsx', '../layout/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    'storybook-addon-next-router',
    '@storybook/addon-controls',
  ],
  typescript: { reactDocgen: false },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    });

    return config;
  },
  staticDirs: ['../public'],
};
