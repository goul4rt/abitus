import { CONFIG } from '../config';

export function generateDashboardSchema() {
  return {
    "@context": CONFIG.context,
    "@type": "Dataset",
    name: "Dashboard de Pessoas Desaparecidas",
    description: "Visualização e análise de dados sobre pessoas desaparecidas no estado de Mato Grosso.",
    creator: {
      "@type": "GovernmentOrganization",
      name: CONFIG.organization.name,
    },
    temporalCoverage: "2020-01-01/2023-12-31",
    spatialCoverage: {
      "@type": "Place",
      name: "Mato Grosso, Brasil",
    },
  };
} 