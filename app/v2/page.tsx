import React from "react";
import EducationAndExperience from "./_components/EducationAndExperience";
import About from "./_components/About";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import ProjectSection from "./_components/ProjectSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ProjectSection />
      <About />
      <EducationAndExperience />
      <Footer />
    </>
  );
};

export default Home;
