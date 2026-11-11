import MovieCard from "@/components/MovieCard";
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
            <ul className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-6 py-4">
                {movies.slice(0, 15).map((m) => (
                    <li key={m.id} className="w-36 shrink-0 sna-start sm:w-44">
                        <MovieCard
                            id={m.id}
                            title={m.title}
                            posterPath={m.poster_path}
                            rating={m.vote_average}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}