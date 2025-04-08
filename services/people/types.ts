export interface PessoaDesaparecida {
  id: number
  nome: string
  idade: number
  sexo: "MASCULINO" | "FEMININO"
  urlFoto: string
  ultimaOcorrencia: {
    dtDesaparecimento: string
    dataLocalizacao?: string
    localDesaparecimentoConcat?: string
    encontradoVivo?: boolean
    ocorrenciaEntrevDesapDTO?: {
      vestimentasDesaparecido?: string
      informacao?: string
    }
    listaCartaz?: Array<{
      tipoCartaz: string
      urlCartaz: string
    }>
  }
  vivo?: boolean
}

export interface PessoasResponse {
  content: PessoaDesaparecida[]
  totalPages: number
  totalElements: number
  size: number
  number: number
}

export interface PessoasParams {
  nome?: string
  faixaIdadeInicial?: string
  faixaIdadeFinal?: string
  sexo?: string
  status?: string
  pagina?: number
  porPagina?: number
} 