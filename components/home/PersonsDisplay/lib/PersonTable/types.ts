import { PessoaDesaparecida } from "@/services/people/types";

export interface PersonTableProps {
    persons: PessoaDesaparecida[];
    onRowClick: (person_id: string) => void;
}
