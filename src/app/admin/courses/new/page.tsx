"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Save, 
  ArrowLeft, 
  Video, 
  FileText, 
  Layout, 
  Settings, 
  DollarSign,
  GripVertical,
  Trash2
} from "lucide-react";
import Link from "next/link";

export default function NewCoursePage() {
  const [modules, setModules] = useState([
    { id: 1, title: "Introduction", lessons: [{ id: 1, title: "Welcome to the course" }] }
  ]);

  const addModule = () => {
    setModules([...modules, { id: Date.now(), title: "New Module", lessons: [] }]);
  };

  const addLesson = (moduleId: number) => {
    setModules(modules.map(m => 
      m.id === moduleId 
        ? { ...m, lessons: [...m.lessons, { id: Date.now(), title: "New Lesson" }] } 
        : m
    ));
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/courses">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Create New Course</h1>
            <p className="text-muted-foreground text-sm font-medium">Build your masterclass step by step.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
           <Button variant="outline" className="rounded-xl">Save Draft</Button>
           <Button className="rounded-xl">
             <Save className="h-4 w-4 mr-2" /> Publish Course
           </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full space-y-8">
        <TabsList className="bg-muted/50 p-1 rounded-2xl border">
          <TabsTrigger value="basic" className="rounded-xl px-8"><Layout className="h-4 w-4 mr-2" /> Basic Info</TabsTrigger>
          <TabsTrigger value="curriculum" className="rounded-xl px-8"><Video className="h-4 w-4 mr-2" /> Curriculum</TabsTrigger>
          <TabsTrigger value="pricing" className="rounded-xl px-8"><DollarSign className="h-4 w-4 mr-2" /> Pricing</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-xl px-8"><Settings className="h-4 w-4 mr-2" /> Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card className="rounded-[2rem] border-primary/5 shadow-sm">
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Course Title</Label>
                  <Input placeholder="e.g. Master Performance Marketing" className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input placeholder="performance-marketing" className="rounded-xl h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Short Description</Label>
                <Input placeholder="A catchy one-liner for the course card" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label>Full Description</Label>
                <Textarea placeholder="Explain what students will learn..." className="rounded-xl min-h-[200px]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                   <Label>Category</Label>
                   <Input placeholder="Marketing" className="rounded-xl h-12" />
                 </div>
                 <div className="space-y-2">
                   <Label>Difficulty</Label>
                   <Input placeholder="Beginner" className="rounded-xl h-12" />
                 </div>
                 <div className="space-y-2">
                   <Label>Duration (Weeks)</Label>
                   <Input type="number" placeholder="8" className="rounded-xl h-12" />
                 </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-6">
           <div className="space-y-6">
              {modules.map((module, i) => (
                <Card key={module.id} className="rounded-[2rem] border-primary/5 shadow-sm overflow-hidden">
                  <CardHeader className="bg-muted/30 py-4 flex flex-row items-center justify-between">
                     <div className="flex items-center space-x-3">
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                        <span className="text-xs font-bold text-primary uppercase">Module {i + 1}</span>
                        <Input value={module.title} className="bg-transparent border-none font-bold text-lg p-0 h-auto focus-visible:ring-0 w-64" />
                     </div>
                     <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 rounded-full">
                        <Trash2 className="h-4 w-4" />
                     </Button>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                     <div className="space-y-2">
                        {module.lessons.map((lesson, j) => (
                          <div key={lesson.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-dashed hover:border-primary/50 transition-all">
                             <div className="flex items-center space-x-3 flex-1">
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                   <Video className="h-4 w-4" />
                                </div>
                                <Input value={lesson.title} className="bg-transparent border-none font-medium p-0 h-auto focus-visible:ring-0" />
                             </div>
                             <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm" className="rounded-full text-xs">Edit Content</Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive rounded-full">
                                   <Trash2 className="h-4 w-4" />
                                </Button>
                             </div>
                          </div>
                        ))}
                     </div>
                     <Button variant="outline" className="w-full border-dashed rounded-xl py-6" onClick={() => addLesson(module.id)}>
                        <Plus className="h-4 w-4 mr-2" /> Add Lesson
                     </Button>
                  </CardContent>
                </Card>
              ))}
              <Button onClick={addModule} className="w-full py-8 border-dashed border-2 rounded-[2rem] bg-muted/20 hover:bg-muted/30 text-muted-foreground hover:text-primary transition-all font-bold text-lg">
                <Plus className="h-6 w-6 mr-2" /> Add New Module
              </Button>
           </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
           <Card className="rounded-[2rem] border-primary/5 shadow-sm">
              <CardHeader>
                 <CardTitle>Pricing Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <Label>Base Price (INR)</Label>
                       <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">₹</span>
                          <Input type="number" placeholder="14999" className="pl-10 rounded-xl h-12" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label>Discounted Price (INR)</Label>
                       <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">₹</span>
                          <Input type="number" placeholder="9999" className="pl-10 rounded-xl h-12" />
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center space-x-2 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <Settings className="h-5 w-5 text-primary" />
                    <p className="text-sm">Enabling dynamic pricing will automatically apply seasonal discounts.</p>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
