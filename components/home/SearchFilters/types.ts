export interface FiltersState {
  nome: string;
  faixaIdadeInicial: string;
  faixaIdadeFinal: string;
  sexo: string;
  status: string;
}

export interface SearchFiltersProps {
  filters: FiltersState;
  showFilters: boolean;
  onFilterChange: (key: string, value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onToggleFilters: () => void;
  renderViewModeSelector: React.ReactNode;
}
