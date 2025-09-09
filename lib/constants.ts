/**
 * NOTA AO REVISOR 01:
 * 
 * Estas configurações de ambiente são baseadas em pesquisas e testes realizados
 * com a API pública do sistema Abitus (https://desaparecidos.pjc.mt.gov.br/inicio).
 * 
 * Importante ressaltar que:
 * - Esta integração foi realizada apenas para fins de estudo
 * - Está fora do escopo principal do projeto
 * - Os endpoints foram identificados através de engenharia reversa ética
 * - Não há necessidade de docker-compose para desenvolvimento de produção
 *   pois utilizamos diretamente as APIs públicas existentes, disponibilizadas pelo edital
 */
const Environment = {
    PROD: {
        API_BASE_URL: "https://abitus-api.pjc.mt.gov.br/v1",
        BASE_SITE_URL: "https://goulart.com"
    },
    DEV: {
        API_BASE_URL: "https://abitus-api.geia.vip/v1",
        BASE_SITE_URL: "https://goulart.com"
    }
}

const currentEnvironment = Environment.DEV
export const BASE_SITE_URL = currentEnvironment.BASE_SITE_URL
export const API_BASE_URL = currentEnvironment.API_BASE_URL
