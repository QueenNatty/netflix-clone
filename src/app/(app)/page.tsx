import MovieRow from "@/components/MovieRow";
import {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
} from "@/lib/movies";

export default async function Home() {
  const [trending, popular, topRated, upcoming] = await Promise.all([
    getTrending(),
    getPopular(),
    getTopRated(),
    getUpcoming(),
  ]);

  return (
    <main className="space-y-6 pb-12">
      <MovieRow title="Trending This Week" movies={trending} />
      <MovieRow title="Popular" movies={popular} />
      <MovieRow title="Top Rated" movies={topRated} />
      <MovieRow title="Coming Soon" movies={upcoming} />
    </main>
  );
}