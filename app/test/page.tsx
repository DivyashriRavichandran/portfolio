"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TestPage() {
  useEffect(() => {
    const layers = gsap.utils.toArray(".parallax-layer") as HTMLElement[];

    layers.forEach((layer, i) => {
      return gsap.to(layer, {
        y: (i + 1) * 100, // deeper layers move more
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <>
      <section className="relative min-h-screen overflow-hidden hero bg-black text-white flex items-center justify-center">
        {/* Background Parallax Layers */}
        <div className="absolute inset-0">
          {/* Layer 1 */}
          <div className="parallax-layer absolute -top-40 -left-40 w-[500px] h-[500px] bg-lime-400/20 rounded-full blur-[120px]" />
          {/* Layer 2 */}
          <div className="parallax-layer absolute top-1/3 right-0 w-[400px] h-[400px] bg-lime-500/20 rounded-full blur-[100px]" />
          {/* Layer 3 */}
          <div className="parallax-layer absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-lime-300/20 rounded-full blur-[140px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 opacity-20">
          <h1 className="text-5xl md:text-base font-bold mb-6">
            Hi, I’m <span className="text-lime-400">Divyashri</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
            Frontend Developer • React Enthusiast • UI/UX Designer
          </p>
        </div>
      </section>

      {/* next section */}
      <section className="my-40 md:container md:mx-auto">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
          ullam! Quis earum culpa, hic id necessitatibus eius, accusantium
          delectus autem eaque ducimus, repellat atque. Expedita beatae dolorum
          quas iure non itaque alias libero perferendis. Quidem minima quam
          dolore dolor obcaecati libero nisi id quis? Vitae quia iste accusamus
          ipsa! Numquam temporibus earum dolorem saepe exercitationem quisquam
          qui! Explicabo inventore tempore reprehenderit dolor dicta suscipit
          sapiente. Doloribus cum, hic alias ex voluptates, nobis magnam
          laudantium sapiente, tenetur voluptas ducimus amet eveniet rem omnis.
          Impedit quos rerum excepturi qui dolore quibusdam cum ab commodi
          expedita! At, officia error amet atque nam pariatur.
        </p>
      </section>
    </>
  );
}
