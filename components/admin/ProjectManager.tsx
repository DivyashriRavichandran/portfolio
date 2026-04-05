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
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ProjectManager() {
  const projects = useQuery(api.projects.list);
  const reorderProject = useMutation(api.projects.reorder);
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

  const handleMove = async (currentIndex: number, direction: "up" | "down") => {
    if (!projects) return;

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const currentProject = projects[currentIndex];
    const targetProject = projects[targetIndex];

    // Use optional chaining or a fallback if your DB is currently empty of 'order' values
    const currentOrder = currentProject.order ?? currentIndex;
    const targetOrder = targetProject.order ?? targetIndex;

    try {
      await reorderProject({ id: currentProject._id, newOrder: targetOrder });
      await reorderProject({ id: targetProject._id, newOrder: currentOrder });
      toast.success("Position shifted");
    } catch (err) {
      toast.error("Database sync failed");
    }
  };

  return (
    <div className="space-y-8">
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
        <Link href="/admin/projects/new">
          <Button variant={"admin"}>
            <Plus className="mr-2 h-4 w-4" /> New Entry
          </Button>
        </Link>
      </div>
      {/* TABLE AREA */}
      <Table className="border border-white/5 rounded-lg overflow-hidden bg-foreground/5">
        <TableHeader className="bg-white/5 text-xs uppercase tracking-widest font-bold">
          <TableRow className="border-white/5">
            <TableHead className="w-16 text-center">Pos</TableHead>
            <TableHead className="pl-8">Project Details</TableHead>
            <TableHead>Year</TableHead>
            <TableHead className="pr-8 text-right">Management</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project, index) => (
            <TableRow key={project._id} className="group">
              <TableCell>
                <div className="flex flex-col items-center gap-1">
                  <button
                    disabled={index === 0}
                    onClick={() => handleMove(index, "up")}
                    className="disabled:opacity-10 hover:text-primary transition-colors"
                  >
                    <ChevronUp size={16} />
                  </button>
                  <span className="text-[10px] font-mono opacity-50">
                    {index + 1}
                  </span>
                  <button
                    disabled={index === projects.length - 1}
                    onClick={() => handleMove(index, "down")}
                    className="disabled:opacity-10 hover:text-primary transition-colors"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
              </TableCell>
              <TableCell className="font-medium text-lg pl-8">
                {project.title.en}
              </TableCell>
              <TableCell>{project.year}</TableCell>
              <TableCell className="text-right pr-8">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/projects/${project._id}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-yellow-500/10 hover:text-yellow-500"
                    >
                      <Edit size={18} />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(project._id)}
                    className="rounded-full hover:bg-red-500/10 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
