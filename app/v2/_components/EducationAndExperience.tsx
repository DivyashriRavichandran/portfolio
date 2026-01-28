"use client";

import React from "react";
import Title from "./Title";
import { motion } from "framer-motion";
import data from "@/data/data.json";

const EducationAndExperience = () => {
  return (
    <div className="px-4 md:px-16 py-10 md:py-20">
      {/* Education Section */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-24 relative">
        <div className="-z-10 absolute bg-primary size-50 blur-[150px] -right-16 top-0 " />
        <Title>Education</Title>

        <div className="space-y-10 md:space-y-12">
          {data.education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, translateY: 20 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.3, delay: index * 0.3 }}
              className="border-b pb-10 md:pb-16"
            >
              {/* HEADER */}
              <div className="flex justify-between font-medium gap-3">
                <div className="font-medium text-lg md:text-4xl line-clamp-2 flex-1">
                  {item.title}
                </div>
                <div className="mt-1 text-sm md:text-2xl">{item.period}</div>
              </div>

              {/* SUBHEADER */}
              <div className="mt-1 md:mt-2 font-medium md:text-2xl">
                {item.institution}
              </div>

              {/* DESCRIPTION */}
              <div className="mt-4 md:mt-6 text-sm md:text-xl">
                {item.description_1}
              </div>
              {item.description_2 && (
                <div className="mt-4 md:mt-6 text-sm md:text-xl">
                  {item.description_2}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="mt-16 md:mt-32 flex flex-col md:flex-row md:justify-between gap-4 md:gap-16 relative">
        <div className="-z-10 absolute bg-secondary size-50 blur-[130px] -right-16 top-0 " />
        <Title>Experience</Title>

        <div className="space-y-10 md:space-y-12">
          {data.experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, translateY: 20 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.3, delay: index * 0.3 }}
              className="border-b pb-10 md:pb-16"
            >
              {/* HEADER */}
              <div className="flex justify-between font-medium gap-3">
                <div className="font-medium text-lg md:text-4xl line-clamp-2 flex-1">
                  {item.title}
                </div>
                <div className="mt-1 text-sm md:text-2xl">{item.period}</div>
              </div>

              {/* SUBHEADER */}
              <div className="mt-1 md:mt-2 font-medium md:text-2xl">
                {item.institution}
              </div>

              {/* DESCRIPTION */}
              <div className="mt-4 md:mt-6 text-sm md:text-xl">
                {item.description_1}
              </div>
              {item.description_2 && (
                <div className="mt-4 md:mt-6 text-sm md:text-xl">
                  {item.description_2}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationAndExperience;
