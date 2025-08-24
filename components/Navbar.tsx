"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";

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

interface NavItem {
  name: string;
  href: string;
  isActive: boolean;
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "Home", href: "#home", isActive: activeSection === "home" },
    { name: "Projects", href: "#works", isActive: activeSection === "works" },
    { name: "About Me", href: "#about", isActive: activeSection === "about" },
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

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navbarVariants: Variants = {
    hidden: { y: "-100%" },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 14,
        duration: 0.6,
      },
    },
  };

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

  return (
    <>
      {/* MOBILE */}
      <motion.nav
        className={`lg:hidden fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4   ${
          scrolled ? "py-3" : "py-4"
        } backdrop-blur-lg `}
      >
        <div className="flex items-center justify-between">
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
              <SheetContent className="w-[60%] overflow-hidden">
                <VisuallyHidden>
                  <SheetTitle />
                </VisuallyHidden>
                <div className="-z-20 absolute left-0 bottom-20 rounded-full size-32 bg-gradient-to-br from-primary to-secondary blur-[150px]"></div>
                <div className="-z-20 absolute right-0 top-0 rounded-full size-20 bg-gradient-to-br from-primary to-secondary blur-[80px]"></div>

                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      className="relative"
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                    >
                      <button
                        className={`w-full text-left px-6 py-3 font-medium ${
                          item.isActive
                            ? "bg-card text-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                        }`}
                        onClick={() => handleNavClick(item.href)}
                      >
                        {item.name}
                      </button>
                    </motion.div>
                  ))}
                </div>
                <Button
                  className="absolute gap-2 justify-between flex bottom-0 left-0 w-full px-5 py-4 rounded-none"
                  onClick={() => handleNavClick("#contact")}
                >
                  Let&apos;s Connect
                  <ArrowRight />
                </Button>
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
                  className={`cursor-pointer transition-colors text overflow-hidden text-[16px] leading-[24px] h-[24px]  ${
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
              onClick={() => handleNavClick("#contact")}
              className="z-20 ml-auto"
            >
              Let&apos;s Connect
            </Button>
          </div>
        </div>

        {/* Floating Theme Toggle */}
        <div className="z-20 absolute top-4 right-10">
          <ThemeToggle />
        </div>
      </motion.nav>
    </>
  );
}
