"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Mail, MessageSquare, MoreHorizontal, UserCheck, TrendingUp } from "lucide-react";

const TEACHER_STUDENTS = [
  { id: "1", name: "Rahul Sharma", email: "rahul@example.com", course: "Meta Ads Mastery", progress: "65%", lastActive: "2 hours ago" },
  { id: "2", name: "Priya Patel", email: "priya@example.com", course: "Meta Ads Mastery", progress: "30%", lastActive: "1 day ago" },
  { id: "3", name: "Amit Singh", course: "AI-SEO Course", progress: "90%", lastActive: "Active Now", email: "amit@example.com" },
  { id: "4", name: "Sanya Gupta", course: "AI-SEO Course", progress: "10%", lastActive: "3 days ago", email: "sanya@example.com" },
];

export default function TeacherStudentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">Student Roster</h1>
          <p className="text-muted-foreground">Monitor performance and communicate with students enrolled in your courses.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium bg-green-500/10 text-green-600 px-4 py-2 rounded-full">
          <UserCheck className="h-4 w-4" />
          <span>85% Engagement Rate</span>
        </div>
      </div>

      <Card className="rounded-[2rem] border-primary/5 shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-muted/20 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <CardTitle className="text-lg">Active Students</CardTitle>
            <div className="relative w-full md:w-80">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <Input placeholder="Search by name or course..." className="pl-10 rounded-full bg-background" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/30 text-muted-foreground font-medium uppercase tracking-widest text-[10px]">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Enrolled In</th>
                  <th className="px-6 py-4">Course Progress</th>
                  <th className="px-6 py-4">Last Activity</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {TEACHER_STUDENTS.map((student) => (
                  <tr key={student.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                       <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                             {student.name[0]}
                          </div>
                          <div>
                             <div className="font-bold">{student.name}</div>
                             <div className="text-xs text-muted-foreground">{student.email}</div>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <Badge variant="outline" className="rounded-full text-[10px] uppercase">{student.course}</Badge>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center space-x-2">
                          <div className="flex-1 w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                             <div className="h-full bg-primary" style={{ width: student.progress }}></div>
                          </div>
                          <span className="font-bold text-xs">{student.progress}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={student.lastActive === 'Active Now' ? 'text-green-500 font-bold animate-pulse' : 'text-muted-foreground'}>
                          {student.lastActive}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-blue-500">
                          <Mail className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-primary">
                          <MessageSquare className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                       </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
