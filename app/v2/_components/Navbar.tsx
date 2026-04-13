"use client";

import React from "react";
import LangSwitcher from "./LangSwitcher";

export default function Navbar() {
  return (
    <nav className="z-10 backdrop-blur-lg fixed w-svw left-0">
      <div className="border-b flex items-center max-w-4xl justify-between px-5 py-4 mx-auto">
        <div className="text-2xl font-black tracking-tighter uppercase">
          DR.
        </div>

        <LangSwitcher />
      </div>
    </nav>
  );
}
