"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  BookOpen, 
  Video, 
  MessageSquare, 
  TrendingUp,
  ArrowUpRight,
  Clock
} from "lucide-react";

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Manage your students and upcoming classes.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium bg-primary/10 text-primary px-4 py-2 rounded-full">
          <Clock className="h-4 w-4" />
          <span>Next Session in 2 hours</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "My Students", value: "450", icon: Users, trend: "+12%" },
          { title: "Active Courses", value: "4", icon: BookOpen, trend: "Stable" },
          { title: "Live Sessions", value: "12", icon: Video, trend: "+2" },
          { title: "Unread Msgs", value: "8", icon: MessageSquare, trend: "Action Req" },
        ].map((kpi, i) => (
          <Card key={i} className="rounded-3xl border-primary/5 shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <kpi.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-500 text-xs font-bold">{kpi.trend}</span>
                <span className="text-xs text-muted-foreground ml-1">this month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="rounded-[2rem] p-8 border-primary/5 shadow-sm space-y-6">
            <h3 className="text-xl font-bold">Upcoming Live Sessions</h3>
            <div className="space-y-4">
               {[
                 { title: "Meta Ads Advanced Funnels", time: "Today, 07:00 PM", students: 120 },
                 { title: "Q&A Session: Google Search Ads", time: "Tomorrow, 05:00 PM", students: 85 }
               ].map((session, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border">
                    <div className="space-y-1">
                       <h4 className="font-bold">{session.title}</h4>
                       <p className="text-xs text-muted-foreground">{session.time}</p>
                    </div>
                    <div className="text-right">
                       <div className="text-sm font-bold text-primary">{session.students} Enrolled</div>
                       <button className="text-[10px] uppercase font-bold text-muted-foreground hover:text-primary transition-colors">View Details</button>
                    </div>
                 </div>
               ))}
            </div>
         </Card>

         <Card className="rounded-[2rem] p-8 border-primary/5 shadow-sm space-y-6">
            <h3 className="text-xl font-bold">Recent Submissions</h3>
            <div className="space-y-4">
               {[
                 { student: "Rahul Sharma", task: "Meta Pixel Setup", date: "10 mins ago" },
                 { student: "Priya Patel", task: "Keyword Research", date: "45 mins ago" },
                 { student: "Amit Singh", task: "Ad Copy Audit", date: "2 hours ago" }
               ].map((sub, i) => (
                 <div key={i} className="flex items-center space-x-4 p-4 hover:bg-muted/10 rounded-2xl transition-colors">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                       {sub.student[0]}
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-sm">{sub.student}</h4>
                       <p className="text-xs text-muted-foreground">{sub.task}</p>
                    </div>
                    <div className="text-right text-[10px] text-muted-foreground uppercase">
                       {sub.date}
                    </div>
                 </div>
               ))}
            </div>
         </Card>
      </div>
    </div>
  );
}
