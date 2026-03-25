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
import { toast } from "sonner";
import ProjectDialog from "./dialogs/ProjectDialog";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";

export default function ExperienceManager() {
  const experience = useQuery(api.experience.list);
  const removeExperience = useMutation(api.experience.remove);

  if (experience === undefined)
    return (
      <div className="animate-pulse opacity-20 py-20 text-center uppercase tracking-widest">
        Loading Experience....
      </div>
    );

  const handleDelete = async (id: Id<"experience">) => {
    if (
      confirm(
        "Are you sure you want to permanently delete this experience entry?",
      )
    ) {
      try {
        await removeExperience({ id });
        toast.success("Experience entry purged from archive.");
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
              Experience
            </h2>
            <p className="text-[10px] uppercase opacity-60 font-semibold tracking-widest">
              Total: {experience.length.toString().padStart(2, "0")}
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
            <TableHead className="pl-8 w-100">Experience Detail</TableHead>
            <TableHead>Institution</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="pr-8 text-right">Management</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experience.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-32 opacity-50 italic"
              >
                The vault is currently empty.
              </TableCell>
            </TableRow>
          ) : (
            experience.map((entry) => (
              <TableRow key={entry._id}>
                <TableCell className="font-medium text-lg pl-8">
                  {entry.title.en}
                </TableCell>
                <TableCell className="">{entry.institution.en}</TableCell>
                <TableCell className="">{entry.duration}</TableCell>

                <TableCell className="text-right pr-8 gap-4 flex justify-end">
                  <button className="p-2 rounded-full hover:bg-yellow-500/10 hover:text-yellow-500 transition-all">
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(entry._id)}
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
