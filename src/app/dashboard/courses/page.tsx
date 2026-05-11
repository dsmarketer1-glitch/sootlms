import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, Clock, BookOpen } from "lucide-react";
import Link from "next/link";

export default function MyCoursesPage() {
  const enrolledCourses = [
    {
      title: "Mastering Performance Marketing",
      instructor: "Kuldeep Sir",
      progress: 65,
      totalLessons: 42,
      completedLessons: 27,
      slug: "performance-marketing"
    },
    {
      title: "AI-Powered SEO Masterclass",
      instructor: "Industry Expert",
      progress: 30,
      totalLessons: 24,
      completedLessons: 7,
      slug: "ai-seo"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">My Courses</h1>
          <p className="text-muted-foreground">Continue where you left off and master your skills.</p>
        </div>
        <Link href="/courses">
           <Button variant="outline" className="rounded-xl">
             <Plus className="h-4 w-4 mr-2" /> Explore More
           </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {enrolledCourses.map((course, i) => (
          <Card key={i} className="rounded-[2rem] border-primary/5 shadow-xl shadow-primary/5 overflow-hidden group flex flex-col">
            <div className="aspect-video bg-muted relative">
               <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary/30">
                  <PlayCircle className="h-12 w-12" />
               </div>
               <div className="absolute bottom-4 left-4">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/30 uppercase tracking-widest">
                    {course.completedLessons}/{course.totalLessons} Lessons
                  </span>
               </div>
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-1">{course.title}</CardTitle>
              <CardDescription>Instructor: {course.instructor}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 flex-1">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>Overall Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1 text-primary" /> 12h Left
                 </div>
                 <div className="flex items-center text-xs text-muted-foreground">
                    <BookOpen className="h-3 w-3 mr-1 text-primary" /> 15 Resources
                 </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
               <Link href={`/dashboard/courses/${course.slug}`}>
                  <Button className="w-full rounded-xl font-bold">Resume Learning</Button>
               </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  );
}
