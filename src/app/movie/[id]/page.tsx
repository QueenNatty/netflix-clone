import Image from "next/image";
import Link from "next/link";
import { getMovieDetails } from "@/lib/movies";
import { backdropUrl } from "@/lib/image";
import { pickTrailer } from "@/lib/videos";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
    const trailer = pickTrailer(movie.videos.results);
    console.log("picked:", trailer?.type, trailer?.key);
  const backdrop = backdropUrl(movie.backdrop_path);

  console.log(
    movie.videos.results.map((v) => `${v.type} | ${v.site} | ${v.official}`),
  );
  return (
    <main className="mx-auto max-w-4xl p-6">
      <Link href="/" className="text-neutral-400 hover:text-white">
        ← Back
      </Link>

      {backdrop && (
        <Image
          src={backdrop}
          alt=""
          width={780}
          height={439}
          unoptimized
          className="mt-4 w-full rounded-md"
        />
      )}

      <h1 className="mt-6 text-3xl font-bold">{movie.title}</h1>
      {movie.tagline && (
        <p className="text-neutral-400 italic">{movie.tagline}</p>
      )}

      <p className="mt-2 text-sm text-neutral-400">
        {movie.release_date.slice(0, 4)}
        {movie.runtime ? ` · ${movie.runtime} min` : ""} · ★{" "}
        {movie.vote_average.toFixed(1)}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {movie.genres.map((g) => (
          <span
            key={g.id}
            className="rounded-full bg-neutral-800 px-3 py-1 text-xs"
          >
            {g.name}
          </span>
        ))}
      </div>

      <p className="mt-4 leading-relaxed">{movie.overview}</p>

      {trailer ? (
        <iframe
          className="mt-6 aspect-video w-full rounded-md"
          src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
          title={trailer.name}
          loading="lazy"
          allowFullScreen
        />
      ) : (
        <p className="mt-6 rounded-md bg-neutral-900 p-4 text-sm text-neutral-400">
          No trailer available yet.
        </p>
      )}
    </main>
  );
}
