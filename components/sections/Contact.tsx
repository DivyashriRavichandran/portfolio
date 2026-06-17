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
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const formSchema = z.object({
  firstName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

const ContactSection = () => {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const about = useQuery(api.about.get);

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
    <div className="mt-6 md:mt-10 grid lg:grid-cols-12 gap-12">
      {/* LEFT: Connect & Socials */}
      <div className="lg:col-span-4 space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
            <span>{t("lets")} </span> <br />
            <span className="px-1 text-primary-foreground bg-primary">
              {t("connect")}
            </span>
          </h2>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Socials
          </h3>
          <div className="flex flex-col gap-4">
            {[
              {
                label: "LinkedIn",
                href: about?.linkedin || "#",
                icon: FaLinkedin,
              },
              {
                label: "Github",
                href: about?.github || "#",
                icon: FaGithub,
              },
              {
                label: "Email",
                href: `mailto:${about?.email || ""}`,
                icon: FaEnvelope,
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b py-2 transition-colors hover:border-primary"
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
          <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("inquiry")}
          </h3>
          <p className="mt-2 md:text-lg">
            {t("have-a-specific-inquiry-or-just-want-to-chat-about-web-dev")}
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
                        placeholder={t("your-name")}
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
                        placeholder={t("email-address")}
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
                        placeholder={t("how-can-i-help-you")}
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
                {isSubmitting ? t("sending") : t("send")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactSection;
