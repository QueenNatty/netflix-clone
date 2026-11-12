import MovieCard from "@/components/MovieCard";
import ScrollRow from "@/components/ScrollRow";
import type { Movie } from "@/types/tmdb";

export default function MovieRow({
    title,
    movies,
}: {
    title: string;
    movies: Movie[];
}) {
    if (movies.length === 0) return null;

    return (
      <section>
        <h2 className="mb-1 px-6 text-lg font-semibold sm:text-xl">{title}</h2>
        <ScrollRow>
          {movies.slice(0, 15).map((m) => (
            <li key={m.id} className="w-36 shrink-0 sm:w-44">
              <MovieCard
                id={m.id}
                title={m.title}
                posterPath={m.poster_path}
                rating={m.vote_average}
              />
            </li>
          ))}
        </ScrollRow>
      </section>
    );
}