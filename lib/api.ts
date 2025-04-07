import axios from "axios"
export const API_BASE_URL = "https://abitus-api.geia.vip/v1"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
})

export default api

