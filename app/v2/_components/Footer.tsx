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
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

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
    <footer className="mt-10 pt-12 md:pt-24 pb-6 md:pb-12 border-t">
      <div>
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT: Connect & Info */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase leading-tight">
                <span>Let&apos;s </span> <br />{" "}
                <span className="px-1 text-background bg-primary">
                  Connect.
                </span>
              </h2>
              <div className="mt-6 md:mt-12 space-y-6 md:space-y-8 md:flex md:justify-between lg:flex-col">
                <div>
                  <span className="text-[10px] uppercase font-semibold opacity-80 tracking-[0.2em] block mb-2">
                    Socials
                  </span>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="p-2 md:p-4 rounded-full border hover:bg-primary hover:text-background transition-all"
                    >
                      <FaLinkedin size={22} />
                    </a>
                    <a
                      href="#"
                      className="p-2 md:p-4 rounded-full border hover:bg-primary hover:text-background transition-all"
                    >
                      <FaGithub size={22} />
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

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-4 md:mt-10 group hidden md:flex items-center gap-3"
            >
              <div className="size-10 rounded-full border flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all">
                <ArrowUp size={16} />
              </div>
              <span className="text-[10px] uppercase font-semibold tracking-widest opacity-80">
                Go to the Top
              </span>
            </button>
          </div>

          {/* RIGHT: The Form */}
          <div className="lg:col-span-8 bg-foreground/5 p-6 md:p-8 rounded border backdrop-blur-sm">
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
                  className="w-full md:w-auto font-semibold"
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
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 md:hidden"
          >
            <div className="size-8 rounded-full border flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all">
              <ArrowUp size={16} />
            </div>
            <span className="text-[10px] uppercase font-semibold tracking-widest opacity-50">
              Go to the Top
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
