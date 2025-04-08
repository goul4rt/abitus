import { PessoaDesaparecida } from "@/services/people/types";

export interface PersonDetailsProps {
  person: PessoaDesaparecida;
  onShare: () => void;
}
