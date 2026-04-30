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
import { Trash2, Terminal, Edit, Plus } from "lucide-react";
import { MdDragIndicator } from "react-icons/md";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function MiniProjectManager() {
  const miniProjects = useQuery(api.mini_projects.get);
  const removeMiniProject = useMutation(api.mini_projects.remove);

  if (miniProjects === undefined)
    return (
      <div className="animate-pulse opacity-20 py-20 text-center uppercase tracking-widest">
        Loading Mini Projects....
      </div>
    );

  const handleDelete = async (id: Id<"mini_projects">) => {
    if (confirm("Are you sure you want to permanently delete this entry?")) {
      try {
        await removeMiniProject({ id });
        toast.success("Mini project removed.");
      } catch (err) {
        toast.error(`Error: Could not delete entry: ${err}`);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-foreground/10 rounded-full size-10 flex items-center justify-center border border-foreground/10">
            <Terminal size={32} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold uppercase tracking-wide">
              Mini Projects
            </h2>
            <p className="text-[10px] uppercase opacity-60 font-semibold tracking-widest">
              Total: {miniProjects.length.toString().padStart(2, "0")}
            </p>
          </div>
        </div>
        <Link href="/admin/mini-projects/new">
          <Button variant={"admin"}>
            <Plus className="mr-2 h-4 w-4" /> New Entry
          </Button>
        </Link>
      </div>

      <Table className="border border-white/5 rounded-lg overflow-hidden bg-foreground/5">
        <TableHeader className="bg-white/5 text-xs uppercase tracking-widest font-bold">
          <TableRow className="border-white/5 hover:bg-transparent">
            <TableHead className="w-12 text-center"></TableHead>
            <TableHead className="w-16 text-center">No.</TableHead>
            <TableHead className="pl-8">Project Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="pr-8 text-right">Management</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {miniProjects.map((project, index) => (
            <TableRow key={project._id} className="group border-white/5">
              <TableCell className="text-center">
                <div className="flex justify-center opacity-10 group-hover:opacity-30 transition-opacity">
                  <MdDragIndicator size={20} />
                </div>
              </TableCell>

              <TableCell className="text-center font-mono text-sm opacity-50">
                {(index + 1).toString().padStart(2, "0")}
              </TableCell>

              <TableCell className="font-medium text-lg pl-8">
                {project.title.en}
              </TableCell>

              <TableCell>
                <div className="flex gap-2">
                  {project.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </TableCell>

              <TableCell className="text-right pr-8">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/mini-projects/${project._id}`}>
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
