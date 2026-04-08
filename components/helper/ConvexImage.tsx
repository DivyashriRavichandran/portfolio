import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import Image from "next/image";

export function ConvexImage({
  storageId,
  contain,
  className,
}: {
  storageId: string;
  contain?: boolean;
  className?: string;
}) {
  const imageUrl = useQuery(api.images.getUrl, { storageId });
  if (!imageUrl) return <div className="size-full bg-white/5" />;
  return (
    <Image
      src={imageUrl}
      alt="Project Image"
      fill
      className={cn(contain ? "object-contain" : "object-cover", className)}
    />
  );
}
