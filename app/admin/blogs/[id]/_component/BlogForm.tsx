"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Loader2,
  ImagePlus,
  Sparkles,
  Terminal,
  Code2,
  BookOpen,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import H3Component from "@/components/headings/H3";
import { Doc } from "@/convex/_generated/dataModel";
import ReactMarkdown from "react-markdown";

interface BlogFormValues {
  slug: string;
  title_en: string;
  title_nl: string;
  description_en: string;
  description_nl: string;
  content_en: string;
  content_nl: string;
  tags: string;
  image: string;
  timeToRead: number;
  publishedAt: string;
}

export default function BlogForm({
  initialData,
}: {
  initialData?: Doc<"blogs">;
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const createBlog = useMutation(api.blogs.create);
  const updateBlog = useMutation(api.blogs.update);
  const generateUploadUrl = useMutation(api.images.generateUploadUrl);

  const { register, handleSubmit, setValue, watch, control } =
    useForm<BlogFormValues>({
      defaultValues: initialData
        ? {
            slug: initialData.slug,
            title_en: initialData.title.en,
            title_nl: initialData.title.nl,
            description_en: initialData.description.en,
            description_nl: initialData.description.nl,
            content_en: initialData.content.en,
            content_nl: initialData.content.nl,
            tags: initialData.tags?.join(", ") || "",
            image: initialData.coverImage || "",
            timeToRead: initialData.timeToRead || 5,
            publishedAt: initialData.publishedAt
              ? new Date(initialData.publishedAt).toISOString()
              : new Date().toISOString(),
          }
        : {
            slug: "",
            title_en: "",
            title_nl: "",
            description_en: "",
            description_nl: "",
            content_en: "",
            content_nl: "",
            tags: "",
            image: "",
            timeToRead: 5,
            publishedAt: new Date().toISOString(),
          },
    });

  useEffect(() => {
    register("content_en");
    register("content_nl");

    if (initialData) {
      setValue("content_en", initialData.content.en);
      setValue("content_nl", initialData.content.nl);
    }
  }, [register, initialData, setValue]);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const watchTitleEn = watch("title_en");

  const onSubmit = async (data: BlogFormValues) => {
    const tagsArray = data.tags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const finalSlug = data.slug.trim() || generateSlug(data.title_en);

    if (!finalSlug) {
      toast.error("A unique slug or title is required.");
      return;
    }

    const payload = {
      slug: finalSlug,
      title: { en: data.title_en, nl: data.title_nl },
      description: { en: data.description_en, nl: data.description_nl },
      content: { en: data.content_en, nl: data.content_nl },
      tags: tagsArray.length > 0 ? tagsArray : undefined,
      coverImage: data.image || undefined,
      timeToRead: Number(data.timeToRead) || undefined,
      publishedAt: data.publishedAt
        ? new Date(data.publishedAt).getTime()
        : Date.now(),
    };

    try {
      if (initialData?._id) {
        await updateBlog({ id: initialData._id, ...payload });
      } else {
        await createBlog(payload);
      }
      toast.success("Blog article saved successfully!");
      router.push("/admin");
    } catch (e) {
      console.error(e);
      toast.error("Failed to save the blog entry.");
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
      toast.error("Upload failed" + err);
    } finally {
      setUploading(false);
    }
  };

  const handleMarkdownFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    lang: "en" | "nl",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;

      setValue(lang === "en" ? "content_en" : "content_nl", text);
      toast.success(`${lang.toUpperCase()} Obsidian file loaded successfully!`);
    };

    reader.onerror = () => {
      toast.error("Failed to read the file.");
    };

    reader.readAsText(file);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-10 pb-24 max-w-4xl"
    >
      {/* Metadata */}
      <section className="space-y-6">
        <H3Component icon={Terminal} text="Blog Metadata" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-6 rounded-xl border border-white/10">
          <Input
            {...register("title_en", { required: true })}
            placeholder="Blog Title (EN) *"
            variant="admin"
          />
          <Input
            {...register("title_nl", { required: true })}
            placeholder="Blog Titel (NL) *"
            variant="admin"
          />
          <div className="md:col-span-2">
            <Input
              {...register("slug")}
              placeholder={
                watchTitleEn
                  ? `Slug (e.g., ${generateSlug(watchTitleEn)})`
                  : "Custom URL Slug (Optional)"
              }
              variant="admin"
            />
          </div>
        </div>
      </section>

      {/* Summaries & Tags */}
      <section className="space-y-6">
        <H3Component icon={Code2} text="Summaries & Tags" />
        <div className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10">
          {/* English Summary Block */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40">
                Excerpt Editor (EN)
              </label>
              <Textarea
                {...register("description_en")}
                placeholder="Short Summary / Excerpt (EN)"
                variant="admin"
                rows={3}
                className="font-mono text-xs bg-black/40 border border-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40">
                Live Preview (EN)
              </label>
              <div className="min-h-40 p-3 rounded border prose-custom">
                <ReactMarkdown>
                  {watch("description_en") ||
                    "*No summary context provided yet.*"}
                </ReactMarkdown>
              </div>
            </div>
          </div>
          {/* Dutch Summary Block */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40">
                Excerpt Editor (NL)
              </label>
              <Textarea
                {...register("description_nl")}
                placeholder="Short Summary / Excerpt (EN)"
                variant="admin"
                rows={3}
                className="font-mono text-xs bg-black/40 border border-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-white/40">
                Live Preview (NL)
              </label>
              <div className="min-h-40 p-3 rounded border prose-custom">
                <ReactMarkdown>
                  {watch("description_nl") ||
                    "*No summary context provided yet.*"}
                </ReactMarkdown>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <Input
                {...register("tags")}
                placeholder="Tags (comma separated: WebDev, React, Nextjs)"
                variant="admin"
              />
            </div>
            <div>
              <Input
                type="number"
                {...register("timeToRead", { valueAsNumber: true })}
                placeholder="Read time (mins)"
                variant="admin"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                Publish Date
              </label>
              <Controller
                control={control}
                name="publishedAt"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center justify-between w-full h-11 bg-black/20 border border-white/10 rounded-md px-4 text-sm text-white/80 focus:outline-none"
                      >
                        <span className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-60" />
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Publish Date</span>
                          )}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-zinc-900 border border-white/10"
                      align="end"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Raw Markdown & Obsidian Upload Center */}
      <section className="space-y-6">
        <H3Component icon={BookOpen} text="Markdown Workspace" />
        <div className="space-y-8 bg-white/5 p-6 rounded-xl border border-white/10">
          {/* English Segment */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-white/50">
                English Content
              </label>

              {/* Obsidian File Upload Trigger */}
              <label className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80 cursor-pointer transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md border border-white/10">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Import Obsidian .md File</span>
                <input
                  type="file"
                  accept=".md"
                  className="hidden"
                  onChange={(e) => handleMarkdownFileUpload(e, "en")}
                />
              </label>
            </div>

            <Textarea
              {...register("content_en")}
              placeholder="# Write your post or drop an Obsidian file above..."
              variant="admin"
              rows={12}
              className="font-mono text-xs bg-black/40 border border-white/10 focus:outline-none focus:ring-1 focus:ring-primary/80 p-4 leading-relaxed"
            />
          </div>

          <hr className="border-white/5" />

          {/* Dutch Segment */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-white/50">
                Nederlandse Content
              </label>

              {/* Obsidian File Upload Trigger */}
              <label className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80 cursor-pointer transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md border border-white/10">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Importeer Obsidian .md bestand</span>
                <input
                  type="file"
                  accept=".md"
                  className="hidden"
                  onChange={(e) => handleMarkdownFileUpload(e, "nl")}
                />
              </label>
            </div>

            <Textarea
              {...register("content_nl")}
              placeholder="# Schrijf je bericht of importeer een Obsidian bestand hierboven..."
              variant="admin"
              rows={12}
              className="font-mono text-xs bg-black/40 border border-white/10 focus:outline-none focus:ring-1 focus:ring-primary/80 p-4 leading-relaxed"
            />
          </div>
        </div>
      </section>

      {/* Presentation */}
      <section className="space-y-6">
        <H3Component icon={Sparkles} text="Visual Presentation" />
        <label className="group relative aspect-video w-64 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all overflow-hidden">
          {watch("image") ? (
            <div className="text-center">
              <Sparkles className="mx-auto mb-2 text-primary" />
              <span className="text-[10px] uppercase font-bold text-primary">
                Image Uploaded
              </span>
            </div>
          ) : (
            <>
              <ImagePlus className="opacity-20 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase font-bold text-white/40">
                Upload Cover Image
              </span>
            </>
          )}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
          />
        </label>
      </section>

      <Button disabled={uploading} className="w-full h-14 text-lg font-bold">
        {uploading ? (
          <Loader2 className="animate-spin" />
        ) : initialData ? (
          "Update Post Entry"
        ) : (
          "Publish Post Entry"
        )}
      </Button>
    </form>
  );
}
