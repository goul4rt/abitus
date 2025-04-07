export default function generateJsonLd(pageType: string, data?: any) {
  switch (pageType) {
    case "home":
      return {
        "@context": "https://schema.org",
        "@type": "GovernmentOrganization",
        name: "Sistema de Pessoas Desaparecidas - PJC MT",
        url: "https://abitus.pjc.mt.gov.br",
        logo: "https://www.sesp.mt.gov.br/o/mt-portal-theme/images/favicon.ico",
        description: "Portal oficial para consulta e informações sobre pessoas desaparecidas no estado de Mato Grosso.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "BR",
          addressRegion: "MT",
          addressLocality: "Cuiabá",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+55-65-3613-5602",
          contactType: "customer service",
        },
      }

    case "person":
      if (!data) return null

      return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: data.nome,
        gender: data.sexo === "MASCULINO" ? "Male" : "Female",
        description: `Pessoa ${data.ultimaOcorrencia.dataLocalizacao ? "localizada" : "desaparecida"} desde ${data.ultimaOcorrencia.dtDesaparecimento}`,
        image: data.urlFoto,
      }

    case "dashboard":
      return {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: "Dashboard de Pessoas Desaparecidas",
        description: "Visualização e análise de dados sobre pessoas desaparecidas no estado de Mato Grosso.",
        creator: {
          "@type": "GovernmentOrganization",
          name: "Polícia Judiciária Civil de Mato Grosso",
        },
        temporalCoverage: "2020-01-01/2023-12-31",
        spatialCoverage: {
          "@type": "Place",
          name: "Mato Grosso, Brasil",
        },
      }

    default:
      return null
  }
}

