import React from "react";
import { Button } from "./ui/button";

interface ActionButtonProps {
  text: string;
}

const ActionButton = ({ text }: ActionButtonProps) => {
  return (
    <Button
      variant={"outline"}
      className="group/card relative overflow-hidden border"
    >
      <span className="z-10 group-hover/card:text-background duration-300">
        {text}
      </span>
      <span className="absolute inset-0 scale-x-0 origin-left transition-transform duration-500 bg-gradient-to-r from-primary to-secondary group-hover/card:scale-x-100" />
    </Button>
  );
};

export default ActionButton;
