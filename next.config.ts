import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "nl"],
    defaultLocale: "en",
  },
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
