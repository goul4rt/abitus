import { PersonInfoProps } from "./types";

export function PersonInfo({ idade, sexo, isLocalized, encontradoVivo, vivo }: PersonInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-y-2 text-sm mb-6">
      <div>
        <span className="font-medium">Idade:</span> {idade} anos
      </div>
      <div>
        <span className="font-medium">Sexo:</span>{" "}
        {sexo === "MASCULINO" ? "Masculino" : "Feminino"}
      </div>
    </div>
  );
} 