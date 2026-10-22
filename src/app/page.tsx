import Image from "next/image";
import { getTrending } from "@/lib/movies";
import { posterUrl } from "@/lib/image";

export default async function Home() {
  const movies = (await getTrending()).slice(0, 10);

  return (
    <main className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-5">
      {movies.map((movie) => {
        const src = posterUrl(movie.poster_path);
        return src ? (
          <Image
            key={movie.id}
            src={src}
            alt={movie.title}
            width={342}
            height={513}
            unoptimized
            className="rounded-md"
          />
        ) : (
          <div
            key={movie.id}
            className="flex aspect-[2/3] items-center justify-center rounded-md bg-neutral-800 p-2 text-center text-sm"
          >
            {movie.title}
          </div>
        );
      })}
    </main>
  );
}
