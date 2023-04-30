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
};

module.exports = nextConfig;
