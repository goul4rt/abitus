import { CONFIG } from '../config';
import { PersonData } from '../types';

export function generatePersonSchema(data: PersonData) {
  return {
    "@context": CONFIG.context,
    "@type": "Person",
    name: data.nome,
    gender: data.sexo === "MASCULINO" ? "Male" : "Female",
    description: `Pessoa ${data.ultimaOcorrencia.dataLocalizacao ? "localizada" : "desaparecida"} desde ${data.ultimaOcorrencia.dtDesaparecimento}`,
    image: data.urlFoto,
  };
}