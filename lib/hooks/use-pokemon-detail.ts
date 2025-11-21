import { useQuery } from "@tanstack/react-query"
import { pokéAPIClient } from "@/lib/api-client"

export const usePokemonDetail = (idOrName: string | number) => {
  return useQuery({
    queryKey: ["pokemon-detail", idOrName],
    queryFn: () => pokéAPIClient.getPokemonDetail(idOrName),
    enabled: !!idOrName,
  })
}
