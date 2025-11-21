import Link from "next/link"
import { capitalizeFirstLetter } from "@/lib/utils"

interface PokemonCardProps {
  name: string
  url: string
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
  const pokemonId = url.split("/").filter(Boolean).pop()
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`

  return (
    <Link href={`/pokemon/${pokemonId}`}>
      <div className="bg-card hover:shadow-lg transition-shadow duration-200 rounded-lg p-4 text-center border border-border cursor-pointer hover:scale-105 transform">
        <div className="h-40 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded mb-3">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            className="h-32 w-32 object-contain"
            onError={(e) => {
              e.currentTarget.src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect fill="%23e5e7eb" width="128" height="128"/%3E%3C/svg%3E'
            }}
          />
        </div>
        <h3 className="font-semibold text-foreground capitalize text-lg">{capitalizeFirstLetter(name)}</h3>
        <p className="text-muted-foreground text-sm">#{pokemonId}</p>
      </div>
    </Link>
  )
}
