const plugins = [];

/** @type {import('next').NextConfig} */
const nextConfig = plugins.reduce((acc, next) => next(acc), {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
  webpack: (config, options) => {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push({
      use: 'raw-loader',
      resourceQuery: /raw/, // *.svg?url
    });

    config.module.rules.push({
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/, // *.svg?url
    });

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
      use: [
        options.defaultLoaders.babel,
        ({ resource }) => ({
          loader: '@svgr/webpack',
          options: {
            babel: false,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
                {
                  name: 'prefixIds',
                  params: {
                    prefix: `${hashCode(resource)}`,
                  },
                },
              ],
            },
          },
        }),
      ],
    });

    return config;
  },
});

module.exports = nextConfig;

const hashCode = function (s) {
  var h = 0,
    l = s.length,
    i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
  return h;
};
