/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_BASE_URL: process.env.BASE_URL,
  },
  serverRuntimeConfig: {
    BASE_UR: process.env.BASE_URL,
  },
  env: {
    BASE_UR: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
