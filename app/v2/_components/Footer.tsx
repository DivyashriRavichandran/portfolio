"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Linkedin, Github, ArrowUp } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";

const formSchema = z.object({
  firstName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const container = useRef(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", email: "", message: "" },
  });

  useGSAP(
    () => {
      gsap.from(".contact-line", {
        width: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: { trigger: container.current, start: "top 70%" },
      });
    },
    { scope: container },
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: values.firstName,
          email: values.email,
          message: values.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );
      toast.success("Message sent successfully!");
      form.reset();
    } catch (error) {
      toast.error("Failed to send message.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      ref={container}
      className="relative w-full bg-background pt-24 pb-12 px-6 md:px-16 overflow-hidden border-t border-foreground/5"
    >
      {/* Background Watermark */}
      <div className="absolute bottom-[-2%] left-[-2%] pointer-events-none select-none opacity-[0.03]">
        <h2 className="text-[40vw] font-black leading-none tracking-tighter">
          DIVYASHRI.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* LEFT: Connect & Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-6xl font-semibold tracking-tight uppercase leading-tight">
                <span>Let&apos;s </span> <br />{" "}
                <span className="px-1 text-black/90 bg-primary">Connect.</span>
              </h2>
              <div className="mt-12 space-y-8 md:flex md:justify-between lg:flex-col">
                <div>
                  <span className="text-[10px] uppercase font-semibold opacity-80 tracking-[0.2em] block mb-2">
                    Socials
                  </span>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="p-4 rounded-full border border-foreground/10 hover:bg-primary hover:text-black transition-all"
                    >
                      <Linkedin size={22} />
                    </a>
                    <a
                      href="#"
                      className="p-4 rounded-full border border-foreground/10 hover:bg-primary hover:text-black transition-all"
                    >
                      <Github size={22} />
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-semibold opacity-80 tracking-[0.2em] block mb-2">
                    Email
                  </span>
                  <a
                    href="mailto:contact@divyashri.nl"
                    className="md:text-xl hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    contact@divyashri.nl <ArrowUpRight size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-10 lg:mt-8 flex items-center gap-8">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex items-center gap-3"
              >
                <div className="size-10 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                  <ArrowUp size={18} />
                </div>
                <span className="text-[10px] uppercase font-semibold tracking-widest opacity-80">
                  Go to the Top
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT: The Form */}
          <div className="lg:col-span-7 bg-foreground/5 p-6 md:p-12 rounded-lg md:rounded-3xl border backdrop-blur-sm">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 md:space-y-10"
              >
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            placeholder="Name"
                            className="border-none bg-transparent px-0 py-4 md:text-xl focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                        <div className="contact-line absolute bottom-0 left-0 h-px bg-foreground/40 w-full" />
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            placeholder="Email"
                            className="border-none bg-transparent px-0 py-4 md:text-xl focus-visible:ring-0"
                            {...field}
                          />
                        </FormControl>
                        <div className="contact-line absolute bottom-0 left-0 h-px bg-foreground/40 w-full" />
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2 relative">
                        <FormControl>
                          <Textarea
                            placeholder="Message"
                            className="min-h-30 border-none bg-transparent px-0 py-4 md:text-xl focus-visible:ring-0 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <div className="contact-line absolute bottom-0 left-0 h-px bg-foreground/40 w-full" />
                        <FormMessage className="text-[10px] uppercase" />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto py-5 md:py-7 px-8 md:px-10 rounded-full bg-primary font-semibold uppercase tracking-widest hover:scale-105 transition-all"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Footnote */}
        <div className="mt-12 md:mt-24 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase font-semibold tracking-[0.2em] opacity-50">
            © 2026 DIVYASHRI. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 md:gap-8 text-[10px] uppercase font-semibold tracking-[0.2em] opacity-50">
            <a href="#about" className="hover:opacity-100 transition-opacity">
              About
            </a>
            <a href="#works" className="hover:opacity-100 transition-opacity">
              Works
            </a>
            <SignedIn>
              <Link
                href="/admin"
                className="hover:opacity-100 transition-opacity"
              >
                Admin
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
