"use client";
import React, { useState } from "react";
import { Loader2, HelpCircleIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import H2 from "@/components/headings/H2";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { icons } from "lucide-react";
import H1 from "@/components/headings/H1";

const SpotifyPlayer = ({ link }: { link: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const embedLink = link.replace("spotify.com/", "spotify.com/embed/");

  return (
    <div className="relative w-full h-20">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 animate-pulse rounded-2xl border border-white/5">
          <Loader2 className="w-5 h-5 animate-spin text-primary/80" />
        </div>
      )}
      <iframe
        src={embedLink}
        width="100%"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        style={{ borderRadius: "16px", border: "none" }}
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      />
    </div>
  );
};

export default function AboutPage() {
  const t = useTranslations();
  const locale = useLocale() as "en" | "nl";
  const about = useQuery(api.about.get);

  // Loading state handling
  if (about === undefined || about === null) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Safe fallbacks
  const favourites = about.favourites || [];
  const hardware = about.hardware || [];
  const playlists = about.spotify_playlist || [];

  return (
    <main className="space-y-8 md:space-y-14">
      <div className="space-y-4">
        <H1 text1={t("more-about")} text2={t("me")} />
        <p className="md:text-xl">{about.more_bio?.[locale]}</p>
      </div>

      {favourites.length > 0 && (
        <section>
          <H2 text1={t("my")} text2={t("favourites")} />
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
            {favourites.map((fav, index) => (
              <FavoriteCard key={fav.title + index} item={fav} />
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {hardware.length > 0 && (
          <section>
            <H2 text1={t("desk")} text2="Setup" />
            <div className="flex flex-col gap-4">
              {hardware.map((item, index) => {
                const IconComponent =
                  icons[item.icon as keyof typeof icons] || HelpCircleIcon;
                return (
                  <div
                    key={item.product + index}
                    className="group flex items-center justify-between border-b border-white/10 py-2 transition-all duration-300 hover:border-primary/50 hover:pl-2"
                  >
                    <div className="flex items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                      <IconComponent size={16} className="shrink-0" />
                      <span className="text-xs uppercase tracking-widest">
                        {item.title[locale]}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{item.product}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {playlists.length > 0 && (
          <section>
            <H2 text1={t("currently")} text2={t("listening")} />
            <div className="grid gap-4">
              {playlists.map((link) => (
                <SpotifyPlayer key={link} link={link} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

type FavItem = {
  icon: string;
  title: string;
  desc: string;
};

const FavoriteCard = ({ item }: { item: FavItem }) => {
  const IconComponent =
    icons[item.icon as keyof typeof icons] || HelpCircleIcon;

  return (
    <div className="group bg-muted p-3 md:p-4 rounded transition-all hover:border-primary">
      <p className="text-[10px] uppercase font-medium tracking-widest text-muted-foreground/80">
        {item.title}
      </p>
      <div className="mt-1 flex items-center gap-2">
        <IconComponent size={16} className="size-3.5 md:size-4 text-primary" />
        <span className="text-sm font-medium">{item.desc}</span>
      </div>
    </div>
  );
};
