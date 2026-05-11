import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Video, Calendar, Clock, MapPin, MoreHorizontal } from "lucide-react";

const MOCK_LIVE_CLASSES = [
  { id: "1", title: "Meta Ads Strategy Q&A", course: "Performance Marketing", date: "Today", time: "07:00 PM", status: "scheduled", instructor: "Kuldeep Sir" },
  { id: "2", title: "AI Tools for SEO Workshop", course: "AI-SEO Masterclass", date: "Tomorrow", time: "05:00 PM", status: "scheduled", instructor: "Expert" },
  { id: "3", title: "Branding Feedback Session", course: "Branding & Storytelling", date: "May 12", time: "06:30 PM", status: "scheduled", instructor: "Kuldeep Sir" },
];

export default function AdminLiveClassesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-gradient">Live Classes</h1>
          <p className="text-muted-foreground">Schedule and manage your live interactive sessions.</p>
        </div>
        <Button className="rounded-xl">
          <Plus className="h-4 w-4 mr-2" /> Schedule Class
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <Card className="rounded-[2rem] border-primary border-2 border-dashed bg-primary/5 flex flex-col items-center justify-center p-12 text-center space-y-4 cursor-pointer hover:bg-primary/10 transition-all">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
               <Video className="h-8 w-8" />
            </div>
            <div>
               <h3 className="font-bold text-lg">New Session</h3>
               <p className="text-sm text-muted-foreground">Start an instant live class now.</p>
            </div>
         </Card>

         {MOCK_LIVE_CLASSES.map((session) => (
           <Card key={session.id} className="rounded-[2rem] border-primary/5 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">
              <CardHeader className="bg-muted/30 pb-4">
                 <div className="flex justify-between items-start">
                    <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">{session.status}</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                       <MoreHorizontal className="h-4 w-4" />
                    </Button>
                 </div>
                 <CardTitle className="text-xl mt-4">{session.title}</CardTitle>
                 <p className="text-xs font-bold text-primary uppercase tracking-widest">{session.course}</p>
              </CardHeader>
              <CardContent className="pt-6 space-y-6 flex-1">
                 <div className="space-y-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                       <Calendar className="h-4 w-4 mr-2 text-primary" />
                       <span className="font-medium text-foreground">{session.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                       <Clock className="h-4 w-4 mr-2 text-primary" />
                       <span className="font-medium text-foreground">{session.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                       <MapPin className="h-4 w-4 mr-2 text-primary" />
                       <span className="font-medium text-foreground">Zoom Meeting</span>
                    </div>
                 </div>

                 <div className="flex items-center space-x-3 pt-4 border-t">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                       {session.instructor[0]}
                    </div>
                    <div className="text-xs font-medium">Instructor: {session.instructor}</div>
                 </div>
              </CardContent>
              <div className="p-4 border-t bg-muted/10">
                 <Button className="w-full rounded-xl h-11 font-bold">Manage Session</Button>
              </div>
           </Card>
         ))}
      </div>
    </div>
  );
}
