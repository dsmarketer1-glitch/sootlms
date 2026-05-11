"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Clock, ArrowRight, Plus, Users, Settings } from "lucide-react";

const UPCOMING_SESSIONS = [
  { id: "1", title: "Meta Ads Strategy Q&A", date: "Today", time: "07:00 PM", enrolled: 145, status: "scheduled" },
  { id: "2", title: "AI Tools for SEO Workshop", date: "Tomorrow", time: "05:00 PM", enrolled: 89, status: "scheduled" },
];

export default function TeacherLiveSessionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">Live Sessions Manager</h1>
          <p className="text-muted-foreground">Schedule and host real-time interactive classes for your students.</p>
        </div>
        <Button className="rounded-xl px-6 h-12 shadow-lg shadow-primary/20">
          <Plus className="h-5 w-5 mr-2" /> Schedule Session
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Host Now Card */}
         <Card className="rounded-[2.5rem] bg-linear-to-br from-primary to-accent p-8 text-primary-foreground overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 rotate-12 group-hover:scale-175 transition-all">
               <Video className="h-32 w-32" />
            </div>
            <div className="relative z-10 space-y-6">
               <Badge className="bg-red-500 text-white animate-pulse border-none px-4 py-1">READY TO HOST</Badge>
               <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Weekly Sync: Meta Ads Funnels</h2>
                  <p className="opacity-80">156 students are waiting in the lobby.</p>
               </div>
               <Button variant="secondary" className="rounded-xl px-8 py-6 font-bold text-lg">
                  Start Session Now <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </Card>

         <div className="space-y-6">
            <h3 className="text-xl font-bold">Upcoming Schedule</h3>
            <div className="space-y-4">
               {UPCOMING_SESSIONS.map((session) => (
                 <Card key={session.id} className="rounded-2xl border-primary/5 shadow-sm p-6 flex items-center justify-between group hover:border-primary/20 transition-all">
                    <div className="flex items-center space-x-4">
                       <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                          <Calendar className="h-6 w-6" />
                       </div>
                       <div>
                          <h4 className="font-bold">{session.title}</h4>
                          <div className="flex items-center text-xs text-muted-foreground space-x-3">
                             <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {session.date}, {session.time}</span>
                             <span className="flex items-center"><Users className="h-3 w-3 mr-1" /> {session.enrolled} Students</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center space-x-2">
                       <Button variant="ghost" size="icon" className="rounded-full">
                          <Settings className="h-4 w-4" />
                       </Button>
                       <Button variant="outline" size="sm" className="rounded-xl">Manage</Button>
                    </div>
                 </Card>
               ))}
            </div>
         </div>
      </div>

      {/* Recording Vault */}
      <div className="space-y-6 pt-8">
         <h3 className="text-xl font-bold text-gradient">Past Session Recordings</h3>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
               <Card key={item} className="rounded-2xl border-primary/5 overflow-hidden group hover:shadow-lg transition-all">
                  <div className="aspect-video bg-muted relative">
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Video className="h-10 w-10 text-primary opacity-30 group-hover:opacity-100 transition-all" />
                     </div>
                  </div>
                  <CardContent className="p-4">
                     <h5 className="font-bold text-sm line-clamp-1">Campaign Optimization Q&A #{item}</h5>
                     <div className="flex items-center justify-between mt-2">
                        <p className="text-[10px] text-muted-foreground">April {25 - item}, 2024</p>
                        <Badge variant="ghost" className="text-[10px] h-5">450 views</Badge>
                     </div>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
    </div>
  );
}
