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
    <div className="flex justify-between items-end mb-4 md:mb-6 border-b pb-1 md:pb-3">
      <h2 className="md:text-xl font-semibold">
        {text1}
        {"  "}
        <span className="text-primary-foreground bg-primary px-1">
          {text2}
          {symbol ? symbol : "."}
        </span>
      </h2>
    </div>
  );
};

export default H2;
