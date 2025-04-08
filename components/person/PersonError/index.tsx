import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ErrorMessage from "@/components/layout/ErrorMessage";
import { PersonErrorProps } from "./types";

export function PersonError({ message, onRetry }: PersonErrorProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Home
        </Button>
      </Link>
      <ErrorMessage
        title="Erro ao carregar dados"
        message={message || "Pessoa não encontrada"}
        onRetry={onRetry}
        fullPage
      />
    </div>
  );
} 