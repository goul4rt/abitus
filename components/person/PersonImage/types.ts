export interface PersonImageProps {
  nome: string;
  urlFoto: string;
  listaCartaz?: Array<{
    tipoCartaz: string;
    urlCartaz: string;
  }>;
}
