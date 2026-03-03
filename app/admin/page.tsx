"use client";

import AboutManager from "@/components/admin/AboutManager";
import EducationManager from "@/components/admin/EducationManager";
import ExperienceManager from "@/components/admin/ExperienceManager";
import ProjectManager from "@/components/admin/ProjectManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  GraduationCap,
  FolderCode,
  Layout,
  UserCircle,
} from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background px-5 md:container md:mx-auto py-10">
      {/* HEADER */}
      <div className="flex flex-col gap-2 border-b border-foreground/10 pb-2">
        <h1 className="text-6xl font-bold uppercase tracking-tight">
          Admin <span className="text-[#d0fe38]">Dashboard</span>
        </h1>
        <p className="font-medium opacity-60">
          Management of all Portfolio content & settings
        </p>
      </div>

      <Tabs defaultValue="projects" className="w-full mt-10">
        {/* TAB NAVIGATION */}
        <TabsList className="border border-foreground/20 mb-10 w-full">
          <TabsTrigger value="projects">
            <FolderCode size={16} /> Projects
          </TabsTrigger>
          <TabsTrigger value="experience">
            <Briefcase size={16} /> Experience
          </TabsTrigger>
          <TabsTrigger value="education">
            <GraduationCap size={16} /> Education
          </TabsTrigger>
          <TabsTrigger value="about">
            <UserCircle size={16} /> About
          </TabsTrigger>
        </TabsList>

        {/* PROJECTS SECTION */}
        <TabsContent value="projects">
          <ProjectManager />
        </TabsContent>

        {/* EXPERIENCE SECTION */}
        <TabsContent value="experience">
          <ExperienceManager />
        </TabsContent>

        {/* EDUCATION SECTION */}
        <TabsContent value="education">
          <EducationManager />
        </TabsContent>

        {/* ABOUT SECTION */}
        <TabsContent value="about">
          <AboutManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
