import Image from "next/image";
import Link from "next/link";
import { posterUrl } from "@/lib/image";

export default function MovieCard({
  id,
  title,
  posterPath,
  rating,
}: {
  id: number;
  title: string;
  posterPath: string | null;
  rating?: number;
}) {
  const src = posterUrl(posterPath);

  return (
    <Link
      href={`/movie/${id}`}
      className="group relative block aspect-2/3 overflow-hidden rounded-lg bg-neutral-800 ring-1 ring-white/10 transition duration-300 hover:z-10 hover:scale-105 hover:shadow-2xl hover:shadow-black/60 hover:ring-white/30"
    >
      {src ? (
        <Image
          src={src}
          alt={title}
          fill
          sizes="176px"
          unoptimized
          className="object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center p-2 text-center text-sm text-neutral-300">
          {title}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 to-transparent p-3 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="line-clamp-2 text-sm font-semibold">{title}</p>
        {rating ? (
          <p className="text-xs text-yellow-400">★ {rating.toFixed(1)}</p>
        ) : null}
      </div>
    </Link>
  );
}
