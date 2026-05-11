import { MOCK_COURSES } from "@/data/courses";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Users, Search, Filter } from "lucide-react";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Explore Our <span className="text-gradient">Courses</span></h1>
          <p className="text-muted-foreground text-lg">
            Master the most in-demand digital skills with our industry-led certificate programs. 
            Practical, project-based, and designed for results.
          </p>
        </div>
        
        <div className="flex w-full md:w-auto items-center space-x-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search courses..." className="pl-10 rounded-full h-11" />
          </div>
          <Button variant="outline" size="icon" className="rounded-full h-11 w-11 shrink-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_COURSES.map((course) => (
          <Card key={course.id} className="group hover:border-primary/50 transition-all duration-300 flex flex-col overflow-hidden rounded-3xl shadow-xl shadow-primary/5 border-border/50">
            <div className="aspect-video bg-muted relative overflow-hidden">
              {/* Thumbnail Placeholder */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-primary/40 font-bold">{course.category}</span>
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-4">
                <Badge variant="secondary" className="backdrop-blur-md bg-white/20 text-white border-white/30">{course.level}</Badge>
              </div>
            </div>
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px] uppercase tracking-widest">{course.category}</Badge>
                <div className="flex items-center text-yellow-500 text-sm font-bold">
                  ★ {course.rating}
                </div>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors text-2xl">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">{course.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center"><Zap className="h-4 w-4 mr-1 text-yellow-500" /> {course.durationWeeks} Weeks</span>
                <span className="flex items-center"><Users className="h-4 w-4 mr-1 text-blue-500" /> {course.students}</span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t pt-4">
              <div className="flex flex-col">
                {course.discountedPrice && (
                  <span className="text-xs text-muted-foreground line-through">₹{course.price.toLocaleString()}</span>
                )}
                <span className="text-2xl font-bold text-primary">₹{(course.discountedPrice || course.price).toLocaleString()}</span>
              </div>
              <Link href={`/courses/${course.slug}`}>
                <Button className="rounded-full px-6">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
