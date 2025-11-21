import axios, { type AxiosInstance } from "axios"

const API_BASE_URL = "https://pokeapi.co/api/v2"

class PokéAPIClient {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    })
  }

  async getPokemonList(limit: number, offset: number) {
    try {
      const response = await this.axiosInstance.get("/pokemon", {
        params: { limit, offset },
      })
      return response.data
    } catch (error) {
      throw new Error("Failed to fetch Pokémon list")
    }
  }

  async getPokemonDetail(idOrName: string | number) {
    try {
      const response = await this.axiosInstance.get(`/pokemon/${idOrName}`)
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch Pokémon details for ${idOrName}`)
    }
  }
}

export const pokéAPIClient = new PokéAPIClient()
