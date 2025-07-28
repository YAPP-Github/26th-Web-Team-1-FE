import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "잇다",
    short_name: "잇다",
    description:
      "내 주변, 싸고 맛있는 할인하는 가게 없나? 타임잇에서 더 싸고, 더 맛있게!",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/images/icons/pwa-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icons/pwa-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
