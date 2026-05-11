import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Clock, ArrowRight } from "lucide-react";

const UPCOMING_CLASSES = [
  { id: "1", title: "Meta Ads Strategy Q&A", date: "Today", time: "07:00 PM", instructor: "Kuldeep Sir", isLive: false },
  { id: "2", title: "AI Tools for SEO Workshop", date: "Tomorrow", time: "05:00 PM", instructor: "Expert", isLive: false },
];

export default function StudentLiveClassesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter">Live Sessions</h1>
        <p className="text-muted-foreground">Interact with mentors and peers in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Live Now Card */}
         <Card className="rounded-[2rem] bg-linear-to-br from-primary to-accent p-8 text-primary-foreground overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 rotate-12 group-hover:scale-175 transition-all">
               <Video className="h-32 w-32" />
            </div>
            <div className="relative z-10 space-y-6">
               <Badge className="bg-red-500 text-white animate-pulse border-none px-4 py-1">LIVE NOW</Badge>
               <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Weekly Performance Marketing Sync</h2>
                  <p className="opacity-80">Join Kuldeep Sir to discuss this week's campaign results.</p>
               </div>
               <Button variant="secondary" className="rounded-xl px-8 py-6 font-bold text-lg">
                  Join Session Now <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </Card>

         <div className="space-y-6">
            <h3 className="text-xl font-bold">Upcoming Classes</h3>
            <div className="space-y-4">
               {UPCOMING_CLASSES.map((session) => (
                 <Card key={session.id} className="rounded-2xl border-primary/5 shadow-sm p-6 flex items-center justify-between group hover:border-primary/20 transition-all">
                    <div className="flex items-center space-x-4">
                       <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                          <Calendar className="h-6 w-6" />
                       </div>
                       <div>
                          <h4 className="font-bold">{session.title}</h4>
                          <div className="flex items-center text-xs text-muted-foreground space-x-3">
                             <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {session.date}, {session.time}</span>
                             <span>•</span>
                             <span>Mentor: {session.instructor}</span>
                          </div>
                       </div>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-full">Remind Me</Button>
                 </Card>
               ))}
            </div>
         </div>
      </div>

      {/* Past Recordings */}
      <div className="space-y-6 pt-8">
         <h3 className="text-xl font-bold text-gradient">Past Session Recordings</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
               <Card key={item} className="rounded-2xl border-primary/5 overflow-hidden group">
                  <div className="aspect-video bg-muted relative">
                     <div className="absolute inset-0 flex items-center justify-center">
                        <PlayCircle className="h-10 w-10 text-primary opacity-30 group-hover:opacity-100 transition-all" />
                     </div>
                  </div>
                  <CardContent className="p-4">
                     <h5 className="font-bold text-sm line-clamp-1">Branding Strategy Workshop Part {item}</h5>
                     <p className="text-[10px] text-muted-foreground mt-1">Recorded on April {20 - item}, 2024</p>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
    </div>
  );
}

function PlayCircle({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
  );
}
