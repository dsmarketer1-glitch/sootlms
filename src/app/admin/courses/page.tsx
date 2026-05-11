import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit2, Trash2, Eye, MoreVertical } from "lucide-react";
import Link from "next/link";
import { MOCK_COURSES } from "@/data/courses";

export default function AdminCoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">Course Management</h1>
          <p className="text-muted-foreground">Create, edit, and manage your academy's curriculum.</p>
        </div>
        <Link href="/admin/courses/new">
          <Button className="rounded-xl">
            <Plus className="h-4 w-4 mr-2" /> Create New Course
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-10 rounded-full bg-background" />
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          <Badge variant="secondary" className="rounded-full px-4 py-1 cursor-pointer">All</Badge>
          <Badge variant="outline" className="rounded-full px-4 py-1 cursor-pointer hover:bg-muted">Marketing</Badge>
          <Badge variant="outline" className="rounded-full px-4 py-1 cursor-pointer hover:bg-muted">SEO</Badge>
          <Badge variant="outline" className="rounded-full px-4 py-1 cursor-pointer hover:bg-muted">Branding</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {MOCK_COURSES.map((course) => (
          <Card key={course.id} className="rounded-3xl border-primary/5 shadow-sm hover:shadow-md transition-all overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-48 aspect-video bg-muted shrink-0 relative">
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center text-[10px] font-bold text-primary/40 uppercase">
                    {course.category}
                  </div>
                </div>
                <div className="flex-1 p-6 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-widest">{course.level}</Badge>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px] uppercase tracking-widest">Published</Badge>
                  </div>
                  <h3 className="text-xl font-bold">{course.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{course.durationWeeks} Weeks</span>
                    <span>•</span>
                    <span>{course.modules.length} Modules</span>
                    <span>•</span>
                    <span>{course.students} Students</span>
                  </div>
                </div>
                <div className="p-6 border-t md:border-t-0 md:border-l flex items-center space-x-2">
                  <div className="text-right mr-4 hidden md:block">
                    <div className="text-lg font-bold text-primary">₹{course.price.toLocaleString()}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Price</div>
                  </div>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
