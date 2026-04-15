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
import { Trash2, Briefcase, Edit, Plus } from "lucide-react";
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

export default function CareerManager() {
  const career = useQuery(api.career.list);
  const reorderCareer = useMutation(api.career.reorder);
  const removeCareer = useMutation(api.career.remove);

  if (career === undefined)
    return (
      <div className="animate-pulse opacity-20 py-20 text-center uppercase tracking-widest">
        Loading Career....
      </div>
    );

  const handleDelete = async (id: Id<"career">) => {
    if (confirm("Are you sure you want to permanently delete this entry?")) {
      try {
        await removeCareer({ id });
        toast.success("Entry deleted.");
      } catch (err) {
        toast.error(`Error: Could not delete entry: ${err}`);
      }
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination || !career) return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;

    if (sourceIndex === destIndex) return;

    const currentItem = career[sourceIndex];
    const targetItem = career[destIndex];

    try {
      await reorderCareer({
        id: currentItem._id,
        newOrder: targetItem.order ?? destIndex,
      });
      toast.success("Career order updated");
    } catch (err) {
      toast.error("Failed to reorder");
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-foreground/10 rounded-full size-10 flex items-center justify-center border border-foreground/10">
            <Briefcase size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold uppercase tracking-wide">
              Career
            </h2>
            <p className="text-[10px] uppercase opacity-60 font-semibold tracking-widest">
              Total: {career.length.toString().padStart(2, "0")}
            </p>
          </div>
        </div>

        <Link href="/admin/career/new">
          <Button variant={"admin"}>
            <Plus className="mr-2 h-4 w-4" /> New Entry
          </Button>
        </Link>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Table className="border border-white/5 rounded-lg overflow-hidden bg-foreground/5">
          <TableHeader className="bg-white/5 text-xs uppercase tracking-widest font-bold">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-12"></TableHead>
              <TableHead className="w-16 text-center">No.</TableHead>
              <TableHead className="pl-8">Role / Degree</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="pr-8 text-right">Management</TableHead>
            </TableRow>
          </TableHeader>

          <Droppable droppableId="career-list">
            {(provided) => (
              <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                {career.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`group border-white/5 transition-colors ${
                          snapshot.isDragging
                            ? "bg-white/10"
                            : "hover:bg-white/2"
                        }`}
                      >
                        {/* DRAG HANDLE */}
                        <TableCell>
                          <div
                            {...provided.dragHandleProps}
                            className="flex justify-center cursor-grab active:cursor-grabbing opacity-20 group-hover:opacity-100 transition-opacity"
                          >
                            <MdDragIndicator size={22} />
                          </div>
                        </TableCell>

                        {/* ORDER NUMBER */}
                        <TableCell className="text-center font-mono text-[10px] opacity-50">
                          {(index + 1).toString().padStart(2, "0")}
                        </TableCell>

                        {/* CONTENT */}
                        <TableCell className="font-medium text-lg pl-8">
                          {item.title.en}
                        </TableCell>
                        <TableCell>{item.organization.en}</TableCell>
                        <TableCell>
                          <Badge>{item.type}</Badge>
                        </TableCell>

                        {/* ACTIONS */}
                        <TableCell className="text-right pr-8">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/career/${item._id}`}>
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
                              onClick={() => handleDelete(item._id)}
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
