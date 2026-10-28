"use client";

import { useActionState } from "react";
import { renameProfile, type RenameState } from "@/app/profiles/actions";

export default function RenameForm({
    profileId,
    name,
}: {
        profileId: string;
        name: string;
    }) {
    const [state, formAction, pending] = useActionState<RenameState, FormData>(
        renameProfile.bind(null, profileId),
        {}
    );

    return (
        <form action={formAction} className="flex-1">
            <div className="flex gap-2">
                <input
                    name="name"
                    defaultValue={name}
                    maxLength={20}
                    required
                    className="w-full rounded-md bg-neutral-800 px-3 py-3 outline-none focus:ring-2 focus:ring-red-600"
                />
                <button
                    disabled={pending}
                    className="rounded=mg bg-neutral-700 px-3 text-sm hover:bg-neutral-600 disabled:opacity-60"
                >
                    {pending ? "Saving..." : "Save"}
                </button>
            </div>
            {state.error && <p className="mt-1 text-sm text-red-500"> {state.error}</p>}
            {state.ok && <p className="mt-1 text-sm text-green-500"> Saved</p>}
        </form>
    );
}