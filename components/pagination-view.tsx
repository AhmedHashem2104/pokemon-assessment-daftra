"use client";

import { useState } from "react";
import PokemonGrid from "@/components/pokemon-grid";
import { usePokemonList } from "@/lib/hooks/use-pokemon-list";
import { Button } from "@/components/ui/button";

const LIMIT = 20;

export default function PaginationView() {
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * LIMIT;

  const { data, isLoading, error, refetch } = usePokemonList(LIMIT, offset);

  const totalPages = data ? Math.ceil(data.count / LIMIT) : 0;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <p className="text-destructive text-lg font-semibold">
          Error loading Pokémon
        </p>
        <p className="text-muted-foreground">{error.message}</p>
        <Button
          onClick={() => refetch()}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Retry
        </Button>
      </div>
    );
  }

  const getVisiblePages = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i == 1 ||
        i == totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="space-y-8">
      <PokemonGrid pokemon={data?.results || []} isLoading={isLoading} />

      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1 || isLoading}
          variant="outline"
        >
          Previous
        </Button>

        <div className="flex gap-1 flex-wrap justify-center">
          {visiblePages.map((page) => {
            if (page === "...") {
              return (
                <span
                  key={`dots-${page}`}
                  className="px-2 py-1 text-muted-foreground"
                >
                  ...
                </span>
              );
            }
            return (
              <Button
                key={page}
                onClick={() => setCurrentPage(page as number)}
                variant={page === currentPage ? "default" : "outline"}
                className={
                  page === currentPage
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
                size="sm"
              >
                {page}
              </Button>
            );
          })}
        </div>

        <Button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || isLoading}
          variant="outline"
        >
          Next
        </Button>

        <span className="text-muted-foreground text-sm ml-4">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
}
