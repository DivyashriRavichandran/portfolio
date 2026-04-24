"use client";

import { useState } from "react";
import { useForm, Path } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2,
  X,
  ImagePlus,
  Sparkles,
  BookOpen,
  Layers,
  Camera,
  Terminal,
  Brain,
  FastForward,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import H3 from "@/components/headings/H3";
import { Doc } from "@/convex/_generated/dataModel";

interface Metric {
  title: string;
  sub: string;
  desc: string;
}

interface ProjectFormValues {
  title_en: string;
  title_nl: string;
  slug: string;
  year: string;
  description_en: string;
  description_nl: string;
  motivation_en: string;
  motivation_nl: string;
  execution_en: string;
  execution_nl: string;
  challenge_en: string;
  challenge_nl: string;
  learning_en: string;
  learning_nl: string;
  future_en: string;
  future_nl: string;
  tech_stack: string;
  categories_en: string;
  categories_nl: string;
  project_link: string;
  github_link: string;
  mockup: string;
  architecture: string;
  images: string[];
  impact_en: Metric[];
  impact_nl: Metric[];
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

  const { register, handleSubmit, setValue, watch } =
    useForm<ProjectFormValues>({
      defaultValues: initialData
        ? {
            title_en: initialData.title.en,
            title_nl: initialData.title.nl,
            slug: initialData.slug || "",
            year: initialData.year.toString(),
            description_en: initialData.description.en,
            description_nl: initialData.description.nl,
            motivation_en: initialData.motivation?.en || "",
            motivation_nl: initialData.motivation?.nl || "",
            execution_en: initialData.execution?.en || "",
            execution_nl: initialData.execution?.nl || "",
            challenge_en: initialData.challenge?.en || "",
            challenge_nl: initialData.challenge?.nl || "",
            learning_en: initialData.learning?.en || "",
            learning_nl: initialData.learning?.nl || "",
            future_en: initialData.future?.en || "",
            future_nl: initialData.future?.nl || "",
            tech_stack: initialData.tech_stack.join(", "),
            categories_en: initialData.categories.en.join(", "),
            categories_nl: initialData.categories.nl.join(", "),
            project_link: initialData.project_link,
            github_link: initialData.github_link || "",
            mockup: initialData.mockup || "",
            architecture: initialData.architecture || "",
            images: initialData.images || [],
            impact_en: initialData.impact?.en || [
              { title: "", sub: "", desc: "" },
            ],
            impact_nl: initialData.impact?.nl || [
              { title: "", sub: "", desc: "" },
            ],
          }
        : {
            year: "2026",
            impact_en: [{ title: "", sub: "", desc: "" }],
            impact_nl: [{ title: "", sub: "", desc: "" }],
            images: [],
          },
    });

