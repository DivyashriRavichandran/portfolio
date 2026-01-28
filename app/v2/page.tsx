import Navbar from "@/components/Navbar";
import React from "react";
import EducationAndExperience from "./_components/EducationAndExperience";
import About from "./_components/About";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="py-10 md:py-20">
        <About />
        <EducationAndExperience />
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default Home;
