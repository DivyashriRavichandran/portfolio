"use client";

import React from "react";
import { AnimatedThemeToggler } from "@/components/custom/animated-theme-toggler";
import Link from "next/link";
import LangSwitcher from "../custom/LangSwitcher";

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background backdrop-blur-md">
      <div className="md:mx-auto flex max-w-3xl items-center justify-between px-6 lg:px-0 py-4 md:py-5">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-tighter uppercase transition-opacity hover:opacity-90"
        >
          DR.
        </Link>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <LangSwitcher />
          <AnimatedThemeToggler />
        </div>
      </div>
    </nav>
  );
}
