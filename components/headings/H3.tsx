import React from "react";

const H3 = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-2 border-b pb-1 md:pb-2 mb-4 md:mb-6">
      <Icon size={16} className="text-primary" />
      <span className="text-xs md:text-sm uppercase font-semibold tracking-widest opacity-80">
        {text}
      </span>
    </div>
  );
};

export default H3;
