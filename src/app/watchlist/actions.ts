"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/profiles";
import { getMovieDetails } from "@/lib/movies";

const movieIdSchema = z.number().int().positive();

type Result = { error?: string };

async function getContext() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const profile = user ? await getCurrentProfile() : null;
  return { supabase, user, profile };
}

export async function addToWatchlist(movieId: number): Promise<Result> {
  if (!movieIdSchema.safeParse(movieId).success)
    return { error: "Invalid movie" };

  const { supabase, user, profile } = await getContext();
  if (!user) return { error: "Not signed in" };
  if (!profile) return { error: "Choose a profile first" };

  const movie = await getMovieDetails(String(movieId));

  const { error } = await supabase.from("watchlist").insert({
    user_id: user.id,
    profile_id: profile.id,
    movie_id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
  });
  if (error && error.code !== "23505") return { error: error.message };

  revalidatePath("/my-list");
  revalidatePath(`/movie/${movieId}`);
  return {};
}

export async function removeFromWatchlist(movieId: number): Promise<Result> {
  if (!movieIdSchema.safeParse(movieId).success)
    return { error: "Invalid movie" };

  const { supabase, user, profile } = await getContext();
  if (!user) return { error: "Not signed in" };
  if (!profile) return { error: "Choose a profile first" };

  const { error } = await supabase
    .from("watchlist")
    .delete()
    .eq("profile_id", profile.id)
    .eq("movie_id", movieId);
  if (error) return { error: error.message };

  revalidatePath("/my-list");
  revalidatePath(`/movie/${movieId}`);
  return {};
}
