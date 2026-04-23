import React from "react";

const H1 = ({
  text1,
  text2,
  total,
}: {
  text1?: string;
  text2: string;
  total?: number;
}) => {
  return (
    <div className="flex justify-between items-end mb-6 md:mb-10 border-b pb-2 md:pb-4">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase leading-snug">
        {text1}{" "}
        <span className="text-primary dark:text-primary-foreground bg-foreground dark:bg-primary px-1 ">
          {text2}.
        </span>
      </h2>
      {total && (
        <p className="text-[10px] uppercase font-medium tracking-[0.2em] opacity-40 text-right">
          {total.toString().padStart(2, "0")} Projects
        </p>
      )}
    </div>
  );
};

export default H1;
