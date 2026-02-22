"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Briefcase, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import AddExperienceCMS from "./AddExperienceCMS";

export default function ExperienceManager() {
  const experiences = useQuery(api.experience.get);
  const removeExperience = useMutation(api.experience.remove);

  if (experiences === undefined)
    return <div className="animate-pulse opacity-20">Accessing History...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Briefcase size={20} className="text-[#d0fe38]" />
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">
            Experience <span className="opacity-30">Archive</span>
          </h2>
        </div>
        <AddExperienceCMS />
      </div>

      <div className="border border-white/5 rounded-3xl overflow-hidden bg-white/[0.02]">
        <Table>
          <TableHeader className="bg-white/[0.03]">
            <TableRow className="border-white/5 hover:bg-transparent uppercase text-[10px] tracking-[0.2em] font-bold">
              <TableHead className="pl-6">Role & Company</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Technologies</TableHead>
              <TableHead className="text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experiences.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-20 opacity-30 italic"
                >
                  No professional records found.
                </TableCell>
              </TableRow>
            ) : (
              experiences.map((exp) => (
                <TableRow
                  key={exp._id}
                  className="border-white/5 hover:bg-white/[0.01] transition-colors group"
                >
                  <TableCell className="pl-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-lg leading-none mb-1">
                        {exp.title.en}
                      </span>
                      <span className="text-sm opacity-50 font-medium italic">
                        {exp.institution.en}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs opacity-60 uppercase">
                    {exp.period.en}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {exp.technologies?.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                      {(exp.technologies?.length ?? 0) > 3 && (
                        <span className="text-[9px] opacity-40">
                          +{exp.technologies!.length - 3}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 hover:bg-red-500/10 rounded-full"
                      onClick={() => {
                        if (confirm("Confirm deletion of this record?")) {
                          removeExperience({ id: exp._id });
                          toast.success("Experience record purged.");
                        }
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
