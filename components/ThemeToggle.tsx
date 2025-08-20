"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full bg-card backdrop-blur-sm hover:bg-card/80 cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun className="size-4 md:size-5 text-yellow-300" />
      ) : (
        <Moon className="size-4 md:size-5 text-zinc-700" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
