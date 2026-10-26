import { z } from "zod";
import { AVATAR_KEYS } from "@/lib/avatars";

export const profileSchema = z.object({
    name: z.string().trim().min(1, "Enter a name").max(20, "Max 20 characters"),
    avatar: z.enum(AVATAR_KEYS),
});

export type ProfileValues = z.infer<typeof profileSchema>;
