import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/profile";

export async function getProfiles(): Promise<Profile[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from("profiles").select("*").order("created_at");

    if (error) throw new Error(error.message);
    return data ?? [];
}