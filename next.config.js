const { join } = require('path');

module.exports = {
  webpack: (config, { defaultLoaders }) => {
    config.resolve.alias['@components'] = join(__dirname, 'src/components');
    return config;
  },
};