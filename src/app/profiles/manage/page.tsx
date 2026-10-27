import { Suspense } from "react";
import Link from "next/link";
import { getProfiles } from '@/lib/profiles';
import { AVATAR_STYLES } from "@/lib/avatars";
import { renameProfile, deleteProfile } from '../actions';

async function ManageList() {
    const profiles = await getProfiles();

    return (
        <ul className="w-full max-w-md space-y-4">
            {profiles.map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                    <div className="{`flex h-12 w-12 shrink-0 items-center justify-center rounded-md font-bold ${
                    AVATAR_STYLRS[p.avatar] ?? AVATAR_STYLE.red}`}">
                        {p.name[0].toUpperCase()}
                    </div>
                    
                    <form action={renameProfile.bind(null, p.id)} className="flex flex-1 gap-2">
                        <input
                            name="name"
                            defaultValue={p.name}
                            maxLength={20}
                            required
                            className="w-full rounded-md bg-neutral-800 px-3 py-3 outline-none focus:ring-2 focus:ring-red-600"
                        />
                        <button className="rounded-md bg-neutral-700 px-3 text-sm hover:bg-neutral-600">
                            Save
                        </button>
                    </form>

                    {profiles.length > 1 && (
                        <form action={deleteProfile.bind(null, p.id)}>
                            <button className="rounded-md px-3 py2 text-sm text-red-500 hover:bg-neutral-800">
                                Delete
                            </button>
                        </form>
                    )}
                </li>
            ))}

        </ul>
    );
}

export default function ManageProfilesPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
            <h1 className="text-3xl font-bold">Manage profiles</h1>
            <Suspense fallback={<p className="text-neutral-400">Loading...</p>}>
                <ManageList />
            </Suspense>
            <Link
                href="/profiles"
                className="rounded-md bg-red-600 px-6 py-2 font-medium hover:bg-red-700"
            >
                Done
            </Link>
        </main>
    );
}