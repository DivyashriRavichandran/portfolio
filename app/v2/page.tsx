import React from "react";
import EducationAndExperience from "./_components/EducationAndExperience";
import About from "./_components/About";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import ProjectSection from "./_components/ProjectSection";
import Navbar from "./_components/Navbar";
import SideProjectsSection from "./_components/SideProjectsSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <EducationAndExperience />
      <ProjectSection />
      <SideProjectsSection />
      <Footer />
    </>
  );
};

export default Home;
