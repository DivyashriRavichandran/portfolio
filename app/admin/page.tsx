"use client";

import AboutManager from "@/components/admin/AboutManager";
import CareerManager from "@/components/admin/CareerManager";

import ProjectManager from "@/components/admin/ProjectManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, FolderCode, UserCircle } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background px-5 md:container md:mx-auto py-10">
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-foreground/30 pb-4">
        <h1 className="text-6xl font-bold uppercase tracking-tighter">
          Admin{" "}
          <span className="text-background px-1 bg-primary">Dashboard</span>
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
          <TabsTrigger value="career">
            <Briefcase size={16} /> Career
          </TabsTrigger>

          <TabsTrigger value="about">
            <UserCircle size={16} /> About
          </TabsTrigger>
        </TabsList>

        {/* PROJECTS SECTION */}
        <TabsContent value="projects">
          <ProjectManager />
        </TabsContent>

        {/* PROJECTS SECTION */}
        <TabsContent value="career">
          <CareerManager />
        </TabsContent>

        {/* ABOUT SECTION */}
        <TabsContent value="about">
          <AboutManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
