/** @type {import('next').NextConfig} */
const path = require("path");

const alias = {
  components: path.join(__dirname, "components"),
  libs: path.join(__dirname, "libs"),
};

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    for (const key in alias) {
      config.resolve.alias[key] = alias[key];
    }
    return config;
  },
};

module.exports = nextConfig;
