"use client";

import React from "react";
import LangSwitcher from "./LangSwitcher";

export default function Navbar() {
  return (
    <nav className="backdrop-blur-lg border-b fixed w-4xl flex items-center justify-between px-5 py-4 md:mx-auto">
      <div className="text-2xl font-black tracking-tighter uppercase">DR.</div>

      <LangSwitcher />
    </nav>
  );
}
