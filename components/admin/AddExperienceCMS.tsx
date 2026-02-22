// components/admin/AddExperienceCMS.tsx
"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
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
import { Plus, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AddExperienceCMS() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const create = useMutation(api.experience.create);

  const [formData, setFormData] = useState({
    image: "",
    title_en: "",
    title_nl: "",
    company_en: "",
    company_nl: "",
    period_en: "",
    period_nl: "",
    outcomes: "", // String split by newline
    tech: "", // String split by comma
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await create({
        image: formData.image || "https://placeholder.com/logo.png",
        title: { en: formData.title_en, nl: formData.title_nl },
        institution: { en: formData.company_en, nl: formData.company_nl },
        period: { en: formData.period_en, nl: formData.period_nl },
        key_outcomes: formData.outcomes.split("\n").filter(Boolean),
        technologies: formData.tech
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
      toast.success("History Updated");
      setOpen(false);
    } catch (err) {
      toast.error("Critical Error saving record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#d0fe38] text-black font-black uppercase tracking-widest text-[10px] rounded-full px-6 py-6 hover:scale-105 transition-transform">
          <Plus className="mr-2 h-4 w-4" /> New Experience
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0a0a0a] border-white/5 text-white rounded-[2.5rem] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-4xl font-black uppercase italic tracking-tighter">
            Log <span className="text-[#d0fe38]">Role</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold opacity-30 ml-2">
                Title (EN / NL)
              </label>
              <Input
                placeholder="Lead Designer"
                className="bg-white/5 border-white/10 rounded-xl"
                onChange={(e) =>
                  setFormData({ ...formData, title_en: e.target.value })
                }
              />
              <Input
                placeholder="Hoofdontwerper"
                className="bg-white/5 border-white/10 rounded-xl"
                onChange={(e) =>
                  setFormData({ ...formData, title_nl: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold opacity-30 ml-2">
                Company (EN / NL)
              </label>
              <Input
                placeholder="Studio X"
                className="bg-white/5 border-white/10 rounded-xl"
                onChange={(e) =>
                  setFormData({ ...formData, company_en: e.target.value })
                }
              />
              <Input
                placeholder="Atelier X"
                className="bg-white/5 border-white/10 rounded-xl"
                onChange={(e) =>
                  setFormData({ ...formData, company_nl: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold opacity-30 ml-2">
              Technologies (Comma Separated)
            </label>
            <Input
              placeholder="React, Three.js, GSAP"
              className="bg-white/5 border-white/10 rounded-xl"
              onChange={(e) =>
                setFormData({ ...formData, tech: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold opacity-30 ml-2">
              Outcomes (One per line)
            </label>
            <Textarea
              placeholder="Increased performance by 40%&#10;Designed 12 core modules..."
              className="bg-white/5 border-white/10 rounded-2xl h-32"
              onChange={(e) =>
                setFormData({ ...formData, outcomes: e.target.value })
              }
            />
          </div>

          <Button
            disabled={loading}
            className="w-full bg-[#d0fe38] text-black font-black uppercase py-8 rounded-2xl text-md"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Save className="mr-2" /> Commit to Archive
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
