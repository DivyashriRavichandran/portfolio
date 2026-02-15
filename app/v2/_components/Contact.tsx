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
import { ArrowUpRight, Mail, Linkedin, Github } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

const Contact = () => {
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
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });
    },
    { scope: container },
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS environment variables are not set.");
      }

      const templateParams = {
        name: values.firstName,
        email: values.email,
        message: values.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast.message("Message sent successfully!", {
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Try LinkedIn?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={container}
      className="px-6 md:px-16 py-24 bg-background border-t border-foreground/5"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
        {/* LEFT SIDE: Editorial Info */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="text-5xl md:text-4xl font-semibold tracking-tighter uppercase leading-[0.9]">
              Let&apos;s <br /> <span className="text-[#d0fe38]">Connect.</span>
            </h2>
            <p className="mt-8 text-lg md:text-xl opacity-60 max-w-sm leading-relaxed">
              Whether you have a question, want to collaborate, or just want to
              say hi, feel free to drop me a message.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <div className="group flex flex-col">
              <span className="text-[10px] uppercase font-semibold opacity-40 tracking-widest">
                Email me
              </span>
              <a
                href="mailto:contact@divyashri.nl"
                className="text-xl md:text-2xl  hover:text-[#d0fe38] transition-colors inline-flex items-center gap-2"
              >
                contact@divyashri.nl{" "}
                <ArrowUpRight size={20} className="opacity-40" />
              </a>
            </div>

            <div className="flex gap-6">
              <a
                href="#"
                className="p-3 rounded-full border border-foreground/10 hover:bg-[#d0fe38] hover:text-black transition-all"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="p-3 rounded-full border border-foreground/10 hover:bg-[#d0fe38] hover:text-black transition-all"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: The Form */}
        <div className="lg:col-span-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        <Input
                          placeholder="Your Name"
                          className="border-none bg-transparent px-0 py-4 text-xl placeholder:opacity-30 focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <div className="contact-line absolute bottom-0 left-0 h-[1px] bg-foreground/20 w-full" />
                      <FormMessage className="text-[10px] uppercase font-semibold text-red-500" />
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
                          placeholder="Your Email"
                          className="border-none bg-transparent px-0 py-4 text-xl placeholder:opacity-30 focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                        />
                      </FormControl>
                      <div className="contact-line absolute bottom-0 left-0 h-[1px] bg-foreground/20 w-full" />
                      <FormMessage className="text-[10px] uppercase font-semibold text-red-500" />
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
                          placeholder="How can I help you?"
                          className="min-h-[150px] border-none bg-transparent px-0 py-4 text-xl placeholder:opacity-30 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <div className="contact-line absolute bottom-0 left-0 h-[1px] bg-foreground/20 w-full" />
                      <FormMessage className="text-[10px] uppercase font-semibold text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto py-6 px-8 rounded-full bg-[#d0fe38] text-black font-semibold uppercase tracking-widest hover:scale-105 transition-transform md:text-sm"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
