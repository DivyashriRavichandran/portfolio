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
import { Trash2, FolderCode, Edit, Plus } from "lucide-react";
import { MdDragIndicator } from "react-icons/md";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";
import Link from "next/link";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Badge } from "../ui/badge";

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

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination || !projects) return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    if (sourceIndex === destIndex) return;

    const currentProject = projects[sourceIndex];
    const targetProject = projects[destIndex];

    try {
      await reorderProject({
        id: currentProject._id,
        newOrder: targetProject.order ?? destIndex,
      });
      toast.success("Position updated");
    } catch (err) {
      toast.error("Failed to reorder");
      console.log(err);
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Table className="border border-white/5 rounded-lg overflow-hidden bg-foreground/5">
          <TableHeader className="bg-white/5 text-xs uppercase tracking-widest font-bold">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-12 text-center"></TableHead>{" "}
              {/* Drag Handle Col */}
              <TableHead className="w-16 text-center">No.</TableHead>
              <TableHead className="pl-8">Project Details</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="pr-8 text-right">Management</TableHead>
            </TableRow>
          </TableHeader>

          <Droppable droppableId="projects-list">
            {(provided) => (
              <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                {projects.map((project, index) => (
                  <Draggable
                    key={project._id}
                    draggableId={project._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`group border-white/5 ${
                          snapshot.isDragging ? "bg-white/10" : ""
                        }`}
                      >
                        {/* DRAG HANDLE */}
                        <TableCell className="text-center">
                          <div
                            {...provided.dragHandleProps}
                            className="flex justify-center cursor-grab active:cursor-grabbing opacity-30 group-hover:opacity-100 transition-opacity"
                          >
                            <MdDragIndicator size={20} />
                          </div>
                        </TableCell>

                        {/* POSITION */}
                        <TableCell className="text-center font-mono text-sm opacity-50">
                          {(index + 1).toString().padStart(2, "0")}
                        </TableCell>

                        <TableCell className="font-medium text-lg pl-8">
                          {project.title.en}
                        </TableCell>
                        <TableCell className="flex gap-2">
                          {project.categories.en.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                          ))}
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </div>
  );
}
