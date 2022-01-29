/** @type {import('next').NextConfig} */
const path = require("path");

const alias = {
  components: path.join(__dirname, "components"),
  firestore: path.join(__dirname, "firestore.ts"),
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
