import { JsonLdConfig } from './types';

export const CONFIG: JsonLdConfig = {
  context: "https://schema.org",
  organization: {
    name: "Sistema de Pessoas Desaparecidas - PJC MT",
    url: "https://abitus.pjc.mt.gov.br",
    logo: "https://www.sesp.mt.gov.br/o/mt-portal-theme/images/favicon.ico",
    description: "Portal oficial para consulta e informações sobre pessoas desaparecidas no estado de Mato Grosso.",
    address: {
      country: "BR",
      region: "MT",
      locality: "Cuiabá",
    },
    contact: {
      phone: "+55-65-3613-5602",
      type: "customer service",
    },
  },
}; 