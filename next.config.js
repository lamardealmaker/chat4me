/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'precise-cod-694.convex.cloud',
        pathname: '/api/storage/**',
      },
    ],
  },
};

module.exports = nextConfig; 