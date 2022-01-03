const path = require('path');

module.exports = {
  stories: ['../components/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
  ],
  typescript: { reactDocgen: false },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
            },
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
  core: {
    builder: 'webpack5',
  },
};
