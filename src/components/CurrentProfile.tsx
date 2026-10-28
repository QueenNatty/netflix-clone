import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/profiles";
import { AVATAR_STYLES } from "@/lib/avatars";
import SignOutButton from "@/components/auth/SignOutButton";

export default async function CurrentProfile() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/profiles");

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded text-sm font-bold ${
          AVATAR_STYLES[profile.avatar] ?? AVATAR_STYLES.red
        }`}
      >
        {profile.name[0].toUpperCase()}
      </div>
      <span className="text-sm">{profile.name}</span>
      <Link
        href="/profiles"
        className="text-sm text-neutral-400 hover:text-white"
      >
        Switch
      </Link>
      <SignOutButton />
    </div>
  );
}
