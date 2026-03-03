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
  year: z.string().min(4, "Invalid year"),
  icon: z.string().optional(),
  categories: z.string().optional(),
  tech_stack: z.string().optional(),
  project_link: z.string().url().optional().or(z.literal("")),
  github_link: z.string().url().optional().or(z.literal("")),
  images: z.array(z.string()),
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
      icon: "",
      categories: "",
      tech_stack: "",
      project_link: "",
      github_link: "",
      images: [],
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
        icon: data.icon || "",
        categories: data.categories?.join(", ") || "",
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
      icon: values.icon || "",
      project_link: values.project_link || "",
      github_link: values.github_link || "",
      categories:
        values.categories
          ?.split(",")
          .map((s) => s.trim())
          .filter(Boolean) || [],
      tech_stack:
        values.tech_stack
          ?.split(",")
          .map((s) => s.trim())
          .filter(Boolean) || [],
      images: values.images,
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const currentImages = form.getValues("images");
      const uploadedIds: string[] = [];
      for (const file of files) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await result.json();
        uploadedIds.push(storageId);
      }
      form.setValue("images", [...currentImages, ...uploadedIds]);
      toast.success("Images uploaded");
    } catch (error) {
      toast.error(`Upload failed: ${error}`);
    } finally {
      setUploading(false);
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
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
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

            <div className="grid grid-cols-2 gap-4 col-span-2">
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
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon Name</FormLabel>
                    <FormControl>
                      <Input
                        variant={"admin"}
                        placeholder="LuCode"
                        {...field}
                      />
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
            </div>

            {/* Gallery Section */}
            <div className="space-y-3 col-span-2">
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
                    <Loader2 className="animate-spin text-[#d0fe38]" />
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
