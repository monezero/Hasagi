const { join } = require('path');

module.exports = {
  webpack: (config, { defaultLoaders }) => {
    config.resolve.alias['@components'] = join(__dirname, 'src/components');
    return config;
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{loader: "@svgr/webpack", options: {icon: true}}],
    })

    return config;
  }
};