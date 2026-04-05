"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import {
  Loader2,
  X,
  ImagePlus,
  Globe,
  Github,
  Sparkles,
  BookOpen,
  Layers,
  Camera,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Subheading from "@/app/v2/_components/Subheading";
import { Doc } from "@/convex/_generated/dataModel";

interface ProjectFormValues {
  title_en: string;
  title_nl: string;
  description_en: string;
  description_nl: string;
  motivation_en: string;
  motivation_nl: string;
  execution_en: string;
  execution_nl: string;
  result_en: string;
  result_nl: string;
  challenge_en: string;
  challenge_nl: string;
  solution_en: string;
  solution_nl: string;
  year: string | number;
  project_link: string;
  github_link: string;
  mockup: string;
  images: string[];
  architecture?: string;
  tech_stack: string; // From a comma-separated string input
  features: string; // From a comma-separated string input
  categories_en: string;
  categories_nl: string;
}

export default function ProjectForm({
  initialData,
}: {
  initialData?: Doc<"projects">;
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const createProject = useMutation(api.projects.create);
  const updateProject = useMutation(api.projects.update);
  const generateUploadUrl = useMutation(api.images.generateUploadUrl);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: initialData
      ? {
          ...initialData,
          title_en: initialData.title.en,
          title_nl: initialData.title.nl,
          description_en: initialData.description.en,
          description_nl: initialData.description.nl,
          motivation_en: initialData.motivation?.en || "",
          motivation_nl: initialData.motivation?.nl || "",
          execution_en: initialData.execution?.en || "",
          execution_nl: initialData.execution?.nl || "",
          result_en: initialData.result?.en || "",
          result_nl: initialData.result?.nl || "",
          challenge_en: initialData.challenge?.en || "",
          challenge_nl: initialData.challenge?.nl || "",
          solution_en: initialData.solution?.en || "",
          solution_nl: initialData.solution?.nl || "",
          year: initialData.year.toString(),
          project_link: initialData.project_link,
          github_link: initialData.github_link || "",
          mockup: initialData.mockup || "",
          images: initialData.images || [],
          architecture: initialData.architecture || "",
          tech_stack: initialData.tech_stack.join(", "),
          features: initialData.features?.join(", ") || "",
          categories_en: initialData.categories.en.join(", "),
          categories_nl: initialData.categories.nl.join(", "),
        }
      : {
          title_en: "",
          title_nl: "",
          description_en: "",
          description_nl: "",
          motivation_en: "",
          motivation_nl: "",
          execution_en: "",
          execution_nl: "",
          result_en: "",
          result_nl: "",
          challenge_en: "",
          challenge_nl: "",
          solution_en: "",
          solution_nl: "",
          project_link: "",
          github_link: "",
          tech_stack: "",
          features: "",
          categories_en: "",
          categories_nl: "",
          images: [],
          mockup: "",
          architecture: "",
          year: "2026",
        },
  });

  const mockupId = watch("mockup");
  const architectureId = watch("architecture");
  const images = watch("images");

  const onSubmit = async (data: ProjectFormValues) => {
    const payload = {
      title: { en: data.title_en, nl: data.title_nl },
      description: { en: data.description_en, nl: data.description_nl },
      year: Number(data.year),
      project_link: data.project_link,
      github_link: data.github_link || "",
      mockup: data.mockup,
      images: data.images || [],
      architecture: data.architecture || "",

      // Technical sections (Optional in Doc, so we provide fallbacks)
      motivation: { en: data.motivation_en, nl: data.motivation_nl },
      execution: { en: data.execution_en, nl: data.execution_nl },
      result: { en: data.result_en, nl: data.result_nl },
      challenge: { en: data.challenge_en, nl: data.challenge_nl },
      solution: { en: data.solution_en, nl: data.solution_nl },

      // Transformations
      tech_stack: data.tech_stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      features: data.features
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      categories: {
        en: data.categories_en
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        nl: data.categories_nl
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      },
    };

    try {
      if (initialData?._id) {
        // Pass the existing order back if updating
        await updateProject({
          id: initialData._id,
          order: initialData.order ?? 0,
          ...payload,
        });
      } else {
        await createProject(payload);
      }
      toast.success("Database updated successfully");
      router.push("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save project");
    }
  };

  const handleVisualUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldType: "mockup" | "architecture" | "gallery",
  ) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);

    try {
      for (const file of files) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await result.json();

        // NEW LOGIC SPLIT:
        if (fieldType === "mockup") {
          setValue("mockup", storageId);
        } else if (fieldType === "architecture") {
          setValue("architecture", storageId);
        } else if (fieldType === "gallery") {
          setValue("images", [...(images || []), storageId]);
        }
      }
      toast.success("Updated!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-16 mx-auto pb-24"
    >
      {/* SECTION 1 */}
      <section className="space-y-6">
        <Subheading icon={Sparkles} text="Basic Information" />
        <div className="grid grid-cols-2 gap-8 bg-foreground/5 border border-white/5 p-8 rounded-lg">
          <div className="space-y-4">
            <CustomLabel label="Name (English / Dutch)" />
            <Input
              {...register("title_en")}
              placeholder="English Title"
              variant="admin"
            />
            <Input
              {...register("title_nl")}
              placeholder="Nederlandse Titel"
              variant="admin"
            />
          </div>
          <div className="space-y-4">
            <CustomLabel label="Year & Tags" />
            <Input
              {...register("year")}
              placeholder="Release Year"
              variant="admin"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                {...register("categories_en")}
                placeholder="Categories EN"
                variant="admin"
              />
              <Input
                {...register("categories_nl")}
                placeholder="Categories NL"
                variant="admin"
              />
            </div>
          </div>
          <div className="col-span-2 space-y-4 pt-4 border-t border-white/5">
            <CustomLabel label="Description" />
            <Textarea
              {...register("description_en")}
              placeholder="Brief English intro..."
              variant="admin"
              rows={2}
            />
            <Textarea
              {...register("description_nl")}
              placeholder="Korte Nederlandse intro..."
              variant="admin"
              rows={2}
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="space-y-6">
        <Subheading icon={BookOpen} text="Case Study" />
        <div className="grid grid-cols-2 gap-12">
          {/* ENGLISH */}
          <div className="space-y-6">
            <div className="space-y-2">
              <CustomLabel label="The Motivation" />
              <Textarea
                {...register("motivation_en")}
                placeholder="The 'Why'..."
                variant="admin"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <CustomLabel label="The Execution" />
              <Textarea
                {...register("execution_en")}
                placeholder="The 'How'..."
                variant="admin"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <CustomLabel label="The Result" />
              <Textarea
                {...register("result_en")}
                placeholder="Final Outcome..."
                variant="admin"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <CustomLabel label="The Challenge" />
              <Textarea
                {...register("challenge_en")}
                placeholder="Main hurdle..."
                variant="admin"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <CustomLabel label="The Solution" />
              <Textarea
                {...register("solution_en")}
                placeholder="Technical fix..."
                variant="admin"
                rows={2}
              />
            </div>
          </div>

          {/* DUTCH */}
          <div className="space-y-6">
            <div className="space-y-2">
              <CustomLabel label="De Motivatie" />
              <Textarea
                {...register("motivation_nl")}
                placeholder="De 'Waarom'..."
                variant="admin"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <CustomLabel label="De Uitvoering" />
              <Textarea
                {...register("execution_nl")}
                placeholder="De 'Hoe'..."
                variant="admin"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <CustomLabel label="Het Resultaat" />
              <Textarea
                {...register("result_nl")}
                placeholder="Eindresultaat..."
                variant="admin"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <CustomLabel label="De Uitdaging" />
              <Textarea
                {...register("challenge_nl")}
                placeholder="Belangrijkste drempel..."
                variant="admin"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <CustomLabel label="De Oplossing" />
              <Textarea
                {...register("solution_nl")}
                placeholder="Technische oplossing..."
                variant="admin"
                rows={2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="space-y-6">
        <Subheading icon={Layers} text="Technical Architecture" />
        <div className="grid grid-cols-2 gap-8 bg-foreground/2 border border-white/5 p-8 rounded-lg">
          <div className="space-y-4">
            <CustomLabel label="Tech Stack" />
            <Input
              {...register("tech_stack")}
              placeholder="Next.js, TypeScript, Convex..."
              variant="admin"
            />
            <CustomLabel label="Core Features" />
            <Input
              {...register("features")}
              placeholder="Auth, Real-time, Performance..."
              variant="admin"
            />
          </div>
          <div className="space-y-4">
            <CustomLabel label="Project Links" />
            <div className="mt-5 flex gap-4 items-center">
              <Globe className="text-primary" size={18} />
              <Input
                {...register("project_link")}
                placeholder="Live URL"
                variant="admin"
              />
            </div>
            <div className="flex gap-4 items-center">
              <Github className="text-primary" size={18} />
              <Input
                {...register("github_link")}
                placeholder="Source URL"
                variant="admin"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4*/}
      <section className="space-y-6">
        <Subheading icon={Camera} text="Images" />
        <div className="space-y-10 bg-foreground/[0.02] border border-white/5 p-8 rounded-lg">
          <div className="grid grid-cols-2 gap-8 pt-4">
            {/* 4a. Hero Mockup */}
            <div className="space-y-4">
              <CustomLabel label="Hero Mockup" />
              {mockupId ? (
                <div className="relative aspect-video rounded-sm border border-white/10 overflow-hidden group">
                  <ConvexImage storageId={mockupId} />
                  <button
                    type="button"
                    onClick={() => setValue("mockup", "")} // Clear field
                    className="absolute inset-0 flex items-center justify-center bg-red-500/80 opacity-0 group-hover:opacity-100 transition-all z-20"
                  >
                    <X size={24} className="text-white" />
                  </button>
                </div>
              ) : (
                <label className="aspect-video border-2 border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-all group">
                  <ImagePlus
                    size={32}
                    className="opacity-20 group-hover:opacity-50 transition-all"
                  />
                  <span className="text-[10px] uppercase mt-2 opacity-50 group-hover:opacity-100 font-medium">
                    Add Hero image
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleVisualUpload(e, "mockup")} // Pass "mockup" type
                  />
                </label>
              )}
            </div>

            {/* 4b. Architecture Diagram - NEW FIELD */}
            <div className="space-y-4">
              <CustomLabel label="System Design / Architecture (Optional)" />
              {architectureId ? (
                <div className="relative aspect-video rounded-sm border border-white/10 overflow-hidden group bg-foreground/30">
                  <ConvexImage storageId={architectureId} contain />{" "}
                  <button
                    type="button"
                    onClick={() => setValue("architecture", "")}
                    className="absolute inset-0 flex items-center justify-center bg-red-500/80 opacity-0 group-hover:opacity-100 transition-all z-20"
                  >
                    <X size={24} className="text-white" />
                  </button>
                </div>
              ) : (
                <label className="aspect-video border-2 border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-all group">
                  <Terminal
                    size={32}
                    className="opacity-20 group-hover:opacity-50 transition-all"
                  />
                  <span className="text-[10px] uppercase mt-2 opacity-50 group-hover:opacity-100 font-medium">
                    Add Architecture Diagram
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleVisualUpload(e, "architecture")} // Pass "architecture" type
                  />
                </label>
              )}
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t border-white/5">
            <CustomLabel label="Gallery" />
            <div className="flex flex-wrap gap-4">
              {images?.map((id: string, idx: number) => (
                <div
                  key={id}
                  className="relative w-40 h-24 rounded-lg border border-white/10 overflow-hidden group"
                >
                  <ConvexImage storageId={id} />
                  <button
                    type="button"
                    onClick={() => {
                      const newImages = [...images];
                      newImages.splice(idx, 1);
                      setValue("images", newImages);
                    }}
                    className="absolute top-1 right-1 bg-red-500 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <label className="w-40 h-24 border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary/50 transition-all group">
                <ImagePlus
                  size={20}
                  className="opacity-20 group-hover:opacity-50 transition-all"
                />
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleVisualUpload(e, "gallery")}
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      <div className="pt-10 border-t border-white/5">
        <Button disabled={uploading} className="w-full font-bold">
          {uploading ? <Loader2 className="animate-spin" /> : "Update / Save"}
        </Button>
      </div>
    </form>
  );
}

function CustomLabel({ label }: { label: string }) {
  return (
    <p className="text-xs uppercase font-semibold tracking-widest text-primary mb-2">
      {label}
    </p>
  );
}
function ConvexImage({
  storageId,
  contain,
}: {
  storageId: string;
  contain?: boolean;
}) {
  const imageUrl = useQuery(api.images.getUrl, { storageId });

  if (!imageUrl)
    return (
      <div className="flex items-center justify-center size-full bg-white/5">
        <Loader2 className="animate-spin opacity-20" size={16} />
      </div>
    );

  return (
    <Image
      src={imageUrl}
      alt="Preview"
      fill
      className={`${contain ? "object-contain p-2" : "object-cover"} transition-transform group-hover:scale-105`} // Updated classes
    />
  );
}
