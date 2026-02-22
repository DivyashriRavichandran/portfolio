// components/admin/ProjectManager.tsx
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
import { Trash2, ExternalLink, Github, FolderCode } from "lucide-react";
import { toast } from "sonner";
import AddProjectCMS from "./AddProjectCMS";
import { Id } from "@/convex/_generated/dataModel";

export default function ProjectManager() {
  const projects = useQuery(api.projects.list); // Assuming 'list' is your query name
  const removeProject = useMutation(api.projects.remove);

  if (projects === undefined)
    return (
      <div className="animate-pulse opacity-20 py-20 text-center uppercase tracking-widest">
        Initialising Archive...
      </div>
    );

  const handleDelete = async (id: Id<"projects">) => {
    if (confirm("Are you sure you want to permanently delete this project?")) {
      try {
        await removeProject({ id });
        toast.success("Project purged from archive.");
      } catch (err) {
        toast.error("Error: Could not delete entry.");
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER AREA */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-foreground/20 rounded-full size-10 flex items-center justify-center border border-foreground/10">
            <FolderCode size={32} className="text-[#d0fe38]" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold uppercase">Projects</h2>
            <p className="text-[10px] uppercase opacity-60 font-semibold tracking-widest">
              Total Entries: {projects.length}
            </p>
          </div>
        </div>
        <AddProjectCMS />
      </div>

      {/* TABLE AREA */}
      <div className="border border-white/5 rounded-[2.5rem] overflow-hidden bg-white/[0.02] backdrop-blur-sm">
        <Table>
          <TableHeader className="bg-white/[0.03]">
            <TableRow className="border-white/5 hover:bg-transparent text-[10px] uppercase tracking-[0.2em] font-black">
              <TableHead className="pl-8 py-6">Project Details</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Links</TableHead>
              <TableHead className="text-right pr-8">Management</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-32 opacity-20 italic"
                >
                  The vault is currently empty.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow
                  key={project._id}
                  className="border-white/5 group hover:bg-white/[0.02] transition-all"
                >
                  <TableCell className="pl-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                      <span className="font-bold text-lg tracking-tight">
                        {project.title.en} / {project.title.nl}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs opacity-50 uppercase italic">
                    {project.year}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {project.categories.slice(0, 2).map((cat: string) => (
                        <span
                          key={cat}
                          className="text-[9px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 uppercase font-bold text-white/60"
                        >
                          {cat}
                        </span>
                      ))}
                      {project.categories.length > 2 && (
                        <span className="text-[9px] opacity-30">
                          +{project.categories.length - 2}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3 opacity-30 group-hover:opacity-100 transition-opacity">
                      {project.project_link && (
                        <a href={project.project_link} target="_blank">
                          <ExternalLink
                            size={14}
                            className="hover:text-[#d0fe38]"
                          />
                        </a>
                      )}
                      {project.github_link && (
                        <a href={project.github_link} target="_blank">
                          <Github size={14} className="hover:text-[#d0fe38]" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(project._id)}
                      className="rounded-full hover:bg-red-500/10 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
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
