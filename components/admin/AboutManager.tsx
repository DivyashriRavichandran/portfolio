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
  Cpu,
  Plus,
  Trash2,
  Layout,
  Loader2,
  Globe,
  Terminal,
  Music,
  Command,
  Layers,
  ImagePlus,
} from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import Subheading from "@/app/v2/_components/Subheading";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { CommandGroup, CommandInput, CommandItem } from "../ui/command";
import StackIcon from "tech-stack-icons";
import Image from "next/image";
import { InterestSection } from "./InterestSection";

const techOptions = [
  "js",
  "typescript",
  "react",
  "nextjs",
  "python",
  "java",
  "postgresql",
  "springboot",
  "convex",
  "workos",
];

interface AboutData {
  _id?: Id<"about">;
  _creationTime?: number;
  heroTitle: string;
  biography: string;
  navbarLinks: { label: string; href: string }[];
  techStack: string[];
  resumeUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  spotify_playlist?: string[];
  hardware_setup?: string[];
  interests?: { title: string; description: string; image: string }[];
}

export default function AboutManager() {
  const about = useQuery(api.about.get);
  const updateAbout = useMutation(api.about.update);

  const [formData, setFormData] = useState<AboutData>({
    heroTitle: "",
    biography: "",
    navbarLinks: [],
    techStack: [],
    resumeUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    spotify_playlist: [],
    hardware_setup: [],
    interests: [],
  });
  const [isSyncing, setIsSyncing] = useState(false);
  const [spotifyInput, setSpotifyInput] = useState("");

  useEffect(() => {
    if (about) {
      setFormData(about as AboutData);
      setIsSyncing(false);
    }
  }, [about]);

  const handleSave = async () => {
    setIsSyncing(true);
    if (!formData._id)
      return toast.error(
        "No document ID found. Please create an entry in Convex first.",
      );

    try {
      const { _id, _creationTime, ...updateData } = formData;

      await updateAbout({
        id: _id,
        ...updateData,
        interests: updateData.interests || [],
        hardware_setup: updateData.hardware_setup || [],
        spotify_playlist: updateData.spotify_playlist || [],
      });
      toast.success("About section updated!");
    } catch (e) {
      toast.error("Failed to update About section.");
      console.error(e);
    } finally {
      setIsSyncing(false);
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
            className="min-h-30"
            value={formData.biography}
            onChange={(e) =>
              setFormData({ ...formData, biography: e.target.value })
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
                className="hover:text-red-500 shrink-0"
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

      {/* TECH STACK */}
      <div className="space-y-4">
        <Subheading icon={Terminal} text="Tech Stack" />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              Select Tech Stack
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-80 p-0">
            <Command>
              <CommandInput placeholder="Search tech..." />

              <CommandGroup>
                {techOptions.map((tech) => (
                  <CommandItem
                    key={tech}
                    onSelect={() => {
                      if (!formData.techStack.includes(tech)) {
                        setFormData({
                          ...formData,
                          techStack: [...formData.techStack, tech],
                        });
                      }
                    }}
                  >
                    <StackIcon name={tech} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Selected tech stack */}
        <div className="flex flex-wrap gap-2">
          {formData.techStack.map((tech) => (
            <div
              key={tech}
              onClick={() =>
                setFormData({
                  ...formData,
                  techStack: formData.techStack.filter((t) => t !== tech),
                })
              }
            >
              <StackIcon name={tech} className="size-6" />
            </div>
          ))}
        </div>
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

      {/* SPOTIFY */}
      <div className="space-y-4">
        <Subheading icon={Music} text="Spotify Top Tracks" />

        {/* Input */}
        <div className="flex gap-2">
          <Input
            variant="admin"
            placeholder="Enter Spotify track ID..."
            value={spotifyInput}
            onChange={(e) => setSpotifyInput(e.target.value)}
          />
          <Button
            type="button"
            onClick={() => {
              if (!spotifyInput.trim()) return;

              setFormData({
                ...formData,
                spotify_playlist: [
                  ...(formData.spotify_playlist || []),
                  spotifyInput.trim(),
                ],
              });

              setSpotifyInput("");
            }}
          >
            <Plus size={16} />
          </Button>
        </div>

        {/* Track IDs */}
        <div className="flex flex-wrap gap-2">
          {formData.spotify_playlist?.map((id, i) => (
            <Badge
              key={i}
              variant="outline"
              className="cursor-pointer"
              onClick={() =>
                setFormData({
                  ...formData,
                  spotify_playlist: formData?.spotify_playlist?.filter(
                    (_, index) => index !== i,
                  ),
                })
              }
            >
              {id} ✕
            </Badge>
          ))}
        </div>

        {/* Preview */}
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

      {/* SOCIAL LINKS */}
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

      {/* OTHER INTERESTS */}
      <InterestSection formData={formData} setFormData={setFormData} />

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
