import "@/app/globals.css";
import "./globals.css";
import type { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/contexts";
import { AccessibilityModalWrapper } from "@/components/accessibility/AccessibilityModalWrapper";
import { Header, Footer, Head } from "@/components/layout";
import { metadata } from "@/lib/metadata";
const inter = Inter({ subsets: ["latin"] });

export { metadata };

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <Head />
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
