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
  Layout,
  Terminal,
  Music,
  Cpu,
  Globe,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import Subheading from "@/app/v2/_components/Subheading";
import { Badge } from "../ui/badge";
import { Id } from "@/convex/_generated/dataModel";

interface LocaleString {
  en: string;
  nl: string;
}

interface Interest {
  title: LocaleString;
  description: LocaleString;
}

interface NavbarLink {
  label: LocaleString;
  href: string;
}

interface AboutFormData {
  _id?: Id<"about">;
  about: LocaleString;
  menu_items: NavbarLink[];
  tech_stack: string[];
  spotify_playlist?: string[];
  hardware?: { en: string[]; nl: string[] }; // fix here
  interests?: Interest[];
  resume?: string; // storage ID
  linkedin: string;
  github: string;
}
export default function AboutManager() {
  const aboutQuery = useQuery(api.about.get);
  const updateAbout = useMutation(api.about.update);
  const generateUploadUrl = useMutation(api.images.generateUploadUrl);

  const [formData, setFormData] = useState<AboutFormData>({
    about: { en: "", nl: "" },
    menu_items: [],
    tech_stack: [],
    spotify_playlist: [],
    hardware: { en: [], nl: [] },
    interests: [],
    resume: "",
    linkedin: "",
    github: "",
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [spotifyInput, setSpotifyInput] = useState("");

  useEffect(() => {
    if (aboutQuery) {
      setFormData(aboutQuery as AboutFormData);
    }
  }, [aboutQuery]);

  const handleSave = async () => {
    if (!formData._id) return toast.error("No About document found.");
    setIsSyncing(true);

    try {
      const { _id, ...updateData } = formData;
      await updateAbout({ id: _id, ...updateData });
      toast.success("About section updated!");
    } catch (e) {
      toast.error("Failed to update About section.");
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

  // Helpers for updating nested arrays
  const updateArrayItem = <T extends object>(
    key: keyof AboutFormData,
    index: number,
    field: keyof T,
    value: unknown,
  ) => {
    const arr = [...(formData[key] as unknown as T[])];
    arr[index] = { ...arr[index], [field]: value };
    setFormData({ ...formData, [key]: arr } as AboutFormData);
  };

  const addArrayItem = <T extends object>(
    key: keyof AboutFormData,
    defaultValue: T,
  ) => {
    const arr = [...(formData[key] as unknown as T[]), defaultValue];
    setFormData({ ...formData, [key]: arr } as AboutFormData);
  };

  const removeArrayItem = <T extends object>(
    key: keyof AboutFormData,
    index: number,
  ) => {
    const arr = [...(formData[key] as unknown as T[])].filter(
      (_, i) => i !== index,
    );
    setFormData({ ...formData, [key]: arr } as AboutFormData);
  };

  // Handle file upload to Convex
  const handleFileUpload = async (file: File, field: keyof AboutFormData) => {
    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) throw new Error("Upload failed");

      const { storageId } = await result.json();

      setFormData({ ...formData, [field]: storageId } as AboutFormData);

      toast.success("File uploaded!");
    } catch (e) {
      console.error(e);
      toast.error("File upload failed.");
    }
  };

  return (
    <div className="pb-20 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* HERO & ABOUT */}
      <div className="space-y-4">
        <Subheading icon={UserCircle} text="Identity" />

        {["en", "nl"].map((locale) => (
          <div key={locale} className="space-y-2">
            <label className="text-xs uppercase opacity-60">{`About (${locale})`}</label>
            <Textarea
              variant="admin"
              value={formData.about[locale as keyof LocaleString]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  about: { ...formData.about, [locale]: e.target.value },
                })
              }
            />
          </div>
        ))}
      </div>

      {/* NAVBAR LINKS */}
      <div className="space-y-4">
        <Subheading icon={Layout} text="Navigation Links" />
        {formData.menu_items.map((link, idx) => (
          <div key={idx} className="flex gap-2">
            {["en", "nl"].map((locale) => (
              <Input
                key={locale}
                placeholder={`Label (${locale})`}
                value={link.label[locale as keyof LocaleString]}
                onChange={(e) =>
                  updateArrayItem<NavbarLink>("menu_items", idx, "label", {
                    ...link.label,
                    [locale]: e.target.value,
                  })
                }
                variant="admin"
              />
            ))}
            <Input
              placeholder="Href"
              value={link.href}
              onChange={(e) =>
                updateArrayItem<NavbarLink>(
                  "menu_items",
                  idx,
                  "href",
                  e.target.value,
                )
              }
              variant="admin"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeArrayItem("menu_items", idx)}
              className="hover:text-red-500 shrink-0"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          className="w-full border-dashed border-white/10 mt-2"
          onClick={() =>
            addArrayItem<NavbarLink>("menu_items", {
              label: { en: "", nl: "" },
              href: "",
            })
          }
        >
          <Plus size={14} className="mr-2" /> Add Link
        </Button>
      </div>

      {/* TECH STACK */}
      <div className="space-y-4">
        <Subheading icon={Terminal} text="Tech Stack" />
        <Input
          placeholder="Add tech and press Enter"
          variant="admin"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const val = e.currentTarget.value.trim();
              if (val && !formData.tech_stack.includes(val)) {
                setFormData({
                  ...formData,
                  tech_stack: [...formData.tech_stack, val],
                });
              }
              e.currentTarget.value = "";
            }
          }}
        />
        <div className="flex flex-wrap gap-2">
          {formData.tech_stack.map((tech) => (
            <Badge
              key={tech}
              onClick={() =>
                setFormData({
                  ...formData,
                  tech_stack: formData.tech_stack.filter((t) => t !== tech),
                })
              }
              variant="admin"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* HARDWARE */}
      <div className="space-y-4">
        <Subheading icon={Cpu} text="Hardware Setup" />

        {(["en", "nl"] as const).map((locale) => {
          const currentList = formData.hardware?.[locale] ?? []; // fallback to empty array
          return (
            <Input
              key={locale}
              placeholder={`Hardware (${locale.toUpperCase()}) and press Enter`}
              variant="admin"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const val = e.currentTarget.value.trim();
                  if (!val) return;

                  const updatedHardware = {
                    en:
                      locale === "en"
                        ? [...currentList, val]
                        : (formData.hardware?.en ?? []),
                    nl:
                      locale === "nl"
                        ? [...currentList, val]
                        : (formData.hardware?.nl ?? []),
                  };

                  setFormData({
                    ...formData,
                    hardware: updatedHardware,
                  });

                  e.currentTarget.value = "";
                }
              }}
            />
          );
        })}

        <div className="flex flex-wrap gap-2">
          {(["en", "nl"] as const).flatMap((locale) =>
            (formData.hardware?.[locale] ?? []).map((hw) => (
              <Badge
                key={`${locale}-${hw}`}
                variant="admin"
                onClick={() => {
                  const updatedHardware = {
                    en:
                      locale === "en"
                        ? (formData.hardware?.en ?? []).filter((h) => h !== hw)
                        : (formData.hardware?.en ?? []),
                    nl:
                      locale === "nl"
                        ? (formData.hardware?.nl ?? []).filter((h) => h !== hw)
                        : (formData.hardware?.nl ?? []),
                  };
                  setFormData({ ...formData, hardware: updatedHardware });
                }}
              >
                {hw} ({locale.toUpperCase()})
              </Badge>
            )),
          )}
        </div>
      </div>

      {/* SPOTIFY */}
      <div className="space-y-4">
        <Subheading icon={Music} text="Spotify Playlist" />

        <Input
          placeholder="Add Spotify track ID and press Enter"
          variant="admin"
          value={spotifyInput}
          onChange={(e) => setSpotifyInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const val = spotifyInput.trim();
              if (!val) return;
              const current = formData.spotify_playlist || [];
              if (!current.includes(val)) {
                setFormData({
                  ...formData,
                  spotify_playlist: [...current, val],
                });
              }
              setSpotifyInput("");
            }
          }}
        />

        <div className="flex flex-wrap gap-2">
          {formData.spotify_playlist?.map((id, i) => (
            <Badge
              key={i}
              variant="admin"
              onClick={() =>
                setFormData({
                  ...formData,
                  spotify_playlist: formData.spotify_playlist?.filter(
                    (_, idx) => idx !== i,
                  ),
                })
              }
            >
              {id}
            </Badge>
          ))}
        </div>
      </div>

      {/* SOCIAL LINKS & RESUME */}
      <div className="space-y-4">
        <Subheading icon={Globe} text="Social Links & Resume" />

        <Input
          placeholder="LinkedIn URL"
          variant="admin"
          value={formData.linkedin}
          onChange={(e) =>
            setFormData({ ...formData, linkedin: e.target.value })
          }
        />
        <Input
          placeholder="GitHub URL"
          variant="admin"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
        />

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="block w-full text-sm"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            handleFileUpload(file, "resume");
          }}
        />
      </div>

      {/* SAVE BUTTON */}
      <Button
        onClick={handleSave}
        disabled={isSyncing}
        variant="admin"
        className="mx-auto col-span-2 px-6"
      >
        {isSyncing ? <Loader2 className="animate-spin" /> : "Update"}
      </Button>
    </div>
  );
}
