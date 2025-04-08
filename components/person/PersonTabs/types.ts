import { PessoaDesaparecida } from "@/services/people/types";

export interface PersonTabsProps {
  ultimaOcorrencia: PessoaDesaparecida["ultimaOcorrencia"];
  disapearDate: string | undefined;
  isLocalized: boolean;
}
