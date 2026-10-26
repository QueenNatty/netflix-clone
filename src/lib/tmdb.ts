import "server-only";

const BASE_URL = process.env.TMDB_BASE_URL ?? "https://api.themoviedb.org/3";
const TOKEN = process.env.TMDB_ACCESS_TOKEN;

export class TmdbError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}

export async function tmdbFetch<T>(
    endpoint: string,
    params: Record<string, string> = {},
    revalidate = 3600
): Promise<T> {
    if (!TOKEN) {
        throw new Error("Missing TMDB_ACCESS_TOKEN in .env.local");
    }

    const url = new URL(`${BASE_URL}${endpoint}`);
    url.search = new URLSearchParams({ language: "en-US", ...params }).toString();

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            accept: "authorization/json",
        },
        next: { revalidate },
    });

    if (!res.ok) {
        throw new TmdbError(res.status, `TMDB ${res.status} ${res.statusText} on ${endpoint}`);
    }
    return res.json() as Promise<T>;
}