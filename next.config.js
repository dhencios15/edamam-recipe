/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["edamam-product-images.s3.amazonaws.com"],
  },
  env: {
    APP_ID: "d0da899a",
    APP_KEYS: "82bc5c60b812fa20bdbdbd067f072e7a",
  },
};

module.exports = nextConfig;
