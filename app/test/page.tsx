"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const TestPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center md:mx-auto md:container px-4">
        {/* HEADER */}
        <div className="flex flex-col gap-2 my-10 mx-auto text-xl font-bold">
          <div>Default TestPage</div>
          <div className="text-center text-lg text-muted-foreground">
            Subtext TestPage
          </div>
        </div>

        {/* COLOR PALETTES */}
        <div className="flex gap-5 mx-auto">
          <div className="rounded-full size-10 bg-primary" />
          <div className="rounded-full size-10 bg-primary-light" />
          <div className="rounded-full size-10 bg-primary-dark" />
          <div className="rounded-full size-10 bg-primary-foreground border border-white" />
        </div>
        <div className="mt-5 flex gap-5 mx-auto">
          <div className="rounded-full size-10 bg-secondary" />
          <div className="rounded-full size-10 bg-secondary-light" />
          <div className="rounded-full size-10 bg-secondary-dark" />
          <div className="rounded-full size-10 bg-secondary-foreground border border-white" />
        </div>

        {/* CARD PREVIEW */}
        <div className="my-10 bg-card text-card-foreground size-40 rounded-lg mx-auto justify-center items-center flex">
          This is a card
        </div>

        {/* BUTTON PREVIEWS */}
        <div className="flex gap-5 mx-auto">
          <Button className="w-fit">Click me</Button>
          <Button variant="outline" className="w-fit">
            Click me
          </Button>
        </div>
      </div>
    </>
  );
};

export default TestPage;
