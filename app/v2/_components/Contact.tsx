"use client";

import React from "react";
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

const formSchema = z.object({
  firstName: z.string().min(1, "Please enter your name"),
  email: z.string().email(),
  message: z.string().min(1, "Please enter a message"),
});

const Contact = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      message: "",
    },
  });
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
          <form className="grid md:grid-cols-2 gap-5 md:gap-10">
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

            <Button className="mt-5 md:col-span-2">Send</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
