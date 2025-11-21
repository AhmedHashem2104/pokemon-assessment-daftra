"use client"

import { useParams, useNavigate } from "react-router-dom"
import { usePokemonDetail } from "@/lib/hooks/use-pokemon-detail"
import { Button } from "@/components/ui/button"
import { capitalizeFirstLetter } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"

export default function PokemonDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: pokemon, isLoading, error } = usePokemonDetail(id)

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-destructive text-lg font-semibold">Error loading Pokémon</p>
        <p className="text-muted-foreground">{error.message}</p>
        <Button onClick={() => navigate("/")} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Back to List
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-4 w-full max-w-2xl px-4">
          <div className="h-8 bg-muted rounded w-1/3 animate-pulse"></div>
          <div className="h-96 bg-muted rounded animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Pokémon not found</p>
        <Button onClick={() => navigate("/")} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Back to List
        </Button>
      </div>
    )
  }

  const imageUrl =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button onClick={() => navigate("/")} variant="ghost" className="gap-2 text-foreground hover:bg-muted">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex items-center justify-center bg-card rounded-lg p-8 border border-border">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={pokemon.name}
              className="w-full h-auto max-w-sm object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23e5e7eb" width="300" height="300"/%3E%3C/svg%3E'
              }}
            />
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground capitalize mb-2">
                {capitalizeFirstLetter(pokemon.name)}
              </h1>
              <p className="text-muted-foreground text-lg">#{pokemon.id}</p>
            </div>

            {/* Types */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Type</h2>
              <div className="flex gap-2 flex-wrap">
                {pokemon.types?.map((typeObj: any) => (
                  <div
                    key={typeObj.type.name}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-semibold capitalize"
                  >
                    {typeObj.type.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Height</span>
                  <span className="font-semibold text-foreground">{(pokemon.height * 0.1).toFixed(1)} m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-semibold text-foreground">{(pokemon.weight * 0.1).toFixed(1)} kg</span>
                </div>
                <div className="border-t border-border pt-3">
                  <h3 className="font-semibold text-foreground mb-2">Base Stats</h3>
                  {pokemon.stats?.map((stat: any) => (
                    <div key={stat.stat.name} className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground capitalize text-sm">
                        {stat.stat.name.replace("-", " ")}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${(Math.min(stat.base_stat, 150) / 150) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-foreground font-semibold text-sm w-8">{stat.base_stat}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Abilities */}
            {pokemon.abilities && pokemon.abilities.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">Abilities</h2>
                <div className="space-y-2">
                  {pokemon.abilities.map((abilityObj: any) => (
                    <div key={abilityObj.ability.name} className="p-3 bg-muted rounded-lg">
                      <p className="text-foreground capitalize font-medium">
                        {abilityObj.ability.name.replace("-", " ")}
                      </p>
                      {abilityObj.is_hidden && <p className="text-xs text-muted-foreground">Hidden Ability</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
