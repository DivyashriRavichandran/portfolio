"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  UserCircle,
  Music,
  Cpu,
  Globe,
  Plus,
  Trash2,
  Loader2,
  FileText,
  Heart,
  X,
  LayoutGrid,
  Type,
  GripVertical,
  Mail,
} from "lucide-react";
import H3 from "@/components/headings/H3";
import { Id } from "@/convex/_generated/dataModel";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Image from "next/image";

// Real sub-schemas from your Convex schema configuration
interface LocaleString {
  en: string;
  nl: string;
}

interface Hardware {
  icon: string;
  title: LocaleString;
  product: string;
}

interface FavCard {
  icon: string;
  title: string;
  desc: string;
}

interface AboutFormData {
  _id?: Id<"about">;
  image?: string;
  bio: LocaleString;
  more_bio: LocaleString;
  favourites: FavCard[];
  hardware: Hardware[];
  spotify_playlist: string[];
  linkedin: string;
  github: string;
  email: string;
  resume?: string;
}

export default function AboutManager() {
  const aboutQuery = useQuery(api.about.get);
  const updateAbout = useMutation(api.about.update);
  const generateUploadUrl = useMutation(api.images.generateUploadUrl);

  const [formData, setFormData] = useState<AboutFormData>({
    image: "",
    bio: { en: "", nl: "" },
    more_bio: { en: "", nl: "" },
    favourites: [],
    hardware: [],
    spotify_playlist: [],
    linkedin: "",
    github: "",
    email: "",
    resume: "",
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [spotifyInput, setSpotifyInput] = useState("");

  useEffect(() => {
    if (aboutQuery) {
      setFormData({
        _id: aboutQuery._id,
        image: aboutQuery.image || "",
        bio: aboutQuery.bio || { en: "", nl: "" },
        more_bio: aboutQuery.more_bio || { en: "", nl: "" },
        favourites: aboutQuery.favourites || [],
        hardware: aboutQuery.hardware || [],
        spotify_playlist: aboutQuery.spotify_playlist || [],
        linkedin: aboutQuery.linkedin || "",
        github: aboutQuery.github || "",
        email: aboutQuery.email || "",
        resume: aboutQuery.resume || "",
      });
    }
  }, [aboutQuery]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData._id) return toast.error("No About document found.");
    setIsSyncing(true);

    try {
      const { _id, ...updateData } = formData;
      await updateAbout({ id: _id, ...updateData });
      toast.success("About section saved!");
    } catch (e) {
      toast.error("Failed to update About section.");
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleFileUpload = async (file: File, field: "resume" | "image") => {
    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) throw new Error("Upload failed");

      const { storageId } = await result.json();

      setFormData((prev) => ({ ...prev, [field]: storageId }));

      const capitalizedField = field.charAt(0).toUpperCase() + field.slice(1);
      toast.success(`${capitalizedField} uploaded!`);
    } catch (e) {
      console.error(e);
      toast.error("File upload failed.");
    }
  };

  const addCard = () => {
    setFormData({
      ...formData,
      favourites: [...formData.favourites, { icon: "", title: "", desc: "" }],
    });
  };

  const updateCard = (
    idx: number,
    field: "icon" | "title" | "desc",
    value: string,
  ) => {
    const updated = formData.favourites.map((fav, i) =>
      i === idx ? { ...fav, [field]: value } : fav,
    );
    setFormData({ ...formData, favourites: updated });
  };

  const deleteCard = (idx: number) => {
    setFormData({
      ...formData,
      favourites: formData.favourites.filter((_, i) => i !== idx),
    });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(formData.favourites);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormData({
      ...formData,
      favourites: items,
    });
  };
  return (
    <form onSubmit={handleSave} className="space-y-16 pb-24">
      {/* SECTION 1: BIOGRAPHY */}
      <section className="space-y-6">
        <H3 icon={UserCircle} text="Biography" />
        <div className="grid grid-cols-1 gap-8 bg-foreground/5 border p-5 rounded">
          <div className="space-y-4">
            <span className="text-xs font-medium"> Bio (EN / NL)</span>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <Textarea
                placeholder="Bio EN"
                variant="admin"
                value={formData.bio.en}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bio: { ...formData.bio, en: e.target.value },
                  })
                }
              />
              <Textarea
                placeholder="Bio NL"
                variant="admin"
                value={formData.bio.nl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bio: { ...formData.bio, nl: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <span className="text-xs font-medium">More Bio (EN / NL)</span>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <Textarea
                placeholder="More Bio EN"
                variant="admin"
                value={formData.more_bio.en}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    more_bio: { ...formData.more_bio, en: e.target.value },
                  })
                }
              />
              <Textarea
                placeholder="More Bio NL"
                variant="admin"
                value={formData.more_bio.nl}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    more_bio: { ...formData.more_bio, nl: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HARDWARE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <H3 icon={Cpu} text="Hardware Setup" />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setFormData({
                ...formData,
                hardware: [
                  ...formData.hardware,
                  { icon: "", title: { en: "", nl: "" }, product: "" },
                ],
              })
            }
            className="h-8 text-xs px-2.5"
          >
            <Plus size={12} className="mr-1" /> Add Device
          </Button>
        </div>

        <div className="space-y-2">
          {formData.hardware.map((hw, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-stretch md:items-center gap-2 bg-white/2 border border-white/5 p-2 rounded-md group relative"
            >
              {/* Left Group: Icon & Product */}
              <div className="grid grid-cols-2 gap-2 flex-1 min-w-0">
                <Input
                  placeholder="Icon (e.g. Cpu)"
                  variant="admin"
                  value={hw.icon}
                  onChange={(e) => {
                    const updated = [...formData.hardware];
                    updated[idx].icon = e.target.value;
                    setFormData({ ...formData, hardware: updated });
                  }}
                  className="h-9 text-xs"
                />
                <Input
                  placeholder="Product / Model"
                  variant="admin"
                  value={hw.product}
                  onChange={(e) => {
                    const updated = [...formData.hardware];
                    updated[idx].product = e.target.value;
                    setFormData({ ...formData, hardware: updated });
                  }}
                  className="h-9 text-xs"
                />
              </div>

              {/* Right Group: Multi-language Titles */}
              <div className="grid grid-cols-2 gap-2 flex-[1.5] min-w-0">
                <Input
                  placeholder="Title (EN)"
                  variant="admin"
                  value={hw.title.en}
                  onChange={(e) => {
                    const updated = [...formData.hardware];
                    updated[idx].title.en = e.target.value;
                    setFormData({ ...formData, hardware: updated });
                  }}
                  className="h-9 text-xs"
                />
                <Input
                  placeholder="Title (NL)"
                  variant="admin"
                  value={hw.title.nl}
                  onChange={(e) => {
                    const updated = [...formData.hardware];
                    updated[idx].title.nl = e.target.value;
                    setFormData({ ...formData, hardware: updated });
                  }}
                  className="h-9 text-xs"
                />
              </div>

              {/* Action Button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  setFormData({
                    ...formData,
                    hardware: formData.hardware.filter((_, i) => i !== idx),
                  })
                }
                className="h-9 w-9 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 shrink-0 self-end md:self-auto"
              >
                <Trash2 size={13} />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: FAVOURITES */}
      <DragDropContext onDragEnd={onDragEnd}>
        {/* SECTION 3: FAVOURITES */}
        <section className="space-y-6 rounded-xl border p-5">
          {/* SECTION HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <H3 icon={Heart} text="Favourites" />
            <Button type="button" variant="outline" size="sm" onClick={addCard}>
              <Plus size={14} className="mr-1.5" /> Add Card
            </Button>
          </div>

          {/* CARDS CONTAINER */}
          {formData.favourites.length === 0 ? (
            <div className="flex flex-col items-center justify-center border rounded-lg p-8 text-center ">
              <Heart size={24} className="mb-2 stroke-[1.5] " />
              <p className="text-xs">No favourite cards added yet.</p>
              <button
                type="button"
                onClick={addCard}
                className="mt-2 text-xs text-blue-400 hover:underline"
              >
                Create your first card
              </button>
            </div>
          ) : (
            <Droppable droppableId="favourites-list">
              {(provided) => (
                <div
                  className="grid grid-cols-1 gap-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {formData.favourites.map((fav, idx) => {
                    const itemId = fav.id?.toString() || `item-${idx}`;

                    return (
                      <Draggable key={itemId} draggableId={itemId} index={idx}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`group relative flex flex-col gap-4 rounded-xl border bg-muted p-4 transition-shadow ${
                              snapshot.isDragging
                                ? "shadow-lg border-primary/40 ring-1 ring-primary/10"
                                : ""
                            }`}
                          >
                            {/* Card Header & Actions */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {/* Dedicated Drag Handle */}
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/10 text-muted-foreground transition-colors"
                                >
                                  <GripVertical size={14} />
                                </div>
                                <span className="text-[11px] font-semibold uppercase tracking-wider ">
                                  Item #{idx + 1}
                                </span>
                              </div>

                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteCard(idx)}
                                className="h-7 w-7 rounded-md hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
                                title="Delete item"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>

                            {/* Inputs Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {/* Icon Input */}
                              <div className="relative">
                                <LayoutGrid
                                  size={14}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                  placeholder="Icon (e.g. Heart)"
                                  variant="admin"
                                  value={fav.icon}
                                  onChange={(e) =>
                                    updateCard(idx, "icon", e.target.value)
                                  }
                                  className="text-xs pl-9 w-full"
                                />
                              </div>

                              {/* Title Input */}
                              <div className="relative md:col-span-2">
                                <Type
                                  size={14}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                  placeholder="Card Title"
                                  variant="admin"
                                  value={fav.title}
                                  onChange={(e) =>
                                    updateCard(idx, "title", e.target.value)
                                  }
                                  className="text-xs pl-9 w-full"
                                />
                              </div>

                              {/* Description Input (Span full width) */}
                              <div className="relative md:col-span-3 items-center flex">
                                <FileText
                                  size={14}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                  placeholder="Card Description..."
                                  variant="admin"
                                  value={fav.desc}
                                  onChange={(e) =>
                                    updateCard(idx, "desc", e.target.value)
                                  }
                                  className="w-full pl-9 text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </section>
      </DragDropContext>

      {/* SECTION 4: SPOTIFY & SOCIALS */}
      <section className="space-y-6">
        <H3 icon={Music} text="Spotify & Socials" />
        <div className="grid grid-cols-1 gap-8 bg-foreground/5 border border-white/5 p-8 rounded-lg">
          {/* SPOTIFY */}
          <div className="space-y-4">
            <span className="text-xs font-medium">Spotify Songs IDs</span>

            <div className="flex gap-2">
              <Input
                placeholder="Paste track ID & press Enter"
                variant="admin"
                value={spotifyInput}
                onChange={(e) => setSpotifyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const val = spotifyInput.trim();
                    if (val && !formData.spotify_playlist.includes(val)) {
                      setFormData({
                        ...formData,
                        spotify_playlist: [...formData.spotify_playlist, val],
                      });
                    }
                    setSpotifyInput("");
                  }
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.spotify_playlist.map((id, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-xs"
                >
                  <span>{id}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        spotify_playlist: formData.spotify_playlist.filter(
                          (_, i) => i !== idx,
                        ),
                      })
                    }
                    className="text-red-400 hover:text-red-500 ml-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* NETWORKS & CONTACT */}
          <div className="space-y-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-1">
              Socials
            </span>

            {/* LinkedIn Input */}
            <div className="relative flex items-center">
              <FaLinkedin
                size={16}
                className="absolute left-3 text-muted-foreground pointer-events-none"
              />
              <Input
                placeholder="LinkedIn URL"
                variant="admin"
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
                className="pl-10 w-full"
              />
            </div>

            {/* GitHub Input */}
            <div className="relative flex items-center">
              <FaGithub
                size={16}
                className="absolute left-3 text-muted-foreground pointer-events-none"
              />
              <Input
                placeholder="GitHub URL"
                variant="admin"
                value={formData.github}
                onChange={(e) =>
                  setFormData({ ...formData, github: e.target.value })
                }
                className="pl-10 w-full"
              />
            </div>

            {/* Email Input */}
            <div className="relative flex items-center">
              <Mail
                size={16}
                className="absolute left-3 text-muted-foreground pointer-events-none"
              />
              <Input
                placeholder="Contact Email Address"
                variant="admin"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="pl-10 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RESUME, IMAGE & SUBMIT */}
      <section className="space-y-6">
        <H3 icon={Globe} text="Documents & Media" />

        <div className="flex flex-wrap gap-6">
          {/* RESUME UPLOAD */}
          <div className="bg-foreground/5 border p-6 rounded max-w-sm flex-1 min-w-60">
            <h4 className="text-sm font-medium mb-3 opacity-80">
              Resume (PDF)
            </h4>
            {formData.resume ? (
              <div className="relative size-24 rounded-md border overflow-hidden group bg-foreground/10 flex flex-col items-center justify-center p-2">
                <FileText size={28} className="" />
                <span className="text-[9px] font-mono mt-1 text-white/40 truncate w-full text-center">
                  {formData.resume}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, resume: "" })}
                  className="absolute inset-0 flex items-center justify-center bg-red-500/80 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <label className="size-24 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition group">
                <FileText
                  size={20}
                  className="opacity-60 group-hover:opacity-100"
                />
                <span className="text-[10px] mt-1 opacity-50 uppercase">
                  Upload
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "resume");
                  }}
                />
              </label>
            )}
          </div>

          {/* IMAGE UPLOAD */}
          <div className="bg-foreground/5 border p-6 rounded max-w-sm flex-1 min-w-60">
            <h4 className="text-sm font-medium mb-3 opacity-80">
              Profile Image
            </h4>
            {formData.image ? (
              <div className="relative size-24 rounded-md border overflow-hidden group bg-foreground/10 flex flex-col items-center justify-center p-2">
                <Image
                  src={formData.image}
                  alt="Profile Preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: "" })}
                  className="absolute inset-0 flex items-center justify-center bg-red-500/80 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <label className="size-24 border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition group">
                <FileText
                  size={20}
                  className="opacity-60 group-hover:opacity-100"
                />
                <span className="text-[10px] mt-1 opacity-50 uppercase">
                  Upload
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "image");
                  }}
                />
              </label>
            )}
          </div>
        </div>
      </section>

      {/* SYSTEM SUBMIT ACTION */}
      <div className="pt-10 border-t border-white/5">
        <Button disabled={isSyncing} className="w-full font-bold h-12">
          {isSyncing ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={16} />
              Saving Profile Settings...
            </>
          ) : (
            "Save About Profile"
          )}
        </Button>
      </div>
    </form>
  );
}
