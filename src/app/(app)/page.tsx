import { getTrending } from "@/lib/movies";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/auth/SignOutButton";
import MovieCard from "@/components/MovieCard";

export default async function Home() {
  const movies = (await getTrending()).slice(0, 10);


  return (
    <main className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-5">
      {movies.map((movie) => (
  <MovieCard
    key={movie.id}
    id={movie.id}
    title={movie.title}
    posterPath={movie.poster_path}
  />
))}
    </main>
  );
}
