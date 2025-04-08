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

const currentEnvironment = Environment.PROD
export const BASE_SITE_URL = currentEnvironment.BASE_SITE_URL
export const API_BASE_URL = currentEnvironment.API_BASE_URL
