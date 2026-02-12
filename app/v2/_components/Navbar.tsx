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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Variants } from "framer-motion";
import Confetti from "react-confetti";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import LangSwitcher from "./LangSwitcher";
interface NavItem {
  name: string;
  href: string;
  isActive: boolean;
}

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations();

  const [activeSection, setActiveSection] = useState<string>("home");
  const [open, setOpen] = useState(false);
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
      { threshold: 0.2 }, // Adjust this value to change when the section is considered "in view"
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
      {/* DESKTOP */}
      <nav className="hidden lg:flex top-0 w-full justify-between z-50 py-6 px-10">
        <h1 className="text-4xl font-semibold">DR. </h1>
        <div className="flex items-center gap-2 md:gap-3">
          <LangSwitcher />

          <Button onClick={() => setOpen(true)} className="uppercase">
            {t("menu")}
          </Button>
        </div>
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="h-[400px] px-10 py-14 bg-primary rounded-4xl rounded-tr-none text-black font-medium text-4xl flex flex-col justify-center items-start">
          <span className="text-base">09:23 CET</span>
          {/* MENU ITEMS */}
          <div className="flex flex-col gap-4 mt-4">
            <span className="">Work</span>
            <span className="">About Me</span>
            <span className="">Skills</span>
            <span className="">Projects</span>
            <span className="">Contact</span>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
