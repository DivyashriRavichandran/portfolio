import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex w-full transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 selection:bg-primary selection:text-primary-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "field-sizing-content min-h-20 md:min-h-32 border-b bg-transparent text-sm md:text-lg placeholder:text-muted-foreground dark:placeholder:text-foreground focus-visible:border-ring",
        admin:
          "min-h-[120px] bg-white/10 border border-white/10 rounded-md px-4 py-3 text-sm placeholder:opacity-60 focus-visible:ring-1 focus-visible:ring-primary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface TextareaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

function Textarea({ className, variant, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Textarea };
