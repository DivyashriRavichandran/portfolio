"use client";

import React from "react";
import LangSwitcher from "./LangSwitcher";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Navbar() {
  return (
    <nav className="z-10 backdrop-blur-lg fixed w-svw left-0">
      <div className="border-b flex items-center max-w-4xl justify-between px-5 py-4 mx-auto">
        <div className="text-2xl font-black tracking-tighter uppercase">
          DR.
        </div>
        <div className="flex items-center gap-6">
          <LangSwitcher />
          <AnimatedThemeToggler />
        </div>
      </div>
    </nav>
  );
}
