// components/admin/EducationManager.tsx
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
import { Trash2, Plus, GraduationCap } from "lucide-react";

export default function EducationManager() {
  const education = useQuery(api.education.get); // Write this query in convex/education.ts
  const remove = useMutation(api.education.remove);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black uppercase flex items-center gap-2">
          <GraduationCap className="text-[#d0fe38]" /> Education
        </h2>
        <Button className="bg-[#d0fe38] text-black font-bold rounded-full text-xs px-6">
          <Plus size={14} className="mr-2" /> Add Degree
        </Button>
      </div>

      <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02]">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent uppercase text-[10px] tracking-widest">
              <TableHead>Degree (EN)</TableHead>
              <TableHead>Institution</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {education?.map((item) => (
              <TableRow key={item._id} className="border-white/5">
                <TableCell className="font-bold">{item.title.en}</TableCell>
                <TableCell className="opacity-60">
                  {item.institution.en}
                </TableCell>
                <TableCell className="text-[#d0fe38] font-mono">
                  {item.grade || "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove({ id: item._id })}
                    className="hover:text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
