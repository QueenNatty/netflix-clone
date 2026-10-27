import { Suspense } from "react";
import { getProfiles } from "@/lib/profiles";
import { AVATAR_STYLES } from "@/lib/avatars";
import AddProfileForm from "@/components/profiles/AddProfileForm";
import { selectProfile } from "./actions";
import SignOutButton from "@/components/auth/SignOutButton";

async function ProfileList() {
  const profiles = await getProfiles();

  return (
    <>
      {profiles.length === 0 ? (
        <p className="text-neutral-400">No profiles yet.</p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-6">
          {profiles.map((p) => (
            <li key={p.id}>
              <form action={selectProfile.bind(null, p.id)}>
                <button className="group flex flex-col items-center gap-2">
                  <div
                    className={`flex h-24 w-24 items-center justify-center rounded-md text-3xl font-bold group-hover:ring-4 group-hover:ring-white ${
                      AVATAR_STYLES[p.avatar] ?? AVATAR_STYLES.red
                    }`}
                  >
                    {p.name[0].toUpperCase()}
                  </div>
                  <span className="text-neutral-300 group-hover:text-white">
                    {p.name}
                  </span>
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
      {profiles.length < 5 && <AddProfileForm />}
    </>
  );
}

export default function ProfilesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <div className="absolute right-6 top-6" />
      <SignOutButton/>
      <h1 className="text-3xl font-bold">Who&apos;s watching?</h1>
      <Suspense
        fallback={<p className="text-neutral-400">Loading profiles...</p>}
      >
        <ProfileList />
      </Suspense>
    </main>
  );
}
