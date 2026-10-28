"use client";

import { createClient } from "@/lib/supabase/client";

export default function GoogleButton() {
    async function handleClick() {
        await createClient().auth.signInWithOAuth({
            provider: "google",
            options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
    }
    return (
        <button
            type="button"
            onClick={handleClick}
            className="w-full rounded-md bg-white py-2 font-medium text-black hover:bg-neutral-200"
        >
            Continue with Google
        </button>
    );
}