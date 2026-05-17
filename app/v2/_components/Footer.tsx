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
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { ArrowUpIcon, ArrowUpRight } from "lucide-react";

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
    <footer className="mt-10">
      <div className="grid lg:grid-cols-12 gap-12">
        {/* LEFT: Connect & Socials */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
              <span>Let&apos;s </span> <br />{" "}
              <span className="px-1 text-primary-foreground bg-primary">
                Connect.
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Socials
            </h3>
            <div className="flex flex-col gap-4">
              {[
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/yourprofile",
                  icon: FaLinkedin,
                },
                {
                  label: "Github",
                  href: "https://github.com/yourusername",
                  icon: FaGithub,
                },
                {
                  label: "Email",
                  href: "mailto:contact@divyashri.nl",
                  icon: FaEnvelope,
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-muted py-2 transition-colors hover:border-primary"
                >
                  <span className="group-hover:text-primary flex items-center gap-2 text-lg font-medium group-hover:translate-x-1 transition-transform duration-300">
                    <social.icon size={20} />
                    {social.label}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all duration-300"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: The Form */}
        <div className="lg:col-span-8">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Inquiry
            </h3>
            <p className="mt-2 md:text-lg">
              Have a specific inquiry or just want to chat about software?
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          {...field}
                          className="border-t-0 border-x-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors bg-transparent h-12 text-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email Address"
                          {...field}
                          className="border-t-0 border-x-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors bg-transparent h-12 text-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormControl>
                        <Textarea
                          placeholder="How can I help you?"
                          {...field}
                          className="min-h-30 border-t-0 border-x-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary transition-colors bg-transparent text-lg resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full md:w-auto uppercase"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Footnote */}
      <div className="mt-12 md:mt-20 py-5 md:py-8 border-t flex justify-between items-center gap-4">
        <p className="text-[10px] uppercase font-semibold tracking-widest opacity-60">
          © 2026 DIVYASHRI&apos;S PORTFOLIO. ALL RIGHTS RESERVED.
        </p>
        <div className="opacity-60">
          <ArrowUpIcon />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
