import { Badge } from "@/components/ui/badge";
import { PersonHeaderProps } from "./types";

export function PersonHeader({ nome, isLocalized }: PersonHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <h1 className="text-3xl font-bold">{nome}</h1>
    </div>
  );
} 