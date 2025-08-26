import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";
import { IoSend } from "react-icons/io5";
import { Loader2 } from "lucide-react";

type ButtonProps = ComponentProps<typeof Button> & {
  isSubmitting?: boolean;
};

export const SendButton = ({
  children,
  isSubmitting = false,
  ...rest
}: ButtonProps) => {
  return (
    <Button
      {...rest}
      className={cn(
        "relative overflow-hidden group md:text-base",
        isSubmitting ? "bg-foreground text-background" : "",
        rest.className
      )}
      disabled={isSubmitting || rest.disabled}
    >
      {/* Background icon or loader */}
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center size-full transition-transform duration-700 ease-[cubic-bezier(0.50,0.20,0,1)] bg-foreground text-background",
          isSubmitting
            ? "translate-x-0"
            : "-translate-x-full group-hover:translate-x-0"
        )}
      >
        {isSubmitting ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <IoSend className="size-5" />
        )}
      </span>

      {/* Button text */}
      <span
        className={cn(
          "relative transition-transform group-hover:translate-x-full group-hover:opacity-0 duration-700 ease-[cubic-bezier(0.50,0.20,0,1)] size-full",
          isSubmitting && "opacity-0"
        )}
      >
        {children}
      </span>
    </Button>
  );
};
