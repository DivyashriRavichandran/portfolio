import React from "react";
import ScrollAnimation from "../custom/ScrollAnimation";
import Image from "next/image";
import Heading from "../Heading";
import TimelineSection from "./TimelineSection";

const AboutSection = () => {
  return (
    <>
      <div className="bg-muted/30 py-10 md:py-20">
        <div className="container mx-auto px-4 ">
          <Heading title={"About Me"} subtitle={"Know who am I"} />

          <div className="mt-6 md:mt-12 grid gap-12 md:grid-cols-3">
            <div className="col-span-2 text-sm md:text-lg space-y-3 md:space-y-4 text-muted-foreground">
              <ScrollAnimation delay={0.2}>
                <p>
                  I&apos;m a full stack developer with a front-end focus,
                  currently working at KP Platforms in Qatar. I specialize in
                  building responsive, user-centric web applications using
                  technologies like React and Next.js. At KP, I collaborate with
                  UI/UX Designers and Backend Developer teams to transform Figma
                  designs into code and integrated RESTful APIs.
                </p>
              </ScrollAnimation>

              <ScrollAnimation delay={0.3}>
                <p>
                  I have a Bachelor’s degree in Computer Science from University
                  of Leeds, where I built a strong foundation in both software
                  engineering and programming algorithms. I&apos;m passionate
                  about creating efficient, scalable, and user-friendly
                  applications. I enjoy solving complex problems and
                  continuously learning new technologies to enhance my skills.
                </p>
              </ScrollAnimation>
            </div>

            <ScrollAnimation direction="right">
              <div className="rotate-6s relative flex items-center justify-center md:w-60 mx-auto size-40 md:h-full rounded-lg">
                <Image
                  src={"/emoji2.png"}
                  alt={""}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="-z-10 absolute -inset-0 rounded-full blur-3xl bg-gradient-to-r from-primary to-secondary opacity-50"></div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
      {/* EXPERIENCE SECTION */}
      <div className="my-10 md:my-20 container mx-auto px-4">
        <Heading title={"My Journey"} subtitle={"Experience & Education"} />

        <TimelineSection />
      </div>
    </>
  );
};

export default AboutSection;
