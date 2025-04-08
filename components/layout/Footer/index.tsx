export function Footer() {
    return (
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
    );
  } 