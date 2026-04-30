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
  Dices,
  Bike,
} from "lucide-react";
import H1 from "../../../components/headings/H1";
import { useTranslations } from "next-intl";
import Navbar from "../_components/Navbar";
import H3 from "@/components/headings/H3";
import H4 from "@/components/headings/H4";
import H2 from "@/components/headings/H2";

export default function AboutPage() {
  const t = useTranslations();

  const favs = [
    { label: "Language", value: "TypeScript", icon: Code2 },
    { label: "Editor", value: "VS Code", icon: Cpu },
    { label: "Tool", value: "Raycast", icon: Layers },
    { label: "Productivity", value: "Obsidian", icon: NotebookPen },
    { label: "Drink", value: "Matcha", icon: Coffee },
    { label: "Video Game", value: "TLOU Part II", icon: Gamepad2 },
    { label: "Film", value: "Gifted", icon: Film },
    { label: "Podcast", value: "Syntax", icon: Mic },
    { label: "Board Game", value: "Werewolf", icon: Mic },
  ];

  const hardware = [
    { label: "Laptop", value: "Macbook Pro M5", icon: Laptop },
    { label: "Monitor", value: "LG 27” 4K", icon: Monitor },
    { label: "Mouse", value: "MX Master 3S", icon: MousePointer2 },
    { label: "Keyboard", value: "MX Mechanical Mini", icon: Keyboard },
    { label: "Headphones", value: "Sennheiser HD 348BT", icon: Headphones },
    { label: "Speaker", value: "Bose Soundlink Flex 2", icon: Speaker },
  ];

  const hobbies = [
    {
      value: "Tabletop and board games",
      icon: Dices,
    },
    {
      value: "Cycling around the city",
      icon: Bike,
    },
    {
      value: "Learning Dutch (A2+)",
      icon: Book,
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
          {/* When I’m not coding, you’ll probably find me practicing my Dutch or
          wandering around the city in my bike. I like to keep things minimal,
          from the hardware on my desk to the habits I’m building. This is just
          a glimpse into the tools I use and the stuff I'm into right now. */}
          Als ik niet aan het coderen ben, zul je mij waarschijnlijk mijn
          Nederlands zien oefenen of op de fiets door de stad dwalen. Ik hou
          ervan om dingen minimaal te houden, van de hardware op mijn bureau tot
          de gewoonten die ik aan het opbouwen ben. Dit is slechts een glimp van
          de tools die ik gebruik en de dingen waar ik nu mee bezig ben.
        </p>
      </div>

      {/* FAVORITES */}
      <section>
        <H2 text1="My" text2="Favourites" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favs.map((fav) => (
            <FavoriteCard key={fav.label} item={fav} />
          ))}
        </div>
      </section>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* SETUP */}
        <section>
          <H2 text1="Desk" text2="Setup" />
          <div className="flex flex-col gap-4">
            {hardware.map((item) => (
              <div
                key={item.value}
                className="group flex items-center justify-between border-b border-white/10 py-2 transition-all duration-300 hover:border-primary/50 hover:pl-2"
              >
                <div className="flex items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  <item.icon size={16} className="shrink-0" />
                  <span className="text-xs uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>

                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </section>
        {/* HOBBIES */}
        <section>
          <H2 text1="My" text2="Hobbies" />
          <div className="flex flex-col gap-4">
            {hobbies.map((hobby) => (
              <FavoriteCard key={hobby.value} item={hobby} />
            ))}
          </div>
        </section>
      </div>

      {/* MUSIC  */}
      <section>
        <H2 text1="Currently" text2="Listening" />
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
  label?: string;
  icon: LucideIcon;
  value: string;
};

const FavoriteCard = ({ item }: { item: Item }) => (
  <div className="group border bg-muted/20 border-foreground/10 p-4 rounded transition-all hover:border-primary hover:bg-muted/30">
    {item.label && (
      <p className="text-[10px] uppercase font-medium tracking-widest text-muted-foreground/80">
        {item.label}
      </p>
    )}
    <div className="mt-1 flex items-center gap-2">
      <item.icon size={16} className="text-primary" />
      <span className="text-sm font-medium">{item.value}</span>
    </div>
  </div>
);
