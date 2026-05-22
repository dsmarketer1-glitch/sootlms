import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, PlayCircle, Clock, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // 1. Fetch course details
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!course) {
    notFound();
  }

  // 2. Fetch modules and lessons
  const { data: modules } = await supabase
    .from("modules")
    .select("*, lessons(*)")
    .eq("course_id", course.id)
    .order("order_index", { ascending: true });

  const sortedModules = (modules || []).map((m) => {
    const sortedLessons = (m.lessons || []).sort((a: any, b: any) => a.order_index - b.order_index);
    return { ...m, lessons: sortedLessons };
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Course Hero */}
      <section className="bg-muted/30 border-b pt-12 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/courses" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{course.category}</Badge>
                  <Badge variant="outline" className="capitalize">{course.difficulty_level}</Badge>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                  {course.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {course.short_description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-8 text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <span className="text-yellow-600 font-bold">★</span>
                  </div>
                  <div>
                    <div className="font-bold">{course.rating || "4.8"}</div>
                    <div className="text-xs text-muted-foreground">Course Rating</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold">{course.enrollment_count || 120}+</div>
                    <div className="text-xs text-muted-foreground">Enrolled Students</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold">{course.duration_weeks} Weeks</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="glass p-8 rounded-[2rem] shadow-2xl space-y-6 sticky top-24 border-primary/10">
              <div className="aspect-video bg-muted rounded-2xl mb-4 overflow-hidden relative">
                 <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <PlayCircle className="h-12 w-12 text-primary opacity-50" />
                 </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-primary">₹{(course.discounted_price || course.price).toLocaleString()}</span>
                  {course.discounted_price && course.discounted_price < course.price && (
                    <span className="text-lg text-muted-foreground line-through">₹{course.price.toLocaleString()}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground font-medium">Includes lifetime access & support.</p>
              </div>
              
              <div className="space-y-4">
                <Link href={`/sign-up?redirect_url=/courses/${course.slug}`}>
                  <Button className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/20">Enroll Now</Button>
                </Link>
                <Button variant="outline" className="w-full h-12 text-lg font-bold rounded-xl">Book Free Demo</Button>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">This course includes:</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500 shrink-0" /> Full lifetime access</li>
                  <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500 shrink-0" /> Certificate of completion</li>
                  <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500 shrink-0" /> 20+ downloadable resources</li>
                  <li className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500 shrink-0" /> Industry expert mentorship</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-16">
            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter underline decoration-primary/30 decoration-4 underline-offset-8">Description</h2>
              <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                <p>{course.description}</p>
              </div>
            </div>

            {/* Curriculum */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tighter">Course <span className="text-gradient">Curriculum</span></h2>
              <Accordion type="single" collapsible className="w-full space-y-4 border-none">
                {sortedModules.map((module, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-6 bg-muted/10 overflow-hidden">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex flex-col items-start text-left">
                        <span className="text-xs uppercase tracking-widest text-primary font-bold mb-1">Module {i + 1}</span>
                        <span className="text-xl font-bold">{module.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <ul className="space-y-4">
                        {module.lessons.map((lesson: any, j: number) => (
                          <li key={j} className="flex items-center justify-between p-4 rounded-xl bg-background border group hover:border-primary/30 transition-all">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                <PlayCircle className="h-5 w-5" />
                              </div>
                              <span className="font-medium">{lesson.title}</span>
                            </div>
                            {lesson.is_free_preview && (
                              <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600 border border-green-500/20">Free Preview</Badge>
                            )}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
