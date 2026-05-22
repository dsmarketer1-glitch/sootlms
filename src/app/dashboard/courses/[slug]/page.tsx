"use client";

import { useEffect, useState } from "react";
import { useMockAuth } from "@/lib/mock-auth";
import { supabase } from "@/lib/supabase";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { PlayCircle, CheckCircle2, ChevronLeft, ChevronRight, FileText, Lock, MessageSquare, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import React from "react";

interface Lesson {
  id: string;
  module_id: string;
  title: string;
  description: string;
  video_url: string;
  video_platform: string;
  content: string;
  order_index: number;
  is_free_preview: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
}

interface Enrollment {
  id: string;
  amount_paid: number;
  completion_percentage: number;
}

export default function CoursePlayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const router = useRouter();
  const { userId, isLoaded } = useMockAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCoursePlayer() {
      if (!userId) return;
      try {
        // 1. Fetch user profile
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("id")
          .eq("clerk_id", userId)
          .single();

        if (!profile) return;

        // 2. Fetch course by slug
        const { data: courseData } = await supabase
          .from("courses")
          .select("*")
          .eq("slug", slug)
          .single();

        if (!courseData) {
          setLoading(false);
          return;
        }
        setCourse(courseData);

        // 3. Fetch enrollment and payment details
        const { data: enrollData } = await supabase
          .from("enrollments")
          .select("*")
          .eq("user_id", profile.id)
          .eq("course_id", courseData.id)
          .maybeSingle();

        setEnrollment(enrollData);

        // 4. Fetch modules and lessons
        const { data: modulesData } = await supabase
          .from("modules")
          .select("*, lessons(*)")
          .eq("course_id", courseData.id)
          .order("order_index", { ascending: true });

        if (modulesData) {
          const formattedModules = modulesData.map((m) => {
            const sortedLessons = (m.lessons || []).sort((a: any, b: any) => a.order_index - b.order_index);
            return { ...m, lessons: sortedLessons };
          });
          setModules(formattedModules);
          
          // Set initial active lesson to first lesson of first module if unlocked
          if (formattedModules.length > 0 && formattedModules[0].lessons.length > 0) {
            setActiveLesson(formattedModules[0].lessons[0]);
          }
        }

        // 5. Fetch lesson progress
        if (enrollData) {
          const { data: progressData } = await supabase
            .from("lesson_progress")
            .select("lesson_id")
            .eq("user_id", profile.id)
            .eq("enrollment_id", enrollData.id)
            .eq("is_completed", true);

          if (progressData) {
            setCompletedLessons(progressData.map((p) => p.lesson_id));
          }
        }
      } catch (err) {
        console.error("Error loading course player:", err);
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded && userId) {
      loadCoursePlayer();
    }
  }, [slug, userId, isLoaded]);

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    notFound();
  }

  // Phased Lock / Unlock Calculation
  // Cumulative fee percentages:
  // Booking amount = 10% i.e. 1000 -> Opens 1 module
  // 1st Installment = 25% i.e. 2500 (Cumulative 35%) -> Opens next 3 (Total 4 modules)
  // 2nd Installment = 25% i.e. 2500 (Cumulative 60%) -> Opens next 3 (Total 7 modules)
  // Final Installment = 40% i.e. 4000 (Cumulative 100%) -> Opens remaining 3 (Total 10 modules)
  const amountPaid = enrollment?.amount_paid || 0;
  const totalFees = course.price || 10000;
  const percentPaid = (amountPaid / totalFees) * 100;

  let unlockedModuleCount = 0;
  if (percentPaid >= 100) {
    unlockedModuleCount = modules.length;
  } else if (percentPaid >= 60) {
    unlockedModuleCount = Math.min(modules.length, 7);
  } else if (percentPaid >= 35) {
    unlockedModuleCount = Math.min(modules.length, 4);
  } else if (percentPaid >= 10) {
    unlockedModuleCount = Math.min(modules.length, 1);
  }

  const isModuleLocked = (moduleIndex: number) => {
    return moduleIndex >= unlockedModuleCount;
  };

  const toggleLessonCompletion = async (lessonId: string) => {
    if (!userId || !enrollment) return;
    try {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("clerk_id", userId)
        .single();

      if (!profile) return;

      const isCurrentlyCompleted = completedLessons.includes(lessonId);
      
      if (isCurrentlyCompleted) {
        // Mark as uncompleted
        const { error } = await supabase
          .from("lesson_progress")
          .delete()
          .eq("user_id", profile.id)
          .eq("lesson_id", lessonId);

        if (!error) {
          setCompletedLessons(completedLessons.filter(id => id !== lessonId));
        }
      } else {
        // Mark as completed
        const { error } = await supabase
          .from("lesson_progress")
          .upsert({
            user_id: profile.id,
            lesson_id: lessonId,
            enrollment_id: enrollment.id,
            is_completed: true,
            completed_at: new Date().toISOString()
          });

        if (!error) {
          setCompletedLessons([...completedLessons, lessonId]);
        }
      }

      // Update completion percentage inside enrollment table
      const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
      const newlyCompletedCount = isCurrentlyCompleted 
        ? completedLessons.length - 1 
        : completedLessons.length + 1;
      const progressPercent = totalLessons > 0 ? (newlyCompletedCount / totalLessons) * 100 : 0;

      await supabase
        .from("enrollments")
        .update({ completion_percentage: progressPercent })
        .eq("id", enrollment.id);

      setEnrollment(prev => prev ? { ...prev, completion_percentage: progressPercent } : null);

    } catch (e) {
      console.error("Failed to sync progress:", e);
    }
  };

  const currentModuleIndex = modules.findIndex(m => m.lessons.some(l => l.id === activeLesson?.id));
  const isCurrentModuleLocked = isModuleLocked(currentModuleIndex);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background overflow-hidden">
      {/* Player Sidebar */}
      <div className="w-full lg:w-80 border-r flex flex-col h-1/2 lg:h-full bg-muted/10 shrink-0">
        <div className="p-6 border-b">
          <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" /> Dashboard
          </Link>
          <h2 className="font-bold text-lg line-clamp-2">{course.title}</h2>
          <div className="mt-2 text-xs font-semibold text-primary">
            {Math.round(enrollment?.completion_percentage || 0)}% COMPLETED
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <Accordion type="single" collapsible defaultValue={["module-0"]} className="w-full">
            {modules.map((module, i) => {
              const locked = isModuleLocked(i);
              return (
                <AccordionItem key={i} value={`module-${i}`} className="border-b px-2">
                  <AccordionTrigger className="hover:no-underline text-sm font-bold py-4">
                     <div className="flex items-center space-x-2 text-left w-full pr-4 justify-between">
                        <span className="truncate">{module.title}</span>
                        {locked && <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
                     </div>
                  </AccordionTrigger>
                  <AccordionContent>
                     {locked ? (
                       <div className="p-4 bg-muted/30 rounded-xl space-y-2 border border-dashed text-center">
                          <Lock className="h-5 w-5 text-muted-foreground mx-auto" />
                          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Installment Locked</p>
                          <p className="text-[10px] text-muted-foreground/80 leading-relaxed">Pay next fee installment in payments tab to unlock this module.</p>
                       </div>
                     ) : (
                       <div className="space-y-1">
                          {module.lessons.map((lesson, j) => {
                            const isSelected = activeLesson?.id === lesson.id;
                            const isDone = completedLessons.includes(lesson.id);
                            return (
                              <button
                                key={j}
                                onClick={() => setActiveLesson(lesson)}
                                className={cn(
                                  "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-sm text-left group",
                                  isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                )}
                              >
                                <PlayCircle className={cn("h-4 w-4 shrink-0", isSelected ? "" : "text-muted-foreground")} />
                                <span className="flex-1 line-clamp-2">{lesson.title}</span>
                                {isDone && <CheckCircle2 className="h-4 w-4 text-green-500 group-hover:text-green-400" />}
                              </button>
                            );
                          })}
                       </div>
                     )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>

      {/* Main Player Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-muted/5">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-8">
           {isCurrentModuleLocked ? (
              <Card className="rounded-[2.5rem] border-red-100 bg-red-50/50 p-8 space-y-6 text-center max-w-xl mx-auto mt-12 shadow-sm">
                 <div className="h-14 w-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                    <Lock className="h-7 w-7" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-xl font-bold">This module is locked</h3>
                    <p className="text-sm text-muted-foreground">
                       This part of the curriculum is opened dynamically in phases based on your installment payments. 
                    </p>
                 </div>
                 <div className="bg-white/80 border p-4 rounded-2xl flex items-start space-x-3 text-left">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div className="text-xs space-y-1">
                       <p className="font-bold text-foreground">Current Payment Status</p>
                       <p className="text-muted-foreground">Paid: ₹{amountPaid.toLocaleString()} / ₹{totalFees.toLocaleString()} ({Math.round(percentPaid)}%)</p>
                       <p className="text-muted-foreground/80 mt-1">Please head to the payments tab to clear your pending installment balance and immediately unlock this course module.</p>
                    </div>
                 </div>
                 <Link href="/dashboard/payments" className="block">
                    <Button className="w-full rounded-xl py-6 font-bold shadow-lg shadow-primary/20">Clear Pending Installment</Button>
                 </Link>
              </Card>
           ) : activeLesson ? (
             <>
               {/* Video Container */}
               <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
                  {/* For demo video, we show a gorgeous player backdrop */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/80 to-accent/80 flex items-center justify-center">
                     <PlayCircle className="h-20 w-20 text-white/30 group-hover:text-white/60 transition-colors animate-pulse cursor-pointer" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent">
                     <div className="text-white font-bold">{activeLesson.title}</div>
                  </div>
               </div>

               {/* Lesson Content */}
               <div className="max-w-4xl mx-auto w-full space-y-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-8">
                     <div>
                        <h1 className="text-3xl font-bold tracking-tighter">{activeLesson.title}</h1>
                        <p className="text-muted-foreground mt-1">Status: {completedLessons.includes(activeLesson.id) ? "Completed" : "In Progress"}</p>
                     </div>
                     <div className="flex items-center space-x-2">
                        <Button 
                          onClick={() => toggleLessonCompletion(activeLesson.id)}
                          variant={completedLessons.includes(activeLesson.id) ? "outline" : "default"}
                          size="sm" 
                          className="rounded-full px-6 font-semibold"
                        >
                           <CheckCircle2 className="h-4 w-4 mr-2" />
                           {completedLessons.includes(activeLesson.id) ? "Mark Uncomplete" : "Mark Complete"}
                        </Button>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="md:col-span-2 space-y-6">
                        <h3 className="text-xl font-bold">Lesson Notes</h3>
                        <div className="text-muted-foreground leading-relaxed space-y-4 prose max-w-none">
                           <p>{activeLesson.description || "No notes available for this lesson yet."}</p>
                           {activeLesson.content && <p>{activeLesson.content}</p>}
                        </div>
                     </div>

                     <div className="space-y-6">
                        <h3 className="text-xl font-bold">Resources</h3>
                        <div className="space-y-3">
                           <Button variant="outline" className="w-full justify-start rounded-xl">
                              <FileText className="h-4 w-4 mr-2 text-blue-500" /> Lesson PDF Resource
                           </Button>
                           <Button variant="outline" className="w-full justify-start rounded-xl">
                              <FileText className="h-4 w-4 mr-2 text-green-500" /> Guide Worksheet
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
             </>
           ) : (
             <div className="text-center py-20 bg-muted/20 rounded-[2.5rem] p-8 max-w-md mx-auto mt-20 border border-dashed">
                <PlayCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4 animate-bounce" />
                <p className="text-muted-foreground text-sm font-medium">Select a lesson from the left sidebar to start learning.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
