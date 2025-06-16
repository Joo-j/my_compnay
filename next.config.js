/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
