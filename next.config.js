const { headers } = require('next/headers');
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
  },
  async headers() { 
    return [
      {
        source: '/api/:path*',
         headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
      },
    ];
  } 
};