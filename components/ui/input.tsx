import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full min-w-0 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "h-11 md:h-14 border-b border-input bg-transparent text-sm md:text-lg file:text-foreground placeholder:text-muted-foreground dark:placeholder:text-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring",
        admin:
          "h-11 bg-white/10 border border-white/10 rounded-md px-4 text-sm placeholder:opacity-60 focus-visible:ring-1 focus-visible:ring-primary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

function Input({ className, variant, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input };
