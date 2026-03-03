import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "nl"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      new URL(
        "https://images.pexels.com/photos/34879499/pexels-photo-34879499.jpeg",
      ),
      {
        protocol: "https",
        hostname: "trustworthy-husky-54.eu-west-1.convex.cloud",
        port: "",
        pathname: "/api/storage/**",
      },
    ],
  },
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
