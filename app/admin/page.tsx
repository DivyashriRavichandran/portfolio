"use client";

import AboutManager from "@/components/admin/AboutManager";
import BlogsManager from "@/components/admin/BlogsManager";
import CareerManager from "@/components/admin/CareerManager";
import MiniProjectManager from "@/components/admin/MiniProjectManager";

import ProjectManager from "@/components/admin/ProjectManager";
import H1 from "@/components/headings/H1";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, FolderCode, StickyNote, UserCircle } from "lucide-react";

export default function AdminPage() {
  return (
    <>
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
            <FolderCode size={16} /> Open Source Projects
          </TabsTrigger>
          <TabsTrigger value="blogs">
            <StickyNote size={16} /> Blogs
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

        {/* BLOGS SECTION */}
        <TabsContent value="blogs">
          <BlogsManager />
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
    </>
  );
}
