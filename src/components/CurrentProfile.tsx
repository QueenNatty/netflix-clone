import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/profiles";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/auth/SignOutButton";

export default async function CurrentProfile() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/profiles");

  return (
    <div className="flex items-center gap-3">
      <Avatar avatar={profile.avatar} name={profile.name} className="h-8 w-8 text-sm" />
      <span className="hidden text-sm sm:inline">{profile.name}</span>
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
