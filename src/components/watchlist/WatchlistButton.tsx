"use client";

import { useState, useTransition } from "react";
import { addToWatchlist, removeFromWatchlist } from "@/app/watchlist/actions";

export default function WatchlistButton({
  movieId,
  initialInList,
}: {
  movieId: number;
  initialInList: boolean;
}) {
  const [inList, setInList] = useState(initialInList);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleClick() {
    const next = !inList;
    setInList(next);
    setError(null);

    startTransition(async () => {
      const result = next
        ? await addToWatchlist(movieId)
        : await removeFromWatchlist(movieId);
      if (result.error) {
        setInList(!next);
        setError(result.error);
      }
    });
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={pending}
        aria-pressed={inList}
        className={`rounded-md px-4 py-2 font-medium disabled:opacity-60 ${
          inList
            ? "bg-neutral-700 hover:bg-neutral-600"
            : "bg-white text-black hover:bg-neutral-200"
        }`}
      >
        {inList ? "✓ In My List" : "+ My List"}
      </button>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
