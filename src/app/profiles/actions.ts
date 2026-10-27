"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { profileSchema, type ProfileValues } from "@/lib/validations/profile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export async function selectProfile(profileId: string): Promise<void> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", profileId)
    .maybeSingle();
  if (!data) return;

  const cookieStore = await cookies();
  cookieStore.set("profile_id", data.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/");
}

export async function clearProfile(): Promise<void> {
  (await cookies()).delete("profile_id");
}

export type RenameState = { error?: string; ok?: boolean };

export async function renameProfile(
  profileId: string,
  _prev:RenameState,
  formData: FormData
): Promise<RenameState> {
  const parsed = profileSchema.shape.name.safeParse(formData.get("name"));
  if(!parsed.success) return{error: parsed.error.issues[0].message };

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ name: parsed.data })
    .eq("id", profileId);
  if (error) return { error: error.message };

  revalidatePath("/profiles", "layout");
  return { ok: true };
}

export async function deleteProfile(profileId: string): Promise<void> {
  const supabase = await createClient();

  const { count } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });
  if ((count ?? 0) <= 1) return;

  await supabase.from("profiles").delete().eq("id", profileId);

  const cookieStore = await cookies();
  if (cookieStore.get("profile_id")?.value === profileId) {
    cookieStore.delete("profile_id");
  }

  revalidatePath("/profiles", "layout");
  
}
