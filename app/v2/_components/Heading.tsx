import React from "react";

const Heading = ({
  text1,
  text2,
  total,
}: {
  text1: string;
  text2: string;
  total?: number;
}) => {
  return (
    <div className="flex justify-between items-end mb-16 border-b border-foreground/10 pb-6">
      <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">
        {text1}{" "}
        <span className="text-background bg-primary px-1">{text2}.</span>
      </h2>
      {total && (
        <p className="text-[10px] uppercase font-medium tracking-[0.2em] opacity-40 text-right">
          {total.toString().padStart(2, "0")} Projects
        </p>
      )}
    </div>
  );
};

export default Heading;
