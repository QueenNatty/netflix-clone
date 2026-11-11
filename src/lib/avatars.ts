// Legacy color avatars (older profiles) double as the fallback look.
export const AVATAR_STYLES: Record<string, string> = {
  red: "bg-red-600",
  blue: "bg-blue-600",
  green: "bg-green-600",
  yellow: "bg-yellow-500 text-black",
};

export const AVATAR_SEEDS = [
  "Felix",
  "Aneka",
  "Mimi",
  "Jasper",
  "Luna",
  "Oliver",
  "Zoe",
  "Max",
  "Nova",
  "Leo",
  "Ivy",
  "Finn",
] as const;

const BASE = "https://api.dicebear.com/10.x/lorelei/svg";

export function avatarUrl(avatar: string): string | null {
  if (!(AVATAR_SEEDS as readonly string[]).includes(avatar)) return null;
  return `${BASE}?seed=${encodeURIComponent(avatar)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}
