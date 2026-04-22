"use client";
import {
  Cpu,
  Music,
  Gamepad2,
  Star,
  Monitor,
  MousePointer2,
  Keyboard,
  Headphones,
  Code2,
  Coffee,
  Film,
  Laptop,
  Speaker,
  Piano,
  Book,
  NotebookPen,
  Layers,
  Mic,
  Hammer,
  LucideIcon,
} from "lucide-react";
import H1 from "../../../components/headings/H1";
import { useTranslations } from "next-intl";
import Navbar from "../_components/Navbar";
import H3 from "@/components/headings/H3";

export default function AboutPage() {
  const t = useTranslations();

  const favs = [
    { label: "Language", value: "TypeScript", icon: Code2 },
    { label: "Editor", value: "VS Code", icon: Cpu },
    { label: "Tool", value: "Raycast", icon: Layers },
    { label: "Productivity", value: "Obsidian", icon: NotebookPen },
    { label: "Drink", value: "Matcha", icon: Coffee },
    { label: "Game", value: "TLOU Part II", icon: Gamepad2 },
    { label: "Film", value: "Gifted", icon: Film },
    { label: "Podcast", value: "Syntax", icon: Mic },
  ];

  const hardware = [
    { label: "Laptop", value: "Macbook Pro M5", icon: Laptop },
    { label: "Monitor", value: "LG 27” 4K", icon: Monitor },
    { label: "Mouse", value: "MX Master 3S", icon: MousePointer2 },
    { label: "Keyboard", value: "MX Mechanical Mini", icon: Keyboard },
    { label: "Headphones", value: "Sennheiser HD 600", icon: Headphones },
    { label: "Speaker", value: "Bose Soundlink", icon: Speaker },
  ];

  const hobbies = [
    {
      label: "Language",
      value: "Learning Dutch (A2 Level)",
      icon: Book,
    },
    {
      label: "Music",
      value: "Piano/Keyboard (Arrangers)",
      icon: Piano,
    },
    {
      label: "Building",
      value: "Side Projects",
      icon: Hammer,
    },
  ];

  const spotifyLinks = [
    "https://open.spotify.com/track/40XiAOitWuV9bJKh4DHHpB?si=627bf10f217b4aa1",
    "https://open.spotify.com/track/2u6twH8SHtv37ctUqQ4iEX?si=02b3f1def55f49c0",
    "https://open.spotify.com/track/2nzfebt7eoKpUNNsDVWJ1Y?si=2d2269fb9a544e94",
    "https://open.spotify.com/track/1xOqGUkyxGQRdCvGpvWKmL?si=d0323cfc16bf4321",
  ];

  return (
    <main className="md:max-w-4xl md:mx-auto px-5 lg:px-0 pb-20 space-y-10 md:space-y-16">
      <Navbar />

      {/* HEADER SECTION */}
      <div className="pt-32 md:pt-32 space-y-4">
        <H1 text1="Beyond the" text2="Code" />
        <p className="text-lg md:text-xl leading-relaxed">
          When Im not coding... This is a curated list of the tools, media, and
          habits that shape my daily life.
        </p>
      </div>

      {/* FAVORITES */}
      <section>
        <H3 icon={Cpu} text="My Favourites" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favs.map((fav) => (
            <FavoriteCard key={fav.label} item={fav} />
          ))}
        </div>
      </section>

      {/* SETUP */}
      <section>
        <H3 icon={Cpu} text="My Setup" />
        <div className="grid grid-cols-2 gap-4">
          {hardware.map((item) => (
            <FavoriteCard key={item.label} item={item} />
          ))}
        </div>
      </section>

      {/* HOBBIES */}
      <section>
        <H3 icon={Star} text="My Hobbies" />
        <div className="grid grid-cols-2 gap-4">
          {hobbies.map((hobby) => (
            <FavoriteCard key={hobby.label} item={hobby} />
          ))}
        </div>
      </section>

      {/* MUSIC  */}
      <section>
        <H3 icon={Music} text="Currently listening" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {spotifyLinks.map((link) => {
            const embedLink = link.replace(
              "spotify.com/",
              "spotify.com/embed/",
            );

            return (
              <iframe
                key={link}
                src={embedLink}
                width="100%"
                height="80"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: "16px" }}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

type Item = {
  label: string;
  icon: LucideIcon;
  value: string;
};

const FavoriteCard = ({ item }: { item: Item }) => (
  <div className="group border bg-muted/20 border-foreground/10 p-4 rounded transition-all hover:border-primary hover:bg-muted/30">
    <p className="text-[10px] uppercase font-medium tracking-widest text-muted-foreground/80">
      {item.label}
    </p>
    <div className="mt-1 flex items-center gap-2">
      <item.icon size={16} className="text-primary" />
      <span className="text-sm font-medium">{item.value}</span>
    </div>
  </div>
);
