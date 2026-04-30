import React from "react";
import About from "./_components/About";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import ProjectSection from "./_components/ProjectSection";
import Navbar from "./_components/Navbar";
import CareerSection from "./_components/Career";
import MiniProjectsSection from "./_components/MiniProjectsSection";

const Home = () => {
  return (
    <div className="px-5 lg:px-0 md:max-w-4xl md:mx-auto">
      <Navbar />
      <Hero />
      <About />
      <CareerSection />
      <ProjectSection />
      <MiniProjectsSection />
      <Footer />
    </div>
  );
};

export default Home;
