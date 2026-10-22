import "server-only";
import { tmdbFetch } from "./tmdb";
import type { Movie, TmdbListResponse } from "@/types/tmdb";

async function getMovieList(endpoint: string): Promise<Movie[]> {
    const data = await tmdbFetch<TmdbListResponse<Movie>>(endpoint);
    return data.results;
}

export const getTrending = () => getMovieList("/trending/movie/week");
export const getPopular = () => getMovieList("/movie/popular");
export const getTopRated = () => getMovieList("/movie/top_rated");
export const getUpcoming = () => getMovieList("/movie/upcoming");