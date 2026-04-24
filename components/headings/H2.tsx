import React from "react";

const H2 = ({
  text1,
  text2,
  symbol,
}: {
  text1?: string;
  text2: string;
  symbol?: string;
}) => {
  return (
    <div className="flex justify-between items-end mb-4 md:mb-6 border-b pb-3 md:pb-4">
      <h2 className="text-xs md:text-base font-semibold tracking-[0.15em] uppercase">
        {text1}{" "}
        <span className="text-background bg-primary px-1 tracking-widest">
          {text2}
          {symbol ? symbol : "."}
        </span>
      </h2>
    </div>
  );
};

export default H2;
