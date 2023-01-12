/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_BASE_URL: process.env.BASE_URL,
  },
  serverRuntimeConfig: {
    NEXT_PUBLIC_BASE_URL: process.env.BASE_URL,
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
