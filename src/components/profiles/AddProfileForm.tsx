"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProfile } from "@/app/profiles/actions";
import { AVATAR_KEYS, AVATAR_STYLES } from "@/lib/avatars";
import { profileSchema, type ProfileValues } from "@/lib/validations/profile";

export default function AddProfileForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", avatar: "red" },
  });

  async function onSubmit(values: ProfileValues) {
    setServerError(null);
    const result = await createProfile(values);
    if (result.error) {
      setServerError(result.error);
      return;
    }
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full max-w-xs space-y-4"
    >
      <h2 className="text-lg font-semibold">Add profile</h2>

      <div>
        <input
          {...register("name")}
          placeholder="Name"
          className="w-full rounded-md bg-neutral-800 px-3 py-2 outline-none focus:ring-2 focus:ring-red-600"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        {AVATAR_KEYS.map((key) => (
          <label key={key} className="cursor-pointer">
            <input
              type="radio"
              value={key}
              {...register("avatar")}
              className="peer sr-only"
            />
            <span
              className={`block h-10 w-10 rounded-md opacity-60 peer-checked:opacity-100 peer-checked:ring-2 peer-checked:ring-white ${AVATAR_STYLES[key]}`}
            />
          </label>
        ))}
      </div>

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

      <button
        disabled={isSubmitting}
        className="w-full rounded-md bg-red-600 py-2 font-medium hover:bg-red-700 disabled:opacity-60"
      >
        {isSubmitting ? "Adding..." : "Add profile"}
      </button>
    </form>
  );
}
