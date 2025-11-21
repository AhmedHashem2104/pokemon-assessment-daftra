import { useQuery } from "@tanstack/react-query"
import { pokéAPIClient } from "@/lib/api-client"

export const usePokemonList = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ["pokemon-list", limit, offset],
    queryFn: () => pokéAPIClient.getPokemonList(limit, offset),
  })
}
