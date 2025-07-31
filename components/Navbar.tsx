"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
    { name: "Works", href: "#works", isActive: activeSection === "works" },
    { name: "About", href: "#about", isActive: activeSection === "about" },
    {
      name: "Tech Stack",
      href: "#tech-stack",
      isActive: activeSection === "tech-stack",
    },
    {
      name: "Personal",
      href: "#personal",
      isActive: activeSection === "personal",
    },
    {
      name: "Contact",
      href: "#contact",
      isActive: activeSection === "contact",
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
  const itemVariants = {
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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300   ${
        scrolled ? "py-3" : "py-4"
      } bg-background backdrop-blur-sm `}
    >
      <div className="md:container md:mx-auto px-4">
        <div className="flex items-center justify-between md:justify-center">
          <Link href="#home" className="md:hidden text-2xl font-bold">
            DR.
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative flex items-center justify-center space-x-1 rounded-full bg-card px-2 py-1.5 backdrop-blur">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    item.isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {/* Animated background blob */}
                  {item.isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 z-0 rounded-full bg-muted-foreground/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {/* Text stays visible on top */}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}
            </div>
            <ThemeToggle />
          </div>

          {/* MOBILE */}
          <div className="flex items-center space-x-3 md:hidden">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[60%]">
                <VisuallyHidden>
                  <SheetTitle />
                </VisuallyHidden>
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
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
