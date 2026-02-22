"use client";

import EducationManager from "@/components/admin/EducationManager";
import ExperienceManager from "@/components/admin/ExperienceManager";
import ProjectManager from "@/components/admin/ProjectManager";
import SiteSettingsManager from "@/components/admin/SiteSettingsManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, GraduationCap, FolderCode, Layout } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background px-5 md:container md:mx-auto py-10 space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-2 border-b border-foreground/5">
        <h1 className="text-6xl font-bold uppercase">
          Admin <span className="text-[#d0fe38]">Dashboard</span>
        </h1>
        <p className="text-sm font-medium uppercase tracking-wide opacity-60">
          Management of all Portfolio content & system settings
        </p>
      </div>

      <Tabs defaultValue="projects" className="w-full">
        {/* TAB NAVIGATION */}
        <TabsList className="border border-foreground/40 mb-10">
          <TabsTrigger value="projects">
            <FolderCode size={16} /> Projects
          </TabsTrigger>
          <TabsTrigger value="experience">
            <Briefcase size={16} /> Experience
          </TabsTrigger>
          <TabsTrigger value="education">
            <GraduationCap size={16} /> Education
          </TabsTrigger>
          <TabsTrigger value="site">
            <Layout size={16} /> Site Config
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

        {/* SITE CONFIG (Navbar, About, Socials) */}
        <TabsContent value="site">
          <SiteSettingsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
