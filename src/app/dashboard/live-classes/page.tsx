"use client";

import { useEffect, useState } from "react";
import { useMockAuth } from "@/lib/mock-auth";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Clock, ArrowRight, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function StudentLiveClassesPage() {
  const { userId, isLoaded } = useMockAuth();
  const [liveNow, setLiveNow] = useState<any | null>(null);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClasses() {
      if (!userId) return;

      try {
        // 1. Get user internal ID
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("id")
          .eq("clerk_id", userId)
          .single();

        if (!profile) return;

        // 2. Get enrolled course IDs
        const { data: enrollments } = await supabase
          .from("enrollments")
          .select("course_id")
          .eq("user_id", profile.id);

        if (!enrollments || enrollments.length === 0) {
          setLoading(false);
          return; // No enrollments
        }

        const courseIds = enrollments.map(e => e.course_id);

        // 3. Get live classes for those courses
        const { data: classes } = await supabase
          .from("live_classes")
          .select("*, trainer:user_profiles!trainer_id(full_name)")
          .in("course_id", courseIds)
          .order("scheduled_at", { ascending: true });

        if (classes) {
          const now = new Date();
          const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
          
          const currentlyLive = classes.find(c => {
            const scheduledAt = new Date(c.scheduled_at);
            // Consider live if within the past hour and marked as 'live' or 'scheduled'
            return scheduledAt > oneHourAgo && scheduledAt <= new Date(now.getTime() + 15 * 60 * 1000);
          });
          
          if (currentlyLive) setLiveNow(currentlyLive);

          const futureClasses = classes.filter(c => new Date(c.scheduled_at) > now && c.id !== currentlyLive?.id);
          setUpcoming(futureClasses);
        }
      } catch (err) {
        console.error("Error loading student classes:", err);
      } finally {
        setLoading(false);
      }
    }

    if (isLoaded) loadClasses();
  }, [isLoaded, userId]);

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">Live Sessions</h1>
        <p className="text-muted-foreground">Interact with mentors and peers in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Live Now Card */}
         {liveNow ? (
           <Card className="rounded-[2rem] bg-linear-to-br from-primary to-accent p-8 text-primary-foreground overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 rotate-12 group-hover:scale-175 transition-all">
                 <Video className="h-32 w-32" />
              </div>
              <div className="relative z-10 space-y-6">
                 <Badge className="bg-red-500 text-white animate-pulse border-none px-4 py-1">LIVE NOW</Badge>
                 <div className="space-y-2">
                    <h2 className="text-3xl font-bold">{liveNow.title}</h2>
                    <p className="opacity-80">Join {liveNow.trainer?.full_name} for this interactive session.</p>
                 </div>
                 <Link href={liveNow.meeting_room_url || "#"} target="_blank">
                   <Button variant="secondary" className="rounded-xl px-8 py-6 font-bold text-lg mt-4">
                      Join Session Now <ArrowRight className="ml-2 h-5 w-5" />
                   </Button>
                 </Link>
              </div>
           </Card>
         ) : (
           <Card className="rounded-[2rem] border-primary/5 p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <Video className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-bold">No Live Sessions Currently</h3>
              <p className="text-muted-foreground mt-2">Check back later when a session is scheduled to start.</p>
           </Card>
         )}

         <div className="space-y-6">
            <h3 className="text-xl font-bold">Upcoming Classes</h3>
            {upcoming.length === 0 ? (
               <div className="text-muted-foreground p-6 border rounded-2xl bg-muted/10">No upcoming classes scheduled for your enrolled courses.</div>
            ) : (
               <div className="space-y-4">
                  {upcoming.map((session) => (
                    <Card key={session.id} className="rounded-2xl border-primary/5 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between group hover:border-primary/20 transition-all gap-4">
                       <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                             <Calendar className="h-6 w-6" />
                          </div>
                          <div>
                             <h4 className="font-bold">{session.title}</h4>
                             <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-x-3 mt-1">
                                <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {new Date(session.scheduled_at).toLocaleString([], {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'})}</span>
                                <span className="hidden sm:inline">•</span>
                                <span>Mentor: {session.trainer?.full_name || "Unknown"}</span>
                             </div>
                          </div>
                       </div>
                       <Link href={session.meeting_room_url || "#"} target="_blank">
                         <Button variant="outline" size="sm" className="rounded-full shrink-0">
                           View Link
                         </Button>
                       </Link>
                    </Card>
                  ))}
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
