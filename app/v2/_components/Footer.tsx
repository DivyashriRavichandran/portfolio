"use client";
import React, { useState } from "react";
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
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const formSchema = z.object({
  firstName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: "", email: "", message: "" },
  });

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
    <footer className="mt-10 md:mt-16">
      <div>
        <div className="grid lg:grid-cols-12 gap-4 md:gap-10">
          {/* LEFT: Connect & Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase leading-tight">
                <span>Let&apos;s </span> <br />{" "}
                <span className="px-1 text-background bg-primary">
                  Connect.
                </span>
              </h2>

              {/* SOCIALS MAP */}
              <div className="mt-8 flex lg:flex-col justify-center gap-3">
                {[
                  {
                    label: "LinkedIn",
                    href: "#",
                    icon: <FaLinkedin size={20} />,
                  },
                  { label: "Github", href: "#", icon: <FaGithub size={20} /> },
                  {
                    label: "Email",
                    href: "mailto:contact@divyashri.nl",
                    icon: <MdEmail size={20} />,
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-primary/5 active:scale-[0.98]"
                  >
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {social.icon}
                    </div>
                    <span className="font-medium text-sm tracking-tight text-foreground/80 transition-colors group-hover:text-primary">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* THE "OR" MESSAGE */}
            <div className="relative py-10 flex items-center gap-4 group md:hidden">
              <div className="h-px grow bg-muted-foreground/20" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-muted-foreground/60 group-hover:text-primary transition-colors">
                OR
              </span>
              <div className="h-px grow bg-muted-foreground/20" />
            </div>

            {/* <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-10 group hidden lg:flex items-center gap-3"
            >
              <div className="size-10 rounded-full border flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all">
                <ArrowUp size={16} />
              </div>
              <span className="text-[10px] uppercase font-semibold tracking-widest opacity-80">
                Go to the Top
              </span>
            </button> */}
          </div>

          {/* RIGHT: The Form */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-sm md:text-base font-semibold uppercase tracking-widest">
                Drop a message
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                Have a specific inquiry or just want to chat about software?
              </p>
            </div>

            <div className="mt-6 bg-muted/20 p-5 md:px-6 md:py-4 border">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 md:space-y-10"
                >
                  <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormControl>
                            <Input placeholder="Name" {...field} />
                          </FormControl>
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
                            <Input placeholder="Email" {...field} />
                          </FormControl>
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
                            <Textarea placeholder="Message" {...field} />
                          </FormControl>
                          <FormMessage className="text-[10px] uppercase" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto mb-4"
                  >
                    {isSubmitting ? "Sending..." : "Send"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>

        {/* Footnote */}
        <div className="mt-12 md:mt-24 py-5 md:py-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase font-semibold tracking-widest opacity-60">
            © 2026 DIVYASHRI&apos;S PORTFOLIO. ALL RIGHTS RESERVED.
          </p>
          <div className="hidden md:flex gap-6 md:gap-8 text-[10px] uppercase font-semibold tracking-widest opacity-60">
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
