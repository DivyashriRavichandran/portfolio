import React from "react";
import EducationAndExperience from "./_components/EducationAndExperience";
import About from "./_components/About";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Project from "./_components/Project";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Project />
      <EducationAndExperience />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
