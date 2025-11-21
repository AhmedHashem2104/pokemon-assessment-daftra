"use client"

import { useState } from "react"
import PaginationView from "@/components/pagination-view"
import LoadMoreView from "@/components/load-more-view"
import { Button } from "@/components/ui/button"

export default function PokemonList() {
  const [viewMode, setViewMode] = useState<"pagination" | "loadmore">("pagination")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <h1 className="text-3xl font-bold text-foreground">Pokémon Browser</h1>
            <div className="flex gap-2">
              <Button
                onClick={() => setViewMode("pagination")}
                variant={viewMode === "pagination" ? "default" : "outline"}
                className={viewMode === "pagination" ? "bg-primary text-primary-foreground" : ""}
              >
                Pagination
              </Button>
              <Button
                onClick={() => setViewMode("loadmore")}
                variant={viewMode === "loadmore" ? "default" : "outline"}
                className={viewMode === "loadmore" ? "bg-primary text-primary-foreground" : ""}
              >
                Load More
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === "pagination" && <PaginationView />}
        {viewMode === "loadmore" && <LoadMoreView />}
      </main>
    </div>
  )
}
