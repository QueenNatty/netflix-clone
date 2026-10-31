import "server-only";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/profiles";
import type { WatchlistItem } from "@/types/watchlist";

export async function isInWatchlist(movieId: number): Promise<boolean> {
  const profile = await getCurrentProfile();
  if (!profile) return false;

  const supabase = await createClient();
  const { count } = await supabase
    .from("watchlist")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", profile.id)
    .eq("movie_id", movieId);

  return (count ?? 0) > 0;
}

export async function getWatchlist(): Promise<WatchlistItem[]> {
  const profile = await getCurrentProfile();
  if (!profile) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("watchlist")
    .select("*")
    .eq("profile_id", profile.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}