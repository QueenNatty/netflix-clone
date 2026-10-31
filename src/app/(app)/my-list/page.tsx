import { Suspense } from "react";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";
import { getWatchlist } from "@/lib/watchlist";

async function MyListGrid() {
  const items = await getWatchlist();

  if (items.length === 0) {
    return (
      <div className="text-neutral-400">
        <p>Your list is empty.</p>
        <Link href="/" className="mt-2 inline-block text-white hover:underline">
          Browse movies
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
      {items.map((item) => (
        <MovieCard
          key={item.id}
          id={item.movie_id}
          title={item.title}
          posterPath={item.poster_path}
        />
      ))}
    </div>
  );
}

export default function MyListPage() {
  return (
    <main className="p-6">
      <h1 className="mb-6 text-3xl font-bold">My List</h1>
      <Suspense
        fallback={
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="aspect-2/3 animate-pulse rounded-md bg-neutral-800"
              />
            ))}
          </div>
        }
      >
        <MyListGrid />
      </Suspense>
    </main>
  );
}
