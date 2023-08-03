/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/portfolio",
        destination: "/portfolio/membership",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
