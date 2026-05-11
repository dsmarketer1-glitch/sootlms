"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner"; // Assuming sonner for toasts later, or just alert for now

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Invalid phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here we would sync to Supabase `leads` table
    alert("Thank you! Our expert will contact you shortly.");
    form.reset();
  }

  return (
    <Card className="rounded-3xl border-primary/10 shadow-2xl overflow-hidden">
      <CardContent className="p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="John Doe" {...form.register("fullName")} className="rounded-xl h-12" />
            {form.formState.errors.fullName && (
              <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" {...form.register("email")} className="rounded-xl h-12" />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+91 98765 43210" {...form.register("phone")} className="rounded-xl h-12" />
              {form.formState.errors.phone && (
                <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">How can we help you?</Label>
            <Textarea id="message" placeholder="I'm interested in the Performance Marketing course..." {...form.register("message")} className="rounded-xl min-h-[150px]" />
            {form.formState.errors.message && (
              <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full h-12 text-lg font-bold rounded-xl" disabled={form.formState.isSubmitting}>
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
