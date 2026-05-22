"use client";

import { useEffect, useState } from "react";
import { useMockAuth } from "@/lib/mock-auth";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, Clock, Award, BookOpen } from "lucide-react";
import Link from "next/link";

interface EnrolledCourse {
  id: string;
  course_id: string;
  amount_paid: number;
  completion_percentage: number;
  courses: {
    title: string;
    slug: string;
    description: string;
    price: number;
  };
}

export default function StudentDashboardPage() {
  const { userId, email, fullName, isLoaded } = useMockAuth();
  const [enrollments, setEnrollments] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEnrollments() {
      if (!userId) return;
      try {
        // Get user profile first
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("id")
          .eq("clerk_id", userId)
          .single();

        if (profile) {
          const { data: enrollData, error } = await supabase
            .from("enrollments")
            .select("*, courses(*)")
            .eq("user_id", profile.id);

          if (error) {
            console.error("Error loading enrollments:", error);
          } else if (enrollData) {
            setEnrollments(enrollData as any);
          }
        }
      } catch (err) {
        console.error("Unexpected error in student dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded && userId) {
      fetchEnrollments();
    }
  }, [userId, isLoaded]);

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const hoursLearned = enrollments.length > 0 ? (enrollments.length * 12.5).toFixed(1) : "0.0";
  const certificatesEarned = enrollments.filter(e => e.completion_percentage >= 100).length;

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">Welcome back, {fullName || "Learner"}! 👋</h1>
        {enrollments.length > 0 ? (
          <p className="text-muted-foreground">You are making great progress. Keep it up!</p>
        ) : (
          <p className="text-muted-foreground">You haven't enrolled in any courses yet. Start your learning journey today!</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Courses Enrolled", value: enrollments.length.toString(), icon: PlayCircle, color: "text-blue-500", bg: "bg-blue-500/10" },
          { title: "Hours Learned", value: hoursLearned, icon: Clock, color: "text-green-500", bg: "bg-green-500/10" },
          { title: "Certificates", value: certificatesEarned.toString(), icon: Award, color: "text-yellow-500", bg: "bg-yellow-500/10" },
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

      {enrollments.length === 0 ? (
        <Card className="rounded-[2.5rem] border-primary/5 border border-dashed p-12 text-center space-y-6 bg-muted/5 max-w-2xl mx-auto">
          <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Start Learning</h3>
            <p className="text-muted-foreground">Unlock your potential by enrolling in one of our expert-led, high-impact marketing courses.</p>
          </div>
          <Link href="/courses">
            <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">Explore Courses Catalog</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tighter">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enrollments.map((enrollment, i) => (
              <Card key={i} className="rounded-[2rem] border-primary/5 shadow-xl shadow-primary/5 overflow-hidden group">
                <CardHeader className="bg-muted/50 pb-8">
                  <div className="flex justify-between items-start mb-4">
                     <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <PlayCircle className="h-6 w-6" />
                     </div>
                     <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{Math.round(enrollment.completion_percentage)}% Complete</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{enrollment.courses.title}</CardTitle>
                  <CardDescription>Instructor: Kuldeep Sir</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Progress</span>
                      <span>{Math.round(enrollment.completion_percentage)}%</span>
                    </div>
                    <Progress value={enrollment.completion_percentage} className="h-2" />
                  </div>
                  <div className="bg-muted/30 p-4 rounded-xl border border-dashed flex items-center justify-between">
                     <div className="space-y-1">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Interactive Class</div>
                        <div className="text-sm font-semibold">Live Q&A Sessions Active</div>
                     </div>
                     <Link href={`/dashboard/courses/${enrollment.courses.slug}`}>
                        <Button size="sm" className="rounded-full">Resume</Button>
                     </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
