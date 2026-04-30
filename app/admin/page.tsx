"use client";

import AboutManager from "@/components/admin/AboutManager";
import CareerManager from "@/components/admin/CareerManager";
import MiniProjectManager from "@/components/admin/MiniProjectManager";

import ProjectManager from "@/components/admin/ProjectManager";
import H1 from "@/components/headings/H1";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, FolderCode, UserCircle } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background px-5 md:container md:mx-auto py-10">
      {/* HEADER */}
      <div>
        <H1 text1={"Admin"} text2={"Dashboard"} />
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
          <TabsTrigger value="mini-projects">
            <FolderCode size={16} /> Mini Projects
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

        {/* MINI-PROJECTS SECTION */}
        <TabsContent value="mini-projects">
          <MiniProjectManager />
        </TabsContent>

        {/* CAREER SECTION */}
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
