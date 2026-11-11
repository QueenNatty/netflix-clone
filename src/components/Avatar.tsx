import Image from "next/image";
import { AVATAR_STYLES, avatarUrl } from "@/lib/avatars";

export default function Avatar({
  avatar,
  name,
  className = "",
}: {
  avatar: string;
  name: string;
  className?: string;
}) {
  const src = avatarUrl(avatar);
  const fallback = AVATAR_STYLES[avatar] ?? AVATAR_STYLES.red;

  return (
    <div
      role="img"
      aria-label={name}
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-md font-bold ${fallback} ${className}`}
    >
      {name.charAt(0).toUpperCase()}
      {src && (
        <Image
          src={src}
          alt=""
          fill
          unoptimized
          sizes="96px"
          className="object-cover"
        />
      )}
    </div>
  );
}
