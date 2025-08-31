"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Variants } from "framer-motion";
import Confetti from "react-confetti";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

interface NavItem {
  name: string;
  href: string;
  isActive: boolean;
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const navItems: NavItem[] = [
    { name: "Home", href: "#home", isActive: activeSection === "home" },
    { name: "Projects", href: "#works", isActive: activeSection === "works" },
    { name: "About", href: "#about", isActive: activeSection === "about" },
    {
      name: "Skills",
      href: "#tech-stack",
      isActive: activeSection === "tech-stack",
    },
    {
      name: "Beyond Work",
      href: "#personal",
      isActive: activeSection === "personal",
    },
  ];

  useEffect(() => {
    const sections = [
      "home",
      "works",
      "about",
      "tech-stack",
      "personal",
      "contact",
    ];

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 } // Adjust this value to change when the section is considered "in view"
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        sectionObserver.observe(element);
      }
    });

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          sectionObserver.unobserve(element);
        }
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  const navbarVariants: Variants = {
    hidden: { y: "-100%" },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 14,
        duration: 0.4,
      },
    },
  };

  // ROLLING TEXT ANIMATION
  useEffect(() => {
    const elements = document.querySelectorAll(".text");

    elements.forEach((element) => {
      // 🛑 If already processed, skip
      if (element.querySelector(".block")) return;

      const innerText = element.textContent || "";
      element.innerHTML = "";

      const textContainer = document.createElement("div");
      textContainer.classList.add("block");

      for (const letter of innerText) {
        const span = document.createElement("span");
        span.innerText = letter.trim() === "" ? "\xa0" : letter;
        span.classList.add("letter");
        textContainer.appendChild(span);
      }

      element.appendChild(textContainer);
      element.appendChild(textContainer.cloneNode(true));
    });
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const handleContactButtonClick = () => {
    handleNavClick("#contact");
    setShowConfetti(true);
  };

  return (
    <>
      {/* MOBILE */}
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="lg:hidden fixed top-0 left-0 w-full z-50"
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 px-4   ${
            scrolled ? "py-3" : "py-4"
          } backdrop-blur-lg `}
        >
          <Link href="#home" className="text-2xl font-bold">
            DR.
          </Link>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-6 stroke-[1.5px]" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[100%] overflow-hidden flex flex-col justify-between">
                <VisuallyHidden>
                  <SheetTitle />
                </VisuallyHidden>

                {/* Background blobs */}
                <div className="-z-20 absolute left-0 bottom-20 rounded-full size-32 bg-gradient-to-br from-primary to-secondary blur-[150px]" />
                <div className="-z-20 absolute right-0 top-0 rounded-full size-20 bg-gradient-to-br from-primary to-secondary blur-[80px]" />

                {/* Nav links */}
                <div className="flex flex-col mt-20 gap-4 px-16 text-2xl">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      className="w-full"
                    >
                      <button
                        className={`w-full flex items-center justify-between py-3 transition-all duration-300 
                          ${
                            item.isActive
                              ? "text-foreground font-semibold"
                              : "text-muted-foreground/70"
                          }`}
                        onClick={() => handleNavClick(item.href)}
                      >
                        {item.name}
                        <ChevronRight className="size-7" />
                      </button>
                    </motion.div>
                  ))}
                  <Button
                    className="mt-10 gap-2 w-full"
                    onClick={() => handleNavClick("#contact")}
                  >
                    Let&apos;s Connect
                    <ArrowRight />
                  </Button>
                </div>

                {/* Footer with socials */}
                <div className="flex justify-center gap-6 px-6 py-6 border-t">
                  <Link
                    href={"https://github.com/DivyashriRavichandran"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground"
                  >
                    <FaGithub size={28} />
                  </Link>
                  <Link
                    href={"https://www.linkedin.com/in/divyashri-ravichandran/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground"
                  >
                    <FaLinkedin size={28} />
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>

      {/* DESKTOP */}
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="hidden lg:inline fixed top-0 w-full z-50"
      >
        <div className="mt-4 lg:max-w-3xl xl:max-w-5xl mx-auto transition-all duration-300 border rounded-full p-1 backdrop-blur-lg bg-gradient-to-r from-transparent via-muted/80 to-transparent">
          <div className="relative flex items-center">
            {/* Left: Logo */}
            <div className="flex-shrink-0 ml-4 text-2xl font-bold">DR.</div>

            {/* Center: Nav Items */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-3 xl:space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className={`cursor-pointer transition-colors text overflow-hidden text-[16px] leading-[24px] tracking-tight h-[24px]  ${
                    item.isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>

            {/* Right: Button */}
            <Button
              variant={"outline"}
              onClick={() => handleContactButtonClick()}
              className="z-20 ml-auto"
            >
              Let&apos;s Connect
            </Button>
          </div>
        </div>

        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false} // confetti falls once
            numberOfPieces={200} // adjust amount
            tweenDuration={1000} // adjust duration
            onConfettiComplete={() => setShowConfetti(false)}
          />
        )}
        {/* Floating Theme Toggle */}
        <div className="z-20 absolute top-4 right-10">
          <ThemeToggle />
        </div>
      </motion.nav>
    </>
  );
}
