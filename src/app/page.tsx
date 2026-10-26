import Image from "next/image";
import Link from "next/link";
import { getTrending } from "@/lib/movies";
import { posterUrl } from "@/lib/image";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const movies = (await getTrending()).slice(0, 10);


  return (
    <main className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-5">
      {movies.map((movie) => {
        const src = posterUrl(movie.poster_path);
        return (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            {src ? (
              <Image
                src={src}
                alt={movie.title}
                width={342}
                height={513}
                unoptimized
                className="rounded-md transition hover:scale-105"
              />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center rounded-md bg-neutral-800 p-2 text-center text-sm">
                {movie.title}
              </div>
            )}
          </Link>
        );
      })}
    </main>
  );
}
