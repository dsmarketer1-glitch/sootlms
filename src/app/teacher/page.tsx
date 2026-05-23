"use client";

import { useEffect, useState } from "react";
import { useMockAuth } from "@/lib/mock-auth";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const { userId, isLoaded } = useMockAuth();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeacherData() {
      if (!userId) return;
      try {
        // 1. Get internal profile ID
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("id")
          .eq("clerk_id", userId)
          .single();

        if (!profile) return;

        // 2. Fetch live classes assigned to this trainer
        const { data: classData } = await supabase
          .from("live_classes")
          .select("*, course:courses(title)")
          .eq("trainer_id", profile.id)
          .order("scheduled_at", { ascending: true });

        if (classData) {
          setClasses(classData);
        }

      } catch (err) {
        console.error("Error loading teacher data:", err);
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded) loadTeacherData();
  }, [userId, isLoaded]);

  if (!isLoaded || loading) {
     return <div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  }

  const upcomingClasses = classes.filter(c => new Date(c.scheduled_at) > new Date());
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Manage your students and upcoming classes.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium bg-primary/10 text-primary px-4 py-2 rounded-full">
          <Clock className="h-4 w-4" />
          <span>{upcomingClasses.length} Upcoming Sessions</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "My Students", value: "TBA", icon: Users, trend: "Pending" },
          { title: "Active Courses", value: "TBA", icon: BookOpen, trend: "Pending" },
          { title: "Live Sessions", value: classes.length.toString(), icon: Video, trend: "Total" },
          { title: "Unread Msgs", value: "0", icon: MessageSquare, trend: "Action Req" },
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
                <span className="text-green-500 text-xs font-bold">{kpi.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="rounded-[2rem] p-8 border-primary/5 shadow-sm space-y-6">
            <h3 className="text-xl font-bold">Upcoming Live Sessions</h3>
            {upcomingClasses.length === 0 ? (
               <div className="text-muted-foreground p-4 bg-muted/10 rounded-2xl">You have no upcoming sessions scheduled.</div>
            ) : (
               <div className="space-y-4">
                  {upcomingClasses.slice(0, 3).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-2xl border">
                       <div className="space-y-1">
                          <h4 className="font-bold">{session.title}</h4>
                          <p className="text-xs text-muted-foreground">
                             {new Date(session.scheduled_at).toLocaleString([], {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'})}
                          </p>
                       </div>
                       <div className="text-right">
                          <a href={session.meeting_room_url || "#"} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase font-bold text-primary hover:underline transition-colors">Start Meeting</a>
                       </div>
                    </div>
                  ))}
               </div>
            )}
         </Card>

         <Card className="rounded-[2rem] p-8 border-primary/5 shadow-sm space-y-6">
            <h3 className="text-xl font-bold">Recent Submissions (Coming Soon)</h3>
            <div className="space-y-4 opacity-50">
               {[
                 { student: "Mock Student 1", task: "Meta Pixel Setup", date: "10 mins ago" },
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
