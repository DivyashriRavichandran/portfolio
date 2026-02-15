"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Menu, X, Globe } from "lucide-react";
import LangSwitcher from "./LangSwitcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const t = useTranslations();
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(
    () => {
      // Scroll Animation: Shrink navbar and add backdrop blur
      gsap.to(navRef.current, {
        y: 10,
        padding: "8px 20px",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "100px",
        width: "90%",
        maxWidth: "1200px",
        scrollTrigger: {
          start: "top +=50",
          end: "+=1px",
          toggleActions: "play none none reverse",
          scrub: 0.5,
        },
      });
    },
    { scope: navRef },
  );

  const menuItems = ["Work", "About Me", "Skills", "Personal", "Contact"];

  return (
    <header className="fixed top-0 left-0 w-full flex justify-center z-[100] pointer-events-none">
      <nav
        ref={navRef}
        className="w-full flex items-center justify-between py-6 px-10 pointer-events-auto transition-all"
      >
        {/* LOGO */}
        <span className="text-xl font-bold tracking-tighter text-black">
          DR.
        </span>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LangSwitcher />
          </div>

          <Button onClick={() => setIsOpen(true)}>{t("menu")}</Button>
        </div>
      </nav>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="top"
          className="h-svh bg-[#d0fe38] border-none flex flex-col justify-center items-center p-0"
        >
          <div className="flex flex-col items-center gap-6">
            {menuItems.map((item, i) => (
              <button
                key={item}
                onClick={() => setIsOpen(false)}
                className="group relative overflow-hidden"
              >
                <span className="block text-5xl md:text-8xl font-black uppercase tracking-tighter text-[#2F3D00] hover:italic transition-all duration-300">
                  {item}
                </span>
                {/* Hover line effect */}
                <div className="absolute bottom-0 left-0 w-0 h-2 bg-[#2F3D00] group-hover:w-full transition-all duration-500" />
              </button>
            ))}
          </div>

          {/* Footer info in Menu */}
          <div className="absolute bottom-10 w-full px-10 flex justify-between items-end text-[#2F3D00] font-bold uppercase text-sm">
            <div>Available for Work 2026</div>
            <div className="flex gap-6">
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
