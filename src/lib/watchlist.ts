import "server-only";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/profiles";

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
