"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ui/theme-toggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b sticky top-0 bg-background z-10 gov-header">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Ir para página inicial"
        >
          <div className="rounded-full p-2 hidden md:block">
            <img
              src="/logo.png"
              alt="Logo Governo MT"
              className="h-14 w-14"
            />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white">
              <span className="md:hidden">ABITUS</span>
              <span className="hidden md:inline">ABITUS</span>
            </h1>
            <p className="text-xs text-white/80 hidden md:block">
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

          <button 
            className="md:hidden text-white mr-2"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Menu de navegação"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ThemeToggle />
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="container mx-auto px-4 py-3 flex flex-col" aria-label="Navegação mobile">
            <Link
              href="/"
              className="text-sm font-medium text-white hover:text-mt-yellow py-2"
              aria-label="Ir para página inicial"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-white hover:text-mt-yellow py-2"
              aria-label="Ir para o dashboard"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
} 