import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { backdropUrl } from "@/lib/image";
import WatchlistToggle from "@/components/watchlist/WatchlistToggle";
import type { Movie } from "@/types/tmdb";

export default function Hero({ movies }: { movies: Movie[] }) {
    const movie = movies.find((m) => m.backdrop_path);
    const src = movie ? backdropUrl(movie.backdrop_path, "w1280") : null;
    if (!movie || !src) return null;

    return (
        <section className="relative -mt-16 h-[65vh] min-h-96 w-full">
            <Image
                src={src}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 to-transparent" />

            <div className="absolute bottom-10 left-6 right-6 max-w-xl space-y-3 sm:bottom-16">
                <h1 className="text-3xl font-extrabold sm:text-5xl">{movie.title}</h1>
                <p className="line-clamp-3  text-sm text-neutral-200 sm:text-base">
                    {movie.overview}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        href={`/movie/${movie.id}`}
                        className="rounded-md bg-red-600 px-5 py-2 font-medium hover:bg-red-700"
                    >
                        ▶ Watch trailer
                    </Link>
                    <Suspense
                        fallback={<div className="h-10 w-32 animate-pulse rounded-md bg-neutral-800" />}
                    >
                        <WatchlistToggle movieId={movie.id} />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}