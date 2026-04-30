"use client";

import { useState } from "react";
import { useForm, Path } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2,
  ImagePlus,
  Sparkles,
  Terminal,
  Link as LinkIcon,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import H3 from "@/components/headings/H3";
import { Doc } from "@/convex/_generated/dataModel";

interface MiniProjectFormValues {
  title_en: string;
  title_nl: string;
  description_en: string;
  description_nl: string;
  tags: string;
  url: string;
  image: string;
}

export default function MiniProjectForm({
  initialData,
}: {
  initialData?: Doc<"mini_projects">;
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const createMiniProject = useMutation(api.mini_projects.create);
  const updateMiniProject = useMutation(api.mini_projects.update);
  const generateUploadUrl = useMutation(api.images.generateUploadUrl);

  const { register, handleSubmit, setValue, watch } =
    useForm<MiniProjectFormValues>({
      defaultValues: initialData
        ? {
            title_en: initialData.title.en,
            title_nl: initialData.title.nl,
            description_en: initialData.description.en,
            description_nl: initialData.description.nl,
            tags: initialData.tags?.join(", ") || "",
            url: initialData.url || "",
            image: initialData.image || "",
          }
        : {
            tags: "",
            url: "",
            image: "",
          },
    });

  const onSubmit = async (data: MiniProjectFormValues) => {
    const tagsArray = data.tags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: { en: data.title_en, nl: data.title_nl },
      description: { en: data.description_en, nl: data.description_nl },
      tags: tagsArray,
      url: data.url,
      image: data.image,
    };

    try {
      if (initialData?._id) {
        await updateMiniProject({ id: initialData._id, ...payload });
      } else {
        await createMiniProject(payload);
      }
      toast.success("Mini project saved!");
      router.push("/admin");
    } catch (e) {
      console.error(e);
      toast.error("Save failed");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await generateUploadUrl();
      const res = await fetch(url, { method: "POST", body: file });
      const { storageId } = await res.json();
      setValue("image", storageId);
      toast.success("Cover image uploaded");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 pb-24 max-w-4xl"
    >
      {/* Content Section */}
      <section className="space-y-6">
        <H3 icon={Terminal} text="Mini Project Details" />
        <div className="grid grid-cols-2 gap-4 bg-white/5 p-6 rounded-xl border border-white/10">
          <Input
            {...register("title_en")}
            placeholder="Project Title (EN)"
            variant="admin"
          />
          <Input
            {...register("title_nl")}
            placeholder="Project Titel (NL)"
            variant="admin"
          />
          <div className="col-span-2 space-y-4">
            <Textarea
              {...register("description_en")}
              placeholder="Short Description (EN)"
              variant="admin"
              rows={3}
            />
            <Textarea
              {...register("description_nl")}
              placeholder="Korte Beschrijving (NL)"
              variant="admin"
              rows={3}
            />
          </div>
        </div>
      </section>

      {/* Metadata & Links */}
      <section className="space-y-6">
        <H3 icon={Code2} text="Links & Tags" />
        <div className="grid grid-cols-2 gap-4 bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="col-span-2">
            <Input
              {...register("tags")}
              placeholder="Tags (e.g. Python, Scraper, Automation)"
              variant="admin"
            />
          </div>
          <div className="col-span-2 relative">
            <LinkIcon className="absolute left-3 top-3 size-4 opacity-30" />
            <Input
              {...register("url")}
              placeholder="GitHub or Project URL"
              variant="admin"
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Simple Cover Image */}
      <section className="space-y-6">
        <H3 icon={Sparkles} text="Visual" />
        <label className="group relative aspect-video w-64 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all overflow-hidden">
          {watch("image") ? (
            <div className="text-center">
              <Sparkles className="mx-auto mb-2 text-primary" />
              <span className="text-[10px] uppercase font-bold text-primary">
                Image Set
              </span>
            </div>
          ) : (
            <>
              <ImagePlus className="opacity-20 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-bold text-white/40">
                Cover Image
              </span>
            </>
          )}
          <input type="file" className="hidden" onChange={handleUpload} />
        </label>
      </section>

      <Button disabled={uploading} className="w-full h-14 text-lg font-bold">
        {uploading ? (
          <Loader2 className="animate-spin" />
        ) : initialData ? (
          "Update Mini Project"
        ) : (
          "Create Mini Project"
        )}
      </Button>
    </form>
  );
}
