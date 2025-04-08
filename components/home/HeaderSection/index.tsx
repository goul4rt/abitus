import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";
import StatsCounter from "@/components/home/HeaderSection/lib/StatsCounter";
import { HeaderSectionProps } from "./types";

export default function HeaderSection({
  missingCount,
  foundCount,
  isLoading,
}: HeaderSectionProps) {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Sistema de Pessoas Desaparecidas
          </h1>
          <p className="text-muted-foreground mt-1">
            Polícia Judiciária Civil de Mato Grosso
          </p>
        </div>
        <Button
          onClick={() => router.push("/dashboard")}
          variant="outline"
          className="shrink-0"
        >
          <BarChart2 className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </div>

      <StatsCounter
        missingCount={missingCount}
        foundCount={foundCount}
        isLoading={isLoading}
      />
    </>
  );
}
