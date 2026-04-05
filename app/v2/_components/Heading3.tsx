import React from "react";

const Heading3 = ({ text1, text2 }: { text1?: string; text2: string }) => {
  return (
    <div className="flex justify-between items-end mb-6 md:mb-8 border-b pb-3 md:pb-4">
      <h2 className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
        {text1}{" "}
        <span className="text-background bg-primary px-1">{text2}.</span>
      </h2>
    </div>
  );
};

export default Heading3;
