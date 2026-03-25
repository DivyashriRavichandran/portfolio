"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, ImagePlus, X } from "lucide-react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProjectItem } from "@/models/ProjectItem";

const projectSchema = z.object({
  title_en: z.string().min(1, "English title is required"),
  title_nl: z.string().min(1, "Dutch title is required"),
  description_en: z.string().optional(),
  description_nl: z.string().optional(),
  categories_en: z.string(),
  categories_nl: z.string(),
  year: z.string().min(4, "Invalid year"),
  tech_stack: z.string().optional(),
  project_link: z.string().url().optional().or(z.literal("")),
  github_link: z.string().url().optional().or(z.literal("")),
  images: z.array(z.string()),
  mockup: z.string(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectDialog({
  data,
  children,
}: {
  data?: ProjectItem;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const addProject = useMutation(api.projects.create);
  const updateProject = useMutation(api.projects.update);
  const generateUploadUrl = useMutation(api.projects.generateUploadUrl);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title_en: "",
      title_nl: "",
      description_en: "",
      description_nl: "",
      year: new Date().getFullYear().toString(),
      categories_en: "",
      categories_nl: "",
      tech_stack: "",
      project_link: "",
      github_link: "",
      images: [],
      mockup: "",
    },
  });

  // Hydrate form when editing
  useEffect(() => {
    if (data && open) {
      form.reset({
        title_en: data.title.en,
        title_nl: data.title.nl,
        description_en: data.description.en,
        description_nl: data.description.nl,
        year: data.year.toString(),
        categories_en: data.categories?.en?.join(", ") || "",
        categories_nl: data.categories?.nl?.join(", ") || "",
        tech_stack: data.tech_stack?.join(", ") || "",
        project_link: data.project_link || "",
        github_link: data.github_link || "",
        images: data.images || [],
      });
    } else if (!open) {
      form.reset();
    }
  }, [data, open, form]);

  async function onSubmit(values: ProjectFormValues) {
    setLoading(true);
    const payload = {
      title: { en: values.title_en, nl: values.title_nl },
      description: {
        en: values.description_en || "",
        nl: values.description_nl || "",
      },
      year: Number(values.year),
      project_link: values.project_link || "",
      github_link: values.github_link || "",
      categories: {
        en:
          values.categories_en
            ?.split(",")
            .map((s) => s.trim())
            .filter(Boolean) || [],
        nl:
          values.categories_nl
            ?.split(",")
            .map((s) => s.trim())
            .filter(Boolean) || [],
      },
      tech_stack:
        values.tech_stack
          ?.split(",")
          .map((s) => s.trim())
          .filter(Boolean) || [],
      images: values.images,
      mockup: values.mockup,
    };

    try {
      if (data?._id) {
        await updateProject({ id: data._id, ...payload });
        toast.success("Project updated");
      } else {
        await addProject(payload);
        toast.success("Project created");
      }
      setOpen(false);
    } catch (error) {
      toast.error("Operation failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess?: (id: string) => void,
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadedIds: string[] = [];

      for (const file of files) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!result.ok) throw new Error("Upload failed");

        const { storageId } = await result.json();
        uploadedIds.push(storageId);
      }

      // LOGIC SPLIT:
      if (onSuccess) {
        // If a callback exists (Mockup mode), return the first uploaded ID
        onSuccess(uploadedIds[0]);
      } else {
        // Default (Gallery mode), append to the images array
        const currentImages = form.getValues("images") || [];
        form.setValue("images", [...currentImages, ...uploadedIds]);
      }

      toast.success("Upload successful");
    } catch (error) {
      toast.error(`Upload failed: ${error}`);
    } finally {
      setUploading(false);
      // Reset the input so the same file can be uploaded again if deleted
      e.target.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="border-foreground/20 md:max-w-4xl md:h-[85svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {data ? "Edit Project" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-6"
          >
            <FormField
              control={form.control}
              name="title_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (EN)</FormLabel>
                  <FormControl>
                    <Input
                      variant={"admin"}
                      placeholder="English Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title_nl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title (NL)</FormLabel>
                  <FormControl>
                    <Input
                      variant={"admin"}
                      placeholder="Nederlandse Titel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (EN)</FormLabel>
                  <FormControl>
                    <Textarea
                      variant={"admin"}
                      rows={3}
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description_nl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (NL)</FormLabel>
                  <FormControl>
                    <Textarea
                      variant={"admin"}
                      rows={3}
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categories_en"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories (EN)</FormLabel>
                  <FormControl>
                    <Input
                      variant={"admin"}
                      placeholder="Frontend, UI/UX"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories_nl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories (NL)</FormLabel>
                  <FormControl>
                    <Input
                      variant={"admin"}
                      placeholder="Frontend, UI/UX"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tech_stack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tech Stack</FormLabel>
                  <FormControl>
                    <Input
                      variant={"admin"}
                      placeholder="Next.js, Tailwind"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="number" variant={"admin"} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="project_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Link</FormLabel>
                  <FormControl>
                    <Input
                      variant={"admin"}
                      placeholder="https://..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="github_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Link</FormLabel>
                  <FormControl>
                    <Input
                      variant={"admin"}
                      placeholder="https://github.com/..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mockup Section */}
            <FormField
              control={form.control}
              name="mockup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mockup Image</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      {field.value ? (
                        /* Single Image Preview State */
                        <div className="relative aspect-video w-full max-w-md rounded-xl bg-white/5 border border-white/10 overflow-hidden group">
                          <ImagePreview storageId={field.value} />
                          <button
                            type="button"
                            onClick={() => field.onChange("")} // Clear the field
                            className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-20"
                          >
                            <X size={16} className="text-white" />
                          </button>
                        </div>
                      ) : (
                        /* Upload Trigger State */
                        <label className="relative aspect-video w-full max-w-md rounded-xl bg-white/5 border-2 border-dashed border-white/10 hover:border-[#d0fe38]/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-2">
                          {uploading ? (
                            <Loader2 className="animate-spin text-primary" />
                          ) : (
                            <>
                              <ImagePlus className="text-white/20" />
                              <span className="text-xs text-white/40">
                                Upload Mockup
                              </span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploading}
                            onChange={(e) => {
                              handleImageUpload(e, (id) => field.onChange(id));
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gallery Section */}
            <div className="space-y-3">
              <FormLabel>Project Gallery</FormLabel>
              <div className="grid grid-cols-4 gap-4">
                {form.watch("images").map((storageId) => (
                  <div
                    key={storageId}
                    className="relative aspect-square rounded-xl bg-white/5 border border-white/10 overflow-hidden group"
                  >
                    <ImagePreview storageId={storageId} />
                    <button
                      type="button"
                      onClick={() => {
                        const current = form.getValues("images");
                        form.setValue(
                          "images",
                          current.filter((id) => id !== storageId),
                        );
                      }}
                      className="absolute top-1 right-1 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-20"
                    >
                      <X size={14} className="text-white" />
                    </button>
                  </div>
                ))}
                <label className="relative aspect-square rounded-xl bg-white/5 border-2 border-dashed border-white/10 hover:border-[#d0fe38]/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-2">
                  {uploading ? (
                    <Loader2 className="animate-spin text-primary" />
                  ) : (
                    <ImagePlus className="text-white/20" />
                  )}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="w-full col-span-2"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {data ? "Update Project" : "Create Project"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function ImagePreview({ storageId }: { storageId: string }) {
  const imageUrl = useQuery(api.images.getUrl, { storageId });
  if (!imageUrl)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader2 className="animate-spin opacity-20" size={16} />
      </div>
    );
  return (
    <Image
      src={imageUrl}
      alt="Preview"
      fill
      className="object-cover transition-transform group-hover:scale-110"
    />
  );
}
