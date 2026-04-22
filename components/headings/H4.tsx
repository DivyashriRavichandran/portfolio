import React, { ReactNode } from "react";

const H4 = ({ children }: { children: ReactNode }) => {
  return (
    <h4 className="mt-6 md:mt-8 font-medium text-xs md:text-sm text-muted-foreground/80 capitalize">
      {children}
    </h4>
  );
};

export default H4;
