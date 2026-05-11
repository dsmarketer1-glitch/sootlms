import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 space-y-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Get in <span className="text-gradient">Touch</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions about our courses or want to book a free demo? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="rounded-3xl p-8 border-primary/5 space-y-4">
                 <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-6 w-6" />
                 </div>
                 <div className="space-y-1">
                    <h3 className="font-bold">Email Us</h3>
                    <p className="text-sm text-muted-foreground">hello@soot.academy</p>
                 </div>
              </Card>
              <Card className="rounded-3xl p-8 border-primary/5 space-y-4">
                 <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600">
                    <Phone className="h-6 w-6" />
                 </div>
                 <div className="space-y-1">
                    <h3 className="font-bold">Call Us</h3>
                    <p className="text-sm text-muted-foreground">+91 72299 00495</p>
                 </div>
              </Card>
           </div>

           <Card className="rounded-3xl p-8 border-primary/5 flex items-start space-x-6">
              <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                 <MapPin className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                 <h3 className="font-bold">Our Location</h3>
                 <p className="text-sm text-muted-foreground leading-relaxed">
                    School of Odd Thinkers, Jodhpur, Rajasthan, India.<br />
                    Near Central Academy, Pratap Nagar.
                 </p>
              </div>
           </Card>

           <div className="p-10 bg-primary/5 rounded-[3rem] border border-primary/10 space-y-6">
              <h3 className="text-2xl font-bold">WhatsApp Support</h3>
              <p className="text-muted-foreground">Get instant answers to your queries on WhatsApp.</p>
              <Button size="lg" className="w-full rounded-2xl bg-green-600 hover:bg-green-700 h-14 text-lg">
                 <MessageSquare className="h-5 w-5 mr-2" /> Message on WhatsApp
              </Button>
           </div>
        </div>

        <Card className="rounded-[3rem] border-primary/5 shadow-2xl shadow-primary/5 overflow-hidden">
           <CardHeader className="p-10 pb-0">
              <CardTitle className="text-3xl">Send a Message</CardTitle>
              <CardDescription>We typically respond within 2-4 business hours.</CardDescription>
           </CardHeader>
           <CardContent className="p-10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="John Doe" className="rounded-xl h-12" />
                 </div>
                 <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input placeholder="+91 00000 00000" className="rounded-xl h-12" />
                 </div>
              </div>
              <div className="space-y-2">
                 <Label>Interested Course</Label>
                 <Input placeholder="e.g. Performance Marketing" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                 <Label>Message</Label>
                 <Textarea placeholder="Tell us about your goals..." className="rounded-xl min-h-[150px]" />
              </div>
              <Button size="lg" className="w-full rounded-xl h-14 text-lg font-bold">
                 <Send className="h-5 w-5 mr-2" /> Send Inquiry
              </Button>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
