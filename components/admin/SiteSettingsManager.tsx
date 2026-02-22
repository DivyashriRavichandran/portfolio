"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Globe, UserCircle } from "lucide-react";

export default function SiteSettingsManager() {
  const settings = useQuery(api.siteSetttings.list);
  const updateSettings = useMutation(api.siteSetttings.update);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (settings) setFormData(settings);
  }, [settings]);

  if (!formData)
    return (
      <div className="animate-pulse opacity-20">Loading System Config...</div>
    );

  const handleSave = async () => {
    try {
      await updateSettings({
        id: settings!._id,
        ...formData,
      });
      toast.success("Global settings updated");
    } catch (e) {
      toast.error("Failed to update system config");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
      {/* LEFT: Branding & Bio */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <UserCircle size={18} className="text-[#d0fe38]" />
          <h2 className="text-xl font-bold uppercase tracking-tight">
            Identity
          </h2>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold opacity-40">
            Hero Heading
          </label>
          <Input
            value={formData.heroTitle}
            onChange={(e) =>
              setFormData({ ...formData, heroTitle: e.target.value })
            }
            className="bg-foreground/[0.03] border-foreground/10 rounded-xl py-6"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold opacity-40">
            About Bio
          </label>
          <Textarea
            value={formData.aboutBio}
            onChange={(e) =>
              setFormData({ ...formData, aboutBio: e.target.value })
            }
            className="bg-foreground/[0.03] border-foreground/10 rounded-2xl min-h-[150px]"
          />
        </div>
      </div>

      {/* RIGHT: Socials & Assets */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={18} className="text-[#d0fe38]" />
          <h2 className="text-xl font-bold uppercase tracking-tight">
            External Links
          </h2>
        </div>

        {["linkedinUrl", "githubUrl", "resumeUrl"].map((key) => (
          <div key={key} className="space-y-2">
            <label className="text-[10px] uppercase font-bold opacity-40">
              {key.replace("Url", "")}
            </label>
            <Input
              value={formData[key]}
              onChange={(e) =>
                setFormData({ ...formData, [key]: e.target.value })
              }
              className="bg-foreground/[0.03] border-foreground/10 rounded-xl"
            />
          </div>
        ))}

        <Button
          onClick={handleSave}
          className="w-full bg-[#d0fe38] text-black font-black uppercase tracking-widest py-8 rounded-2xl mt-4 hover:scale-[0.98] transition-all"
        >
          <Save className="mr-2 h-4 w-4" /> Save Global Configuration
        </Button>
      </div>
    </div>
  );
}
