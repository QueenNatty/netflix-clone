import { isInWatchlist } from "@/lib/watchlist";
import WatchlistButton from "./WatchlistButton";

export default async function WatchlistToggle({
  movieId,
}: {
  movieId: number;
}) {
  const inList = await isInWatchlist(movieId);
  return <WatchlistButton movieId={movieId} initialInList={inList} />;
}
