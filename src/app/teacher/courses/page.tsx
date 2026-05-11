"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, BookOpen, MoreHorizontal, Settings, Plus } from "lucide-react";
import { MOCK_COURSES } from "@/data/courses";

export default function TeacherCoursesPage() {
  // Simulate courses assigned to this teacher (e.g., first two courses)
  const teacherCourses = MOCK_COURSES.slice(0, 2);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">My Assigned Courses</h1>
          <p className="text-muted-foreground">Manage your curriculum and monitor student progress across your courses.</p>
        </div>
        <Button className="rounded-xl">
          <Plus className="h-4 w-4 mr-2" /> Request New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teacherCourses.map((course) => (
          <Card key={course.id} className="rounded-[2rem] border-primary/5 shadow-sm overflow-hidden hover:shadow-xl transition-all group">
            <div className="aspect-video bg-muted relative overflow-hidden">
               <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-primary opacity-30" />
               </div>
               <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="backdrop-blur-md bg-white/20 text-white border-white/30">{course.category}</Badge>
               </div>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{course.title}</CardTitle>
                <Button variant="ghost" size="icon" className="rounded-full">
                   <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{course.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                     <Users className="h-4 w-4 mr-2" />
                     <span className="font-bold text-foreground">{course.students}</span> Enrolled
                  </div>
                  <div className="flex items-center text-muted-foreground">
                     <Clock className="h-4 w-4 mr-2" />
                     <span className="font-bold text-foreground">{course.durationWeeks} Weeks</span>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                     <span>Batch Completion</span>
                     <span>75%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                     <div className="h-full bg-primary" style={{ width: '75%' }}></div>
                  </div>
               </div>
            </CardContent>
            <CardFooter className="bg-muted/20 p-4 flex gap-2">
               <Button className="flex-1 rounded-xl">View Curriculum</Button>
               <Button variant="outline" size="icon" className="rounded-xl">
                  <Settings className="h-4 w-4" />
               </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
