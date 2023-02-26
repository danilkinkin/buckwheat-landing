const plugins = [];

/** @type {import('next').NextConfig} */
const nextConfig = plugins.reduce((acc, next) => next(acc), {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@svgr/webpack',
          options: {
            babel: false,
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
});

module.exports = nextConfig;
