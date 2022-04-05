/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["edamam-product-images.s3.amazonaws.com"],
  },
  env: {
    APP_ID: "38895c39",
    APP_KEYS: "336b85e58b5b8235d6eca788cbb1c48e",
  },
};

module.exports = nextConfig;
