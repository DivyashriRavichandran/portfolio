import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "nl"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "trustworthy-husky-54.eu-west-1.convex.cloud",
        pathname: "/api/storage/**",
      },
      {
        protocol: "https",
        hostname: "excalidraw.nyc3.cdn.digitaloceanspaces.com",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
