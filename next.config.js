/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["edamam-product-images.s3.amazonaws.com"],
  },
  env: {
    APP_ID: "338fbe36",
    APP_KEYS: "71b0be31e06ed9b486f4758f0a72949e",
  },
};

module.exports = nextConfig;
