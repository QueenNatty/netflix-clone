const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL ?? "https://image.tmdb.org/t/p";

type PosterSize = "w185" | "w342" | "w500";
type BackDropSize = "w780" | "w1280";

export function posterUrl(
    path: string | null,
    size: PosterSize = "w342"
): string | null {
    return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}

export function backdropUrl(
    path: string | null,
    size: BackDropSize = "w780"
): string | null {
    return path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
}