import { create } from "zustand"

interface PokemonFilters {
  searchQuery: string
}

interface PokemonStore {
  filters: PokemonFilters
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  filters: {
    searchQuery: "",
  },
  setSearchQuery: (query: string) =>
    set((state) => ({
      filters: { ...state.filters, searchQuery: query },
    })),
  resetFilters: () =>
    set({
      filters: {
        searchQuery: "",
      },
    }),
}))
