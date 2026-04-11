import React from "react";
import About from "./_components/About";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import ProjectSection from "./_components/ProjectSection";
import Navbar from "./_components/Navbar";
import SideProjectsSection from "./_components/SideProjectsSection";
import CareerSection from "./_components/Career";

const Home = () => {
  return (
    // <div className="max-w-4xl mx-auto">
    <div>
      <Navbar />
      <Hero />
      <About />
      <CareerSection />
      <ProjectSection />
      <SideProjectsSection />
      <Footer />
    </div>
  );
};

export default Home;
