"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, ImagePlus, X } from "lucide-react";
import { Label } from "../ui/label";

export default function AddProjectCMS() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const addProject = useMutation(api.projects.create);

  const [formData, setFormData] = useState({
    title_en: "",
    title_nl: "",
    description_en: "",
    description_nl: "",
    year: new Date().getFullYear().toString(),
    icon: "MdSubtitles",
    categories: "",
    tech_stack: "",
    project_link: "",
    github_link: "",
    images: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addProject({
        title: { en: formData.title_en, nl: formData.title_nl },
        description: {
          en: formData.description_en,
          nl: formData.description_nl,
        },
        year: Number(formData.year),
        icon: formData.icon,
        project_link: formData.project_link,
        github_link: formData.github_link,
        categories: formData.categories
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        tech_stack: formData.tech_stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        images: formData.images,
      });

      toast.success("Project archived successfully");
      setOpen(false);
    } catch (error) {
      toast.error("Deployment failed. Check console.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Inside AddProjectCMS component
  const [uploading, setUploading] = useState(false);
  const generateUploadUrl = useMutation(api.projects.generateUploadUrl); // adjust path if needed

  // 2. Update the Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const { storageId } = await result.json();
        uploadedIds.push(storageId);
      }

      // Append new IDs to the existing array
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedIds],
      }));
      toast.success("Assets synchronized");
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // 3. Add a Remove Handler
  const removeImage = (idToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((id) => id !== idToRemove),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"admin"}>
          <Plus /> New Entry
        </Button>
      </DialogTrigger>

      <DialogContent className="border-foreground/20 md:max-w-4xl md:h-[80svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Add New Project
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* LOCALIZED TITLES */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title (EN)</Label>
              <Input
                variant="admin"
                placeholder="English Title"
                required
                onChange={(e) =>
                  setFormData({ ...formData, title_en: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Title (NL)</Label>
              <Input
                variant="admin"
                placeholder="Nederlandse Titel"
                required
                onChange={(e) =>
                  setFormData({ ...formData, title_nl: e.target.value })
                }
              />
            </div>
            {/* LOCALIZED DESCRIPTIONS */}
            <div className="space-y-2">
              <Label>Description (EN)</Label>
              <Textarea
                variant="admin"
                placeholder="English description..."
                onChange={(e) =>
                  setFormData({ ...formData, description_en: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Description (NL)</Label>
              <Textarea
                variant="admin"
                placeholder="Nederlandse beschrijving..."
                onChange={(e) =>
                  setFormData({ ...formData, description_nl: e.target.value })
                }
              />
            </div>
          </div>
          {/* TECH & CATEGORIES */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categories</Label>
              <Input
                variant="admin"
                placeholder="Frontend, UI/UX"
                onChange={(e) =>
                  setFormData({ ...formData, categories: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Tech Stack</Label>
              <Input
                variant="admin"
                placeholder="Next.js, Tailwind, Convex"
                onChange={(e) =>
                  setFormData({ ...formData, tech_stack: e.target.value })
                }
              />
            </div>
          </div>
          {/* LINKS & ICON */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                variant="admin"
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Icon Name</Label>
              <Input
                variant="admin"
                placeholder="MdSubtitles"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Project Link</Label>
              <Input
                variant="admin"
                placeholder="https://..."
                onChange={(e) =>
                  setFormData({ ...formData, project_link: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Github Link</Label>
              <Input
                variant="admin"
                placeholder="https://github.com/..."
                onChange={(e) =>
                  setFormData({ ...formData, github_link: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Project Gallery</Label>

            <div className="grid grid-cols-4 gap-4">
              {/* RENDER UPLOADED IMAGES */}
              {formData.images.map((storageId) => (
                <div
                  key={storageId}
                  className="relative aspect-square rounded-xl bg-white/5 border border-white/10 overflow-hidden group shadow-inner"
                >
                  {/* NEW PREVIEW COMPONENT */}
                  <ImagePreview storageId={storageId} />

                  {/* REMOVE BUTTON (keeps your logic) */}
                  <button
                    type="button"
                    onClick={() => removeImage(storageId)}
                    className="absolute top-1 right-1 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all z-20 backdrop-blur-sm"
                  >
                    <X size={14} className="text-white" />
                  </button>

                  {/* OVERLAY GLASS EFFECT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ))}

              {/* UPLOAD TRIGGER (The Plus Icon) */}
              <label className="relative aspect-square rounded-xl bg-white/5 border-2 border-dashed border-white/10 hover:border-[#d0fe38]/50 hover:bg-[#d0fe38]/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group">
                {uploading ? (
                  <Loader2 className="animate-spin text-[#d0fe38]" size={24} />
                ) : (
                  <>
                    <ImagePlus
                      className="text-white/20 group-hover:text-[#d0fe38] transition-colors"
                      size={24}
                    />
                    <span className="text-[10px] uppercase font-bold opacity-30 group-hover:opacity-100">
                      Add
                    </span>
                  </>
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
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : <>Save Project</>}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Small helper component for the grid slots
function ImagePreview({ storageId }: { storageId: string }) {
  const imageUrl = useQuery(api.images.getUrl, { storageId });

  if (!imageUrl) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader2 className="animate-spin opacity-20" size={16} />
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt="Preview"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  );
}
