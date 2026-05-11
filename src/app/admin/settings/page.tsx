"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Globe, Lock, User, Palette, Mail } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter">System Settings</h1>
        <p className="text-muted-foreground">Configure your academy's global preferences and security.</p>
      </div>

      <Tabs defaultValue="general" className="w-full space-y-8">
        <TabsList className="bg-muted/50 p-1 rounded-2xl border">
          <TabsTrigger value="general" className="rounded-xl px-6"><Globe className="h-4 w-4 mr-2" /> General</TabsTrigger>
          <TabsTrigger value="appearance" className="rounded-xl px-6"><Palette className="h-4 w-4 mr-2" /> Appearance</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-xl px-6"><Bell className="h-4 w-4 mr-2" /> Notifications</TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl px-6"><Lock className="h-4 w-4 mr-2" /> Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="rounded-[2rem] border-primary/5 shadow-sm">
                 <CardHeader>
                    <CardTitle>Academy Profile</CardTitle>
                    <CardDescription>Basic information about your school.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <Label>Academy Name</Label>
                       <Input defaultValue="School of Odd Thinkers" className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                       <Label>Support Email</Label>
                       <Input defaultValue="support@schoolofoddthinkers.com" className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                       <Label>Contact Phone</Label>
                       <Input defaultValue="+91 72299 00495" className="rounded-xl h-12" />
                    </div>
                    <Button className="rounded-xl w-full">Update Info</Button>
                 </CardContent>
              </Card>

              <Card className="rounded-[2rem] border-primary/5 shadow-sm">
                 <CardHeader>
                    <CardTitle>SEO & Meta</CardTitle>
                    <CardDescription>How your academy appears in search engines.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <Label>Meta Title</Label>
                       <Input defaultValue="SOOT | #1 Marketing Academy in Jodhpur" className="rounded-xl h-12" />
                    </div>
                    <div className="space-y-2">
                       <Label>Meta Description</Label>
                       <Textarea defaultValue="Master performance marketing, AI-SEO, and digital branding with 1-on-1 mentorship." className="rounded-xl min-h-[100px]" />
                    </div>
                    <Button variant="outline" className="rounded-xl w-full">Save SEO Settings</Button>
                 </CardContent>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
           <Card className="rounded-[2rem] border-primary/5 shadow-sm">
              <CardHeader>
                 <CardTitle>Theme Customization</CardTitle>
                 <CardDescription>Adjust the visual identity of your portal.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                       <Label className="text-base">Dark Mode</Label>
                       <p className="text-sm text-muted-foreground">Force dark theme for all users.</p>
                    </div>
                    <Switch />
                 </div>
                 <div className="space-y-4">
                    <Label>Brand Primary Color</Label>
                    <div className="flex space-x-4">
                       <div className="h-10 w-10 rounded-full bg-indigo-600 border-2 border-white shadow-lg cursor-pointer"></div>
                       <div className="h-10 w-10 rounded-full bg-blue-600 cursor-pointer"></div>
                       <div className="h-10 w-10 rounded-full bg-rose-600 cursor-pointer"></div>
                       <div className="h-10 w-10 rounded-full bg-emerald-600 cursor-pointer"></div>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Textarea({ className, defaultValue }: { className?: string, defaultValue?: string }) {
  return (
    <textarea className={cn("w-full p-4 border rounded-xl focus:ring-2 focus:ring-primary outline-none", className)} defaultValue={defaultValue} />
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
