import React from "react";

const Subheading = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-2 border-b pb-1 md:pb-2 mb-3 md:mb-4">
      <Icon size={16} className="text-primary" />
      <span className="text-[10px] md:text-xs uppercase font-semibold tracking-widest opacity-60">
        {text}
      </span>
    </div>
  );
};

export default Subheading;
