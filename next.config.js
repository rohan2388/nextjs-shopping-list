/** @type {import('next').NextConfig} */
const path = require("path");
const withPWA = require("next-pwa");

const alias = {
  components: path.join(__dirname, "components"),
  libs: path.join(__dirname, "libs"),
};

const nextConfig = {
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
  reactStrictMode: true,
  webpack(config) {
    for (const key in alias) {
      config.resolve.alias[key] = alias[key];
    }
    return config;
  },
};

module.exports = withPWA(nextConfig);
