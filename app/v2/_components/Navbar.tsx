"use client";
import React, { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";
import { ArrowRight, X } from "lucide-react";
import LangSwitcher from "./LangSwitcher";
import { Sheet, SheetContent } from "@/components/ui/sheet";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Navbar() {
  const t = useTranslations();
  const navRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // --- 1. Navbar Scroll Animation ---
  useGSAP(
    () => {
      if (!navRef.current) return;

      gsap.to(navRef.current, {
        marginTop: "12px",
        padding: "8px 16px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "100px",
        // Changed width to 95% to avoid 'auto' calculation bugs
        width: "95%",
        maxWidth: "fit-content",
        scrollTrigger: {
          start: "top +=20",
          end: "+=1px",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: navRef },
  );

  const menuItems = [
    { name: "Work", href: "#works" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full flex justify-center z-[100] pointer-events-none p-6">
      <nav
        ref={navRef}
        className="flex items-center gap-20 justify-between pointer-events-auto transition-all duration-500 ease-out origin-top"
      >
        {/* LOGO */}
        <div className="flex items-center gap-2 px-2">
          <span className="text-lg font-black tracking-tighter uppercase">
            DR.
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <LangSwitcher className="bg-foreground border-none hover:bg-foreground/50 text-[10px] font-bold" />

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#d0fe38] text-black transition-all duration-300 group"
          >
            <span className="text-[10px] uppercase font-black tracking-widest">
              {t("menu")}
            </span>
            <div className="flex flex-col gap-1 w-4">
              <div className="h-[1.5px] w-full bg-black" />
              <div className="h-[1.5px] w-full bg-black" />
            </div>
          </button>
        </div>
      </nav>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="top"
          className="h-svh bg-[#d0fe38] border-none p-0 outline-none overflow-hidden"
        >
          {/* Close Button Container */}
          <div className="absolute top-0 left-0 w-full p-6 flex justify-center z-50">
            <div className="w-full max-w-7xl flex justify-end px-4">
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#2F3D00] text-[#d0fe38] transition-transform active:scale-95"
              >
                <span className="text-[10px] uppercase font-black tracking-widest">
                  Close
                </span>
                <X size={18} strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col justify-center items-center h-full gap-2 relative z-10">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-4 py-2 hover:scale-105 transition-transform duration-300"
              >
                <span className="text-[12vw] md:text-[8vw] font-black uppercase leading-none tracking-tighter text-[#2F3D00] group-hover:italic transition-all duration-300">
                  {item.name}
                </span>
                <ArrowRight className="size-10 md:size-20 text-[#2F3D00] opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-[0.05] select-none pointer-events-none">
            <h2 className="text-[40vw] font-black text-[#2F3D00]">MENU</h2>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
