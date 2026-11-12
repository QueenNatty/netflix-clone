"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProfile } from "@/app/profiles/actions";
import { AVATAR_SEEDS } from "@/lib/avatars";
import Avatar from "@/components/Avatar";
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
    defaultValues: { name: "", avatar: "Felix" },
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

      <div className="grid grid-cols-6 gap-2">
        {AVATAR_SEEDS.map((seed) => (
          <label key={seed} className="cursor-pointer">
            <input
              type="radio"
              value={seed}
              {...register("avatar")}
              className="peer sr-only"
            />
            <span className="block rounded-md opacity-60 ring-2 ring-transparent transition hover:opacity-100 peer-checked:opacity-100 peer-checked:ring-white peer-focus-visible:ring-red-500">
              <Avatar
                avatar={seed}
                name={seed}
                className="aspect-square w-full"
              />
            </span>
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
