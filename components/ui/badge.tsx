import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "font-medium inline-flex w-fit shrink-0 items-center justify-center gap-2 overflow-hidden border text-[10px] md:text-xs transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "bg-muted-foreground/5 dark:bg-muted-foreground/10 border hover:bg-muted-foreground/10 dark:hover:bg-muted-foreground/20",
        primary:
          "bg-primary border text-primary-foreground hover:bg-primary/80 font-semibold",
        secondary:
          "bg-muted/30 text-foreground border-border hover:bg-muted/50 hover:border-foreground/50",
        outline:
          "bg-transparent text-foreground border hover:border-primary hover:text-primary",
        ghost:
          "border-transparent bg-transparent text-foreground/60 hover:text-foreground hover:bg-muted",
      },
      size: {
        default: "px-1.5 md:px-2 py-0.5 md:py-1 font-normal",
        lg: "px-1.5 md:px-2 py-0.5 md:py-1 uppercase tracking-wide",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