  const onSubmit = async (data: ProjectFormValues) => {
    const splitCSV = (str: string) =>
      str
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    const payload = {
      title: { en: data.title_en, nl: data.title_nl },
      slug: data.slug,
      year: Number(data.year),
      description: { en: data.description_en, nl: data.description_nl },
      motivation: { en: data.motivation_en, nl: data.motivation_nl },
      execution: { en: data.execution_en, nl: data.execution_nl },
      challenge: { en: data.challenge_en, nl: data.challenge_nl },
      learning: { en: data.learning_en, nl: data.learning_nl },
      future: { en: data.future_en, nl: data.future_nl },
      tech_stack: splitCSV(data.tech_stack),
      categories: {
        en: splitCSV(data.categories_en),
        nl: splitCSV(data.categories_nl),
      },
      impact: { en: data.impact_en, nl: data.impact_nl },
      project_link: data.project_link,
      github_link: data.github_link,
      mockup: data.mockup,
      architecture: data.architecture,
      images: data.images || [],
    };

    try {
      if (initialData?._id) {
        await updateProject({ id: initialData._id, ...payload });
      } else {
        await createProject(payload);
      }
      toast.success("Project saved successfully!");
      router.push("/admin");
    } catch (e) {
      console.error(e);
      toast.error("Save failed");
    }
  };

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ProjectFormValues,
  ) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const url = await generateUploadUrl();
        const res = await fetch(url, { method: "POST", body: file });
        const { storageId } = await res.json();

        if (field === "images") {
          setValue("images", [...watch("images"), storageId]);
        } else {
          setValue(field as Path<ProjectFormValues>, storageId);
        }
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 pb-24">
      {/* Basic Info Section */}
      <section className="space-y-6">
        <H3 icon={Sparkles} text="Basic Information" />
        <div className="grid grid-cols-2 gap-4 bg-white/5 p-6 rounded-xl border border-white/10">
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
          <Input {...register("slug")} placeholder="URL Slug" variant="admin" />
          <Input
            {...register("year")}
            placeholder="Release Year"
            variant="admin"
          />
          <div className="col-span-2 space-y-2">
            <Textarea
              {...register("description_en")}
              placeholder="Intro (EN)"
              variant="admin"
            />
            <Textarea
              {...register("description_nl")}
              placeholder="Intro (NL)"
              variant="admin"
            />
          </div>
        </div>
      </section>

      {/* Case Study Section with Learning and Future */}
      <section className="space-y-6">
        <H3 icon={BookOpen} text="Case Study Details" />
        <div className="grid grid-cols-1 gap-8">
          {[
            { id: "motivation", label: "Motivation", icon: Sparkles },
            { id: "execution", label: "Execution", icon: Layers },
            { id: "challenge", label: "Challenge", icon: Terminal },
            { id: "learning", label: "Learning", icon: Brain },
            { id: "future", label: "Future", icon: FastForward },
          ].map((field) => (
            <div
              key={field.id}
              className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5"
            >
              <div className="flex items-center gap-2 mb-2 col-span-2 text-primary font-bold uppercase tracking-widest text-[10px]">
                <field.icon size={14} /> {field.label}
              </div>
              <Textarea
                {...register(`${field.id}_en` as Path<ProjectFormValues>)}
                placeholder="English content..."
                variant="admin"
                rows={3}
              />
              <Textarea
                {...register(`${field.id}_nl` as Path<ProjectFormValues>)}
                placeholder="Nederlandse inhoud..."
                variant="admin"
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section className="space-y-6">
        <H3 icon={Sparkles} text="Impact & Metrics" />
        <div className="grid grid-cols-2 gap-8">
          {(["en", "nl"] as const).map((lang) => (
            <div key={lang} className="space-y-4">
              <p className="text-[10px] uppercase font-bold text-primary/60">
                {lang.toUpperCase()} Stats
              </p>
              {watch(`impact_${lang}`).map((_, i) => (
                <div
                  key={i}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-2 relative"
                >
                  <Input
                    {...register(
                      `impact_${lang}.${i}.title` as Path<ProjectFormValues>,
                    )}
                    placeholder="Metric (e.g. 100%)"
                    variant="admin"
                  />
                  <Input
                    {...register(
                      `impact_${lang}.${i}.sub` as Path<ProjectFormValues>,
                    )}
                    placeholder="Subtitle"
                    variant="admin"
                  />
                  <Textarea
                    {...register(
                      `impact_${lang}.${i}.desc` as Path<ProjectFormValues>,
                    )}
                    placeholder="Short Description"
                    variant="admin"
                    rows={2}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setValue(
                        `impact_${lang}`,
                        watch(`impact_${lang}`).filter((_, idx) => idx !== i),
                      )
                    }
                    className="absolute top-2 right-2 text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() =>
                  setValue(`impact_${lang}`, [
                    ...watch(`impact_${lang}`),
                    { title: "", sub: "", desc: "" },
                  ])
                }
              >
                + Add {lang.toUpperCase()} Metric
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Tech & Assets */}
      <section className="space-y-6">
        <H3 icon={Layers} text="Technical Assets" />
        <div className="grid grid-cols-2 gap-4 bg-white/5 p-6 rounded-xl border border-white/10">
          <Input
            {...register("tech_stack")}
            placeholder="Tech Stack (comma-separated)"
            variant="admin"
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              {...register("categories_en")}
              placeholder="Categories (EN)"
              variant="admin"
            />
            <Input
              {...register("categories_nl")}
              placeholder="Categories (NL)"
              variant="admin"
            />
          </div>
          <Input
            {...register("project_link")}
            placeholder="Live Project URL"
            variant="admin"
          />
          <Input
            {...register("github_link")}
            placeholder="GitHub Repository URL"
            variant="admin"
          />
        </div>
      </section>

      <section className="space-y-6">
        <H3 icon={Camera} text="Visuals" />
        <div className="grid grid-cols-3 gap-4">
          {(["mockup", "architecture"] as const).map((type) => (
            <label
              key={type}
              className="aspect-video border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all"
            >
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleUpload(e, type)}
              />
              <ImagePlus className="opacity-20 mb-1" />
              <span className="text-[10px] uppercase font-bold text-white/40">
                {watch(type) ? "Uploaded" : `Upload ${type}`}
              </span>
            </label>
          ))}
          <label className="aspect-video border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleUpload(e, "images")}
            />
            <ImagePlus className="opacity-20 mb-1" />
            <span className="text-[10px] uppercase font-bold text-white/40">
              {watch("images")?.length || 0} Gallery Images
            </span>
          </label>
        </div>
      </section>

      <Button disabled={uploading} className="w-full h-14 text-lg font-bold">
        {uploading ? (
          <Loader2 className="animate-spin" />
        ) : initialData ? (
          "Update Project"
        ) : (
          "Create Project"
        )}
      </Button>
    </form>
  );
}
