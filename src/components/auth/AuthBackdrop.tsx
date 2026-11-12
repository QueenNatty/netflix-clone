import Image from "next/image";
import { getTrending } from "@/lib/movies";
import { backdropUrl } from "@/lib/image";

export default async function AuthBackdrop() {
    let src: string | null = null;
    try {
        const movies = await getTrending();
        const movie = movies.find((m) => m.backdrop_path);
        src = movie ? backdropUrl(movie.backdrop_path, "w1280") : null;
    } catch {
        src = null;
    }
    
    return (
        <div aria-hidden className="fixed inset-0 -z-10 bg-neutral-950">
            {src && (
                <Image
                    src={src}
                    alt=""
                    fill
                    priority
                    unoptimized
                    sizes="100vw"
                    className="object-cover opacity-40"
                />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/70" />
        </div>
    );
}