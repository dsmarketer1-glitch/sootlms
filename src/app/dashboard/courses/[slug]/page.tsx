"use client";

import { useState } from "react";
import { MOCK_COURSES } from "@/data/courses";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlayCircle, CheckCircle2, ChevronLeft, ChevronRight, FileText, MessageSquare } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import React from "react";

export default function CoursePlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const course = MOCK_COURSES.find((c) => c.slug === slug);
  const [activeLesson, setActiveLesson] = useState(course?.modules[0].lessons[0]);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background overflow-hidden">
      {/* Player Sidebar */}
      <div className="w-full lg:w-80 border-r flex flex-col h-1/2 lg:h-full bg-muted/10 shrink-0">
        <div className="p-6 border-b">
          <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" /> Dashboard
          </Link>
          <h2 className="font-bold text-lg line-clamp-2">{course.title}</h2>
          <div className="mt-2 text-xs font-medium text-primary">65% COMPLETED</div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <Accordion type="single" collapsible defaultValue="module-0" className="w-full">
            {course.modules.map((module, i) => (
              <AccordionItem key={i} value={`module-${i}`} className="border-b px-2">
                <AccordionTrigger className="hover:no-underline text-sm font-bold py-4">
                   {module.title}
                </AccordionTrigger>
                <AccordionContent>
                   <div className="space-y-1">
                      {module.lessons.map((lesson, j) => (
                        <button
                          key={j}
                          onClick={() => setActiveLesson(lesson)}
                          className={cn(
                            "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-sm text-left group",
                            activeLesson === lesson ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                          )}
                        >
                          <PlayCircle className={cn("h-4 w-4 shrink-0", activeLesson === lesson ? "" : "text-muted-foreground")} />
                          <span className="flex-1 line-clamp-2">{lesson}</span>
                          {j < 2 && <CheckCircle2 className="h-4 w-4 text-green-500 group-hover:text-green-400" />}
                        </button>
                      ))}
                   </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Main Player Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-muted/5">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8">
           {/* Video Container */}
           <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                 <PlayCircle className="h-20 w-20 text-white/20 group-hover:text-primary/50 transition-colors" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent">
                 <div className="text-white font-bold">{activeLesson}</div>
              </div>
           </div>

           {/* Lesson Content */}
           <div className="max-w-4xl mx-auto w-full space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-8">
                 <div>
                    <h1 className="text-3xl font-bold tracking-tighter">{activeLesson}</h1>
                    <p className="text-muted-foreground mt-1">Module: Introduction to Digital Marketing</p>
                 </div>
                 <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="rounded-full">
                       <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                    </Button>
                    <Button size="sm" className="rounded-full">
                       Next <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="md:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold">Lesson Notes</h3>
                    <div className="text-muted-foreground leading-relaxed space-y-4">
                       <p>
                          In this lesson, we cover the core fundamentals of digital marketing and how it differs from traditional marketing. 
                          We explore the customer journey, attribution models, and the importance of a data-driven approach.
                       </p>
                       <ul className="list-disc pl-6 space-y-2">
                          <li>Understanding the "Why" behind digital strategy.</li>
                          <li>Traditional vs Digital: A comparison.</li>
                          <li>Setting measurable KPIs for your campaigns.</li>
                       </ul>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h3 className="text-xl font-bold">Resources</h3>
                    <div className="space-y-3">
                       <Button variant="outline" className="w-full justify-start rounded-xl">
                          <FileText className="h-4 w-4 mr-2 text-blue-500" /> Lesson PDF Guide
                       </Button>
                       <Button variant="outline" className="w-full justify-start rounded-xl">
                          <FileText className="h-4 w-4 mr-2 text-green-500" /> Strategy Template
                       </Button>
                    </div>
                    
                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 space-y-4">
                       <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Need Help?</h4>
                       <p className="text-xs text-muted-foreground leading-relaxed">
                          Stuck on a concept? Post in the discussion forum or reach out to your mentor.
                       </p>
                       <Button size="sm" className="w-full rounded-lg">
                          <MessageSquare className="h-4 w-4 mr-2" /> Open Discussions
                       </Button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
