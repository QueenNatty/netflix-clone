import "server-only";
import { tmdbFetch, TmdbError } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import type { MovieDetails, Movie, TmdbListResponse } from "@/types/tmdb";


async function getMovieList(endpoint: string): Promise<Movie[]> {
  const data = await tmdbFetch<TmdbListResponse<Movie>>(endpoint);
  return data.results;
}

export const getTrending = () => getMovieList("/trending/movie/week");
export const getPopular = () => getMovieList("/movie/popular");
export const getTopRated = () => getMovieList("/movie/top_rated");
export const getUpcoming = () => getMovieList("/movie/upcoming");

export async function getMovieDetails(id: string) {
  try {
    return await tmdbFetch<MovieDetails>(`/movie/${id}`, {
      append_to_response: "videos",
    });
  } catch (e) {
    if (e instanceof TmdbError && e.status === 404) notFound();
    throw e;
  }
}