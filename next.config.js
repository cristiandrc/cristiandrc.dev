/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  async redirects() {
    return [
      {
        source: "/error",
        destination: "/",
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ["en-US", "es-CO"],
    defaultLocale: "es-CO",
    localeDetection: false,
  },
};

module.exports = nextConfig;
