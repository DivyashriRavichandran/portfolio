"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

export default function Navbar() {
  const tl = useRef<gsap.core.Timeline | null>(null);
  const isMenuOpen = useRef(false);
  const isAnimating = useRef(false);
  const navTogglerRef = useRef<HTMLButtonElement | null>(null);
  const navContentRef = useRef<HTMLDivElement | null>(null);

  // Define the link blocks (moved outside for accessibility)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const linkBlocks = [
    ".nav-socials .line, .nav-legal .line", // Bottom-left
    ".nav-primary-links .line", // Center
    ".nav-secondary-links .line, .nav-secondary-links button .line", // Right side
  ];

  useEffect(() => {
    // 2. Register Plugin only on the client
    gsap.registerPlugin(SplitText);

    // 3. Initialize SplitText
    const splitLinks = SplitText.create(".nav-items a", {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });

    // 4. Build the GSAP Timeline
    const navBgs = document.querySelectorAll(".nav-bg");

    tl.current = gsap.timeline({
      paused: true,
      onComplete: () => {
        isAnimating.current = false;
      },
      onReverseComplete: () => {
        gsap.set(linkBlocks.join(", "), { y: "100%" });
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

    // Cleanup: Kill timeline and revert SplitText when component unmounts
    return () => {
      tl.current?.kill();

      splitLinks.revert();
    };
  }, [linkBlocks]);

  // 5. Action functions
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

    // Toggle the 'open' class on the button ref
    navTogglerRef.current?.classList.toggle("open");

    if (!isMenuOpen.current) {
      navContentRef.current?.classList.add("pointer-events-auto");
      tl.current.play();
      animateLinksIn();
    } else {
      tl.current.reverse();
    }
    isMenuOpen.current = !isMenuOpen.current;
  };

  // Update your GSAP timeline in useEffect to handle pointer-events on reverse
  tl.current = gsap.timeline({
    paused: true,
    onComplete: () => {
      isAnimating.current = false;
    },
    onReverseComplete: () => {
      gsap.set(linkBlocks.join(", "), { y: "100%" });

      // Disable interaction when menu is fully hidden
      navContentRef.current?.classList.remove("pointer-events-auto");
      isAnimating.current = false;
    },
  });
  const locale = "en";

  return (
    <header>
      <nav className="fixed w-full flex items-center gap-20 justify-between pointer-events-auto transition-all duration-500 ease-out origin-top p-4 z-100">
        <div className="logo">
          <div className="text-2xl font-black tracking-tighter uppercase text-foreground">
            DR.
          </div>
        </div>
        <button
          ref={navTogglerRef}
          onClick={handleToggle}
          className="nav-toggler p-4 cursor-pointer bg-none flex flex-col justify-center items-center gap-1"
        >
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className="nav-content">
        <div className="nav-bg"></div>
        <div className="nav-bg"></div>
        <div className="nav-bg"></div>
        <div className="nav-bg"></div>

        <div className="nav-items flex gap-8 bg-primary-dark p-32">
          <div className="nav-items-col">
            <div className="nav-socials">
              <p className="text-xs opacity-50 uppercase mb-4">Socials</p>
              <a href="#">Github</a>
              <a href="#">Linkedin</a>
            </div>
            <div className="nav-legal">
              <p className="text-xs opacity-50 uppercase mb-2">Location</p>
              <a href="#">Groningen, NL</a>
              <a href="#">09:30 GMT</a>
            </div>
          </div>
          <div className="nav-items-col">
            <div className="nav-primary-links">
              <p className="text-xs opacity-50 uppercase mb-4">Menu</p>
              <a href="#">Projects</a>
              <a href="#">About</a>
              <a href="#">Experience</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <div className="nav-items-col">
            <div className="nav-secondary-links">
              <p className="text-xs opacity-50 uppercase mb-4">Language</p>
              <div className="flex items-center gap-4 font-medium">
                {/* EN Button */}
                <a
                  href=""
                  className={`group relative flex items-center gap-2 ${locale === "en" ? "opacity-100" : "opacity-50"}`}
                >
                  <Image src="/uk-flag.png" alt="UK" width={18} height={18} />
                  <span className="inline-block">EN</span>
                  <div
                    className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-500 ${locale === "en" ? "w-full" : "w-0 group-hover:w-full origin-right"}`}
                  />
                </a>

                <span className="opacity-30">/</span>

                {/* NL Button */}
                <a
                  href=""
                  className={`flex items-center gap-2 ${locale !== "en" ? "opacity-100" : "opacity-50"}`}
                >
                  <Image src="/nl-flag.png" alt="NL" width={18} height={18} />
                  <span className="">NL</span>
                  <div
                    className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-500 ${locale !== "en" ? "w-full" : "w-0 group-hover:w-full origin-right"}`}
                  />
                </a>
              </div>
            </div>
            <div className="nav-secondary-links">
              <p className="text-xs opacity-50 uppercase mb-2">Documents</p>
              <a href="#" className="flex items-baseline">
                <span>Resume</span>
                <span className="text-xs opacity-50 ml-2">
                  (Updated 03/2026)
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
