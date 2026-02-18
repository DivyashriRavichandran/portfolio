import React from "react";

const Subheading = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-2 border-b border-foreground/10 pb-2 mb-4">
      <Icon size={16} className="text-primary" />
      <span className="text-xs uppercase font-semibold tracking-widest opacity-60">
        {text}
      </span>
    </div>
  );
};

export default Subheading;
