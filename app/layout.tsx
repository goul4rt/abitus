import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AccessibilityProvider } from "@/contexts/accessibility";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/contexts";
import { AccessibilityModalWrapper } from "@/components/accessibility/accessibility-modal-wrapper";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Sistema de Pessoas Desaparecidas - Polícia Judiciária Civil de Mato Grosso",
  description:
    "Portal oficial para consulta e informações sobre pessoas desaparecidas no estado de Mato Grosso. Sistema ABITUS da Polícia Judiciária Civil.",
  keywords:
    "pessoas desaparecidas, Mato Grosso, PJC MT, ABITUS, polícia judiciária civil, desaparecidos, localização, busca",
  authors: [{ name: "Governo do Estado de Mato Grosso" }],
  openGraph: {
    title: "Sistema de Pessoas Desaparecidas - PJC MT",
    description:
      "Portal oficial para consulta e informações sobre pessoas desaparecidas no estado de Mato Grosso.",
    url: "https://abitus.pjc.mt.gov.br",
    siteName: "Sistema ABITUS - PJC MT",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://ogoulart.com" />
        <meta name="apple-mobile-web-app-title" content="Abitus" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="BR-MT" />
        <meta name="geo.placename" content="Mato Grosso" />
        <meta name="theme-color" content="#046546" />
      </head>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light">
            <AccessibilityProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <AccessibilityModalWrapper />
                <Toaster />
              </div>
            </AccessibilityProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

import "./globals.css";
