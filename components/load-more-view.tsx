"use client";

import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import PokemonGrid from "@/components/pokemon-grid";
import { pokéAPIClient } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const LIMIT = 20;

export default function LoadMoreView() {
  const [autoLoad, setAutoLoad] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["pokemon-infinite"],
    queryFn: ({ pageParam = 0 }) =>
      pokéAPIClient.getPokemonList(LIMIT, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // Calculate next offset: current page count * limit
      const nextOffset = allPages.length * LIMIT;
      return nextOffset < lastPage.count ? nextOffset : undefined;
    },
  });

  const allPokemon = data?.pages.flatMap((page) => page.results) || [];

  useEffect(() => {
    if (!autoLoad || !observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, [autoLoad, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <p className="text-destructive text-lg font-semibold">
          Error loading Pokémon
        </p>
        <p className="text-muted-foreground">{error.message}</p>
        <Button
          onClick={() => {
            window.location.reload();
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PokemonGrid pokemon={allPokemon} isLoading={isLoading} />

      <div className="flex items-center justify-center gap-3 bg-card p-4 rounded-lg border border-border">
        <Checkbox
          id="auto-load"
          checked={autoLoad}
          onCheckedChange={(checked) => setAutoLoad(checked as boolean)}
          disabled={isLoading || !hasNextPage}
        />
        <label
          htmlFor="auto-load"
          className="text-sm font-medium cursor-pointer"
        >
          Auto-load when scrolling near the end
        </label>
      </div>

      {!autoLoad && hasNextPage && (
        <div className="flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage || isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {autoLoad && isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="text-muted-foreground">Loading more Pokémon...</div>
        </div>
      )}

      {autoLoad && hasNextPage && (
        <div
          ref={observerTarget}
          className="h-4 flex justify-center items-center"
        >
          <span className="text-xs text-muted-foreground">
            Scroll to load more
          </span>
        </div>
      )}

      {!hasNextPage && allPokemon.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">You&apos;ve reached the end!</p>
        </div>
      )}
    </div>
  );
}
