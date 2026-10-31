import Image from "next/image";
import Link from "next/link";
import { posterUrl } from "@/lib/image";

export default function MovieCard({
  id,
  title,
  posterPath,
}: {
  id: number;
  title: string;
  posterPath: string | null;
}) {
  const src = posterUrl(posterPath);

  return (
    <Link href={`/movie/${id}`} className="block">
      {src ? (
        <Image
          src={src}
          alt={title}
          width={342}
          height={513}
          unoptimized
          className="rounded-md transition hover:scale-105"
        />
      ) : (
        <div className="flex aspect-2/3 items-center justify-center rounded-md bg-neutral-800 p-2 text-center text-sm">
          {title}
        </div>
      )}
    </Link>
  );
}
