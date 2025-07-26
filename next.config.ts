import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.S3_DEV_BUCKET_HOSTNAME!,
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: process.env.S3_PROD_BUCKET_HOSTNAME!,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = withVanillaExtract(nextConfig);

export default nextConfig;
