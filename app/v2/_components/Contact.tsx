"use client";

import React, { useState } from "react";
import Title from "./Title";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const formSchema = z.object({
  firstName: z.string().min(1, "Please enter your name"),
  email: z.string().email(),
  message: z.string().min(1, "Please enter a message"),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      message: "",
    },
  });
  type ContactFormValues = z.infer<typeof formSchema>;

  const onSubmit = async (values: ContactFormValues) => {
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
      console.error("EmailJS error:", error);

      toast.message("Failed to send message.", {
        description: "Please try again or contact me via linkedin.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 md:px-16 py-10 md:py-20">
      <Title>Contact</Title>
      <div className="grid md:grid-cols-2 gap-5 md:gap-24">
        <div>
          <div className="mt-4 md:mt-6 md:text-2xl leading-snug">
            Lorem, ipsum dolor sit amets necessitatibus quos ex ea cumque
            provident velit excepturi et!
          </div>

          <Button variant={"outline"} className="font-normal mt-4 md:mt-6">
            contact@divyashri.nl
          </Button>
        </div>

        <Form {...form}>
          <form
            className="grid md:grid-cols-2 gap-5 md:gap-10"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name *" {...field} />
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
                    <Input placeholder="Email *" {...field} />
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
                    <Textarea placeholder="Message *" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="mt-5 md:col-span-2"
              type="submit"
              disabled={isSubmitting}
            >
              Send
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
