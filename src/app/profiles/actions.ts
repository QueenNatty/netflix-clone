"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { profileSchema, type ProfileValues } from "@/lib/validations/profile";

const MAX_PROFILES = 5;

export async function createProfile(
  values: ProfileValues,
): Promise<{ error?: string }> {
  const parsed = profileSchema.safeParse(values);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in" };

  const { count } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });
  if ((count ?? 0) >= MAX_PROFILES) {
    return { error: `Maximum of ${MAX_PROFILES} profiles` };
  }

  const { error } = await supabase
    .from("profiles")
    .insert({ user_id: user.id, ...parsed.data });
  if (error) return { error: error.message };

  revalidatePath("/profiles");
  return {};
}
