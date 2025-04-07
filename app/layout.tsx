import "@/app/globals.css";
import "./globals.css";
import type { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/contexts";
import { AccessibilityModalWrapper } from "@/components/accessibility/accessibility-modal-wrapper";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { metadata } from "@/lib/metadata";
import { BASE_SITE_URL } from "@/lib/constants";
const inter = Inter({ subsets: ["latin"] });

export { metadata };

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={BASE_SITE_URL} />
        <meta name="apple-mobile-web-app-title" content="Abitus" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="BR-MT" />
        <meta name="geo.placename" content="Mato Grosso" />
        <meta name="theme-color" content="#046546" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <AccessibilityModalWrapper />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
