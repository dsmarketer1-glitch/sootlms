import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, Clock, Award, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function StudentDashboardPage() {
  const enrolledCourses = [
    {
      title: "Mastering Performance Marketing",
      instructor: "Kuldeep Sir",
      progress: 65,
      nextLesson: "Setting Up Meta Pixel",
      slug: "performance-marketing"
    },
    {
      title: "AI-Powered SEO Masterclass",
      instructor: "Industry Expert",
      progress: 30,
      nextLesson: "Semantic Search Analysis",
      slug: "ai-seo"
    }
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">Welcome back, Learner! 👋</h1>
        <p className="text-muted-foreground">You've completed 65% of your current goal. Keep going!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Courses Enrolled", value: "2", icon: PlayCircle, color: "text-blue-500", bg: "bg-blue-500/10" },
          { title: "Hours Learned", value: "24.5", icon: Clock, color: "text-green-500", bg: "bg-green-500/10" },
          { title: "Certificates", value: "1", icon: Award, color: "text-yellow-500", bg: "bg-yellow-500/10" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-primary/5 shadow-sm">
            <CardContent className="pt-6 flex items-center space-x-4">
              <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tighter">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {enrolledCourses.map((course, i) => (
            <Card key={i} className="rounded-[2rem] border-primary/5 shadow-xl shadow-primary/5 overflow-hidden group">
              <CardHeader className="bg-muted/50 pb-8">
                <div className="flex justify-between items-start mb-4">
                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <PlayCircle className="h-6 w-6" />
                   </div>
                   <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{course.progress}% Complete</span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{course.title}</CardTitle>
                <CardDescription>Instructor: {course.instructor}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                <div className="bg-muted/30 p-4 rounded-xl border border-dashed flex items-center justify-between">
                   <div className="space-y-1">
                      <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Next Lesson</div>
                      <div className="text-sm font-semibold">{course.nextLesson}</div>
                   </div>
                   <Link href={`/dashboard/courses/${course.slug}`}>
                      <Button size="sm" className="rounded-full">Resume</Button>
                   </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-[2rem] border-primary/5 shadow-sm p-8 space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Recent Discussions</h3>
              <Button variant="ghost" size="sm">View All</Button>
           </div>
           <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-muted/30 transition-colors border">
                   <div className="h-10 w-10 rounded-full bg-muted shrink-0" />
                   <div className="space-y-1">
                      <div className="font-bold text-sm">How to optimize Google Search Ads for local businesses?</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">Rahul: I think focusing on local extensions is key...</div>
                   </div>
                </div>
              ))}
           </div>
        </Card>

        <Card className="rounded-[2rem] bg-primary p-8 text-primary-foreground space-y-6 flex flex-col justify-center">
           <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Award className="h-6 w-6" />
           </div>
           <div className="space-y-2">
              <h3 className="text-xl font-bold">Goal Achievement</h3>
              <p className="text-sm opacity-80">You are just 2 lessons away from earning your Performance Marketing certificate!</p>
           </div>
           <Button variant="secondary" className="w-full rounded-xl">Keep Learning</Button>
        </Card>
      </div>
    </div>
  );
}
