import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/profile";
import { cookies } from "next/headers";

export async function getProfiles(): Promise<Profile[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at");

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const id = (await cookies()).get("profile_id")?.value;
  if (!id) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data;
}