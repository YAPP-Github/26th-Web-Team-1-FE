import type { NextConfig } from "next";
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = withVanillaExtract(nextConfig);

export default nextConfig;
