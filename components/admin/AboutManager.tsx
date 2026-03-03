"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Save,
  UserCircle,
  Cpu,
  Plus,
  Trash2,
  Layout,
  Loader2,
  Globe,
  Terminal,
  Music,
} from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import Subheading from "@/app/v2/_components/Subheading";

// Renamed interface for consistency
interface AboutData {
  _id?: Id<"about">;
  _creationTime?: number;
  heroTitle: string;
  aboutBio: string;
  navbarLinks: { label: string; href: string }[];
  techStack: string[];
  resumeUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  spotify_playlist?: string[];
  hardware_setup?: string[];
  interests?: { title: string; description: string }[];
}

const DEFAULT_ABOUT: AboutData = {
  heroTitle: "Frontend Developer",
  aboutBio:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  navbarLinks: [{ label: "Home", href: "/" }],
  techStack: ["React", "Next.js", "TypeScript"],
  hardware_setup: [
    "16-inch MacBook Pro",
    "Dell UltraSharp Monitor",
    "Logitech MX Master 3 Mouse",
  ],
  interests: [
    {
      title: "Coding",
      description: "I love coding and building new projects.",
    },
  ],
  spotify_playlist: ["Track 1", "Track 2", "Track 3"],
  resumeUrl: "https://example.com/resume.pdf",
  linkedinUrl: "https://www.linkedin.com/in/example",
  githubUrl: "https://github.com/example",
};

export default function AboutManager() {
  const about = useQuery(api.about.get);
  const updateAbout = useMutation(api.about.update);

  const [formData, setFormData] = useState<AboutData>(DEFAULT_ABOUT);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (about) {
      setFormData(about as AboutData);
      setIsSyncing(false);
    }
  }, [about]);

  const handleSave = async () => {
    if (!formData._id)
      return toast.error(
        "No document ID found. Please create an entry in Convex first.",
      );

    const toastId = toast.loading("Updating global context...");
    try {
      const { _id, _creationTime, ...updateData } = formData;

      await updateAbout({
        id: _id,
        ...updateData,
        // Ensure optional arrays are at least empty arrays if undefined
        interests: updateData.interests || [],
        hardware_setup: updateData.hardware_setup || [],
        spotify_playlist: updateData.spotify_playlist || [],
      });
      toast.success("Global Identity Synchronized", { id: toastId });
    } catch (e) {
      toast.error("Protocol failure: Check mutation arguments", {
        id: toastId,
      });
      console.error(e);
    }
  };

  const updateArrayOfObjects = (
    key: "navbarLinks" | "interests",
    index: number,
    field: string,
    value: string,
  ) => {
    const arr = [...(formData[key] || [])];
    arr[index] = { ...arr[index], [field]: value };
    setFormData({ ...formData, [key]: arr });
  };

  const addToArray = (
    key: "navbarLinks" | "interests",
    defaultValue: unknown,
  ) => {
    setFormData({
      ...formData,
      [key]: [...(formData[key] || []), defaultValue],
    });
  };

  const removeFromArray = (key: "navbarLinks" | "interests", index: number) => {
    setFormData({
      ...formData,
      [key]: (formData[key] || []).filter((_, i) => i !== index),
    });
  };

  return (
    <div className="pb-20 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* IDENTITY & BIO */}
      <div className="space-y-4">
        <Subheading icon={UserCircle} text="Identity" />

        <div className="space-y-2">
          <label className="text-xs uppercase font-semibold tracking-wide opacity-60">
            Hero Title
          </label>
          <Input
            variant="admin"
            value={formData.heroTitle}
            onChange={(e) =>
              setFormData({ ...formData, heroTitle: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase font-semibold tracking-wide opacity-60">
            Biography
          </label>
          <Textarea
            variant="admin"
            className="min-h-[120px]"
            value={formData.aboutBio}
            onChange={(e) =>
              setFormData({ ...formData, aboutBio: e.target.value })
            }
          />
        </div>
      </div>

      {/* NAVIGATION LINKS */}
      <div className="space-y-4">
        <Subheading icon={Layout} text="System Nav" />
        <div className="space-y-3">
          {formData.navbarLinks.map((link, idx) => (
            <div key={idx} className="flex gap-2">
              <Input
                placeholder="Label"
                value={link.label}
                onChange={(e) =>
                  updateArrayOfObjects(
                    "navbarLinks",
                    idx,
                    "label",
                    e.target.value,
                  )
                }
                variant="admin"
              />
              <Input
                placeholder="Href"
                value={link.href}
                onChange={(e) =>
                  updateArrayOfObjects(
                    "navbarLinks",
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
                onClick={() => removeFromArray("navbarLinks", idx)}
                className="hover:text-red-500 flex-shrink-0"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            className="w-full border-dashed border-white/10 mt-2"
            onClick={() => addToArray("navbarLinks", { label: "", href: "" })}
          >
            <Plus size={14} className="mr-2" /> Add Link
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Subheading icon={Terminal} text="Tech Stack" />
        <Input
          variant="admin"
          value={formData.techStack.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              techStack: e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
        />
      </div>

      <div className="space-y-4">
        <Subheading icon={Cpu} text="Hardware Setup" />
        <Input
          variant="admin"
          value={formData.hardware_setup?.join(", ") || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              hardware_setup: e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
        />
      </div>

      <div className="space-y-4">
        <Subheading icon={Music} text="Spotify Top Tracks" />
        <div className="grid grid-cols-2 gap-4">
          {formData.spotify_playlist?.map((id, i) => (
            <iframe
              key={i}
              src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-2xl opacity-80 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Subheading icon={Globe} text="Social Links" />
        {["resumeUrl", "linkedinUrl", "githubUrl"].map((key) => (
          <div key={key} className="space-y-1">
            <label className="text-xs uppercase font-semibold tracking-wide opacity-60">
              {key.replace("Url", "")}
            </label>
            <Input
              variant="admin"
              value={(formData as unknown as Record<string, string>)[key]}
              onChange={(e) =>
                setFormData({ ...formData, [key]: e.target.value })
              }
            />
          </div>
        ))}
      </div>

      {/* SAVE BUTTON */}
      <Button
        onClick={handleSave}
        disabled={isSyncing}
        variant={"admin"}
        className="mx-auto col-span-2 px-6"
      >
        {isSyncing ? <Loader2 className="animate-spin" /> : "Update"}
      </Button>
    </div>
  );
}
