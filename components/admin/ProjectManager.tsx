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
import {
  Trash2,
  ExternalLink,
  Github,
  FolderCode,
  Edit,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import ProjectDialog from "./dialogs/ProjectDialog";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";

export default function ProjectManager() {
  const projects = useQuery(api.projects.list);
  const removeProject = useMutation(api.projects.remove);

  if (projects === undefined)
    return (
      <div className="animate-pulse opacity-20 py-20 text-center uppercase tracking-widest">
        Loading Projects....
      </div>
    );

  const handleDelete = async (id: Id<"projects">) => {
    if (confirm("Are you sure you want to permanently delete this project?")) {
      try {
        await removeProject({ id });
        toast.success("Project deleted.");
      } catch (err) {
        toast.error(`Error: Could not delete entry: ${err}`);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER AREA */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-foreground/10 rounded-full size-10 flex items-center justify-center border border-foreground/10">
            <FolderCode size={32} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold uppercase tracking-wide">
              Projects
            </h2>
            <p className="text-[10px] uppercase opacity-60 font-semibold tracking-widest">
              Total: {projects.length.toString().padStart(2, "0")}
            </p>
          </div>
        </div>
        <ProjectDialog>
          <Button variant={"admin"}>
            <Plus /> New Entry
          </Button>
        </ProjectDialog>
      </div>
      {/* TABLE AREA */}
      <Table className="border border-white/5 rounded-lg overflow-hidden bg-foreground/5">
        <TableHeader className="bg-white/5 text-xs uppercase tracking-widest font-bold">
          <TableRow className="border-white/5">
            <TableHead className="pl-8 w-100">Project Details</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead className="w-20">Links</TableHead>
            <TableHead className="pr-8 text-right">Management</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-32 opacity-50 italic"
              >
                The vault is currently empty.
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell className="font-medium text-lg pl-8">
                  {project.title.en}
                </TableCell>
                <TableCell className="">{project.year}</TableCell>
                <TableCell>
                  <div className="flex gap-1 items-center">
                    {project.categories.en.slice(0, 2).map((cat: string) => (
                      <span
                        key={cat}
                        className="text-xs px-2 py-0.5 rounded-full border border-white/20 bg-white/5 uppercase font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                    {project.categories.en.length > 2 && (
                      <span className="text-xs opacity-50">
                        +{project.categories.en.length - 2}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-5 items-center">
                    {project.project_link && (
                      <a href={project.project_link} target="_blank">
                        <ExternalLink
                          size={20}
                          className="hover:text-primary"
                        />
                      </a>
                    )}
                    {project.github_link && (
                      <a href={project.github_link} target="_blank">
                        <Github size={20} className="hover:text-primary" />
                      </a>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right pr-8 gap-4 flex justify-end">
                  <ProjectDialog data={project}>
                    <button className="p-2 rounded-full hover:bg-yellow-500/10 hover:text-yellow-500 transition-all">
                      <Edit size={20} />
                    </button>
                  </ProjectDialog>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 rounded-full hover:bg-red-500/10 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
