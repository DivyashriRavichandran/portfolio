import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import localFont from "next/font/local";
import { LoadingProvider } from "@/components/LoadingProvider";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("divyashri-or-software-engineer"),
    description: t(
      "my-personal-portfolio-showcasing-software-engineering-projects-technical-skills-and-professional-experience",
    ),
  };
}

const generalSans = localFont({
  src: [
    {
      path: "../public/fonts/GeneralSans-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-general-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={generalSans.variable}
    >
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale}>
          <ConvexClientProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <LoadingProvider>
                <>
                  <Navbar />
                  <div className="mt-3 md:mt-8 px-5 md:max-w-3xl lg:px-0 md:mx-auto mb-8">
                    {children}
                  </div>
                  <Footer />
                </>
              </LoadingProvider>
            </ThemeProvider>
          </ConvexClientProvider>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
