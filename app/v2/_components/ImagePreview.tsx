"use client";

import { useQuery } from "convex/react";
import Image from "next/image";
import { Loader2, ImageIcon } from "lucide-react";
import { api } from "@/convex/_generated/api";

interface ImagePreviewProps {
  storageId: string;
}

export const ImagePreview = ({ storageId }: ImagePreviewProps) => {
  // This query should point to a function in your Convex 'projects.ts'
  // or 'files.ts' that returns the metadata for a storageId
  const imageUrl = useQuery(api.projects.getFileUrl, { storageId });

  if (imageUrl === undefined) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white/5">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  if (imageUrl === null) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white/5 text-white/20">
        <ImageIcon className="h-8 w-8" />
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt="Project Screenshot"
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
};
