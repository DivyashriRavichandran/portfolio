import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import ConvexClientProvider from "@/components/ConvexClientProvider";
export const metadata: Metadata = {
  title: "Divyashri's Portfolio",
  description: "A creative portfolio showcasing my work and experience",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = await cookies();
  const locale = store.get("locale")?.value || "nl";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" />
        {/* Preconnects are great for performance! */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale}>
          {/* Wrap everything in our custom Provider */}
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ConvexClientProvider>
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
