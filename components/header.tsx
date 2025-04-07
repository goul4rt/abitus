import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

export function Header() {
  return (
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
  );
} 