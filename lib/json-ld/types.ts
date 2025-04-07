export interface PersonData {
  nome: string;
  sexo: "MASCULINO" | "FEMININO";
  urlFoto: string;
  ultimaOcorrencia: {
    dataLocalizacao?: string;
    dtDesaparecimento: string;
  };
}

export interface JsonLdConfig {
  context: string;
  organization: {
    name: string;
    url: string;
    logo: string;
    description: string;
    address: {
      country: string;
      region: string;
      locality: string;
    };
    contact: {
      phone: string;
      type: string;
    };
  };
}

export type PageType = "home" | "person" | "dashboard"; 