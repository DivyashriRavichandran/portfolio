"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import LangSwitcher from "./LangSwitcher";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

export default function Navbar() {
  const tl = useRef<gsap.core.Timeline | null>(null);
  const isMenuOpen = useRef(false);
  const isAnimating = useRef(false);

  const navTogglerRef = useRef<HTMLButtonElement | null>(null);
  const navContentRef = useRef<HTMLDivElement | null>(null);

  const linkBlocks = [
    ".nav-socials .line, .nav-legal .line",
    ".nav-primary-links .line",
    ".nav-secondary-links .line",
  ];

  useEffect(() => {
    gsap.registerPlugin(SplitText);

    const splitLinks = SplitText.create(".nav-items .split", {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });

    const navBgs = document.querySelectorAll(".nav-bg");

    tl.current = gsap.timeline({
      paused: true,
      onComplete: () => {
        isAnimating.current = false;
      },
      onReverseComplete: () => {
        gsap.set(linkBlocks.join(", "), { y: "100%" });

        navContentRef.current?.classList.remove("pointer-events-auto");
        navContentRef.current?.classList.add("pointer-events-none");

        isAnimating.current = false;
      },
    });

    tl.current
      .to(navBgs, {
        scaleY: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.inOut",
      })
      .to(
        ".nav-items",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.75,
          ease: "power3.inOut",
        },
        "-=0.6",
      );

    return () => {
      tl.current?.kill();
      splitLinks.revert();
    };
  }, []);

  const animateLinksIn = () => {
    linkBlocks.forEach((selector) => {
      gsap.fromTo(
        selector,
        { y: "100%" },
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.85,
        },
      );
    });
  };

  const handleToggle = () => {
    if (isAnimating.current || !tl.current) return;

    isAnimating.current = true;
    navTogglerRef.current?.classList.toggle("open");

    if (!isMenuOpen.current) {
      navContentRef.current?.classList.remove("pointer-events-none");
      navContentRef.current?.classList.add("pointer-events-auto");

      tl.current.play();
      animateLinksIn();
    } else {
      tl.current.reverse();
    }

    isMenuOpen.current = !isMenuOpen.current;
  };

  const locale = "en";

  return (
    <header className="fixed w-full z-[100] backdrop-blur-lg border-b">
      {/* NAV BAR */}
      <nav className="flex items-center justify-between px-5 py-4 md:py-6 md:container mx-auto pointer-events-auto">
        <div className="text-2xl font-black tracking-tighter uppercase">
          DR.
        </div>

        <div className="flex gap-3 items-center">
          <button
            ref={navTogglerRef}
            onClick={handleToggle}
            className="p-4 flex flex-col gap-1 cursor-pointer"
          >
            <span className="w-6 h-[2px] bg-black" />
            <span className="w-6 h-[2px] bg-black" />
          </button>

          <LangSwitcher />
        </div>
      </nav>

      {/* MENU */}
      <div
        ref={navContentRef}
        className="nav-content text-background pointer-events-none"
      >
        <div className="nav-bg"></div>
        <div className="nav-bg"></div>
        <div className="nav-bg"></div>
        <div className="nav-bg"></div>

        <div className="nav-items flex gap-8 p-32">
          {/* LEFT */}
          <div className="nav-items-col">
            <div className="nav-socials">
              <p className="text-xs uppercase opacity-60 mb-4">Socials</p>
              <a href="#" className="split">
                Github
              </a>
              <a href="#" className="split">
                Linkedin
              </a>
            </div>

            <div className="nav-legal mt-10">
              <p className="text-xs uppercase opacity-60 mb-4">Location</p>
              <a href="#" className="split">
                Groningen, NL
              </a>
              <a href="#" className="split">
                09:30 GMT
              </a>
            </div>
          </div>

          {/* CENTER */}
          <div className="nav-items-col">
            <div className="nav-primary-links">
              <p className="text-xs uppercase opacity-60 mb-4">Menu</p>
              <a href="#" className="split">
                Projects
              </a>
              <a href="#" className="split">
                About
              </a>
              <a href="#" className="split">
                Experience
              </a>
              <a href="#" className="split">
                Contact
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="nav-items-col">
            <div className="nav-secondary-links">
              <p className="text-xs uppercase opacity-60 mb-4">Language</p>

              <div className="flex gap-4">
                <a href="#" className="flex items-center gap-2">
                  <Image src="/uk-flag.png" alt="UK" width={18} height={18} />
                  EN
                </a>

                <span>/</span>

                <a href="#" className="flex items-center gap-2">
                  <Image src="/nl-flag.png" alt="NL" width={18} height={18} />
                  NL
                </a>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-xs uppercase opacity-60 mb-4">Documents</p>
              <a href="#" className="split">
                Resume <span className="text-xs">(Updated 03/2026)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
