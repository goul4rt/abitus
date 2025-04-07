import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import { AccessibilityProvider } from "@/contexts/accessibility-context";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";
import { AccessibilityModalWrapper } from "@/components/accessibility/accessibility-modal-wrapper";

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
  generator: "v0.dev",
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
                <header className="border-b sticky top-0 bg-background z-10 gov-header">
                  <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      aria-label="Ir para página inicial"
                    >
                      <div className="rounded-ful p-2">
                        <img
                          src="/logo.png"
                          alt="Logo Governo MT"
                          className="h-14 w-14"
                        />
                      </div>
                      <div>
                        <h1 className="font-bold text-lg text-white">ABITUS</h1>
                        <p className="text-xs text-white/80">
                          Polícia Judiciária Civil de Mato Grosso
                        </p>
                      </div>
                    </Link>

                    <div className="flex items-center gap-2">
                      <nav
                        className="hidden md:flex items-center space-x-4 mr-4"
                        aria-label="Navegação principal"
                      >
                        <Link
                          href="/"
                          className="text-sm font-medium text-white hover:text-mt-yellow"
                          aria-label="Ir para página inicial"
                        >
                          Início
                        </Link>
                        <Link
                          href="/dashboard"
                          className="text-sm font-medium text-white hover:text-mt-yellow"
                          aria-label="Ir para o dashboard"
                        >
                          Dashboard
                        </Link>
                      </nav>
                      <ThemeToggle />
                    </div>
                  </div>
                </header>

                <main className="flex-1">{children}</main>

                <footer className="py-6 gov-footer">
                  <div className="container mx-auto px-4 text-center text-sm text-white/80">
                    <p>
                      © {new Date().getFullYear()} Polícia Judiciária Civil de
                      Mato Grosso - Todos os direitos reservados
                    </p>
                    <p className="mt-1">
                      Sistema ABITUS - Pessoas Desaparecidas
                    </p>
                    <div className="mt-4 flex justify-center space-x-4">
                      <a
                        href="https://www.mt.gov.br/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-mt-yellow"
                        aria-label="Visitar Portal do Governo"
                      >
                        Portal do Governo
                      </a>
                      <a
                        href="https://www.pjc.mt.gov.br/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-mt-yellow"
                        aria-label="Visitar site da PJC-MT"
                      >
                        PJC-MT
                      </a>
                    </div>
                  </div>
                </footer>

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
