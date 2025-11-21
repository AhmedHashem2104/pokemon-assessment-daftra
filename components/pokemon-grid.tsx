import PokemonCard from "@/components/pokemon-card";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonGridProps {
  pokemon: Pokemon[];
  isLoading: boolean;
}

export default function PokemonGrid({ pokemon, isLoading }: PokemonGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-muted rounded-lg p-4 animate-pulse">
            <div className="h-40 bg-muted-foreground rounded mb-3"></div>
            <div className="h-4 bg-muted-foreground rounded w-2/3 mx-auto mb-2"></div>
            <div className="h-3 bg-muted-foreground rounded w-1/2 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {pokemon.map((p) => (
        <PokemonCard
          key={`${p.name}-${crypto.randomUUID()}`}
          name={p.name}
          url={p.url}
        />
      ))}
    </div>
  );
}
