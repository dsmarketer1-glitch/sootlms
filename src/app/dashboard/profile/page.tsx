"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";

export default function StudentProfilePage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="rounded-[2.5rem] p-8 space-y-6 flex flex-col items-center text-center">
           <div className="relative group">
              <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold border-4 border-white shadow-xl">
                 JD
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-all">
                 <Camera className="h-4 w-4" />
              </button>
           </div>
           <div className="space-y-1">
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-sm text-muted-foreground">Performance Marketing Student</p>
           </div>
           <Button className="w-full rounded-xl">Update Photo</Button>
        </Card>

        <Card className="md:col-span-2 rounded-[2.5rem] p-8 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <Label>Full Name</Label>
                 <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="John Doe" className="pl-10 rounded-xl h-12" />
                 </div>
              </div>
              <div className="space-y-2">
                 <Label>Email Address</Label>
                 <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="john.doe@example.com" className="pl-10 rounded-xl h-12" />
                 </div>
              </div>
              <div className="space-y-2">
                 <Label>Phone Number</Label>
                 <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="+91 98765 43210" className="pl-10 rounded-xl h-12" />
                 </div>
              </div>
              <div className="space-y-2">
                 <Label>Location</Label>
                 <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="Jodhpur, India" className="pl-10 rounded-xl h-12" />
                 </div>
              </div>
           </div>
           <div className="flex justify-end space-x-4">
              <Button variant="outline" className="rounded-xl px-8">Cancel</Button>
              <Button className="rounded-xl px-8 shadow-lg shadow-primary/20">Save Changes</Button>
           </div>
        </Card>
      </div>
    </div>
  );
}
